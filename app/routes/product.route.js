const controller = require("../controllers/product.controller");

module.exports = function (app, axios) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/auth/dangth", controller.dangth);
  app.get("/api/v1/products", controller.getAllProducts);
  app.post("/api/v1/products", controller.saveProduct);
  app.get("/api/v1/product", controller.getProductById);
};