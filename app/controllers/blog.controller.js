const CountView = require("../models/countview.model");


exports.view = async (req, res) => {
  try {
    const req_url = req.query['url'];
    let result = await CountView.find({ url: req_url });

    if (!isValidURL(req_url))
      return res.json("URL not valid")

    if (result.length < 1) {
      const doc = new CountView({
        ip: "0:0:0:0/0",  //GUEST
        view_count: 1,
        type: ["link"],
        url: req_url
      });

      const saveDoc = await doc.save();
      console.log(1);
      const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="20" aria-label="1 lượt xem">
      <title>1 lượt xem</title>
      <linearGradient id="gradient" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity="0.1"/>
        <stop offset="1" stop-opacity="0.1"/>
      </linearGradient>
      <clipPath id="clip">
        <rect width="120" height="20" rx="3" fill="#fff"/>
      </clipPath>
      <g clip-path="url(#clip)">
        <rect width="10" height="20" fill="#533566"/>
        <rect x="10" width="149" height="20" fill="#533566"/>
        <rect width="159" height="20" fill="url(#gradient)"/>
      </g>
      <g fill="#fff" text-anchor="middle" font-family="Verdana, Geneva, sans-serif" font-size="12">
        <text x="50.5" y="15">1 lượt xem</text>
      </g>
    </svg>
      `;
      res.set('Content-Type', 'image/svg+xml');
      return res.send(svgString);
    }

    result[0].view_count = result[0].view_count + 1;

    const update = await CountView.updateOne({ url: req_url }, { $set: result[0] });

    console.log(result[0].view_count);
    svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="20" aria-label="${result[0].view_count} lượt xem">
      <title>${result[0].view_count} lượt xem</title>
      <linearGradient id="gradient" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity="0.1"/>
        <stop offset="1" stop-opacity="0.1"/>
      </linearGradient>
      <clipPath id="clip">
        <rect width="120" height="20" rx="3" fill="#fff"/>
      </clipPath>
      <g clip-path="url(#clip)">
        <rect width="10" height="20" fill="#533566"/>
        <rect x="10" width="149" height="20" fill="#533566"/>
        <rect width="159" height="20" fill="url(#gradient)"/>
      </g>
      <g fill="#fff" text-anchor="middle" font-family="Verdana, Geneva, sans-serif" font-size="12">
        <text x="50.5" y="15">${result[0].view_count} lượt xem</text>
      </g>
    </svg>
    `;

    res.set('Content-Type', 'image/svg+xml');
    return res.send(svgString);
  } catch (err) {
    console.log(err);
    console.log("ANY");
    svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="20" aria-label="any">
    <title>any</title>
    <linearGradient id="gradient" x2="0" y2="100%">
      <stop offset="0" stop-color="#bbb" stop-opacity="0.1"/>
      <stop offset="1" stop-opacity="0.1"/>
    </linearGradient>
    <clipPath id="clip">
      <rect width="120" height="20" rx="3" fill="#fff"/>
    </clipPath>
    <g clip-path="url(#clip)">
      <rect width="10" height="20" fill="#533566"/>
      <rect x="10" width="149" height="20" fill="#533566"/>
      <rect width="159" height="20" fill="url(#gradient)"/>
    </g>
    <g fill="#fff" text-anchor="middle" font-family="Verdana, Geneva, sans-serif" font-size="12">
      <text x="50.5" y="15">any</text>
    </g>
  </svg>  
    `;
    res.set('Content-Type', 'image/svg+xml');
    return res.send(svgString);
  }
};

function isValidURL(url) {
  // Regular expression to match URL pattern
  const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return pattern.test(url);
}
