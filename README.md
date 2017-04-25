# 🕴 likeaboss

[![NPM version][likeaboss-npm-image]][likeaboss-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]

[![fluents][fluents-image]][fluents-url]

[likeaboss-npm-image]: https://img.shields.io/npm/v/likeaboss.svg
[likeaboss-npm-url]: https://npmjs.org/package/likeaboss
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[fluents-image]: https://img.shields.io/badge/⛓-fluent-9659F7.svg
[fluents-url]: https://www.npmjs.com/package/flipchain

> export like a boss with functions, dynamic and static requires, and module support; easy, fast & tiny.

#### works with:
- 📼 es5
- 🍬 es6+
- 🌊 typescript
- 🗼 babel
- 🕸 web
- 🔙🔚 node
- other?

## 📦 usage
```bash
yarn add likeaboss
npm i likeaboss --save
```

## [🌐 documentation](./docs)
## [🔬 tests](./tests)
## [📘 examples](./examples)

<img width="442" alt="screen shot 2017-04-24 at 4 48 22 pm" src="https://cloud.githubusercontent.com/assets/4022631/25363323/7860cc44-290e-11e7-9d30-1a183e0d61ea.png">


#### ⛓ fluent fn

```js
const Export = require('likeaboss')

function fn(options, callback) {
  // magical things when called as a function
}

const Canada = {canada: true}

exports = module.exports = Export.export(module.exports)
  .fn(fn)
  .props({Canada})
  .end()
```

#### fluent fn with requires

> dynamic and static requires, dynamic requires only are required when they are used

[see the tests](./test)


```js
const Export = require('likeaboss')

function fn() {
  console.log('called as a function')
}

exports = module.exports = Export.export(module.exports)
  .dir(__dirname)
  .fn(fn)
  .dynamics('src', ['Boss'])
  .dynamics('src/plugins', ['BossPlugin'])
  .dynamics('', [{path: 'package.json', name: 'pkg'}])
  .statics('', ['Statics'])
  .end()
```

###### 🦐 importing:

> requires `./eh/src/Boss.js`

```js
  import {Boss} from './eh'
  import eh from './eh'

  eh('callable as a function!')
  console.log(Boss)

  // requires the BossPlugin
  console.log(eh.plugins.BossPlugin)
```



#### object fn with requires

> same as with fluent, but using object syntax

```js
const Export = require('likeaboss')

exports = module.exports = Export.from({
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
```

# 👽 exports
> file size (~700 bytes)

### from
```js
// imports the `from` static fn
const from = require('likeaboss/from')

const Export = require('likeaboss')
```


### generate

> 🚧⚗ warning, experimental

```js
// export.js
const gen = require('likeaboss/gen')

function fn(options, callback) { /* magic */ }

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

// outputs exporting string
// node export.js > index.js
```

# [⚖️ benchmark](./bench)
using [🏋️⛓ bench-chain](https://www.npmjs.com/package/bench-chain)

<img width="300" alt="screen shot 2017-04-24 at 5 51 21 am" src="https://cloud.githubusercontent.com/assets/4022631/25358171/616dcc44-28f5-11e7-80ab-883ce5a9ae9a.png">


<!-- add 100 runs here with <details> -->

```js
optimized x 30,975 ops/sec ±13.48% (50 runs sampled)
fluent x 20,434 ops/sec ±3.52% (73 runs sampled)
```

#### times [with last example](#object-fn-with-requires)

- `console.log({})`: ~ ⏲ 35000ms / 35ms
- fluent: ~ ⏲ 1300 microseconds / 1.3ms
- optimized: ~ ⏲ 400 microseconds  / .4ms
- `module.exports = {}`: ~ ⏲ 200 microseconds / .2ms


<!-- NMD(new module definition(s)) -->

# [🏭 output](./examples/example-output-pseudo.js)

> example generated output pseudo code

```js
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
```
