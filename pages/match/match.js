const api = require("../../utils/api"); //引入同意管理的接口js
const utils = require("../../utils/util");
const app = getApp(); //引入全局对象

Page({
  data: {
    idEvent: 0,
    stQuiz: 0,
    gameName: "",
    dataArr: [],
    firstLoading: true,
  },

  onLoad(options){
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
    if(this.data.firstLoading)
    {
      this.setData({
        firstLoading: false
      })
    }
  },

  getMatchData(idEvent, isPullDown){
    api.getMatch(idEvent, {
      noToast: !this.data.firstLoading && !isPullDown
    }).then(function(res){
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
    var roundName = evt.currentTarget.dataset.round;
    var stQuiz = this.data.stQuiz;
    wx.navigateTo({
        url: `/pages/match-detail/match-detail?id=${id}&stQuiz=${stQuiz}&roundName=${roundName}`,
    });
  }
});
