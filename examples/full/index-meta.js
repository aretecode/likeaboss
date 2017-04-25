const Exports = require('../../src')
const {version} = require('./pkg.json')

exports = module.exports = Exports.export(module.exports)
  .dir(__dirname)
  .props({version})
  .dynamics('', [{path: 'pkg.json', name: 'pkg'}])
  .end()

console.log(exports)
