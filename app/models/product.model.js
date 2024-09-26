const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId, // Đảm bảo sử dụng một giá trị mặc định
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String
  },
  description: {
    type: String
  },
  // Danh mục
  category: {
    type: String
  },
  //Số lượng tồn kho
  stock: {
    type: Number, required: true
  },
  status: {
    type: String,
    enum: ['available', 'out of stock', 'discontinued'],
    default: 'available'
  },
  imageUrls: [
    {
      type: String
    }
  ],
  // mã SP hoặc serri model
  sku: {
    type: String,
  },
  // Đánh giá sản phẩm
  ratings: {
    type: Number,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  // bán chạy
  isFeatured: {
    type: Boolean,
    default: false
  },
  // giảm giá
  discount: {
    type: Number,
    default: 0
  },
  attributes: [
    {
      key: {
        type: String
      },
      value: {
        type: String
      }
    }
  ]
});


const Product = mongoose.model('product', productSchema);

module.exports = Product;