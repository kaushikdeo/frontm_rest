const {Schema} = require('mongoose');

const FoodSchema = new Schema({
    itemName: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    foodType: {
        type: String,
        required: true,
    },
    cusineType: {
        type: String,
        required: true,
    },
    inventory: {
        type: Number,
        required: true,
    },
});

module.exports = ('Food', FoodSchema);