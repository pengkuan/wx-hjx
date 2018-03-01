//logs.js
const app = getApp()
import user from '../../model/user'
import api from '../../api/index'
Page({
  data: {
    wxUserInfo:{},
    userInfo: {}
  },
  onShow: function () {
    app.globalData.orderListOrigin = 'other'
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo
    })
    let _this = this
    wx.getUserInfo({
      lang: 'zh_CN',
      withCredentials: false,
      success(res) {
        console.log(res)
        _this.setData({
          wxUserInfo: res.userInfo
        })
      }
    })
    
  },
  unBind(){
    user.getWxCode().then((code) => {
      const reqData = {
        'phone': this.data.userInfo.tel,
        'jsCode': code,
        'login_token': wx.getStorageSync('loginToken')
      }
      wx.showLoading({
        'title': '退出中',
        'mask': true
      })
      api.unBind(reqData).then(res => {
        wx.hideLoading()
        if (res.ret != '0') {
          wx.showModal({
            title: '提示',
            content: res.retinfo,
            showCancel: false
          })
          return
        }
        wx.navigateTo({ 'url': '/pages/check/check'})
      })
    })
    

  }
})
