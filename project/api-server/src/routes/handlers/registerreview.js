const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {

    const { contract, user, comment, valuation } = req.body

    logic.registerreview( contract, user, comment, valuation )

    .then(review => res.json(success(review)))
    .catch(err => res.json(fail(err)))
}
