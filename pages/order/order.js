//index.js
const app = getApp()
import api from '../../api/index'  
var util = require('../../util/utils1.js')
var config = require('../../config/index.js')
Page({
  data: {
    searchSongList: [], //放置返回数据的数组  
    isFromSearch: true,   // 用于判断searchSongList数组是不是空数组，默认true，空的数组  
    searchPageNum: '0',   // 设置加载的第几次，默认是第一次  
    callbackcount: 15,      //返回数据的个数  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false , //“没有数据”的变量，默认false，隐藏  
    phoneimgCDNUrl:'',
    highPricePhone: config.highPricePhone
  },
  onLoad(){
    this.keywordSearch()
  },
  //搜索，访问网络  
  fetchSearchList: function () {
    let searchPageNum = this.data.searchPageNum,//把第几次加载次数作为参数  
        callbackcount = this.data.callbackcount; //返回数据的个数  
    let reqData = {
      "roleId": app.globalData.userInfo.userId, 
      "channelUserId": app.globalData.userInfo.channelUserId, 
      "orderStatus": "0",
      "searchKey": "",
      "startTime": "2018-01-02 12:00:00",
      "endTime": "2018-02-02 12:00:00",
      "pageIndex": searchPageNum+'',
      "pageSize": "10"
    }
    api.orderList(reqData).then(res=>{
      if (res.ret != '0') {
        this.setData({
          'warnInfo': res.retinfo
        })
        return
      }
      let result = res.data
      this.setData({
        phoneimgCDNUrl: result.phoneimgCDNUrl,
        statusInfo: result.statusInfo,
        statusInfoDp: result.statusInfoDp
      })
      if (result.orderList.length != 0) {
        let searchList = [];
        //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
        this.data.isFromSearch ? searchList = result.orderList : searchList = this.data.searchSongList.concat(result.orderList)
        searchList.forEach(item=>{
          let orderStatusName = '无'
          this.data.statusInfoDp.forEach(val=>{
            if (item.orderStatus == val.statusId) item.orderStatusName = val.showName
          })
        })
        this.setData({
          searchSongList: searchList, //获取数据数组  
          searchLoading: true   //把"上拉加载"的变量设为false，显示  
        });
        //没有数据了，把“没有数据”显示，把“上拉加载”隐藏  
      } else {
        this.setData({
          searchLoadingComplete: true, //把“没有数据”设为true，显示  
          searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
        });
      }
    })
  },
  //点击搜索按钮，触发事件  
  keywordSearch: function (e) {
    this.setData({
      searchPageNum: '0',   //第一次加载，设置1  
      searchSongList: [],  //放置返回数据的数组,设为空  
      isFromSearch: true,  //第一次加载，设置true  
      searchLoading: true,  //把"上拉加载"的变量设为true，显示  
      searchLoadingComplete: false //把“没有数据”设为false，隐藏  
    })
    this.fetchSearchList();
  },
  //滚动到底部触发事件  
  searchScrollLower: function () {
    if (this.data.searchLoading && !this.data.searchLoadingComplete) {
      this.setData({
        searchPageNum: Number(this.data.searchPageNum) + 1 +'',  //每次触发上拉事件，把searchPageNum+1  
        isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false  
      });
      this.fetchSearchList();
    }
  },
  goSearch(){
    wx.navigateTo({ 'url': '/pages/searchOrder/searchOrder'})
  }
})  