const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {

    const { _id, status } = req.body

    logic.acceptContract( _id, status )
    
    .then(contract => res.json(success(contract)))
    .catch(err => res.json(fail(err)))
}
