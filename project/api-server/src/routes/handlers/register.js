const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {

    const {name, surname, username, password, city, borrough, email} = req.body

    logic.register(name, surname, username, password, city, borrough, email)
    .then(users => res.json(success(users)))
    .catch(err => res.json(fail(err)))
}
