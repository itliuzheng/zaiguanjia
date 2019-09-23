'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  srconfig : '"test"',
  // BASE_API:'"http://119.147.171.108/storagePledgeManage"'
  BASE_API:'"http://192.168.11.121"'
})
