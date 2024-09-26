const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser');
const http = require('http'); // Import module http
const Redis = require("ioredis");
const db = require("./app/models");
const config = require('./app/config/index');
var dotent = require('dotenv');
var getIP = require('ipware')().get_ip;
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app); // Tạo server từ express app

// Cấu hình view engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));


dotent.config();
app.use(cors());
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true); // Enable proxy trust

//---------- CONFIG SERVER  ---------------------
// set port, listen for requests
const PORT = process.env.PORT || 5152;
const redisPassword = process.env.REDIS_PASSWORD;
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisURI = `redis://:${redisPassword}@${redisHost}:${redisPort}`;
const mongodbURI = process.env.MONGODB_URI;
/*----------------------------------------------*/
/**--------------------- DB CONNECTIONS -------------------------*/
// Kiểm tra giá trị của các biến môi trường
console.log('REDIS_PASSWORD:', redisPassword);
console.log('REDIS_HOST:', redisHost);
console.log('REDIS_PORT:', redisPort);
console.log('MONGODB_URI:', mongodbURI);


const connectionStatus = {
  redis: false,
  mongoDB: false
}
// const redis = new Redis(redisURI); // Khởi tạo một đối tượng Redis
// Kiểm tra trạng thái kết nối
// redis.on("connect", function () {
//   connectionStatus.redis = true;
//   console.log("Connected to Redis successfully!");
// });
// Xử lý lỗi kết nối
// redis.on("error", function (error) {
//   console.error("Redis connection error:", error);
// });
db.mongoose
  .connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    connectionStatus.mongoDB = true;
    console.log("Successfully connect to MongoDB." + mongodbURI);
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

/*-------------------------- ROUTES ------------------- */
app.get('/', (req, res) => {
  res.json({
    live: "Hello server is live",
    connection: connectionStatus
  });
});


require("./app/routes/product.route")(app);
require("./app/routes/order.route")(app);

//Thay vì sử dụng app.listen, sử dụng server.listen để sử dụng cùng một cổng cho cả express app và Socket.IO:
server.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}.`);
});
