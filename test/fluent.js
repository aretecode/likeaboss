const {resolve} = require('path')
const log = require('fliplog')
const test = require('ava')
const Exports = require('../src')

const dirname = resolve(__dirname, '../examples/full')
function fn(options, callback) {}
const Eh = {eh: true}
const Canada = {canada: true}

test('can export with everything', t => {
  const ex = Exports.export({})
    .dir(dirname)
    .fn(fn)
    .props({Eh, Canada})
    .dynamics('src', ['Boss'])
    .dynamics('src/plugins', ['BossPlugin'])
    .statics('', ['Statics'])
    .end()

  console.log('eh?')
  log.stringify(ex).bold('export').echo()
  log.verbose(ex).bold('export').echo()
  log.tosource().data(ex).bold('export').echo()

  // log.quick(ex)
  t.true(ex.__esModule)
  t.deepEqual(ex.default, ex)
  t.true(ex.name === 'fn')
  t.true(typeof ex === 'function')
  t.deepEqual(ex.Eh, {eh: true})
  t.deepEqual(ex.Statics, {static: true})

  t.true(typeof ex.plugins.BossPlugin.get === 'undefined')
  t.true(typeof ex.plugins.BossPlugin === 'string')

  t.true(ex.Boss === 'boss')
})

test('can export without a fn', t => {
  const ex = Exports.export({}).dir(dirname).props({Eh, Canada}).end()

  t.true(ex.__esModule)
  t.deepEqual(ex.default, ex)
  t.deepEqual(ex.Eh, {eh: true})
  t.deepEqual(ex.Canada, {canada: true})
})

test('can export with just props', t => {
  const ex = Exports.export({}).dir(dirname).props({Eh, Canada}).end()

  t.true(ex.__esModule)
  t.deepEqual(ex.default, ex)
  t.deepEqual(ex.Eh, {eh: true})
  t.deepEqual(ex.Canada, {canada: true})
})

test('can export with just statics', t => {
  const ex = Exports.export({}).dir(dirname).statics('', ['Statics']).end()

  t.deepEqual(ex.Statics, {static: true})
  t.true(ex.__esModule)
  t.deepEqual(ex.default, ex)
})

test('can export with just dynamics', t => {
  const ex = Exports.export({})
    .dir(dirname)
    .dynamics('src/plugins', ['BossPlugin'])
    .end()

  t.true(ex.__esModule)
  t.deepEqual(ex.default, ex)
  t.true(typeof ex.plugins.BossPlugin.get === 'undefined')
  t.true(typeof ex.plugins.BossPlugin === 'string')
})

test('dynamic exports are never called', t => {
  function exp() {
    const ex = Exports.export({})
      .dir(dirname)
      .dynamics('src/plugins', ['OnlyWhenUsed'])
      .statics('', ['Statics'])
      .end()
  }

  // 'never calls [getter]'
  try {
    exp()
  }
  catch (e) {
    t.fail(e)
  }

  t.pass()
})
