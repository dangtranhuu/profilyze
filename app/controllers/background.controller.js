const Background = require("../models/background.model");

exports.getAll = async (req, res) => {
  try {
    const techs = await Background.find();

    return res.json(techs);
  } catch (err) {
    return res.json(err)
  }
};

exports.getByName = async (req, res) => {
  try {
    const name = req.query['name'];
    const techs = await Background.find({ name: name });

    return res.json(techs[0]);
  } catch (err) {
    return res.json(err)
  }
};

exports.getAllName = async (req, res) => {
  try {
    let result = [];
    const techs = await Background.find();

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

    const backgroundData = data();
    const doc = new Background({
      data: backgroundData[9],  //GUEST
      description: "sunset Fishing profile",
      name: "sunsetFishing",
      author: "Theanishtar"
    });


    const saveDoc = await doc.save();

    return res.json(saveDoc);
  } catch (err) {
    return res.json(err)
  }
};