const timer = require('fliptime')
const Exports = require('../../src')

function fn(options, callback) {}

const Eh = {eh: true}
const Canada = {canada: true}

timer.start('_traditional')

fn.Eh = Eh
fn.Canada = Canada
fn.Static = {static: true}

Object.defineProperty(fn, 'Boss', {
  configurable: true,
  enumerable: true,
  get() {
    return require(`src/Boss`) // eslint-disable-line
  },
})
Object.defineProperty(fn, 'BossPlugin', {
  configurable: true,
  enumerable: true,
  get() {
    return require(`src/plugins/BossPlugin`) // eslint-disable-line
  },
})

fn.__esModule = true
fn.default = fn
exports = module.exports = fn

timer.stop('_traditional').log('_traditional')
