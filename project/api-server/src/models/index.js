const mongoose = require('mongoose')
const { Schema, Schema: { ObjectId } } = mongoose

const Review = new Schema({
    contract: {
        type: ObjectId,
        ref: 'Contract',
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    valuation: {
        type: Number,
        required: true
    }
})

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
        required: true
    }],
    city: {
        type: String,
        required: true
    },
    borough: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    wallet: {
        type: Number,
        default: 0
    },
    valuation: {
        type: Number,
        default: 0
    },
    reviews: [Review]
})

const Contract = new Schema({
    service: {
        type: ObjectId,
        ref: 'Service',
        required: true
    },
    server: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    client: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
        enum: ['pending', 'accepted', 'rejected', 'done', 'validated', 'cancelled']
    },
    estimatedTime: {
        type: Number,
        required: true,
        default: 0
    },
    investedTime: {
        type: Number,
        required: true,
        default: 0
    },
    validatedTime: {
        type: Number,
        required: true,
        default: 0
    }
})

const Service = new Schema({
    title: {
        type: String,
        required: true
    }
})

module.exports = {
    User: mongoose.model('User', User),
    Contract: mongoose.model('Contract', Contract),
    Service: mongoose.model('Service', Service),
    Review: mongoose.model('Review', Review)
}