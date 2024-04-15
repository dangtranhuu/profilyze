const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const CountView = require("../models/countview.model");


exports.count = async (req, res) => {
  try {
    const ip = getClientIp(req);
    const req_url = req.query['url'];
    let result = await CountView.find({ url: req_url });

    if (!isValidURL(req_url))
      return res.json("URL not valid")

    if (result.length < 1) {
      const doc = new CountView({
        ip: ip || "0:0:0:0/0",  //GUEST
        view_count: 0,
        type: ["link"],
        url: req_url,
        access_ip: [ip]
      });

      const saveDoc = await doc.save();

      return res.json(saveDoc);
    }

    result[0].access_ip.push(ip);

    const update = await CountView.updateOne({ url: req_url }, { $set: result[0] });
    return res.json(update);
  } catch (err) {
    return res.json(err);
  }
};


exports.countNoneIP = async (req, res) => {
  try {
    const ip = getClientIp(req);
    const req_url = req.query['url'];
    let result = await CountView.find({ url: req_url });

    if (!isValidURL(req_url))
      return res.json("URL not valid")

    if (result.length < 1) {
      const doc = new CountView({
        ip: ip || "0:0:0:0/0",  //GUEST
        view_count: 0,
        type: ["link"],
        url: req_url
      });

      const saveDoc = await doc.save();

      return res.json(saveDoc);
    }

    result[0].view_count = result[0].view_count + 1;

    const update = await CountView.updateOne({ url: req_url }, { $set: result[0] });
    return res.json(update);
  } catch (err) {
    return res.json(err);
  }
};

function getClientIp(req) {
  let ipAddress = req.headers['x-forwarded-for'];
  if (!ipAddress || ipAddress.toLowerCase() === 'unknown') {
    ipAddress = req.headers['proxy-client-ip'];
  }
  if (!ipAddress || ipAddress.toLowerCase() === 'unknown') {
    ipAddress = req.headers['wl-proxy-client-ip'];
  }
  if (!ipAddress || ipAddress.toLowerCase() === 'unknown') {
    ipAddress = req.headers['http-client-ip'];
  }
  if (!ipAddress || ipAddress.toLowerCase() === 'unknown') {
    ipAddress = req.headers['http-x-forwarded-for'];
  }
  if (!ipAddress || ipAddress.toLowerCase() === 'unknown') {
    ipAddress = req.connection.remoteAddress;
    if (ipAddress === '::1') {
      // Get IPv4 address for localhost
      ipAddress = '127.0.0.1';
    }
  }
  return ipAddress;
}

function isValidURL(url) {
  // Regular expression to match URL pattern
  const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return pattern.test(url);
}