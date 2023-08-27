const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'product name must be provided']
    },
    price:{
        type:Number,
        required:[true,'product price must be provided']
    },
    featured:{
        type:Boolean,
        default: false
    },
    rating:{
        type:Number,
        default: 4.5,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','caressa','marcos'], // limits the possible options to the company to the website
            message: '{VALUE} is not supported', 
        }

        
    },
    imageUrl:{
        type:String,
        default:""
    },

})
module.exports = mongoose.model('Product',productSchema)