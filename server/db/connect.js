const mongoose = require('mongoose')

//const url = "mongodb://127.0.0.1:27017/fullstack"
const url = "mongodb+srv://hardik-parmar:Comp@231@cluster0.0mw70.mongodb.net/mystore?retryWrites=true&w=majority"

mongoose.connect(url, { useNewUrlParser: true},
    err => {
        if(err)
            console.log("could not connect, following is an error: "+err)
        else
            console.log("connected")
    }
)