const api = require("../../utils/api"); //引入同意管理的接口js
const utils = require("../../utils/util");
const app = getApp(); //引入全局对象
import Toast from "/@vant/weapp/toast/toast"; //引入vant提示插件

Page({
  data: {
    idEvent: 0,
    stQuiz: 0,
    gameName: "",
    dataArr: [],
    Time: 0,
  },

  onLoad(options){
    console.log(options);
    var idEvent = options.idEvent;
    var stQuiz = options.stQuiz;
    this.data.idEvent = idEvent;
    this.data.stQuiz = stQuiz;
  },

  onReady: function () {
  },

  onShow(){
    var idEvent = this.data.idEvent;
    this.getMatchData(idEvent);
  },

  getMatchData(idEvent, isPullDown){
    api.getMatch(idEvent).then(function(res){
      this.setData({
        idEvent: res.data.idEvent,
        dataArr: res.data
      })
      if(isPullDown)
        wx.stopPullDownRefresh();
    }.bind(this))
    .catch(err => {
      if(isPullDown)
        wx.stopPullDownRefresh();
    })
  },

  onPullDownRefresh(){
    var idEvent = this.data.idEvent;
    this.getMatchData(idEvent, true);
  },

  ClickCell(evt) {
    var id = evt.currentTarget.dataset.id; //id composite with idEvent-idRound-numberMatch
    wx.navigateTo({
      url: `/pages/match-detail/match-detail?id=${id}`,
    });
  },
});
