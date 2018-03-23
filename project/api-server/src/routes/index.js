const { Router } = require('express')
const bodyParser = require('body-parser')
const { list, retrieve, register, services, update, registercontract } = require('./handlers')

const router = Router()

router.get('/users', list)
router.get('/user/:id', retrieve)
const jsonBodyParser = bodyParser.json()
router.post('/register', jsonBodyParser, register)
router.post('/updateuser', jsonBodyParser, update)

router.get('/services', services)

router.post('/registercontract', jsonBodyParser, registercontract)

module.exports = router