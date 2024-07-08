const controller = require("../controllers/background.controller");

module.exports = function (app, axios) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/background/all", controller.getAll);
  app.get("/api/background/find", controller.getByName);
  app.get("/api/background/names", controller.getAllName);
  app.post("/api/background/add", controller.addAll);
};
