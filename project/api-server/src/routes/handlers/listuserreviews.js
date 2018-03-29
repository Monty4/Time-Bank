const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {
const {user} = req.params

    logic.listUserReviews(user)
    .then(users => res.json(success(users)))
    .catch(err => res.json(fail(err)))
}