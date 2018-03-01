//index.js
//获取应用实例
const app = getApp()
import user from '../../model/user'
import api from '../../api/index'
Page({
  data: {
    isBind:false,//检查是否绑定，未绑定则去登录绑定
    listData: [
      { "code": "今天", "text1": "-", "text2": "-", "text3": "-", "text4": "-"},
      { "code": "昨天", "text1": "-", "text2": "-", "text3": "-", "text4": "-" },
      { "code": "本周", "text1": "-", "text2": "-", "text3": "-", "text4": "-" }
    ],
    imgUrls: [
      "../../image/home_banner1.png",
      "../../image/home_banner1.png",
      "../../image/home_banner1.png"
    ],
    showIntroduce:false,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onShow() {
    app.globalData.orderListOrigin = 'other' //跳回订单列表时使用 
  },
  onLoad: function () {
    // app.globalData.orderSeachOrigin = false
    
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
          //否则 代表已绑定 展示页面并设置信息
          this.setData({ isBind : true })
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
  goSearch() {
    wx.navigateTo({ 'url': '/pages/searchOrder/searchOrder' })
  },
  todayOrder(){
    app.globalData.orderDetailOrigin = false //跳回订单列表时使用
    wx.switchTab({
      url: '/pages/order/order',
    })
  },
  showToast(){
    wx.showToast({
      title: '功能开发中，敬请期待',
      icon:'none'
    })
  },
  showIntroduce(bool){
    this.setData({
      showIntroduce : true
    })
  },
  closeIntroduce(){
    this.setData({
      showIntroduce: false
    })
  },
  //下来刷新
  onPullDownRefresh: function () {
    console.log(6333)
    //结束后关闭刷新
     wx.stopPullDownRefresh();
  },
})
