const list = require('./list')
const retrieve = require('./retrieve')
const services = require('./services')
const register = require('./register')
const update = require('./update')
const registercontract = require('./registercontract')
const retrieveservedcontracts = require('./retrieveservedcontracts')
const retrieverequestedcontracts = require('./retrieverequestedcontracts')
const acceptContract = require('./acceptContract')
const validatecontract = require('./validatecontract')
const donecontract = require('./donecontract')
const registerreview = require('./registerreview')
const retrievereview = require('./retrievereview')
const listuserreviews = require('./listuserreviews')
const service = require('./service')

module.exports = {
    list,
    retrieve,
    register,
    services,
    update,
    registercontract,
    retrieveservedcontracts,
    retrieverequestedcontracts,
    acceptContract,
    validatecontract,
    donecontract,
    registerreview,
    retrievereview,
    service,
    listuserreviews
}