const fliplog = require('fliplog')
const full = require('./full')
const optimized = require('./full/index-optimized')

log.quick(full, optimized)
// const data = fliplog.verbose(100).getVerbose(full)
// fliplog.json(data).echo()
