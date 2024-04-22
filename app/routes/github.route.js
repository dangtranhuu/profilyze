const controller = require("../controllers/github.controller");

module.exports = function (app, axios) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/github/streak", controller.streak);  //api/github/streak?user=theanishtar
  app.get("/api/github/range", controller.range);  //api/github/streak?user=theanishtar
  app.get("/api/github/profile", controller.profile); //api/github/profile?user=theanishtar
};
