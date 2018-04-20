//index.js
import api from '../../../api/index'
import util from '../../../util/index.js'
var config = require('../../../config/index.js')
let currentTime = util.formatDate(new Date().getTime())
const app = getApp()
Page({
  data: {
    channelName:'',
    searchList: [], //放置返回数据的数组  
    noData:false
  },
  onLoad(params) {
    this.fetchSearchList(params.id) //根据商户ID获取门店
    this.setData({
      'channelName': params.channelName
    })
  },
  fetchSearchList(id) {
    let searchPageNum = this.data.searchPageNum//把第几次加载次数作为参数  
    let reqData = {
      'userId': app.globalData.userInfo.channelUserId,
      "channelId": id
    }
    wx.showLoading({
      'title': '加载中',
      'mask': true
    })
    api.bdStoreList(reqData).then(res => {
      wx.hideLoading()
      if (res.ret != '0') {
        wx.showToast({
          title: res.retinfo,
          icon: 'none'
        })
        return
      }
      if (res.list.length == 0) {
        this.setData({
          noData: true,
        });
        return
      }
      this.setData({
        'searchList': res.list
      })
    })
  },
  goSearch() {
    wx.showToast({
      title: '功能开发中，敬请期待',
      icon: 'none'
    })
  }

})  