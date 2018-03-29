const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {

    const { _id, status, estimatedTime } = req.body

    logic.validatecontract( _id, status, estimatedTime )
    
    .then(contract => res.json(success(contract)))
    .catch(err => res.json(fail(err)))
}
