//index.js
const app = getApp()
import api from '../../../api/index'
import util from '../../../util/index.js'
var config = require('../../../config/index.js')
Page({
  data: {
    searchList: [], //放置返回数据的数组 
    storeId: '',
    channelName:'',
    storeName:''
  },
  onLoad(params) {
    this.fetchSearchList(params.id) //根据门店ID获取店员
    this.setData({
      storeId: params.id,
      channelName: params.channelName,
      storeName: params.storeName
    })
  },
  fetchSearchList(id) {
    let searchPageNum = this.data.searchPageNum//把第几次加载次数作为参数  
    let reqData = {
      "roleId": app.globalData.userInfo.userId,
      "channelUserId": app.globalData.userInfo.channelUserId,
      'storeId': id,
      "strPeopleType": "S1"
    }
    api.bdEmployeeList(reqData).then(res => {
      if (res.ret != '0') {
        wx.showToast({
          title: res.retinfo,
          icon: 'none'
        })
        return
      }
      this.setData({
        searchList: res.data, //获取数据数组  
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