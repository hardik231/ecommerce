const mongoose = require('mongoose')

 
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  categoryNumber : {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  unitsInStock: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  }
})

module.exports = mongoose.model("product", productSchema)