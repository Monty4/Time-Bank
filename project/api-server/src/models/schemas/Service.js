const mongoose = require('mongoose')
const { Schema, Schema: { ObjectId } } = mongoose

const Service = new Schema({
    title: {
        type: String,
        required: true
    }
})