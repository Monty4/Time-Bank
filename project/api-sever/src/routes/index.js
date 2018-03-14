const { Router } = require('express')
const bodyParser = require('body-parser')
const { list } = require('./handlers')

const router = Router()

router.get('/', list)

// const jsonBodyParser = bodyParser.json()

module.exports = router