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

    register(name, surname, username, password, services, city, borough, email) {
        return this._call('post', 'register', { name, surname, username, password, services, city, borough, email })
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
    }
}

module.exports = api