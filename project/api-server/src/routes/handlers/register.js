const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {

    // const {name, surname, username, password, city, borough, email, services} = req.body
    const { name, surname, username, email, password, services, city, borough, wallet, valuation } = req.body

    // logic.registerUser(name, surname, username, password, city, borough, email, services)
    logic.register(name, surname, username, email, password, services, city, borough, wallet, valuation)

    .then(users => res.json(success(users)))
    .catch(err => res.json(fail(err)))
}
