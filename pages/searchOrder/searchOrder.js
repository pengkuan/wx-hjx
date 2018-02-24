//index.js
const app = getApp()
import api from '../../api/index'
var util = require('../../util/utils1.js')
Page({
  data: {
    typeId:1,
    searchkey:'',
    typeList:[
      { id: '1', name:'订单号'},
      { id: '2', name: '手机型号' },
      { id: '3', name: '物流单号' },
      { id: '4', name: '门店名称' }
    ],
    searchHistory: ['iPhone 8', '123456', '深圳市南山区', 'iPhone 8', '123456', '深圳市南山区']
  },
  onLoad() {
    //获取搜索记录
  },
  handleKey(e) {
    this.setData({
      searchkey: e.detail.value
    });
    
  },
  typeTapHandler(event) {
    let dataSet = event.currentTarget.dataset;
    this.setData({
      typeId: dataSet.id,
    })
  },
  getSearch(){
    console.log(this.data.searchkey , this.data.typeId)
  },
  delSearchHistory(){
    let self = this
    wx.showModal({
      title: '',
      content: '确认删除最近搜索记录?',
      success:function(res){
        if (res.confirm){
          self.setData({
            searchHistory: []
          })
        }
      }
    })
  }
  
})  