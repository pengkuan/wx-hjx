const http = require('./http')
export default {
  loginGetCaptcha(params) { return http.fetch('recycle-manage', 'loginGetCaptcha', params) },
  checkBindInfo(params) { return http.fetch('recycle-manage', 'checkBindInfo', params) },
  loginCaptcha(params) { return http.fetch('recycle-manage', 'loginCaptcha', params) },
  unBind(params) { return http.fetch('recycle-manage', 'unBind', params) }, 
  orderList(params) { return http.fetch('recycle-manage', 'orderList', params) },
  orderDetail(params) { return http.fetch('recycle-manage', 'orderDetail', params) },
  orderFlow(params) { return http.fetch('recycle-manage', 'orderFlow', params) },
  orderHistory(params) { return http.fetch('recycle-manage', 'orderHistory', params) }
}