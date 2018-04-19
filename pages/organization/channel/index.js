//index.js
const app = getApp()
import api from '../../../api/index'
import util from '../../../util/index.js'
var config = require('../../../config/index.js')
let currentTime = util.formatDate(new Date().getTime())
Page({
  data: {
    searchList: [], //放置返回数据的数组  
  },
  onShow() {
    this.fetchSearchList()
  },
  fetchSearchList() {
    let reqData = {
      'userId': app.globalData.userInfo.channelUserId
    }
    api.bdChannelList(reqData).then(res => {
      if (res.ret != '0') {
        wx.showToast({
          title: res.retinfo,
          icon: 'none'
        })
        return
      }
      this.setData({
        searchList: res.list, //获取数据数组  
      });
    })
  },
  goSearch() {
    wx.showToast({
      title: '功能开发中，敬请期待',
      icon: 'none'
    })
  }
})  