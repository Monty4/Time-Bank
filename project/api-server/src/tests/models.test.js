const mongoose = require('mongoose')
const assert = require('assert')
const { User, Service, Contract, Review } = require('../src/models')


describe('models', () => {
    before(() => {
        return mongoose.connect('mongodb://localhost/rent-manager-models-test')
    })

    beforeEach(() => Promise.all([
        User.remove(),
        Service.remove(),
        Contract.remove()
    ]))

    describe('create a contract', () => {
        let contract, contractStatus, user, user2, bicyclesMechanicService, cookingService, mathTeachingService, review, review2

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

            user = new User({
                name: 'name',
                surname: 'surname',
                username: 'username',
                password: 'password',
                email: 'email',
                city: 'Barcelona',
                borough: 'Poblenou',
                services: [bicyclesMechanicService._id, cookingService._id]
            })

            user2 = new User({
                name: 'name',
                surname: 'surname',
                username: 'username-client',
                password: 'password',
                email: 'email',
                city: 'Barcelona',
                borough: 'Poblenou',
                services: [cookingService._id, mathTeachingService._id]
            })

            return Promise.all([
                bicyclesMechanicService.save()
                    .then(_service => bicyclesMechanicService = _service),
                cookingService.save()
                    .then(_service => cookingService = _service),
                mathTeachingService.save()
                    .then(_service => mathTeachingService = _service),
                user.save()
                    .then(_user => user = _user),
                user2.save()
                    .then(_user => user2 = _user)
            ])
                .then(() => {
                    contract = new Contract({
                        service: bicyclesMechanicService._id,
                        server: user._id,
                        client: user2._id
                    })

                    contractStatus = []

                    return contract.save()
                })
                .then(contract => {
                    contractStatus.push(contract.status)

                    contract.status = 'accepted'
                    contract.estimatedTime = 10

                    return contract.save()
                })
                .then(contract => {
                    contractStatus.push(contract.status)

                    contract.status = 'done'
                    contract.investedTime = 12

                    return contract.save()
                })
                .then(contract => {
                    contractStatus.push(contract.status)

                    contract.status = 'validated'
                    contract.validatedTime = 11

                    return contract.save()
                })
                .then(_contract => {
                    contract = _contract

                    review = new Review({
                        contract: contract._id,
                        user: user2._id,
                        comment: 'comment',
                        valuation: 5
                    })

                    user.reviews = [review]

                    return user.save()
                })
                .then(_user => user = _user)
                .then(() => {
                    review2 = new Review({
                        contract: contract._id,
                        user: user._id,
                        comment: 'comment',
                        valuation: 3
                    })

                    user2.reviews = [review2]

                    return user2.save()
                })
                .then(_user => user2 = _user)
                .then(() => {
                    const id = contract._id.toString()

                    return Contract.findOne({ _id: id })
                })
                .then(_contract => contract = _contract)
        })

        it('should create a contract', () => {
            assert(bicyclesMechanicService, 'should bicycles mechanic service be created')
            assert(cookingService, 'should cooking service be created')
            assert(mathTeachingService, 'should math teaching service be created')

            assert(user, 'should user be created')
            const [userService_id1, userService_id2] = user.services
            assert.equal(userService_id1.toString(), bicyclesMechanicService._id.toString(), 'should user service 1 match bicycle service')
            assert.equal(userService_id2.toString(), cookingService._id.toString(), 'should user service 2 match cooking service')

            assert(user2, 'should user2 be created')
            const [user2Service_id1, user2Service_id2] = user2.services
            assert.equal(user2Service_id1.toString(), cookingService._id.toString(), 'should user 2 service 1 match cooking service')
            assert.equal(user2Service_id2.toString(), mathTeachingService._id.toString(), 'should user 2 service 2 match math teaching service')

            assert(contract, 'should contract be created')
            assert.equal(contract.service.toString(), bicyclesMechanicService._id.toString(), 'should service match')
            assert.equal(contract.server.toString(), user._id.toString(), 'should user match')
            assert.equal(contract.client.toString(), user2._id.toString(), 'should user2 match')
            assert.equal(contractStatus[0], 'pending', 'should contract status match')
            assert.equal(contractStatus[1], 'accepted', 'should contract status match')
            assert.equal(contractStatus[2], 'done', 'should contract status match')
            assert.equal(contract.status, 'validated', 'should contract status be pending')
            assert.equal(contract.estimatedTime, 10, 'should contract estimated time match')
            assert.equal(contract.investedTime, 12, 'should contract invested time match')
            assert.equal(contract.validatedTime, 11, 'should contract validated time match')

            assert(user.reviews, 'should user have reviews')
            assert.equal(user.reviews.length, 1, 'should user have 1 review')
            const [_review] = user.reviews
            assert.equal(_review._id.toString(), review._id.toString(), 'should review id match')
            assert.equal(_review.contract.toString(), contract._id.toString(), 'should review contract match')
            assert.equal(_review.user.toString(), user2._id.toString(), 'should review user match')
            assert.equal(_review.comment, 'comment', 'should review comment match')
            assert.equal(_review.valuation, 5, 'should review valuation match')

            assert(user2.reviews, 'should user2 have reviews')
            assert.equal(user2.reviews.length, 1, 'should user2 have 1 review')
            const [_review2] = user2.reviews
            assert.equal(_review2._id.toString(), review2._id.toString(), 'should review id match')
            assert.equal(_review2.contract.toString(), contract._id.toString(), 'should review contract match')
            assert.equal(_review2.user.toString(), user._id.toString(), 'should review user match')
            assert.equal(_review2.comment, 'comment', 'should review comment match')
            assert.equal(_review2.valuation, 3, 'should review valuation match')
        })
    })

    describe('find users by service, city and borough', () => {
        let user, user2, bicyclesMechanicService, cookingService, mathTeachingService, searchResults, searchResults2, searchResults3, searchResults4, searchResults5

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

            user = new User({
                name: 'name',
                surname: 'surname',
                username: 'username',
                password: 'password',
                email: 'email',
                city: 'Barcelona',
                borough: 'Poblenou',
                services: [bicyclesMechanicService._id, cookingService._id]
            })

            user2 = new User({
                name: 'name',
                surname: 'surname',
                username: 'username-client',
                password: 'password',
                email: 'email',
                city: 'Madrid',
                borough: 'Vallecas',
                services: [cookingService._id, mathTeachingService._id]
            })

            return Promise.all([
                bicyclesMechanicService.save()
                    .then(_service => bicyclesMechanicService = _service),
                cookingService.save()
                    .then(_service => cookingService = _service),
                mathTeachingService.save()
                    .then(_service => mathTeachingService = _service),
                user.save()
                    .then(_user => user = _user),
                user2.save()
                    .then(_user => user2 = _user)
            ])
                .then(() => Promise.all([
                    User.find({ services: bicyclesMechanicService._id.toString() })
                        .then(results => searchResults = results),
                    User.find({ city: 'Barcelona' })
                        .then(results => searchResults2 = results),
                    User.find({ borough: 'Vallecas' })
                        .then(results => searchResults3 = results),
                    User.find({ services: mathTeachingService._id.toString(), city: 'Madrid', borough: 'Vallecas' })
                        .then(results => searchResults4 = results),
                    User.find({ services: cookingService._id.toString() })
                        .then(results => searchResults5 = results)
                ]))
        })

        it('should find users by service, city and borough', () => {
            assert(searchResults, 'should search results of find by service bicycles mechanic be defined')
            assert.equal(searchResults.length, 1, 'should search results of find by service bicycles mechanic be 1 item')
            const [foundUser] = searchResults
            assert.equal(foundUser._id.toString(), user._id.toString(), 'should found user match user')

            assert(searchResults2, 'should search results of find by city barcelona be defined')
            assert.equal(searchResults2.length, 1, 'should search results of find by city barcelona be 1 item')
            const [foundUser2] = searchResults2
            assert.equal(foundUser2._id.toString(), user._id.toString(), 'should found user match user')

            assert(searchResults3, 'should search results of find by borough vallecas be defined')
            assert.equal(searchResults3.length, 1, 'should search results of find by borough vallecas be 1 item')
            const [foundUser3] = searchResults3
            assert.equal(foundUser3._id.toString(), user2._id.toString(), 'should found user match user2')

            assert(searchResults4, 'should search results of find by service, city and borough be defined')
            assert.equal(searchResults4.length, 1, 'should search results of find by service, city and borough be 1 item')
            const [foundUser4] = searchResults4
            assert.equal(foundUser4._id.toString(), user2._id.toString(), 'should found user match user2')

            assert(searchResults5, 'should search results of find by service cooking be defined')
            assert.equal(searchResults5.length, 2, 'should search results of find by service cooking be 2 items')
            const [foundUser5_1, foundUser5_2] = searchResults5
            const validUserIds = [user._id.toString(), user2._id.toString()]
            assert(validUserIds.includes(foundUser5_1._id.toString()), 'should found user match user')
            assert(validUserIds.includes(foundUser5_2._id.toString()), 'should found user match user2')
            assert(foundUser5_1._id.toString() !== foundUser5_2._id.toString(), 'should found users be different')
        })
    })

    describe('find services by ids', () => {
        let bicyclesMechanicService, cookingService, mathTeachingService, serviceIds, foundServices

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

            serviceIds = [
                bicyclesMechanicService._id.toString(),
                cookingService._id.toString(),
                mathTeachingService._id.toString()
            ]

            return Promise.all([
                bicyclesMechanicService.save()
                    .then(_service => bicyclesMechanicService = _service),
                cookingService.save()
                    .then(_service => cookingService = _service),
                mathTeachingService.save()
                    .then(_service => mathTeachingService = _service)
            ])
            .then(() => {
                return Service.find({ _id: {$in : serviceIds }})
            })
            .then(_services => foundServices = _services)
        })

        it('should find services by ids', () => {
            assert(foundServices, 'should foundServices be defined')

            assert.equal(foundServices.length, 3, 'should foundServices have 3 items')

            const [foundService1, foundService2, foundService3] = foundServices

            assert(serviceIds.includes(foundService1._id.toString()), 'should service id be valid')
            assert(serviceIds.includes(foundService2._id.toString()), 'should service id be valid')
            assert(serviceIds.includes(foundService3._id.toString()), 'should service id be valid')

            assert(foundService1._id.toString() !== foundService2._id.toString(), 'should service ids be different')
            assert(foundService2._id.toString() !== foundService3._id.toString(), 'should service ids be different')
            assert(foundService3._id.toString() !== foundService1._id.toString(), 'should service ids be different')
        })
    })

    after(done => {
        return mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done)
        })
    })
})