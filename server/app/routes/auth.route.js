const controller = require("../controllers/auth.controller");

module.exports = function (app, axios) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/auth/dangth", controller.dangth);
  app.get("/api/auth/profile", controller.renderHTML);
};
