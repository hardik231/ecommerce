const State = require('../models/state.model')
const Country = require('./country.controller')

exports.createState = (req, res) => {
    const newState = new State({
        name: req.body.name
    })

    newState.save((err, state) => {
        if(!state) 
            res.status(400).json('could not create state')
        else
            res.status(200).send(state)
    })
}

exports.getState = (req, res) => {
    if(req.params.countryName == 'India') {
        State.find({}, (err, states) => {
            if(!states) {
                res.json('could not find any states')
            } 
            else {
                res.send(states)
            }
        })
    }
}