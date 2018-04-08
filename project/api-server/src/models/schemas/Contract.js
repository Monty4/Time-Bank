const mongoose = require('mongoose')
const { Schema, Schema: { ObjectId } } = mongoose

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