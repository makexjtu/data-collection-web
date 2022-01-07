'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
let params = process.argv[2]
let baseUrl = ''
switch (params) {
  //开发环境
  case '--env=dev':
    baseUrl = '"http://192.168.0.141:8021"';
    //baseUrl = '"http://192.168.0.127:8020"';
    break;
  //测试环境
  case '--env=test':
    baseUrl = '"http://192.168.0.127:8020"';
    break;
  default:
    baseUrl = '"http://192.168.0.127:8080"';
    break;
}
//开发环境
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //变量的名字必须要以VUE_APP_**开头才能获取到，否则是获取不到的
  VUE_APP_API_ROOT: baseUrl
})
