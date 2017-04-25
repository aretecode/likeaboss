const timer = require('fliptime')
const Exports = require('../../src')

function fn(options, callback) {}

const Eh = {eh: true}
const Canada = {canada: true}

timer.start('_bosboss')

Exports.module(module) // , exports
  .dir(__dirname)
  .fn(fn)
  .props({Eh, Canada})
  .dynamics('src', ['Boss'])
  .dynamics('src/plugins', ['BossPlugin'])
  .statics('', ['Statics'])
  .end()

timer.stop('_bosboss').log('_bosboss')
