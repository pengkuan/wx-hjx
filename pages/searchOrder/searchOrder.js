//index.js
const app = getApp()
import api from '../../api/index'
var util = require('../../util/utils1.js')
Page({
  data: {
    typeId:'1',
    searchKey:'',
    typeList:[
      { id: '1', name:'订单号'},
      { id: '2', name: '手机型号' },
      { id: '3', name: '物流单号' },
      { id: '4', name: '门店名称' }
    ],
    searchHistory: ['iPhone 8', '123456', '深圳市南山区', 'iPhone 8', '123456', '深圳市南山区']
  },
  onLoad() {
    // app.globalData.orderDetailOrigin = false //将跳转订单列表的
    app.globalData.orderListOrigin = 'orderSearch'
    //获取搜索记录 0代表获取所有
    this.handleSearchHistory('0')
  },
  handleKey(e) {
    this.setData({
      searchKey: e.detail.value
    });
    
  },
  typeTapHandler(event) {
    let dataSet = event.currentTarget.dataset;
    this.setData({
      typeId: dataSet.id,
    })
  },
  getSearch(){
    let type = this.data.typeId , 
        key  = this.data.searchKey,
        reg = /^\d{1,}$/; //只是一位数字
    switch (type ){
      case '1':
        console.log(66666)
        if (!reg.test(key)){
          wx.showToast({
            title: '请输入正确订单号',
            icon: 'none'
          })
          return
        }
        break
      case '3':
        if (!reg.test(key)) {
          wx.showToast({
            title: '请输入正确物流单号',
            icon: 'none'
          })
          return
        }
        break
    }
    if(!this.data.searchKey){
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      })
      return
    }
    this.handleSearchHistory('1')
  },
  delSearchHistory(){
    let self = this
    wx.showModal({
      title: '',
      content: '确认删除最近搜索记录?',
      success:function(res){
        if (res.confirm){
          self.handleSearchHistory('2')
        }
      }
    })
  },
  handleSearchHistory(operate){
    let reqData = {
      "channelUserId": app.globalData.userInfo.channelUserId,
      "roleId": app.globalData.userInfo.userId,
      "operate": operate,
      "search": this.data.searchKey
    }
    api.orderHistory(reqData).then( res=>{
      if (res.ret != '0') {
        wx.showToast({
          title: res.retinfo,
          icon: 'none'
        })
        return
      }
      switch(operate){
        case '0':
          this.setData({
            searchHistory: res.data.history
          })
          break
        case '1':
          console.log(this.data.searchKey)
          app.globalData.orderSeachOrigin = true
          app.globalData.orderSeach = {
            'keyType': String(this.data.typeId),
            'searchKey': this.data.searchKey
          }
          wx.switchTab({
            url: '/pages/order/order',
          })

          break
        case '2':
          this.setData({
            searchHistory: []
          })
          break
      }
      
    })
  }
  
})  