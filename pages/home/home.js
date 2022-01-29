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
    wx.navigateTo({
      url: "/pages/match/match",
    });
  },

  clickPredict(evt){
    wx.navigateTo({
      url: "/pages/predict/predict",
    });
  }
});
