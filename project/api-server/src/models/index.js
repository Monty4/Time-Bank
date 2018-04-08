const mongoose = require('mongoose')

const { User, Contract, Service, Review} = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Contract: mongoose.model('Contract', Contract),
    Service: mongoose.model('Service', Service),
    Review: mongoose.model('Review', Review)
}
