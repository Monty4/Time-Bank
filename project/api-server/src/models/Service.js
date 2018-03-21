const mongoose = require('mongoose')

const Service = mongoose.model('services', {
    title: String
})

module.exports = Service
