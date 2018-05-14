const { Router } = require('express')
const bodyParser = require('body-parser')
const { login, list, retrieve, register, services, service, update, registercontract, listuserreviews, retrieveservedcontracts, retrieverequestedcontracts, acceptContract, validatecontract, donecontract, registerreview, retrievereview } = require('./handlers')

const router = Router()

const jsonBodyParser = bodyParser.json()
const jwtValidator = require('./handlers/jwtValidator')

router.get('/user', jwtValidator, retrieve)

// router.post('/login', jsonBodyParser, login)
router.get('/users', list)
router.get('/user/:id', retrieve)
router.post('/register', jsonBodyParser, register)
router.post('/updateuser', jsonBodyParser, update)
router.get('/services', services)
router.get('/service/:id', service)
router.post('/registercontract', jsonBodyParser, registercontract)
router.get('/servedcontracts/:id', retrieveservedcontracts)
router.get('/requestedcontracts/:id', retrieverequestedcontracts)
router.put('/acceptcontract', jsonBodyParser, acceptContract)
router.put('/donecontract', jsonBodyParser, donecontract)
router.put('/validatecontract', jsonBodyParser, validatecontract)
router.get('/listuserreview/:user',listuserreviews)
router.post('/registerreview', jsonBodyParser, registerreview)
router.get('/review/:id', retrievereview)

module.exports = router