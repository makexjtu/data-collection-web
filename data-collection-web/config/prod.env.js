'use strict'
let params = process.argv[2]
let baseUrl = ''
switch (params) {
  //开发环境
  case 'dev':
    baseUrl = '"http://192.168.0.127:8080"';
    break;
  //生产环境
  case 'prod':
    baseUrl = '"http://192.168.0.127:8080"';
    break;
  default:
    baseUrl = '"http://192.168.0.127:8080"';
    break;
}
//生产环境
module.exports = {
  NODE_ENV: '"production"',
  VUE_APP_API_ROOT: baseUrl
}

//npm run build、npm run build test、npm run build prod
