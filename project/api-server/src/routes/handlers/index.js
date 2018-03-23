const list = require('./list')
const retrieve = require('./retrieve')
const services = require('./services')
const register = require('./register')
const update = require('./update')
// const create = require('./create')
// const _delete = require('./delete')
//...

module.exports = {
    list,
    retrieve,
    register,
    services,
    update
    // create,
    // delete: _delete,
}