//index.js
//获取应用实例

import Utils from '../../util/index'
import user from '../../model/user'
import api from '../../api/index'
const app = getApp()

Page({
  data: {
    code:'',
    warnInfo:'',
    phoneCode:'',
    time:60,
    isValidPhoneCode:false
  },
  onLoad: function (option) {
    this.setData({
      tel: option.tel
    })
    this.counting()
  },

  login(){
    if (this.data.phoneCode.length != 6){
      this.setData({
        'warnInfo' : '请输入6位验证码'
      })
      return
    } 
    let self = this
    user.getWxCode().then((code) => {
      const data = {
        'phone': self.data.tel,
        'jsCode': code,
        'code': self.data.phoneCode
      }
      wx.showLoading({
        'title': '正在登录',
        'mask': true
      })
      api.loginCaptcha(data).then( res =>{
        wx.hideLoading()
        if(res.ret != '0'){
          // wx.showModal({
          //   title: '提示',
          //   content: res.retinfo,
          //   showCancel: false
          // })
          self.setData({
            'warnInfo': res.retinfo
          })
          return
        }
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
        wx.switchTab({
          url: '/pages/index/index'
        })
      })
    })
  },

  clearPhoneCode() {
    this.setData({
      isValidPhoneCode: false,
      warnInfo: '',
      phoneCode: ''
    })
  },
  handlePhoneCode(e) {
    let phoneCode = e.detail.value;
    this.setData({
      phoneCode,
      isValidPhoneCode: phoneCode && phoneCode.length === 6
    })
    
  },
  getPhoneCode(){
    let self = this
    user.getWxCode().then((code) => {
      const data = {
        'phone': self.data.tel,
        'jsCode': code
      }
      wx.showLoading({
        'title': '正在获取',
        'mask': true
      })
      api.loginGetCaptcha(data).then(res => {
        wx.hideLoading()
        if (res.ret != '0') {
          self.setData({
            'warnInfo': res.retinfo
          })
          return
        }
        self.setData({
          'time': 60
        })
        self.counting()
      })
    })
  },
  counting() {
    let time = this.data.time;
    if (time === 0) return;
    setTimeout(() => {
      this.setData({
        time: time - 1
      });
      this.counting();
    }, 1000)
  },
})
