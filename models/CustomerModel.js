const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        min: 6
    },
    address: {
        type: String,
        required: true,
        min: 6
    },
    phonenumber: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        min: 6
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    confirmPassword: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    }
});

module.exports = mongoose.model('Customer', customerSchema);