var mocha = require('mocha')

describe('tests', function () {
    //this.should.be.instanceof(mocha.Suite)

    var context;

    before(function () {
        context = this
    })

    it('should access low-level api', function (done) {
        this.should.eql(context)

        //this.test.should.be.instanceof(mocha.Test)
        //this.test.should.be.instanceof(mocha.Runnable)
        //this.test.should.be.instanceof(require('events').EventEmitter)

        this.test.should.have.property(['file'])
        this.test.file.should.eql(module.filename)

        done()
    })
})
