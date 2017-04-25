let resolve = null
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
   * @param  {exports} exportsexports
   * @return {Exports} @chainable
   */
  static export(_exports, exportsexports) {
    const ex = new Exports()
    ex._module = {exports: _exports}

    exportsexports = ex._module.exports

    // default fn here, since they are object.assigned in Exports.finish
    ex._fn = ex._module.exports

    return ex
  }

  /**
   * @since 0.1.0
   * @desc pass in module
   * @param  {Module} _module
   * @param  {exports} exportsexports
   * @return {Exports} @chainable
   */
  static module(_module, exportsexports) {
    const ex = new Exports()

    // @NOTE this is for when there is no module, e.g. web
    if (typeof module === 'undefined') {
      _module = {exports: {}}
    }

    ex._exports = _module.exports

    // default fn here, since they are object.assigned in Exports.finish
    ex._fn = _module.exports
    ex._module = _module
    // reassign `exports`, not needed
    // exportsexports = _module.exports
    // ex._module = _module

    return ex
  }


  /**
   * @alias main
   * @since 0.1.0
   * @param  {Function | Object} func
   * @return {Exports} @chainable
   */
  fn(func) {
    this._fn = func
    return this
  }
  main(any) {
    this._fn = any
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

    let _exports = this._fn

    if (path.includes('/')) {
      const prop = path.split('/').pop()
      this._fn[prop] = {}
      _exports = this._fn[prop]
    }

    const resolved = this._dir + (path === '' ? '' : path + '/')

    for (let n = 0; n < names.length; n++) {
      const name = names[n]
      _exports[name] = require(`${resolved}${name}`) // eslint-disable-line
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
    // so we only include it for dynamics
    if (resolve === null) {
      resolve = require('path').resolve
    }

    // when path is empty, single argument
    if (Array.isArray(path)) {
      names = path
      path = ''
    }

    // setup paths
    // @example
    //    exports.plugins.eh.Moose
    let _exports = this._fn
    let step
    if (path.includes('/')) {
      step = path.split('/').pop()
      this._fn[step] = {}
      _exports = _exports[step]
    }

    // const resolved = this._dir + (path === '' ? '' : path + '/')
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

      const descriptor = {
        configurable: true,
        enumerable: true,
        // eslint-disable-next-line
        get() {
          const resolvedPath = resolve(resolved, name)
          return require(resolvedPath) // eslint-disable-line
        },
      }

      /**
       * @NOTE when defining on this._fn, Object.assign calls the getter.
       */
      Object.defineProperty(_exports, propName, descriptor)

      // @NOTE: storing module fixes this
      // so create as needed
      // if (step === undefined)
      //   Object.defineProperty(this._fn, propName, descriptor)
      // else
      //   Object.defineProperty(this._fn[step], propName, descriptor)
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
    this._fn.default = this._fn
    this._fn.__esModule = true

    // needs that reference to the original module
    // or else this is on an empty obj
    this._module.exports = this._fn

    return this._fn
  }
}

// can export itself haha
// exports = module.exports = Exports.export(Exports).props({Exports}).end()

const exprt = Exports
exprt.Exports = Exports
exprt.default = exprt
exprt.__esModule = true

exports = module.exports = exprt
