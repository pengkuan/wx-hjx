// 微信授权在回收宝中的授权类型ID
export const WX_AUTH_TYPE = 2;
// 微信小程序的APPID
export const WX_APP_ID = 'wxdd35de8f647a231f'; 

export const host = 'https://dev-app.huanjixia.com/api/';
// export const host = 'http://www.agentapi.com:8888/api/';

export const highPricePhone = 20000;//高价机判断 单位为分

// Model
const user = `${host}common/user/`;
const product = `${host}common/product/`;
const order = `${host}common/order/`;
const coupon = `${host}common/coupon/`;
const help = `${host}common/help/`;

// Router
export const url = {

  // 获取微信openid
  wxOpenId: `${user}wxAppOpenId`,
  // 第三方授权登录
  authUserLogin: `${user}authUserLogin`,
  // 绑定手机号并登录
  bindTelLogin: `${user}authUserBindTelLogin`,
  // 获取手机验证码
  getCode: `${user}getCode`,
  // 第三方用户手机号解除绑定(用户已经将手机号和openid绑定起来)
  authUserUnbindTel: `${user}authUserUnbindTel`,

  // 订单分页查询
  orders: `${user}getOrderList`,

};