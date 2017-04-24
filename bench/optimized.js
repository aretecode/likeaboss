// dep
const {resolve} = require('path')
const log = require('fliplog')
const Exports = require('../src')
const from = require('../src/from')
// const Record = require('../../bench-chain')
const Record = require('bench-chain')

const {record} = Record.suite(__dirname, true)
// record.debug = true
// scoped
let memory = {
  one: null,
  two: null,
}
const dirname = resolve(__dirname, '../examples/full')

// bench
record
  .add('optimized', () => {
    memory.one = process.memoryUsage()
    function func(options, callback) {}
    const Eh = {eh: true}
    const Canada = {canada: true}

    Exports.from({
      target: {},
      dir: dirname,
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
  })
  .add('fluent', () => {
    memory.two = process.memoryUsage()

    function fn(options, callback) {}
    const Eh = {eh: true}
    const Canada = {canada: true}

    Exports.export({})
      .dir(dirname)
      .fn(fn)
      .props({Eh, Canada})
      .dynamics('src', ['Boss'])
      .dynamics('src/plugins', ['BossPlugin'])
      .statics('', ['Statics'])
      .end()
  })
  .run()
// .runTimes(10)
