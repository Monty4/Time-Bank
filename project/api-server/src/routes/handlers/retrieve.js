const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {
    const {id} =req.params
    logic.retrieveUser(id)
    .then(user => res.json(success(user)))
    .catch(err => res.json(fail(err)))
}