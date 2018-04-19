import api from '../../../api/index'
Page({
  data: {
    detailInfo: {},
    s2Info:{}
  },
  onLoad(params) {
    this.getDetail(params.id)
    this.getStoreBD1(params.storeId)
  },
  
  getDetail(id) {
    api.employeeInfo({ 'strUserId': id }).then(res => {
      if (res.ret != '0') {
        wx.showToast({
          title: res.retinfo,
          icon: 'none'
        })
        return
      }
      let result = res.data
      res.data.relationInfo.forEach(item=>{
        if (item.strRelationCode == 'REL004') result.channelName = item.strRelationNmae
        if (item.strRelationCode == 'REL002') result.storeName = item.strRelationNmae
      })
      this.setData({
        detailInfo: result
      })
    })
  },
  getStoreBD1(storeId) {
    let reqData = {
      'storeId': storeId,
      "strPeopleType": 'S2'
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
        s2Info: res.data[0], 
      });
    })
  }

})