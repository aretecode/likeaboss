const timer = require('fliptime')
const Exports = require('../../src')

function fn(options, callback) {}

const Eh = {eh: true}
const Canada = {canada: true}

timer.start('_exports')

exports = module.exports = Exports.export(module.exports)
  .dir(__dirname)
  .fn(fn)
  .web()
  .props({Eh, Canada})
  .dynamics('src', ['Boss'])
  .dynamics('src/plugins', ['BossPlugin'])
  .statics('', ['Statics'])
  .end()

timer.stop('_exports').log('_exports')
