const Category = require('../models/product-category.model')
const Product = require('../models/product.model')

exports.getCategory = (req, res) => {

    const categoryId = req.params.categoryId

    Category.findOne({_id: categoryId}, (err, category) => {
        if(category)
            res.status(200).send(category)
        else
            res.status(400).send('could not get categories')
    })

}


exports.getCategories = (req, res) => {


    Category.find({}, (err, categories) => {
        if(categories)
            res.status(200).send(categories)
        else
            res.status(400).json('no products available')
    })
}


exports.createCategories = (req, res) => {

    Category.insertMany(req.body._categories).then( doc => {
        if(doc)
            res.status(200).send(doc)
        else
            res.status(400).send('could not insert categories')

    })
}


exports.deleteCategories = (req, res) => {

    Category.deleteMany({}, err => {
        if(err)
            res.status(400).json('error occured while deleting..')
        else
            res.status(200).json('deleted successfully..')
    })
}

exports.deleteCategory = (req, res) => {
    const categoryId = req.params.categoryId
    Category.deleteOne({_id: categoryId}, (err) => {
        if(err)
            res.json('could not delete')
        else
            res.json('deleted successfully')
    })
}