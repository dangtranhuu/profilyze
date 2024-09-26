const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId, // Đảm bảo sử dụng một giá trị mặc định
  },
  // thông tin khách hàng
  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  orderItems: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',  // Tham chiếu đến model Product
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1  // Đảm bảo số lượng đặt hàng ít nhất là 1
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'cash_on_delivery', 'bank_transfer'], // Phương thức thanh toán
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


const Order = mongoose.model('order', orderSchema);

module.exports = Order;