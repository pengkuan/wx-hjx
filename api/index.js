const http = require('./http')
import user from '../model/user'
const app = getApp()

function fetch(api, Interface, params){
  //检查登录态是否过期
  let res = http.fetch(api, Interface, params)
  setTimeout(()=>{
    res.then(
      data => {
        if (data.retcode == 'RECYCLEMANAGE-FACADE-9999') { //token过期
          reLogin()
          return
        }
      }
    )
  },500)
  return res
}
export default {
  loginGetCaptcha(params) { return fetch('recycle-manage', 'loginGetCaptcha', params) },
  checkBindInfo(params) { return fetch('recycle-manage', 'checkBindInfo', params) },
  loginCaptcha(params) { return fetch('recycle-manage', 'loginCaptcha', params) },
  unBind(params) { return fetch('recycle-manage', 'unBind', params) },
  orderList(params) { return fetch('recycle-manage', 'orderList', params) },
  orderDetail(params) { return fetch('recycle-manage', 'orderDetail', params) },
  orderFlow(params) { return fetch('recycle-manage', 'orderFlow', params) },
  orderHistory(params) { return fetch('recycle-manage', 'orderHistory', params) },
  //组织架构相关
  channelInfo(params) { return fetch('recycle-manage', 'channel_detail', params) }, //获取渠道详情
  storeInfo(params) { return fetch('recycle-manage', 'getStoreInfo', params) }, //获取门店详情
  employeeInfo(params) { return fetch('recycle-manage', 'get_jobnumber_info', params) }, //获取店员详情
  bdChannelList(params) { return fetch('recycle-manage', 'getBdChannelList', params) }, //BD对应渠道列表
  bdStoreList(params) { return fetch('recycle-manage', 'getBdStoreListByChannelId', params) }, //BD对应门店列表
  bdEmployeeList(params) { return fetch('recycle-manage', 'get_related_people_list', params) } //BD对应店员列表 参数为S1

}

function reLogin(){
  let code;
  user.getWxCode().then(data =>{
    code = data
    //检查是否有绑定，没有则去绑定
    wx.showLoading({
      'title': '正在重新登录！',
      'mask': true
    })
    http.fetch('recycle-manage', 'checkBindInfo',{ jsCode: code }).then((res) => {
      wx.hideLoading()
      if (res.ret != '0') {
        wx.showModal({
          title: '提示',
          content: res.retinfo,
          showCancel: false
        })
        return
      }
      if (res.data) {
        if (res.data.isBind != '1') { //为1时代表已绑定,所以不为1则去绑定
          console.log('登录完成跳去绑定')
          wx.redirectTo({ 'url': '/pages/check/check' })
          return
        }
        //否则 代表已绑定 重新设置信息
        app.globalData.userInfo = {
          channelUserId: res.data.channel_user_id,
          tel: res.data.phone,
          userName: res.data.username,
          userId: Math.max.apply(Math, res.data.roleList) + ''
        }
        wx.setStorage({
          key: "loginToken",
          data: res.data.login_token
        })
        console.log('登录完成跳去首页')
        //登录完成跳去首页
        wx.switchTab({ url: '/pages/index/index'})
      }
    })
  })
}