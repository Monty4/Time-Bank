const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {
const {service, city, borough} = req.query
    logic.listUsers(service, city, borough)
    .then(users => res.json(success(users)))
    .catch(err => res.json(fail(err)))
}