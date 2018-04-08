const mongoose = require('mongoose')
const { Schema, Schema: { ObjectId } } = mongoose

module.exports = new Schema({
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