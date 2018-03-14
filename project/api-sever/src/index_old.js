

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const host = process.env.MONGO_HOST
const port = process.env.MONGO_PORT
const database = process.env.MONGO_DB

// mongoose.connect('mongodb://mario:123@ds211289.mlab.com:11289/timebank')
mongoose.connect(`mongodb://${host}:${port}/${database}`)
    .then(() => {
        const app = express()

        const User = mongoose.model('users', {
            _id: String,
            name: String,
            surname: String,
            username: String,
            password: String,
            services: Array,
            city: Array,
            borrough: String,
            email: String,
            comments: Array,
            walt: Number,
            value: Number
        } )
        app.get('/users', (req, res) => {
            User.find({})
            .then(users => res.json(users))
        })

        // app.use('/api', routes)

        const port = process.env.PORT
        app.listen(port, () => console.log(`Api Server running on port ${port}`))
    })
    .catch()

