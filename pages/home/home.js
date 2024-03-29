const api = require("../../utils/api"); //引入同意管理的接口js
const utils = require("../../utils/util");
const auth = require("../../utils/auth");
const app = getApp(); //引入全局对象

Page({
  data: {
    movies: [{
        url: '../../images/background.jpg'
      },
      {
        url: '../../images/live.jpg'
      },
      {
        url: '../../images/match.jpg'
      }
    ],
    quizEvent: [],
    reportList:[],
    showGuide: false,
    showGamerName: false,
    gamerName: "",
    idEvent: 0
  },

  onLoad() {
    if(!wx.getStorageSync("alreadyEnter"))
      this.setData({showGuide: true});
  },

  getQuizEvent(){
    api.GetQuizEvent().then(res => {  
      this.setData({
        dataArr: res.data
      })

      if(this.data.dataArr.length > 0)
        wx.setStorageSync("stQuiz", this.data.dataArr[0].stQuiz);
    })
  },

  getQuizReport(){
    api.getQuizReport().then(res => {
      this.setData({
        reportList: res.data
      })
    })
  },

  onShow() {
    this.getTabBar().init();
    this.getQuizEvent();
    this.getQuizReport();
  },

  tapMatch(evt) {
    var idEvent = evt.currentTarget.dataset.idevent;
    var stQuiz = evt.currentTarget.dataset.stquiz;
    wx.navigateTo({
          url: `/pages/match/match?idEvent=${idEvent}&stQuiz=${stQuiz}`
    }); 
  },
  /**
   * ask the authorization to get user profile and send subscribed message
   * if refuse to get profile, then not go to predict;
   * else stock user profile in storage with wechatname;
   * if refuse to subscribe then do not trigger corresponding func
  */
  clickPredict(evt) {
    if(!wx.getStorageSync("gamerName")){
      this.setData({showGamerName: true});
      this.setData({idevent: evt.currentTarget.dataset.idevent});
    }else{
      this.navToPredict(evt);
    }
  },

  navToPredict(evt){
    var idEvent = evt.currentTarget.dataset.idevent;
    wx.navigateTo({
        url: `/pages/predict/predict?idEvent=${idEvent}`
    });
  },

  onClickHide(){
    this.setData({showGuide: false});
    wx.setStorageSync('alreadyEnter', true);
  },

  tapRule(){
    this.setData({showRule: true});
  },

  onCloseRule(){
    this.setData({showRule: false});
  },

  tapSummary(){
    this.setData({showSummary: true});
  },

  onCloseSummary(){
    this.setData({showSummary: false});
  },

  onGamerNameConfirm(){
    wx.setStorageSync('gamerName', this.data.gamerName);
    wx.navigateTo({
      url: `/pages/predict/predict?idEvent=${this.data.idevent}`
  });
  },

  onCloseGamerName(){
    this.setData({showGamerName: false});
  }
});