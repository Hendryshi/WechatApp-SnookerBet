const api = require("../../utils/api"); //引入同意管理的接口js
const utils = require("../../utils/util");
const app = getApp(); //引入全局对象

Page({
  data: {
    idEvent: 0,
    stQuiz: 0,
    gameName: "",
    dataArr: [],
    dataMatch:[],
    firstLoading: true,
    showAllMatch: false
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
    }).then(res => {
      
      if(!this.data.showAllMatch)
        this.data.dataMatch = res.data.oEventRounds.filter(r => r.noTBDMatch);
      else
        this.data.dataMatch = res.data.oEventRounds;

      this.setData({
        idEvent: res.data.idEvent,
        dataArr: res.data,
        dataMatch: this.data.dataMatch
      })

      if(isPullDown)
        wx.stopPullDownRefresh();
    })
    .catch(err => {
      console.log(err);
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
  },

  onChange({ detail }) {
    if(!detail)
      this.setData({ 
        showAllMatch: detail,
        dataMatch: this.data.dataArr.oEventRounds.filter(r => r.noTBDMatch)
      })
    else
      this.setData({ 
        showAllMatch: detail,
        dataMatch: this.data.dataArr.oEventRounds
      })
    
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },
});
