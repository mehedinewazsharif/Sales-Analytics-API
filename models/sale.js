const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
},
{timestamps:true,versionKey:false}

);

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;

