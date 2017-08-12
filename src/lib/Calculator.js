var _ = require('lodash')
var util = require('util')
var assert = require('assert')

module.exports = Calculator

function Calculator() {

}

Calculator.MethodsShortcuts = Object.freeze({
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    '/': 'divide',
    '^': 'pow'
})

Calculator.MethodsInfo = Object.freeze({
    'add': {arg1: 'Number', arg2: 'Number'},
    'subtract': {arg1: 'Number', arg2: 'Number'},
    'multiply': {arg1: 'Number', arg2: 'Number'},
    'divide': {arg1: 'Number', arg2: 'Number'},
    'pow': {arg1: 'Number', arg2: 'Number'}
})

Calculator.prototype.assertNumber = function (args) {
    if (args.some(function (arg) {
            return !_.isNumber(arg) || Number.isNaN(arg)
        })) {
        throw new Error('Argument error: ' + args.map(function (arg, i) {
                return util.format('num%s=%s', i, arg)
            }).join('; '))
    }
}

Calculator.prototype.add = function (num1, num2) {
    this.assertNumber([num1, num2])

    return num1 + num2
}

Calculator.prototype.subtract = function (num1, num2) {
    this.assertNumber([num1, num2])

    return num1 - num2
}

Calculator.prototype.multiply = function (num1, num2) {
    this.assertNumber([num1, num2])

    return num1 * num2
}

Calculator.prototype.divide = function (num1, num2) {
    this.assertNumber([num1, num2])

    assert.ok(num2 != 0)

    return num1 / num2
}

Calculator.prototype.pow = function (num1, num2) {
    this.assertNumber([num1, num2])

    return Math.pow(num1, num2)
}

Calculator.prototype.resolveMethod = function (operation) {
  var method = null
  if (!(method = Calculator.MethodsShortcuts[operation])) {
    return null
  }

  return this[method]
}


