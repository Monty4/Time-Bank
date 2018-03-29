const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {

    const { _id, status, investedTime } = req.body

    logic.donecontract( _id, status, investedTime )
    
    .then(contract => res.json(success(contract)))
    .catch(err => res.json(fail(err)))
}
