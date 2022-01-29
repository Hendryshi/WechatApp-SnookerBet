Page({
  data: {
    active: 0,
  },

  onLoad: function (options) {
    console.log(options);
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
