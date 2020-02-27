'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_URL:'"http://fat01-common-task-manager-service.zykj.com"', //测试环境的基础配置
})
