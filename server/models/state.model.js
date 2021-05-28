const mongoose = require('mongoose')

const stateSchema = mongoose.Schema({
    name: String
})

module.exports = mongoose.model('state', stateSchema)