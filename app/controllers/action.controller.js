const Action = require("../models/action.model");

exports.linkto = async (req, res) => {
  try {
    const referer = req.headers.referer; // Lấy giá trị của Referer từ header
    console.log('Referer:', referer);

    const doc = new Action({
      referer: referer || "none",  
    });


    const saveDoc = await doc.save();

    return res.json(saveDoc);
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
};
