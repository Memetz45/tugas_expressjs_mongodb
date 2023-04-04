const mongoose = require ('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'field nama harus ada'],
        minlength: 3,
        maxlength: 50
    },
    price:{
        type: Number,
        required: true,
        min: 100000,
        max: 100000000
    },
    stock:{
        type: Number
    },
    status:{
        type: Boolean,
        default: true
    },
    image_url:{
        type: String
    }
});

const product = mongoose.model('product', productSchema);
module.exports = product;