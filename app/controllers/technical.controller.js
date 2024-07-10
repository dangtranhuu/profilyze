const Technical = require("../models/techical.model");


exports.getAll = async (req, res) => {
  try {
    const techs = await Technical.find();

    return res.json(techs);
  } catch (err) {
    return res.json(err)
  }
};

exports.getByName = async (req, res) => {
  try {
    const name = req.query['name'];
    const techs = await Technical.find({ name: name });

    return res.json(techs[0]);
  } catch (err) {
    return res.json(err)
  }
};

exports.getAllName = async (req, res) => {
  try {
    let result = [];
    const techs = await Technical.find();

    techs.forEach((e) => {
      result.push(e.name)
    })
    return res.json(result);
  } catch (err) {
    return res.json(err)
  }
};

exports.addAll = async (req, res) => {
  try {
    const doc = new Technical({
      data: 'data:image/webp;base64,',  //GUEST
      description: "Sharingan giphy logo",
      name: "sharingan",
      author: "Theanishtar"
    });


    const saveDoc = await doc.save();

    return res.json(saveDoc);
  } catch (err) {
    return res.json(err)
  }
};