const mongoose = require('mongoose');

const countViewSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId, // Đảm bảo sử dụng một giá trị mặc định
  },
  ip: {
    type: String
  },
  view_count: {
    type: Number
  },
  type: {
    type: Array
  },
  url: {
    type: String
  }
});


const CountView = mongoose.model('countView', countViewSchema);

module.exports = CountView;