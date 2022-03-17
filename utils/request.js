/**
       request.js
     * 封装一个Promise风格的通用请求
     * url - 请求地址
     * option - 包含请求方式、请求参数的配置对象
 */
var app = getApp(); //引入全局app.js，我们可以在globalData中定义一些公用的数据，比如baseUrl、token
import Toast from "../miniprogram_npm/@vant/weapp/toast/toast"; //引入vant插件，用于提示错误
import Notify from "../miniprogram_npm/@vant/weapp/notify/notify"; //引入vant插件，用于提示错误
const auth = require("./auth");

const request = function (url, options) {
  // console.log(options)
  return new Promise((resolve, reject) => {
    if(!options.noToast){
      Toast.loading({
        duration: 10000,
        message: '加载中...',
        forbidClick: false,
      });
    }
    wx.request({
      url: app.globalData.baseUrl + url,
      method: options.method,
      data:
        options.method == "GET" ? options.data : JSON.stringify(options.data),
      // header这里根据业务情况自行选择需要还是不需要
      header: {
        // Authorization: "Bearer " + app.globalData.token,
        WechatId: auth.getUserWechatName()
      },
      success: (res) => {
        //console.log("enter success");
        Toast.clear();
        if (res.statusCode === 503 || res.statusCode === 500) {
          console.log("res");
          if(res.statusCode === 500)
            Notify({ type: 'danger', message: '服务器获取失败' });
          reject(res.data.msg);
        } else {
          resolve(res);
        }
      },
      fail: (err) => {
        console.log(err);
        Toast.clear();
        Notify({ type: 'danger', message: '服务器获取失败' });
        reject(err);
      },
    });
  });
};

module.exports = {
  //封装get方法
  get(url, options) {
    return request(url, {
      ...options,
      method: "GET"
    });
  },
  //封装post方法
  post(url, options) {
    return request(url, {
      ...options,
      method: "POST",
    });
  },
};
