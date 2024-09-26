const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

const db = {};

db.mongoose = mongoose;

module.exports = db;