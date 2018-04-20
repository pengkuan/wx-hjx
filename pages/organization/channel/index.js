//index.js
const app = getApp()
import api from '../../../api/index'
import util from '../../../util/index.js'
var config = require('../../../config/index.js')
let currentTime = util.formatDate(new Date().getTime())
Page({
  data: {
    searchList: [], //放置返回数据的数组  
    noData:false
  },
  onLoad() {
    this.fetchSearchList()
  },
  fetchSearchList() {
    let reqData = {
      'userId': app.globalData.userInfo.channelUserId
    }
    wx.showLoading({
      'title': '加载中',
      'mask': true
    })
    api.bdChannelList(reqData).then(res => {
      wx.hideLoading()
      if (res.ret != '0') {
        wx.showToast({
          title: res.retinfo,
          icon: 'none'
        })
        return
      }
      if(res.list.length == 0){
        this.setData({
          noData: true,  
        });
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