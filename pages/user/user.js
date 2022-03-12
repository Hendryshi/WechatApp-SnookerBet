Page({
  onShow() {
    this.getTabBar().init();
  },

  sendMsg: function(e) {
    wx.requestSubscribeMessage({
    tmplIds: ['EJdD37u3aSIlAsb59OoBx-rrfagW7ThBoVw77P7wKBA'],
    success(res) {
      console.log(res)
    },
    complete(res) {
      console.log(res)
    }
  })
}

});
