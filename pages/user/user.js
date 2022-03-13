Page({
  data: {
    url:'../../images/test/',
    i:0
  },


  onShow() {
    this.getTabBar().init();
    // this.timers(0)
  },

  changePoint(){
    this.timers(0)
  },

  timers: function(count){
    var that = this;
    var j = 1;
    that.data.timer = setInterval(function(){
      count ++;
      j = j%6;
      j++;
      that.setData({
        i:j
      })
    }, 20)
    
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
