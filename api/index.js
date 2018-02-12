const http = require('./http')
export default {
  loginGetCaptcha(params) { return http.fetch('recycle-manage', 'loginGetCaptcha', params) },
  checkBindInfo(params) { return http.fetch('recycle-manage', 'checkBindInfo', params) },
  loginCaptcha(params) { return http.fetch('recycle-manage', 'loginCaptcha', params) },
  unBind(params) { return http.fetch('recycle-manage', 'unBind', params) }, 
  orderList(params) { return http.fetch('recycle-manage', 'orderList', params) }
}