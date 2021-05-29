const express = require('express')
const app = express()
const cors = require('cors')
require('./db/connect')

const productRouter = require('./routers/product.router')
const productCategoryRouter = require('./routers/product-category.router')
const countryRouter = require('./routers/country.router')
const stateRouter = require('./routers/states.router')
const purchase = require('./routers/purchase.router')

const port = 3000 | process.env.PORT

app.use(express.static("public"));
app.use('/uploads', express.static('./uploads'));
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api/v1/products', productRouter)
app.use('/api/v1/categories', productCategoryRouter)
app.use('/api/v1/states', stateRouter)
app.use('/api/v1/countries', countryRouter)
app.use('/api/v1/checkout/purchase', purchase)

app.listen(port, () => console.log("server started on port "+port))