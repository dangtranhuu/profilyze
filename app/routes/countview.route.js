const controller = require("../controllers/countview.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get('/count/ip', (req, res) => controller.count(req, res));
  app.get('/count/none-ip', (req, res) => controller.countNoneIP(req, res));
};


