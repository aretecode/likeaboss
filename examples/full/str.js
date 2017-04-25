const Exports = require('../../src/gen')

function fn(options, callback) {
  // magic
}

const Eh = {eh: true}
const Canada = {canada: true}

exports = module.exports = Exports.export()
  .dir(__dirname)
  .fn(fn)
  .dynamics('src', ['Boss'])
  .dynamics('src/plugins', ['BossPlugin'])
  .statics('', ['Statics'])
  .props({Eh, Canada})
  .web('eh')
  .end()
  .toString()

console.log(exports)
