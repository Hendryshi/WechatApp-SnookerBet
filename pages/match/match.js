const api = require("../../utils/api"); //引入同意管理的接口js
const utils = require("../../utils/util");
const app = getApp(); //引入全局对象
import Toast from "/@vant/weapp/toast/toast"; //引入vant提示插件

Page({
  data: {
    idEvent: 1014,
    gameName: "斯诺克单局限时赛",
    dataArr: [],
    Time: 0,
  },

  onLoad(options){
    this.data.idEvent = options.idEvent;
    this.getMatchData(options.idEvent);
  },

  getMatchData(idEvent){
    api.getMatch(idEvent).then(function(res){
      this.setData({
        idEvent: res.data.idEvent,
        dataArr: res.data
      })
    }.bind(this))
    .catch(err => {
      Toast.fail("服务器无响应");
    })
  },

  onPullDownRefresh(){
    //this.getMatchData(this.data.idEvent);
    /*setTimeout(()=>{
      wx.stopPullDownRefresh();
    },1000);*/
    api.getMatch(0).then(function(res){
      this.setData({
        idEvent: res.data.idEvent,
        dataArr: res.data
      });
      wx.stopPullDownRefresh();
    }.bind(this))
    .catch(err => {
      wx.stopPullDownRefresh();
      Toast.fail("服务器无响应");
    })
  },

  ClickCell(evt) {
    var id = evt.currentTarget.dataset.id; //id composite with idEvent-idRound-numberMatch
    wx.navigateTo({
      url: `/pages/match-detail/match-detail?id=${id}`,
    });
  },
});
