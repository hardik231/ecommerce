const Purchase = require('../models/purchase.model')

exports.createPurchase = (req, res) => {
    
    const newPurchase = new Purchase({
        
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        
        shippingAddressStreet: req.body.shippingAddressStreet,
        shippingAddressCity: req.body.shippingAddressCity,
        shippingAddressState: req.body.shippingAddressState,
        shippingAddressZipCode: req.body.shippingAddressZipCode,
    
        billingAddressStreet: req.body.billingAddressStreet,
        billingAddressCity: req.body.billingAddressCity,
        billingAddressState: req.body.billingAddressState,
        billingAddressZipCode: req.body.billingAddressZipCode,

        orderItems: req.body.orderItems,

        creditCardType: req.body.creditCardType,
        creditCardNameOnCard: req.body.creditCardNameOnCard,
        creditCardNumber: req.body.creditCardNumber,
        creditCardSecurityCode: req.body.creditCardSecurityCode,

        totalQuantity: req.body.totalQuantity,
        totalPrice: req.body.totalPrice
        
    })

    newPurchase.save((err, purchase) => {
            if(purchase)
                res.send(purchase._id)
    });
}

exports.getPurchase = (req, res) => {
    Purchase.find({}, (err, purchase) => {
            res.send(purchase)
    })
}


exports.deletePurchase = (req, res) => {
    Purchase.deleteMany({}, err => {
        if(err)
            res.send(err)
        else
            res.json('deleted successfully')
    })
}

