function fn() {}
const ex = {
  Eh: {eh: true},
  Canada: {canada: true},
  Boss: 'boss',
  plugins: {},
  Statics: {static: true},
  __esModule: true,
}

Object.defineProperty(ex.plugins, 'BossPlugin', {
  get() {
    return 'boss'
  },
})

ex.default = ex

Object.assign(fn, ex)
