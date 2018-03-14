const mongoose = require('mongoose')

const User = mongoose.model('users', {
    _id: String,
    name: String,
    surname: String,
    username: String,
    password: String,
    services: Array,
    city: Array,
    borrough: String,
    email: String,
    comments: Array,
    walt: Number,
    value: Number
})

module.exports = User