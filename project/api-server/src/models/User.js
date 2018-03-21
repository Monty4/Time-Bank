const mongoose = require('mongoose')

const User = mongoose.model('users', {
    name: String,
    surname: String,
    username: String,
    password: String,
    services: Array,
    city: String,
    borrough: String,
    email: String,
    comments: Array,
    walt: Number,
    value: Number
})

module.exports = User

// const mongoose = require('mongoose')
// const { Schema, Schema: { ObjectId } } = mongoose

// const User = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     surname: String,
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: String,
//     services: Array,
//     city: String,
//     borrough: String,
//     email: String,
//     comments: Array,
//     walt: Number,
//     value: Number
// })

// const Contract = new Schema({
//     service: {
//         type: ObjectId,
//         ref: 'Service',
//         required: true
//     },
//     server: {
//         type: ObjectId,
//         ref: 'User',
//         required: true
//     },
//     client: {
//         type: ObjectId,
//         ref: 'User',
//         required: true
//     },
//     status: {
//         type: String,
//         required: true,
//         default: 'pending',
//         enum: ['pending', 'accepted', 'rejected', 'done', 'validated', 'cancelled']
//     }
// })

// const Service = new Schema({
//     title: {
//         type: String,
//         required: true
//     }
// })

// module.exports = {
//     User: mongoose.model('User', User),
//     Contract: mongoose.model('Contract', Contract),
//     Service: mongoose.model('Service', Service)
// }