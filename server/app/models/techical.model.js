const mongoose = require('mongoose');

const technicalSchema = new mongoose.Schema({
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


const Technical = mongoose.model('technical', technicalSchema);

module.exports = Technical;