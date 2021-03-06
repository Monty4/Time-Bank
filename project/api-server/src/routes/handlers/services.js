const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {

    logic.listServices()
    .then(services => res.json(success(services)))
    .catch(err => res.json(fail(err)))
}