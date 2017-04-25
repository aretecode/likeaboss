/* eslint block-scoped-var: "off" */
/* eslint complexity: "off" */
/* eslint no-redeclare: "off" */
/* eslint import/no-dynamic-require: "off" */
/* eslint no-loop-func: "off" */

/**
 * @param  {Object} obj optimized shorthand obj with all properties
 * @return {Object} object to export, Exports.end
 */
function from(obj) {
  var _exports = obj.target
  var dir = obj.dir // eslint-disable-line

  if (obj.fn !== undefined) _exports = obj.fn

  if (obj.props !== undefined) {
    var keys = Object.keys(obj.props)
    for (var k = 0; k < keys.length; k++) {
      _exports[keys[k]] = obj.props[keys[k]]
    }
  }

  if (obj.statics !== undefined) {
    var statics = Object.keys(obj.statics)
    var exportOn = _exports

    for (var s = 0; s < statics.length; s++) {
      var staticPath = statics[s]
      var resolvedStatic = dir + (staticPath === '' ? '/' : staticPath + '/')
      var staticVals = obj.statics[staticPath]

      if (staticPath.includes('/') === true) {
        var prop = staticPath.split('/').pop()
        _exports[prop] = {}
        exportOn = _exports[prop]
      }

      for (var sn = 0; sn < staticVals.length; sn++) {
        _exports[staticVals[sn]] = require(`${resolvedStatic}${staticVals[sn]}`)
      }
    }
  }

  if (obj.dynamics !== undefined) {
    var dynamicPaths = Object.keys(obj.dynamics)
    var exportOn = _exports

    for (var d = 0; d < dynamicPaths.length; d++) {
      var path = dynamicPaths[d]
      var vals = obj.dynamics[path]

      if (path.indexOf('/') > -1) {
        var dynamicPaths = path.split('/')
        var dynamicProp = dynamicPaths[dynamicPaths.length - 1]
        _exports[dynamicProp] = {}
        exportOn = _exports[dynamicProp]
        path = dynamicPaths[0]
      }

      var resolved = dir + '/' + (path === '' ? '/' : path + '/')

      for (var dn = 0; dn < vals.length; dn++) {
        var name = vals[dn]

        Object.defineProperty(exportOn, name, {
          configurable: false,
          enumerable: true,
          get() {
            return require(`${resolved}${name}`)
          },
        })
      }
    }
  }

  _exports.__esModule = true
  _exports.default = _exports

  return _exports
}

const exprt = from
exprt.from = from
exprt.default = exprt
exprt.__esModule = true

exports = module.exports = exprt
