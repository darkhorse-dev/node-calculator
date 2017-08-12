'use strict';

var _ = require('lodash')
var should = require('should')
var request = require('supertest')

describe('Calculator http rest tests', function () {
    beforeEach(function () {
        this.request = request('http://localhost:3000/calculator')
    })

    afterEach(function () {
        this.request = null
    })

    describe('#actions/positive', function () {
        it('should return list of supported calculator methods', function (done) {
            this.request.get('/actions')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }

                    response.body.should.match([
                        {
                            method: 'add', arguments: {arg1: 'Number', arg2: 'Number'}
                        },
                        {
                            method: 'subtract', arguments: {arg1: 'Number', arg2: 'Number'}
                        },
                        {
                            method: 'multiply', arguments: {arg1: 'Number', arg2: 'Number'}
                        },
                        {
                            method: 'divide', arguments: {arg1: 'Number', arg2: 'Number'}
                        },
                        {
                            method: 'pow', arguments: {arg1: 'Number', arg2: 'Number'}
                        }
                    ])

                    done(null)
                });
        })
    })
    describe('#add/positive', function () {
        it('should add numbers', function (done) {
            this.request.post('/actions/add')
                .send({
                    num1: 1,
                    num2: -5
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }

                    response.body.should.match({
                        result: -4
                    })

                    done(null)
                });
        })
    })

    describe('#add/negative', function () {
        it('should return 400 and validation error if add null', function (done) {
            this.request.post('/actions/add')
                .send({
                    num1: null,
                    num2: null
                })
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function (err, response) {
                    if (err) {
                        return done(err)
                    }

                    response.body.should.match({
                        error: /^Argument error/
                    })

                    done(null)
                });
        })
    })
});
