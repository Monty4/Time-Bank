const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req,res) => {

    const {service, server, client} = req.body
    

    logic.registerContract(service, server, client )


    .then(users => res.json(success(users)))
    .catch(err => res.json(fail(err)))
}
