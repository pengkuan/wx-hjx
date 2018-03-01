//app.js
App({
  globalData: {
    code: '',
    orderSeach: '', //订单搜索明细使用
    orderListOrigin:'other', //取值 orderDetail(订单详情)、orderSearch(订单搜索明细)、other(其他)
    roderDetailOrigin:false,//判断跳转到订单列表的origin是否为订单详情页
    orderSeachOrigin: false,//判断跳转到订单列表的origin是否为订单详情页
    userInfo: {}
  },
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
  
})