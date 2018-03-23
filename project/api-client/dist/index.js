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
    }
};

module.exports = api;
