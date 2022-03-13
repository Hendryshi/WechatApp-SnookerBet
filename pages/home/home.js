const api = require("../../utils/api"); //引入同意管理的接口js
const utils = require("../../utils/util");
const auth = require("../../utils/auth");
const app = getApp(); //引入全局对象
import Toast from "/@vant/weapp/toast/toast"; //引入vant提示插件

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
    dataArr: []
  },

  onLoad(options) {
    api.GetQuizEvent().then(function(res){
      this.setData({
        dataArr: res.data
      })
    }.bind(this))
    .catch(err => {
      Toast.fail("服务器无响应");
    })
  },

  onShow() {
    this.getTabBar().init();
  },

  tapMatch(evt) {
    var idEvent = evt.currentTarget.dataset.idevent;
    var stQuiz = evt.currentTarget.dataset.stquiz;
    wx.navigateTo({
          url: `/pages/match/match?idEvent=${idEvent}&stQuiz=${stQuiz}`
    }); 
  },

  clickPredict(evt) {
    if(!auth.hasUserProfile()){
      auth.bindUserProfil().then(()=>{
        this.navToPredict(evt);
      })
      .catch( err => {
        console.log(err.errMsg);
      }); 
    }else{
      this.navToPredict(evt);
    }
  },

  navToPredict(evt){
    var idEvent = evt.currentTarget.dataset.idevent;
    wx.navigateTo({
        url: `/pages/predict/predict?idEvent=${idEvent}`
    });
  }
});