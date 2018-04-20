import api from '../../../api/index'
Page({
  data: {
    detailInfo: {},
    saleAreaList:[]
  },
  onLoad(params) {
    this.getDetail(params.id)
  },
  getDetail(id) {
    wx.showLoading({
      'title': '加载中',
      'mask': true
    })
    api.channelInfo({ 'channelId': id }).then(res => {
      wx.hideLoading()
      if (res.ret != '0') {
        wx.showToast({
          title: res.retinfo,
          icon: 'none'
        })
        return
      }
      let saleAddrList = res.data.saleAreaList.map(item => item.addr_province_name + item.addr_city_name + item.addr_area_name)
      this.setData({
        detailInfo: res.data,
        saleAreaList: saleAddrList
      })
    })
  }

})