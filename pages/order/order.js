//index.js
const app = getApp()
import api from '../../api/index'  
import util from '../../util/index.js'
var config = require('../../config/index.js')
let currentTime = util.formatDate(new Date().getTime())
Page({
  data: {
    filter:{
      statusId:'0',
      statusIndex:0,
      startTime: currentTime,
      endTime: currentTime
    },
    chooseTime:{
      startTime: currentTime,
      endTime: currentTime
    },
    nowTime:'',
    // showFilterTime: true,//时间筛选开关
    showFilterTime: false,//时间筛选开关
    statusList:[
      {id:'0',name:'全部订单'},
      { id: '10', name: '待拍照' },
      { id: '11', name: '审核中' },
      { id: '14', name: '已预付款' },
      { id: '20', name: '已发货' },
      { id: '40', name: '已收货' },
      { id: '80', name: '订单取消' },
      { id: '81', name: '交易关闭' },
      { id: '90', name: '待退款' },
      { id: '95', name: '退货中' },
      { id: '100', name: '议价中' },
      { id: '110', name: '已退货' },
      { id: '120', name: '退货完成' },
      { id: '130', name: '订单完成' },
      { id: '255', name: '待付款' }
    ],
    searchOrderList: [], //放置返回数据的数组  
    isFromSearch: true,   // 用于判断searchOrderList数组是不是空数组，默认true，空的数组  
    searchPageNum: '0',   // 设置加载的第几次，默认是第一次  
    callbackcount: 15,      //返回数据的个数  
    refresh: false, //下拉刷新变量，默认false，隐藏
    searchLoading: false, //"上拉加载"的变量 
    searchLoadingComplete: false , //“没有数据”的变量，默认false，隐藏  
    phoneimgCDNUrl:'',
    highPricePhone: config.highPricePhone,
    loading:true
  },
  onShow(){
    //是否有搜索条件
    if (false){

    }else{
      this.init()
    }
  },
  onHide(){
    //页面隐藏时 
    this.setData({
      'loading': true
    })
    //将搜索参数初始化

  },
  //搜索，访问网络  
  fetchSearchList: function () {
    let searchPageNum = this.data.searchPageNum,//把第几次加载次数作为参数  
        callbackcount = this.data.callbackcount; //返回数据的个数 

    //设置筛选值 ing..     
    let reqData = {
      "roleId": app.globalData.userInfo.userId, 
      "channelUserId": app.globalData.userInfo.channelUserId, 
      "orderStatus": this.data.filter.statusId,
      "searchKey": "",
      "startTime": this.data.filter.startTime+' 00:00:01',
      "endTime": this.data.filter.endTime + ' 23:59:59',
      "pageIndex": searchPageNum+'',
      "pageSize": "10"
    }
    api.orderList(reqData).then(res=>{
      if (res.ret != '0') {
        wx.showToast({
          title: res.retinfo,
          icon:'none'
        })
        return
      }
      //关闭下拉
      wx.stopPullDownRefresh();
      let result = res.data
      this.setData({ 
        phoneimgCDNUrl: result.phoneimgCDNUrl,
        statusInfo: result.statusInfo,
        statusInfoDp: result.statusInfoDp
      })
      if (result.orderList.length != 0) {
        let searchList = [];
        //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
        this.data.isFromSearch ? searchList = result.orderList : searchList = this.data.searchOrderList.concat(result.orderList)
        searchList.forEach(item=>{
          let orderStatusName = '无'
          this.data.statusInfoDp.forEach(val=>{
            if (item.orderStatus == val.statusId) item.orderStatusName = val.showName
          })
        })
        
        this.setData({
          searchOrderList: searchList, //获取数据数组  
          loading: false, //在设置searchOrderList数据后再显示
          searchLoading: true   
        });
        console.log(22266)
        if (result.orderList.length < 10){ //加载数不足10条，代表已加载全部
          this.isOver()
          return
        }
        //没有数据了，把“没有数据”显示，把“上拉加载”隐藏  
      } else {
        console.log(222)
        this.isOver()
      }
    })
  },
  //点击搜索按钮，触发事件  
  init: function (e) {
    this.initData()
    this.fetchSearchList();
  },
  initData:function(){
    this.setData({
      loading: true,
      searchPageNum: '0',   //第一次加载，设置1  
      searchOrderList: [],  //放置返回数据的数组,设为空  
      isFromSearch: true,  //第一次加载，设置true  
      searchLoading: true,  //把"上拉加载"的变量设为true，显示  
      searchLoadingComplete: false //把“没有数据”设为false，隐藏  
    })
  },
  isOver(){
    this.setData({
      loading: false, //在设置searchOrderList数据后再显示
      searchLoadingComplete: true, //把“没有数据”设为true，显示  
      searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
    });
  },
  //滚动顶部触发刷新  
  searchScrollToupper: function () {
    var self = this
    this.setData({
      refresh:true
    })
    setTimeout(()=>{
      let date = new Date()
      self.setData({
        refresh:false,
        loading:true
      })
      this.init()
    },1000)
    
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
  },
  //订单筛选
  bindPickerChange(e){
    this.setData({
      'filter.statusIndex' : e.detail.value,
      'filter.statusId': this.data.statusList[e.detail.value].id
    })
    //then请求筛选数据
    this.init()
  },
  filterTime(){
    this.setData({
      showFilterTime:true
    })
  },
  bindStartDateChange(e){
    this.setData({
      'chooseTime.startTime':e.detail.value
    })
  },
  bindEndDateChange(e){
    this.setData({
      'chooseTime.endTime': e.detail.value
    })
  },
  closeChooseTime(){
    this.setData({
      showFilterTime: false
    })
  },
  submitChooseTime(){
    this.closeChooseTime()
    this.setData({
      'filter.startTime': this.data.chooseTime.startTime,
      'filter.endTime': this.data.chooseTime.endTime
    })
    this.init()
  }

})  