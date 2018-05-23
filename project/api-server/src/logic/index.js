const { User, Service, Contract, Review } = require('../models')
const ObjectId = require('mongoose').Types.ObjectId; 

function validateStringProp(prop, value) {
    if (typeof value === 'undefined' || !value.trim().length) throw Error(`${prop} cannot be undefined or empty`)
}

function validateStringProps(obj) {
    for (const prop in obj) {
        const value = obj[prop]

        validateStringProp(prop, value)
    }
}

function validateStringArrayProp(prop, arr) {
    if (typeof arr === 'undefined' || !arr.length) throw Error(`${prop} cannot be undefined or empty`)

    for (let i = 0; i < arr.length; i++)
        validateStringProp(`${prop}[${i}]`, arr[i])
}

const logic = {
    // User Login
    verify(username,password){
        return Promise.resolve()
            .then(() => {
                return User.findOne({ username, password }, {_id: 1, username: 1})
            })
            .then(user => {
                if(!user) throw Error('username and/or password wrong')

                return user
            })
    },
    // New User
    // register(name, surname, username, email, password) {

    //     return Promise.resolve()
    //         .then(() => {
    //             validateStringProps({ name, surname, username, email, password })
                
    //             return User.findOne({ username })
    //         })
    //         .then(user => {
    //             if (user) throw Error('username already exists')

                
    //         })
    //         // .then(user => user._id.toString())
    //         .then(_user => {
    //             const user = new User({'wallet': 0,'valuation': 0,name, surname, username,password,'city': '','borough':'', email })
    //             return user.save()
    //         })
    // },


    register( name, surname, username, email, password, services, city, borough, wallet, valuation ) {

        return Promise.resolve()
        .then(_user => {

            const user = new User({ name, surname, username, email, password, services, city, borough, wallet, valuation })

            return user.save()
        })
    },

    // List Filtered Users by Service, city and Borough
    listUsers(service, city, borough) {
        let filter = {}

        // if (service) filter.services = service
        if (service) filter.services = new ObjectId(service)
        if (city) filter.city = { $regex: new RegExp(city, 'i') }
        if (borough) filter.borough = { $regex: new RegExp(borough, 'i') }
                
        return User.find(filter).then(result=>{
            return result
        })
    },

    // List User by Id
    listUser(id){       
        return User.findOne({_id:id})
    },

    // Update User by ID
    updateUser(_id, name, surname, username, newUsername, password, newPassword, city, borough, email) {

        return Promise.resolve()
        .then(() => {

            validateStringProps({ _id, name, surname, username, password, city, borough, email })

            return User.findOne({ username: newUsername })
        })
        .then(user => {
            if (user) throw Error('username already exists')

            return User.findOne({ _id })
        })
        .then(user => {a
            if (!user) throw Error('user does not exists')

            if (user.username !== username || user.password !== password) throw Error('username and/or password wrong')

            return User.updateOne({ _id }, { name, surname, email, username: newUsername, password: newPassword })
        })
    },

    // Retrieve User by ID
    retrieveUser(_id) {
        return Promise.resolve()
        .then(() => {
            validateStringProps({ _id })

            return User.findOne({ _id }, { _id: 0, password: 0 })
        })
        .then(user => {
            if (!user) throw Error('user does not exist')

            return user
        })
    },

    removeUser(id, username, password) {
        // TODO
    },

    // List Services Array
    listServices() {
        return Service.find()
    },

    // Search Service by Id
    listService(_id) {
        return Service.findOne({ _id })
    },

    // New Contract HA DE SER MAKE CONTRAT
    registerContract ( service, server, client, status, estimatedTime, investedTime, validatedTime ) {
        console.log('contract =>',service, server, client, status, estimatedTime, investedTime, validatedTime)

        return Promise.resolve()
        .then(_contract => {

            const contract = new Contract({ service, server, client, status, estimatedTime, investedTime, validatedTime })

            return contract.save()
        })
    },

    listContractsServed(_id) {
        
        return Promise.resolve()
        .then(() => {
            
            validateStringProps({ _id })

            return Contract.find({ server: _id }).then((contract)=>{

               return User.populate(contract,[ {path: 'server', select:'name'},  {path: 'client', select:'name'}]).then(()=>{
                    return Service.populate(contract,  {path: 'service', select: 'title'})
               })
            })
        })
        .then(contract => {
            if (!contract) throw Error('contract does not exist')
            return contract
        })
    },

    listContractsRequested(_id) {
        
        return Promise.resolve()
        .then(() => {
            
            validateStringProps({ _id })

            return Contract.find({ client: _id }).then((contract)=>{

               return User.populate(contract,[ {path: 'server', select:'name'},  {path: 'client', select:'name'}]).then(()=>{
                    return Service.populate(contract,  {path: 'service', select: 'title'})
               })
            })
        })
        .then(contract => {
            if (!contract) throw Error('contract does not exist')


            return contract
        })
    },

    makeContract(serviceId, serverId, clientId) {
        return Promise.resolve()
        .then(_contract => {

            const contract = new Contract({ service, server, client, status, estimatedTime, investedTime, validatedTime })

            return contract.save()
        })
    },

    // Mark contract as Accepted
    acceptContract(_id, status) {
        return Contract.updateOne({ _id }, { status }).then(()=>_id)
    },

    rejectContract(contractId, serverId) {
        // TODO
    },

    markContractDone(contractId, serverId, dedicatedTime) {
        // TODO
    },

    donecontract(_id, status, investedTime) {
        return Contract.updateOne({ _id }, { status, investedTime }).then(()=>_id)
    },

    validatecontract(_id, status, validatedTime) {
        return Contract.updateOne({ _id }, { status, validatedTime }).then(()=>_id)
    },

    // Mark Contract as Cacelled
    cancelContract(_id, status) {
        return Contract.updateOne({ _id }, { status }).then(()=>_id)
    },

    registerreview( contract, user, comment, valuation) {
        return Promise.resolve()
        .then(_review => {
            const review = new Review({ contract, user, comment, valuation })

            return review.save()
        })
        .then(()=>{
            this.listUserReviews(user)
            .then(reviews=>{
                const totalValuation =  reviews.reduce((acum,rev)=>{
                    return acum + rev.valuation
                },0)
                const avgValuation = (totalValuation / reviews.length)
                const finalValuation = (avgValuation*20)
                return User.update({_id:user},{valuation:finalValuation})
            })
        })
    },

    listUserReviews(userId) {
        return Promise.resolve()
        .then(() => {
            validateStringProps({ userId })
            const query = { user: new ObjectId(userId) };
            return Review.find(query)
        })
        
    },
}

module.exports = logic