const User = require('../models/User')
const Service = require('../models/Service')
const validate = require('./validate')
const uuid = require('uuid/v4')


const logic = {
    register(name, surname, username, password, city, borrough, email) {
        return Promise.resolve()
        .then(() => {
            validate({ name, surname, username, password, city, borrough, email })

            return User.findOne({ username })
        })
        .then(user => {
            if (user) throw Error('username already exists')

            const id = uuid()

            return User.create({ id, name, surname, username, password, city, borrough, email })
                .then(() => id)
        })
    },

    list() {
        return User.find({})
    },

    update(id, name, surname, email, username, password, newUsername, newPassword) {
        return Promise.resolve()
        .then(() => {
            validate({ id, name, surname, email, username, password, newUsername, newPassword })

            return User.findOne({ username: newUsername })
        })
        .then(user => {
            if (user) throw Error('username already exists')

            return User.findOne({ id })
        })
        .then(user => {
            if (!user) throw Error('user does not exists')

            if (user.username !== username || user.password !== password) throw Error('username and/or password wrong')

            //return User.updateOne({ id }, { $set: { name, surname, email, username: newUsername, password: newPassword } }) // NOTE $set also works here, but it can be simplified as following statement
            return User.updateOne({ id }, { name, surname, email, username: newUsername, password: newPassword })
        })
    },

    retrieve(_id) {
        return Promise.resolve()
        .then(() => {
            validate({ _id })

            //return User.findOne({ id }, 'id name surname email username') // WARN! it returns _id too!
            return User.findOne({_id }, { _id: 0, password: 0 })
        })
        .then(user => {
            if (!user) throw Error('user does not exist')

            return user
        })
    },

    remove(id, username, password) {
        return Promise.resolve()
        .then(() => {
            validate({ id, username, password })

            return User.findOne({ id })
        })
        .then(user => {
            if (!user) throw Error('user does not exist')

            if (user.username !== username || user.password !== password) throw Error('username and/or password wrong')

            return User.deleteOne({ id })
        })
    },

    services() {
        return Service.find({})
    }
}

module.exports = logic