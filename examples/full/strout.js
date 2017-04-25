function fn(options, callback) {
  // magic
}
Object.assign(fn, {
  Eh: {eh: true},
  Canada: {canada: true},
})
Object.defineProperty(fn, 'Boss', {
  configurable: false,
  enumerable: true,
  get() {
    return require('./src/Boss') // eslint-disable-line
  },
})
fn.plugins = {}
Object.defineProperty(fn.plugins, 'BossPlugin', {
  configurable: false,
  enumerable: true,
  get() {
    return require('./src/plugins/BossPlugin') // eslint-disable-line
  },
})

fn.Statics = require('./Statics')

fn.__esModule = true
fn.default = fn

console.log(fn)
exports = module.exports = fn
