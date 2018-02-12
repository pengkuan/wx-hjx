//index.js
//获取应用实例
import user from '../../model/user'
import Utils from '../../util/index'
import api from '../../api/index'
const app = getApp()

Page({
  data: {
    code:'',
    warnInfo:'',
    tel:'',
    telValue:'',
    isValidTel:false,
    preLenth:0
  },
  onLoad: function () {},
  next(){
    if (!Utils.isMobile(this.data.telValue)){
      this.setData({
        'warnInfo' : '手机号输入有误'
      })
      return
    } 
    user.getWxCode().then((code) => {
      const data = {
        'phone': this.data.telValue,
        'jsCode': code
      }
      wx.showLoading({
        'title': '获取验证码',
        'mask': true
      })
      api.loginGetCaptcha(data).then( res =>{
        wx.hideLoading()
        if(res.ret != '0'){
          this.setData({
            'warnInfo': res.retinfo
          })
          return
        }
        //验证码登录
        wx.navigateTo({ 'url': '/pages/login/login?tel=' + this.data.telValue})
      })
    })
  },

  clearTel() {
    this.setData({
      tel: '',
      isValidTel: false,
      warnInfo: '',
      code: ''
    })
  },
  handleTel(e) {
    let tel = e.detail.value,
      len = tel.length,
      telValue = tel.split(' ').join('');
    if (len > this.data.preLenth && (len == 3 || len == 8) ) tel += ' '; //增加时自动加空格
    if (len < this.data.preLenth && (len == 3 || len == 8)) tel = tel.slice(0,len-1); //删除时自动删空格
    this.setData({
      telValue,
      preLenth: tel.length, //重新获取length   
      tel: tel,
      isValidTel: telValue && telValue.length === 11
    })
    
  }
})
