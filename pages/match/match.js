const api = require("../../utils/api"); //引入同意管理的接口js
const app = getApp(); //引入全局对象
import Toast from "/@vant/weapp/toast/toast"; //引入vant提示插件

Page({
  data: {
    idevent: 1140,
    gameName: "斯诺克单局限时赛",
    dataArr: [],
    Time: 0,
  },

  onShow() {
    api.getMatch(this.data.idevent).then(res => {
      this.setData({
        dataArr: res.data
      })
      console.log(this.data.dataArr)
    })
    .catch(err => {
      console.log("enter catch", err)
    })
  },

  ClickCell(evt) {
    var id = evt.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/match-detail/match-detail?id=${id}`,
    });
  },
});
