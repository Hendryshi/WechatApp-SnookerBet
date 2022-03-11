const api = require("../../utils/api");
const utils = require("../../utils/util");
Page({
  data: {
    active: 0,
  },

  onLoad: function (options) {
    //TODO: add QuizStatus to allow the new user to see the predict for each match
    if(options.id){
      var idEvent = options.id.split("-")[0];
      var idRound = options.id.split("-")[1];
      var numberMatch = options.id.split("-")[2];
      api.getMatchPredict(idEvent,idRound,numberMatch).then(function(response){
        this.setData({
          predict: response.data.oPredicts,
          match: response.data.oMatch
        });
      }.bind(this))
      .catch(err => { wx.showToast({
        title: 'err.errMsg',
        icon: 'error'
      }); 
    });
  }
  },

  //切换tab
  onChange(event) {
    if (event.detail.name == "0") {
      this.setData({
        active: 0,
      });
      wx.pageScrollTo({ scrollTop: 0 });
    }
    if (event.detail.name == "1") {
      this.setData({
        active: 1,
      });
      wx.pageScrollTo({ scrollTop: 0 });
    }
  },
});
