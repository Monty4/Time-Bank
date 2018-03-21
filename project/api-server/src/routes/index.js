const { Router } = require('express')
const bodyParser = require('body-parser')
const { list, retrieve, register, services } = require('./handlers')

const router = Router()

router.get('/users', list)
router.get('/user/:id', retrieve)
router.post('/register', register)
router.get('/services', services)

// const jsonBodyParser = bodyParser.json()

module.exports = router