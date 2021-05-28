const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryNumber: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model("category", categorySchema)