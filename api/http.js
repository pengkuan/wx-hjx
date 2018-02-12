/**
 * 抓取远端API的结构
 * @param  {String} api    api 根地址
 * @param  {String} path   请求路径
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */
const config = require('../config/index')
let request = function (api, Interface, params) {
  var resParams = {
    'head': {
      'version': "0.01",
      'msgtype': "request",
      'interface': Interface,
      'remark': ""
    },
    'params': {
      "system":"RECYCLE_MANAGE",
      "sign": "1234567891",
      "time": String(new Date().getTime()).substr(0, 10),
      "login_token": wx.getStorageSync('loginToken')
    }
  }
  Object.assign(resParams.params ,params)
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}`,
      data: resParams,
      method:'POST',
      header: { 'Content-Type': 'application/json'},
      success: resolve,
      fail: reject
    })
  })
}

module.exports = {
  fetch: function (path, Interface, params){
    return request(config.host + path, Interface, params)
      .then(res => res.data.body)
  }
}