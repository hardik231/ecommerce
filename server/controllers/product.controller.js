const Product = require('../models/product.model')
const Category = require('../models/product-category.model')

exports.createProduct = (req, res) => {

    const newProduct = new Product({
        name: req.body.name,
        category: req.body.category,
        categoryNumber: req.body.categoryNumber,
        price: req.body.price,
        description: req.body.description,
        unitsInStock: req.body.unitsInStock,
        imageUrl: req.file.imageUrl        
    })

    newProduct.save((err, product) => {
        if(product) 
            res.status(200).send(product)
        else
            res.status(400).json('could not create product '+err)        
    })
}

exports.createProducts = (req, res) => {
    Product.insertMany(req.body._products).then(
        products => {
            if(products)
                res.json(products)
            else
                res.json("could not insert products")
        })
}



exports.getProduct = (req, res) => {


    Product.findById(req.params.productId, (err, product) => {
        if(!product)
            res.json("product is not available")
        else
            res.send(product)
    })
}


exports.getProducts = (req, res) => {

    // pageSize = req.query.pageSize
    // pageNumber = req.query.pageNumber
    // productsQuery = Product.find({})

    // if(pageSize && pageNumber) {
    //     productsQuery.skip(pageSize * (pageNumber-1))
    //     .limit(pageSize)
    // }

    Product.find({}).sort({dateCreated:-1}).then((products) => {
            if(products) {
                   res.send(products)
            }
        })
}


exports.getProductsByKeyword = (req, res) => {
    const regex = new RegExp(req.params.keyword, 'i')

    Product.find({name: regex}).sort({dateCreated:-1}).then(
        products => {
            if(products)
                res.send(products)
        })
}

exports.getProductsByCategory = (req, res) => {
    const categoryId = req.params.categoryId

    Category.findOne({_id: categoryId}).sort({dateCreated:-1}).then(

        category => {

                Product.find({categoryNumber: category.categoryNumber}).then(
                    products => {
                        if(products) 
                            res.send(products)
                    }
                )
        }
)}


exports.updateProducts = (req, res) => {
    const update = {name: req.body.name, description: req.body.description, imageUrl: req.body.imageUrl, unitsInStock: req.body.unitsInStock, price: req.body.price}
    Product.updateMany(update, (err, products) => {
        if(products)
            res.send(products)
    })
}


exports.partialUpdate = (req, res) => {
    const productId = req.params.productId

    const update = {name: req.body.name, description: req.body.description}
    Product.findByIdAndUpdate(productId, update, (err, product) => {
            if(product) 
                res.send(product)
        }
    )
}


exports.deleteProduct = (req, res) => {
    
    const productId = req.params.productId

    Product.findByIdAndDelete(productId, (err, product) => {
        if(!product)
            res.json('did not find a product with following id')
        else
            res.json('product deleted successfully')
    })
}

exports.deleteProducts = (req, res) => {

    Product.deleteMany({}, err => {
        if(err) 
            res.status(400).json('could not delete products')
        else
            res.status(200).json('products deleted successfully')
    })
}
