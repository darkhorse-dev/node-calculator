var lodash = require('lodash')

var express = require('express')

var logger = require('morgan');
var bodyParser = require('body-parser')

var app = express(),
    router = express.Router()

var Calculator = require('./src/lib/Calculator')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

var calc = new Calculator

var methodsInfo = Object.keys(Calculator.MethodsShortcuts).reduce(function (memo, key) {
    var methodName = Calculator.MethodsShortcuts[key]
    var info = {
        name: methodName,
        args: Calculator.MethodsInfo[methodName]
    }

    memo.push(info)

    return memo
}, [])

router.get('/actions', function (req, res) {
    res.status(200).send(methodsInfo.map(function (m) {
        return {
            method: m.name,
            arguments: m.args
        }
    }))
})

methodsInfo.forEach(function (info) {
    router.post('/actions/' + info.name, function (req, res) {
        var body = req.body
        if (calc.resolveMethod(body)) {
            return res.status(400).send({
                error: 'UNSUPPORTED_METHOD'
            })
        }

        var args = [body.num1, body.num2]
        try {
            var result = calc[info.name].apply(calc, args)
            res.status(200).send({
                result: result
            })
        } catch(e) {
            if (/^Argument error/.test(e.message)) {
                return res.status(400).send({
                    error: e.message
                })
            }

            res.status(500).send({
                error: e.message
            })
        }
    })
})

app.use('/calculator', router)

app.listen(3000)
