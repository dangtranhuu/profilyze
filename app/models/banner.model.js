const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId, // Đảm bảo sử dụng một giá trị mặc định
  },
  data: {
    type: String
  },
  description: {
    type: String
  },
  name: {
    type: String
  },
  author: {
    type: String
  }
});


const Banner = mongoose.model('banner', bannerSchema);

module.exports = Banner;