/**
 * @TODO use ast gen instead
 * @desc creates a string of code to export rather than function calls
 * @prop {module.exports} _exports
 * @prop {?Function} _fn
 * @prop {?string} _dir
 * @type {Exports}
 */
class Exports {

  /**
   * @since 0.1.0
   * @desc pass in module.exports or window or global or whatnot
   * @param  {module.exports} _exports
   * @return {Exports} @chainable
   */
  static export(_exports) {
    const ex = new Exports()
    ex._exports = _exports
    ex._str = ''

    return ex
  }

  /**
   * @since 0.1.0
   * @param  {Function | Object} func
   * @return {Exports} @chainable
   */
  fn(func) {
    this._str += func.toString() + '\n'
    return this
  }

  /**
   * @since 0.1.0
   * @see Exports.fn
   * @desc loops through properties,
   *       adds them to Exports.fn,
   *       or Exports._exports
   *
   * @param  {Array<Object>} objs objects to export
   * @return {Exports} @chainable
   */
  props(objs) {
    this._str += `Object.assign(fn, ${require('tosource')(objs)})\n`
    return this
  }

  /**
   * @since 0.1.0
   * @param  {string} dirname __dirname (root)
   * @param  {string} [dir=''] src code folder
   * @return {Exports} @chainable
   */
  dir(dirname, dir = '') {
    this._dir = dirname + '/' + dir
    return this
  }

  /**
   * @since 0.1.0
   * @TODO: generate into manifest so it is statically analyzable?
   * @param  {string} path  path relative from root/src to [names]
   * @param  {Array<string>} names names of files to export, statically required
   * @return {Exports}
   */
  statics(path, names) {
    // when path is empty, single argument
    if (Array.isArray(path)) {
      names = path
      path = ''
    }

    let _exports = 'fn'

    if (path.includes('/')) {
      const prop = path.split('/').pop()

      this._str += `fn['${prop}'] = {}\n`
      _exports = `fn['${prop}']\n`
    }

    const resolved = this._dir + (path === '' ? '' : path + '/')

    for (let n = 0; n < names.length; n++) {
      const name = names[n]
      this._str += `fn['${name}'] = require('${resolved}${name}')\n`
    }

    return this
  }

  /**
   * @since 0.1.0
   * @param  {string} path  path relative from root/src to [names]
   * @param  {Array<string>} names names of files to export, dynamically required
   * @return {Exports} @chainable
   */
  dynamics(path, names) {
    // when path is empty, single argument
    if (Array.isArray(path)) {
      names = path
      path = ''
    }

    let _exports = 'fn'

    if (path.includes('/')) {
      const prop = path.split('/').pop()
      this._str += `\n`
      this._str += `fn['${prop}'] = {}\n`
      _exports = `fn['${prop}']\n`
    }

    const resolved = this._dir + (path === '' ? '' : path + '/')

    for (let n = 0; n < names.length; n++) {
      let name = names[n]

      /**
       * @desc able to handle
       * @example `{path: 'package.json', name: 'pkg'}`
       * @type {string}
       */
      let propName = name
      if (typeof name === 'object') {
        propName = name.name
        name = name.path
      }

      this._str += `Object.defineProperty(${_exports}, '${propName}', {
        configurable: false,
        enumerable: true,
        get() {
          return require('${resolved}${name}') // eslint-disable-line
        },
      })\n\n`
    }

    return this
  }

  /**
   * @since 0.1.0
   * @desc export on global `window`
   * @param {string} name of pkg export for property on window
   * @return {Exports} @chainable
   */
  web(name) {
    this._web = `
      if (typeof window !== 'undefined') window[${name}] = fn
    `

    return this
  }

  /**
   * @since 0.1.0
   * @see Exports.statics, Exports.dynamics
   * @see Exports.fn, Exports.dir, Exports.props
   * @desc merges fn & exports, adds .__esModule & .default
   * @return {Object} Object used for module.exports
   */
  end() {
    this._str += `fn.__esModule = true;\n`
    this._str += `fn.default = fn;\n`

    if (this._web === undefined) {
      this._str += `exports = module.exports = fn;\n`
    }
    else {
      this._str += this._web
      this._str += `if (typeof module !== 'undefined') {
        exports = module.exports = fn;
      }\n`
    }

    return this._str
  }

  /**
   * @since 0.1.0
   * @desc returns as a string, to export the raw code
   * @return {string} code
   */
  toString() {
    return this._str
  }
}

const exprt = Exports
exprt.Exports = Exports
exprt.default = exprt
exprt.__esModule = true

exports = module.exports = exprt
