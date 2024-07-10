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

    const doc = new Background({
      data: 'data:image/webp;base64,',   //GUEST
      description: "itachi",
      name: "itachi",
      author: "Theanishtar"
    });


    const saveDoc = await doc.save();

    return res.json(saveDoc);
  } catch (err) {
    return res.json(err)
  }
};

exports.deleteByName = async (req, res) => {
  try {
    const name = req.query['name'];
    const bg = await Background.deleteOne({ name: name });

    if (bg.deletedCount === 0) {
      return res.status(404).json({ message: 'Model not found' });
    }

    return res.json({ message: 'Model deleted successfully', bg });
  } catch (err) {
    return res.json(err)
  }
};