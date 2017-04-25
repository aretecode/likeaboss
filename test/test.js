const {resolve} = require('path')
const test = require('ava')
const Exports = require('../src')

const dirname = resolve(__dirname, '../examples/full')
function fn(options, callback) {}
const Eh = {eh: true}
const Canada = {canada: true}

test('using optimized and fluent give exact same output', t => {
  const exFluent = Exports.export({})
    .dir(dirname)
    .fn(fn)
    .props({Eh, Canada})
    .dynamics('src', ['Boss'])
    .dynamics('src/plugins', ['BossPlugin'])
    .statics('', ['Statics'])
    .end()

  const exOptimized = Exports.from({
    target: {},
    dir: dirname,
    fn,
    props: {Eh, Canada},
    dynamics: {
      'src': ['Boss'],
      'src/plugins': ['BossPlugin'],
    },
    statics: {
      '': ['Statics'],
    },
  })

  t.deepEqual(exOptimized, exFluent)
})
