const { Router } = require('express')
const bodyParser = require('body-parser')
// const { list, retrieve, register, services, update, registercontract, retrieveservedcontracts, retrieverequestedcontracts, registerreview, retrievereview } = require('./handlers')
const { list, retrieve, register, services, service, update, registercontract, listuserreviews, retrieveservedcontracts, retrieverequestedcontracts, acceptContract, validatecontract, donecontract, registerreview, retrievereview } = require('./handlers')

const router = Router()

router.get('/users', list)
router.get('/user/:id', retrieve)
const jsonBodyParser = bodyParser.json()
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