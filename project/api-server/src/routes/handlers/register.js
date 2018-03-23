const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {

    const {name, surname, username, password, city, borough, email, services} = req.body

    logic.registerUser(name, surname, username, password, city, borough, email, services)

    .then(users => res.json(success(users)))
    .catch(err => res.json(fail(err)))
}
