const controller = require("../controllers/profile.controller");

module.exports = function (app, axios) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/profile/banner", controller.banner); //api/github/contributes?user=theanishtar
};
