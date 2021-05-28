const Country = require('../models/country.model')

exports.createCountries = (req, res) => {

    const contries = req.body
    Country.insertMany(contries, (doc) => {
        if(!doc) 
            res.status(400).json('could not create contries')
        else
            res.status(200).send(doc)
    })
}

exports.getCountries = (req, res) => {
    Country.find({}, (err, countries) => {
        if(!countries) {
            res.status(400).json('could not find countries')
        }
        else {
            res.status(200).send(countries)
        }
    })
}