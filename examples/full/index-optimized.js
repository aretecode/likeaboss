const timer = require('fliptime')
const from = require('../../src/from')
// const Exports = require('../../src/from')

function func(options, callback) {
  // do magical stuff when called as a function
}

const Eh = {eh: true}
const Canada = {canada: true}

timer.start('exports-optimized')
exports = module.exports = from({
  target: module.exports,
  dir: __dirname,
  fn: func,
  props: {Eh, Canada},
  dynamics: {
    'src': ['Boss'],
    'src/plugins': ['BossPlugin'],
  },
  statics: {
    '': ['Statics'],
  },
})

timer.stop('exports-optimized').log('exports-optimized')
