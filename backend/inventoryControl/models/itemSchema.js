const mongoose = require('mongoose');

// Database schema definition for Item table
const itemSchema = new mongoose.Schema({
    itemID: { // Item ID uses for uniquely identifying a particular item
        type: String,
        required: true,
        unique: true, // Ensures uniqueness of Item ID
    },
    itemName: {
        type: String,
        required: true
    },
    itemBrand: {
        type: String,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    stockCount: {
        type: Number,
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    warranty: {
        type: String
    },
    imgURL: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Items = mongoose.model('Items', itemSchema);

module.exports = Items;