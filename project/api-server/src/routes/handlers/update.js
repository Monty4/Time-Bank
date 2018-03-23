const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {

    const {_id, name, surname, username, newUsername, password, newPassword, city, borough, email} = req.body

    logic.updateUser(_id, name, surname, username, newUsername, password, newPassword, city, borough, email)

    .then(users => res.json(success(users)))
    .catch(err => res.json(fail(err)))
}