const rp = require('request-promise')

const api = {
    _baseUrl() {
       
            return `${this.protocol}://${this.host}:${this.port}/api`
    },

    _call(method, path, body, qs) {
        return rp({
            method,
            uri: `${this._baseUrl()}/${path}`,
            body,
            qs,
            json: true
        })
    },

    list(service, city, borough) {
        return this._call('get', 'users', undefined, { service, city, borough })
    },
    // register(name, surname, username, password, services, city, borough, email) {
    //     return this._call('post', 'register', { name, surname, username, password, services, city, borough, email })
    // },

    register(name, surname, username, email, password, services, city, borough) {
        console.log('register=>',{name, surname, username, email, password, services, city, borough})
        return this._call('post', 'register', { name, surname, username, email, password, services, city, borough })
    },

    remove(id, username, password) {
        return this._call('delete', `user/${id}`, { username, password })
    },

    retrieve(id) {
        return this._call('get', `user/${id}`)
    },

    update(id, name, surname, email, newUsername, newPassword, username, password) {
        return this._call('put', `user/${id}`, { name, surname, email, newUsername, newPassword, username, password })
    },

    services() {
        return this._call('get', 'services')
    },

    service(id) {
        return this._call('get', `service/${id}`)
    },

    retrievecontractsServed(id) {
        return this._call('get', `servedcontracts/${id}`)
    },

    retrievecontractsRequested(id) {
        return this._call('get', `requestedcontracts/${id}`)
    },

    registercontract(service, server, client, status, estimatedTime, investedTime, validatedTime) {
        // console.log('contract=>',service, server, client, status, estimatedTime, investedTime, validatedTime)
        return this._call('post', `registercontract`, { service, server, client, status, estimatedTime, investedTime, validatedTime})
    },

    acceptContract(_id, status) {
        return this._call('put', 'acceptcontract', { _id, status })
    },

    cancelContract(_id, status) {
        return this._call('put', 'acceptcontract', { _id, status })
    },

    validatecontract(_id, status, estimatedTime) {
        return this._call('put', 'validatecontract', { _id, status, estimatedTime })
    },

    donecontract(_id, status, investedTime) {
        return this._call('put', 'donecontract', { _id, status, investedTime })
    },

    registerreview( contract, user, comment, valuation) {
        return this._call('post', 'registerreview', {  contract, user, comment, valuation })
    },
    listUserReviews(user){
        return this._call('get', `listuserreview/${user}`)
    }
}

module.exports = api