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
  },

  onShow() {
    this.getTabBar().init();
  },

  tapMatch(evt) {
    var idEvent = 1014;
    wx.navigateTo({
      url: `/pages/match/match?idEvent=${idEvent}`
    });
  },

  clickPredict(evt){
    var idEvent = 1014;
    wx.navigateTo({
      url: `/pages/predict/predict?idEvent=${idEvent}`
    });
  }
});
