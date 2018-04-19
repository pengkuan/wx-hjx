import api from '../../../api/index'
Page({
  data: {
    detailInfo: {},
    channelName:'',
    bd1Info:{},
    s2Info:{}
  },
  onLoad(params) {
    this.getDetail(params.id)
    this.getStoreRelationPeople(params.id,'S2','s2Info')
    this.getStoreRelationPeople(params.id,'BD1', 'bd1Info')
  },
  
  getDetail(id) {
    api.storeInfo({ 'storeId': id }).then(res => {
      if (res.ret != '0') {
        wx.showToast({
          title: res.retinfo,
          icon: 'none'
        })
        return
      }
      this.setData({
        detailInfo: res.data,
        channelName: res.data.relationUp.filter(item => item.strLevelCode == 'REL002')[0].strRelationName
      })
    })
  },
  getStoreRelationPeople(id,type,receiveData){
    let reqData = {
      'storeId': id,
      "strPeopleType": type
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
        [receiveData]: res.data[0], //获取数据数组  
      });
    })
  }

})