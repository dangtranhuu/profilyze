const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId, // Đảm bảo sử dụng một giá trị mặc định
  },
  ip: {
    type: String,
    default: "0000"
  },
  referer: {
    type: String
  }
});


const Action = mongoose.model('action', actionSchema);

module.exports = Action;