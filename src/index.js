const from = require('./from')

/**
 * @prop {module.exports} _exports
 * @prop {?Function} _fn
 * @prop {?string} _dir
 * @type {Exports}
 */
class Exports {

  /**
   * @since 0.1.0
   * @param  {Object} obj optimized shorthand obj with all properties
   * @return {Object} object to export, Exports.end
   */
  static from(obj) {
    return from(obj)
  }

  /**
   * @since 0.1.0
   * @desc pass in module.exports or window or global or whatnot
   * @param  {module.exports} _exports
   * @return {Exports} @chainable
   */
  static export(_exports) {
    const ex = new Exports()
    ex._exports = _exports

    // default fn here, since they are object.assigned in Exports.finish
    ex._fn = {}

    return ex
  }

  /**
   * @since 0.1.0
   * @param  {Function | Object} func
   * @return {Exports} @chainable
   */
  fn(func) {
    this._fn = func
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
    const keys = Object.keys(objs)

    for (let i = 0; i < keys.length; i++) {
      this._fn[keys[i]] = objs[keys[i]]
    }

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

    let _exports = this._exports

    if (path.includes('/')) {
      const prop = path.split('/').pop()
      this._exports[prop] = {}
      _exports = this._exports[prop]
    }

    const resolved = this._dir + (path === '' ? '' : path + '/')

    for (let n = 0; n < names.length; n++) {
      const name = names[n]
      _exports[name] = require(`${resolved}${name}`)
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

    let _exports = this._exports

    if (path.includes('/')) {
      const prop = path.split('/').pop()
      this._exports[prop] = {}
      _exports = this._exports[prop]
    }

    const resolved = this._dir + (path === '' ? '' : path + '/')

    for (let n = 0; n < names.length; n++) {
      let name = names[n]

      // @NOTE: could do this... but instead should do static export?
      // let ex = name.export
      // if (ex !== false) {return require(`${resolved}${name}`)[ex]

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

      Object.defineProperty(_exports, propName, {
        configurable: false,
        enumerable: true,
        get() {
          return require(`${resolved}${name}`) // eslint-disable-line
        },
      })
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
    if (typeof window !== 'undefined') {
      window[name] = this.end()
    }
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
    const _export = Object.assign(this._fn, this._exports)

    _export.__esModule = true
    _export.default = _export

    return _export
  }

  /**
   * @since 0.1.0
   * @desc returns as a string, to export the raw code
   * @return {string} code
   */
  toString() {
    return require('tosource')(this.end())
  }
}

// can export itself haha
// exports = module.exports = Exports.export(Exports).props({Exports}).end()

const exprt = Exports
exprt.Exports = Exports
exprt.default = exprt
exprt.__esModule = true

exports = module.exports = exprt
