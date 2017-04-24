const Record = require('bench-chain')

const {record} = Record.suite(__dirname, true)

record.setup().load().echoTrend()
