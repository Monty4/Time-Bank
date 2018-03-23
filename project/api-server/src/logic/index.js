const { User, Service, Contract, Review } = require('../models')
// const mongoose = require('mongoose')

function validateStringProp(prop, value) {
    if (typeof value === 'undefined' || !value.trim().length) throw Error(`${prop} cannot be undefined or empty`)
}

function validateStringProps(obj) {
    for (const prop in obj) {
        const value = obj[prop]

        validateStringProp(prop, value)
    }
}

function validateStringArrayProp(prop, arr) {
    if (typeof arr === 'undefined' || !arr.length) throw Error(`${prop} cannot be undefined or empty`)

    for (let i = 0; i < arr.length; i++)
        validateStringProp(`${prop}[${i}]`, arr[i])
}

const logic = {
    // New User
    registerUser(name, surname, username, password, city, borough, email, serviceIds) {
        return Promise.resolve()
            .then(() => {
                validateStringProps({ name, surname, username, password, city, borough, email })
                validateStringArrayProp('serviceIds', serviceIds)

                return User.findOne({ username })
            })
            .then(user => {
                if (user) throw Error('username already exists')

                return Service.find({ _id: { $in: serviceIds } })
            })
            .then(_services => {
                if (!_services || _services.length !== serviceIds.length)
                    throw Error(`service ids are not valid ${serviceIds}`)

                const services = []

                for (service of _services)
                    services.push(service._id)

                const user = new User({ name, surname, username, password, city, borough, email, services })

                return user.save()
            })
            .then(user => user._id.toString())
    },

    // List Filtered Users by Service, city and Borough
    listUsers(service, city, borough) {
        let filter = {}
       
        if (service) filter.services = service
        if (city) filter.city = { $regex: new RegExp(city, 'i') }
        if (borough) filter.borough = { $regex: new RegExp(borough, 'i') }
        return User.find(filter).then(result=>{
            return result
        })
    },

    // Update User by ID
    updateUser(_id, name, surname, username, newUsername, password, newPassword, city, borough, email) {
        console.log(_id)
        return Promise.resolve()
            .then(() => {

                validateStringProps({ _id, name, surname, username, password, city, borough, email })
                // validateStringArrayProp('serviceIds', serviceIds)

                return User.findOne({ username: newUsername })
            })
            .then(user => {
                console.log('user exists -> ', user)
                if (user) throw Error('username already exists')

                return User.findOne({ _id })
            })
            .then(user => {a
                console.log('user to modify -> ',user)
                if (!user) throw Error('user does not exists')

                if (user.username !== username || user.password !== password) throw Error('username and/or password wrong')

                //return User.updateOne({ id }, { $set: { name, surname, email, username: newUsername, password: newPassword } }) // NOTE $set also works here, but it can be simplified as following statement
                return User.updateOne({ _id }, { name, surname, email, username: newUsername, password: newPassword })
            })
    },

    // Retrieve User by ID
    retrieveUser(_id) {
        return Promise.resolve()
            .then(() => {
                validateStringProps({ _id })

                //return User.findOne({ id }, 'id name surname email username') // WARN! it returns _id too!
                return User.findOne({ _id }, { _id: 0, password: 0 })
            })
            .then(user => {
                if (!user) throw Error('user does not exist')

                return user
            })
    },

    removeUser(id, username, password) {
        // TODO
    },

    // List Services Array
    listServices() {
        return Service.find()
    },








    // New Contract
    registerContract(service, server, client) {
        return Promise.resolve()
            .then(_contract => {

                const contract = new Contract({ service, server, client })

                return contract.save()
            })
            
    },




    

    listContractsServed(serverId) {
        // TODO
    },

    listContractsRequested(clientId) {
        // TODO
    },

    makeContract(serviceId, serverId, clientId) {
        // TODO
    },

    acceptContract(contractId, serverId, estimatedTime) {
        // TODO
    },

    rejectContract(contractId, serverId) {
        // TODO
    },

    markContractDone(contractId, serverId, dedicatedTime) {
        // TODO
    },

    validateContract(contractId, clientId, validatedTime) {
        // TODO
    },

    cancelContract(contractId, clientId) {
        // TODO
    },

    addUserReview(contractId, userId, comment, valuation) {
        // TODO
    },

    listUserReviews(userId) {
        // TODO
    }
}

module.exports = logic