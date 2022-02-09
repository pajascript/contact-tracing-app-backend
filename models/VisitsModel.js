const mongoose = require('mongoose');

const visitsSchema = new mongoose.Schema({

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
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    dateOfVisit: {
        type: String,
        required: true
    },
    timeOfVisit: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('visits', visitsSchema);