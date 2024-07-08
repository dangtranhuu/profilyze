const controller = require("../controllers/technical.controller");

module.exports = function (app, axios) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/technical/all", controller.getAll);
  app.get("/api/technical/find", controller.getByName);
  app.get("/api/technical/names", controller.getAllName);
  app.post("/api/technical/add", controller.addAll);
};
