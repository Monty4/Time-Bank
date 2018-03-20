const mongoose = require('mongoose')

const User = mongoose.model('users', {
    name: String,
    surname: String,
    username: String,
    password: String,
    services: Array,
    city: String,
    borrough: String,
    email: String,
    comments: Array,
    walt: Number,
    value: Number
})

module.exports = User