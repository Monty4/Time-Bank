const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {

    const { contract, user, comment, valuation } = req.body
    console.log(req.body)
    logic.addUserReview( contract, user, comment, valuation )

    .then(users => res.json(success(users)))
    .catch(err => res.json(fail(err)))
}
