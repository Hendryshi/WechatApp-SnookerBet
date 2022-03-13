const api = require("../../utils/api");
const utils = require("../../utils/util");
Page({
  data: {
    active: 0,
    predict: [],
    match: null
  },

  onLoad: function (options) {
      var idEvent = options.id.split("-")[0];
      var idRound = options.id.split("-")[1];
      var numberMatch = options.id.split("-")[2];
      var roundName = options.roundName;
      var stQuiz = options.stQuiz === "undefined" ? wx.getStorageSync("stQuiz") : options.stQuiz;
      wx.setNavigationBarTitle({
        title: this.setTitle(roundName, numberMatch)
      });    
      this.getPredictMatch(idEvent, idRound, numberMatch, stQuiz);
  },

  onShow() {
  },

  setTitle(roundName, numberMatch)
  {
    if(roundName === "决赛")
      return roundName;
    else
      return roundName + " 第" + numberMatch + "场";
  },
  
  getPredictMatch(idEvent, idRound, numberMatch, stQuiz) {
    api.getMatchPredict(idEvent, idRound, numberMatch).then(function (response) {
      this.setData({
        match: response.data.oMatch
      });
      if(stQuiz && stQuiz !== '0')
        this.setData({
          predict: response.data.oPredicts
        });
    }.bind(this));
  },

  //切换tab
  onChange(event) {
    if (event.detail.name == "0") {
      this.setData({
        active: 0,
      });
      wx.pageScrollTo({
        scrollTop: 0
      });
    } else if (event.detail.name == "1") {
      this.setData({
        active: 1,
      });
      wx.pageScrollTo({
        scrollTop: 0
      });
    }
  },
});