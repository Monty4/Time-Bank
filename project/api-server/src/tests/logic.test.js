const mongoose = require('mongoose')
const assert = require('assert')
const { User, Service, Contract, Review } = require('../src/models')
const logic = require('../src/logic')


describe('logic', () => {
    before(() => {
        return mongoose.connect('mongodb://localhost/rent-manager-logic-test')
    })

    beforeEach(() => Promise.all([
        User.remove(),
        Service.remove(),
        Contract.remove()
    ]))

    describe('register a user', () => {
        let bicyclesMechanicService, cookingService, mathTeachingService, registeredUserId, user

        before(() => {
            bicyclesMechanicService = new Service({
                title: 'bicycles mechaninc'
            })

            cookingService = new Service({
                title: 'cooking'
            })

            mathTeachingService = new Service({
                title: 'math teaching'
            })

            return Promise.all([
                bicyclesMechanicService.save()
                    .then(_service => bicyclesMechanicService = _service),
                cookingService.save()
                    .then(_service => cookingService = _service),
                mathTeachingService.save()
                    .then(_service => mathTeachingService = _service)
            ])
                .then(() => logic.registerUser(
                    'name',
                    'surname',
                    'username',
                    'password',
                    'city',
                    'borough',
                    'email',
                    [
                        bicyclesMechanicService._id.toString(),
                        cookingService._id.toString(),
                        mathTeachingService._id.toString()
                    ]
                ))
                .then(_id => registeredUserId = _id)
                .then(() => User.findOne())
                .then(_user => user = _user)
        })

        it('should register a user', () => {
            assert(registeredUserId, 'should registered user id be defined')

            assert(user, 'should a user be already existing')

            assert.equal(registeredUserId, user._id.toString(), 'should registered user id match existing user id')
        })
    })

    after(done => {
        return mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done)
        })
    })
})