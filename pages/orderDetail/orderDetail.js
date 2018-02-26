Page({
  data:{
    orderNo:'',
    showOrderTrack: false,
    animationData: {},
    orderTrackList:[
      { name: '订单完成', time: '1月1日 12:12' },
      { name: '订单已提交', time: '1月1日 12:12' },
      { name: '审批通过', time: '1月1日 12:12' },
      { name: '付款完成', time: '1月1日 12:12' },
      { name: '发货完成', time: '1月1日 12:12' },
      { name: '发货完成', time: '1月1日 12:12' },
      { name: '验货完成', time: '1月1日 12:12' }
    ]
  },
  onLoad(params){
    this.setData({
      orderNo: params.orderId
    })
  },
  copyOrderNo(){
    wx.setClipboardData({
      data: this.data.orderNo,
      success: function (res) {
        wx.showToast({
          title: '复制成功'
        })
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  chooseSezi: function (e) {
    var self = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    self.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    self.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      showOrderTrack: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      self.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        showOrderTrack: false
      })
    }, 200)
  }
  
})