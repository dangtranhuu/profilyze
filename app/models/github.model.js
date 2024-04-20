const mongoose = require('mongoose');

const githubSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId, // Đảm bảo sử dụng một giá trị mặc định
  },
  ip: {
    type: String
  },
  username: {
    type: String
  },
  access_ip: {
    type: Array
  }
});


const Github = mongoose.model('github', githubSchema);

module.exports = Github;