const mongoose = require('mongoose');

const backgroundSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId, // Đảm bảo sử dụng một giá trị mặc định
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  author: {
    type: String
  },
  data: {
    type: String
  },
});


const Background = mongoose.model('background', backgroundSchema);

module.exports = Background;