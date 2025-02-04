const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },
    Password: String,
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Age: Number
})

module.exports = mongoose.model('User', userSchema)