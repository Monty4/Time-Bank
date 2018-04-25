const mongoose = require('mongoose')
const { Schema, Schema: { ObjectId } } = mongoose

const Review = require('./Review')

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    services: [{
        type: ObjectId,
        ref: 'Service',
        // required: true
    }],
    city: {
        type: String,
        // required: true
    },
    borough: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    wallet: {
        type: Number,
        default: 0
    },
    valuation: {
        type: Number,
        default: 0
    },
    review: [Review]
})