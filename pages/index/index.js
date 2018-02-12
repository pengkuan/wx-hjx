//index.js
//获取应用实例
const app = getApp()
import user from '../../model/user'
import api from '../../api/index'
Page({
  data: {
    motto: '首页功能待开发',
  },
  onLoad: function () {
    user.getWxCode().then((code) => {
      this.setData({
        code: code
      })
      //检查是否有绑定，没有则去绑定
      wx.showLoading({
        'title':'正在检查绑定信息！',
        'mask':true
      })
      api.checkBindInfo({ jsCode: code }).then((res) => {
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
            wx.redirectTo({'url': '/pages/check/check'})
            return
          }
          app.globalData.userInfo = {
            channelUserId: res.data.channel_user_id,
            tel: res.data.phone,
            userName: res.data.username,
            userId: Math.max.apply(Math, res.data.roleList)+''
          }
          wx.setStorage({
            key: "loginToken",
            data: res.data.login_token
          })
        }
      })
    })

  },
  
})
