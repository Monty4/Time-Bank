const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {
    const {id} =req.params
    logic.listService(id)
    .then(service => res.json(success(service)))
    .catch(err => res.json(fail(err)))
}