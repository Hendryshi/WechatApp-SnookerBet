const api = require("../../utils/api"); //引入同意管理的接口js
const utils = require("../../utils/util");
const app = getApp(); //引入全局对象

Page({
  data: {
    dataArr: [],
    updateTime: Date.now(),
    firstLoading: true,
  },

  onLoad(){
    this.data.updateTime = new Date();
  },

  onShow() {
    this.getTabBar().init();
    this.getMatchOnGoing();
    if(this.data.firstLoading)
    {
      this.setData({
        firstLoading: false
      })
    }
    // wx.pageScrollTo({
    //   scrollTop: 0,
    // });
  },

  getMatchOnGoing(isPullDown){
    api.getMatchOnGoing({
      noToast: !this.data.firstLoading && !isPullDown
    }).then(function(res){
      this.setData({
        dataArr: res.data,
        updateTime: Date.now()
      })
      if(isPullDown)
        wx.stopPullDownRefresh();
    }.bind(this))
    .catch(err => {
      if(isPullDown)
        wx.stopPullDownRefresh();
    })
    // console.log(this.data.updateTime);
  },

  onPullDownRefresh(){
    this.getMatchOnGoing(true);
  },

  ClickCell(evt) {
    // console.log(evt.currentTarget.dataset);
    var id = evt.currentTarget.dataset.id; //id composite with idEvent-idRound-numberMatch
    var roundName = evt.currentTarget.dataset.round;
    var stQuiz = this.data.stQuiz;
    wx.navigateTo({
      url: `/pages/match-detail/match-detail?id=${id}&stQuiz=${stQuiz}&roundName=${roundName}`,
    });
  },
});
