const rp = require('request-promise')

const api = {
    _baseUrl() {
        with (this) {
            console.log(this)
            return `${protocol}://${host}:${port}/api`
        }
    },

    _call(method, path, body) {
        return rp({
            method,
            uri: `${this._baseUrl()}/${path}`,
            body,
            json: true
        })
    },

    list() {
        return this._call('get', 'users')
    },

    register(name, surname, username, password, city, borrough, email) {
        return this._call('post', 'register', { name, surname, username, password, city, borrough, email })
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

    services(){
        return this._call('get', 'services')
    }
}

module.exports = api