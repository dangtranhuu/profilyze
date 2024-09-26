const Product = require("../models/product.model");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.query.id;
    const products = await Product.findById(productId);

    return res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
};

exports.saveProduct = async (req, res) => {
  try {
    // Lấy dữ liệu từ client gửi lên
    const productData = req.body;
    const key = req.body.sku;
    console.log(productData)
    const products = await Product.find({ key });
    if (products.length != 0)
      return res.status(201).json({
        badwords: badwords,
        status: 0,
        action: "Failed",
        message: "Đã tồn tại sản phẩm",
      });

    // Tạo một sản phẩm mới từ dữ liệu client
    const newProduct = new Product(productData);

    // Lưu sản phẩm vào MongoDB
    await newProduct.save();

    return res.json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
};
