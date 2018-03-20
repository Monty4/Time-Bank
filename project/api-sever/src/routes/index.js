const { Router } = require('express')
const bodyParser = require('body-parser')
const { list, retrieve } = require('./handlers')

const router = Router()

router.get('/users', list)
router.get('/user/:id', retrieve)

// const jsonBodyParser = bodyParser.json()

module.exports = router