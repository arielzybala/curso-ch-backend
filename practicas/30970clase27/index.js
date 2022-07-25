const minimist = require('minimist')
const arguments = process.argv.slice(2)

const parsear = minimist(arguments, {alias: {'m': 'modo', 'p': 'port', 'd': 'debug'}} , {default: {debug: false, port: 0}})
const {modo, port, debug, _ }= parsear
console.log({modo, port, debug, otros:_})