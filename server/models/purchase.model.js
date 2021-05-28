const mongoose = require('mongoose')

const purchaseSchema = mongoose.Schema({    
    
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },


    shippingAddressStreet: {
        type: String,
        required: true
    },
    shippingAddressCity: {
        type: String,
        required: true
    },
    shippingAddressState: {
        type: String,
        required: true
    },
    shippingAddressCountry: {
        type: String,
        required: true
    },
    shippingAddressZipCode: {
        type: Number,
        required: true
    },

    billingAddressStreet: {
        type: String,
        required: true
    },
    billingAddressCity: {
        type: String,
        required: true
    },
    billingAddressState: {
        type: String,
        required: true
    },
    billingAddressCountry: {
        type: String,
        required: true
        
    },
    billingAddressZipCode: {
        type: Number,
        required: true
    },



    orderItems: [Object],

    creditCardType: {
        type: String,
        required: true
    },
    creditCardNameOnCard: {
        type: String,
        required: true
    },
    creditCardNumber: {
        type: Number,
        required: true
    },
    creditCardSecurityCode: {
        type: Number,
        required: true
    },


    totalQuantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
})


module.exports =  mongoose.model('purchase', purchaseSchema)