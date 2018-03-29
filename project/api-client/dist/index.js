'use strict';

var rp = require('request-promise');

var api = {
    _baseUrl: function _baseUrl() {

        return this.protocol + '://' + this.host + ':' + this.port + '/api';
    },
    _call: function _call(method, path, body, qs) {
        return rp({
            method: method,
            uri: this._baseUrl() + '/' + path,
            body: body,
            qs: qs,
            json: true
        });
    },
    list: function list(service, city, borough) {
        return this._call('get', 'users', undefined, { service: service, city: city, borough: borough });
    },
    register: function register(name, surname, username, password, services, city, borough, email) {
        return this._call('post', 'register', { name: name, surname: surname, username: username, password: password, services: services, city: city, borough: borough, email: email });
    },
    remove: function remove(id, username, password) {
        return this._call('delete', 'user/' + id, { username: username, password: password });
    },
    retrieve: function retrieve(id) {
        return this._call('get', 'user/' + id);
    },
    update: function update(id, name, surname, email, newUsername, newPassword, username, password) {
        return this._call('put', 'user/' + id, { name: name, surname: surname, email: email, newUsername: newUsername, newPassword: newPassword, username: username, password: password });
    },
    services: function services() {
        return this._call('get', 'services');
    },
    service: function service(id) {
        return this._call('get', 'service/' + id);
    },
    retrievecontractsServed: function retrievecontractsServed(id) {
        return this._call('get', 'servedcontracts/' + id);
    },
    retrievecontractsRequested: function retrievecontractsRequested(id) {
        return this._call('get', 'requestedcontracts/' + id);
    },
    registercontract: function registercontract(service, server, client, status, estimatedTime, investedTime, validatedTime) {
        return this._call('post', 'registercontract', { service: service, server: server, client: client, status: status, estimatedTime: estimatedTime, investedTime: investedTime, validatedTime: validatedTime });
    },
    acceptContract: function acceptContract(_id, status) {
        return this._call('put', 'acceptcontract', { _id: _id, status: status });
    },
    cancelContract: function cancelContract(_id, status) {
        return this._call('put', 'acceptcontract', { _id: _id, status: status });
    },
    validatecontract: function validatecontract(_id, status, estimatedTime) {
        return this._call('put', 'validatecontract', { _id: _id, status: status, estimatedTime: estimatedTime });
    },
    donecontract: function donecontract(_id, status, investedTime) {
        return this._call('put', 'donecontract', { _id: _id, status: status, investedTime: investedTime });
    },
    registerreview: function registerreview(contract, user, comment, valuation) {
        // console.log('dddd',_id, server, review, valuation)
        return this._call('post', 'registerreview', { contract: contract, user: user, comment: comment, valuation: valuation });
    },
    listUserReviews: function listUserReviews(user) {

        return this._call('get', 'listuserreview/' + user);
    }
};

module.exports = api;
