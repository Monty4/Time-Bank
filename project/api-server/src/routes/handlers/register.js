const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {

    // const {name, surname, username, password, city, borough, email, services} = req.body
    const {name, surname, username, email, password} = req.body
    console.log('=>',name, surname, username, email, password)
    // logic.registerUser(name, surname, username, password, city, borough, email, services)
    logic.register(name, surname, username, email, password)

    .then(users => res.json(success(users)))
    .catch(err => res.json(fail(err)))
}
