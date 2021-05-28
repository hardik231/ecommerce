const mongoose = require('mongoose')

const countrySchema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name:  {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('country', countrySchema)