const express = require('express')
const app = express()
const cors = require('cors')
require('./db/connect')

const productRouter = require('./routers/product.router')
const productCategoryRouter = require('./routers/product-category.router')
const stateRouter = require('./routers/states.router')
const purchase = require('./routers/purchase.router')

const PORT = 3000 | process.env.PORT

app.use(express.static("public"));
app.use('/uploads', express.static('./uploads'));
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/products', productRouter)
//app.use('/categories', productCategoryRouter)
//app.use('/states', stateRouter)
app.use('/checkout/purchase', purchase)

app.listen(PORT, () => console.log("server started on port "+PORT))