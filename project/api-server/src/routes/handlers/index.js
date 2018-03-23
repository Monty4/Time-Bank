const list = require('./list')
const retrieve = require('./retrieve')
const services = require('./services')
const register = require('./register')
const update = require('./update')
const registercontract = require('./registercontract')
// const create = require('./create')
// const _delete = require('./delete')
//...

module.exports = {
    list,
    retrieve,
    register,
    services,
    update,
    registercontract
    // create,
    // delete: _delete,
}