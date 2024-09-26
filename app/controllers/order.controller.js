const Order = require("../models/order.model");
const Product = require("../models/product.model");

exports.orderProduct = async (req, res) => {
  try {
    const orderData = req.body;

    // Giả sử bạn lấy danh sách orderItems từ request
    const orderItems = orderData.orderItems;

    // Khởi tạo totalAmount là 0
    let totalAmount = 0;

    // Duyệt qua từng sản phẩm trong orderItems để tính tổng số tiền
    for (const item of orderItems) {
      console.log(item.productId)
      const product = await Product.findById(item.productId); // Tìm sản phẩm theo ID
      if (!product) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      }
      // Cộng dồn giá trị vào totalAmount
      totalAmount += product.price * item.quantity;
    }

    // Gán totalAmount vào orderData
    orderData.totalAmount = totalAmount;

    // Tạo đơn hàng mới với thông tin đã có
    const newOrder = new Order(orderData);

    // Lưu đơn hàng vào MongoDB
    await newOrder.save();

    // Phản hồi lại client
    res.status(201).json({ message: 'Đơn hàng đã được tạo thành công!', order: newOrder });
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
};
