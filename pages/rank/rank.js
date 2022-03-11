import uCharts from "../../components/u-charts/u-charts";
const api = require("../../utils/api");
var uChartsInstance = {};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cWidth: "",
    cHeight: "",
    active: 0,
    showSkeleton:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //这里的第一个 750 对应 css .charts 的 width
    const cWidth = (750 / 750) * wx.getSystemInfoSync().windowWidth;
    //这里的 500 对应 css .charts 的 height
    const cHeight = (500 / 750) * wx.getSystemInfoSync().windowWidth;
    const pixelRatio = wx.getSystemInfoSync().pixelRatio;
    this.setData({ cWidth, cHeight, pixelRatio });
    this.getRankSummary();
  },

  getRankSummary: function(){
    //test data idEvent 1014
    api.getRankSummary().then(function(summary){
      summary.data.sort((item1,item2) => item2 - item1);
      this.setData({
        summary: summary.data
      });
    }.bind(this))
    .catch();
  },
  getRankTrending: function(){
    //test data idEvent 1014
    api.getRankTrending().then(function(rankPoints){
      var gamerPointByDay = this.rankByDay(this.sorByDate(rankPoints.data));
      var categories = this.rankByCategory(this.sorByDate(rankPoints.data));
      var chartData = {
        categories: categories,
        series: gamerPointByDay
      };
      this.drawCharts("canvasColumn", chartData);
    }.bind(this))
    .catch();
  },
  sorByDate:function(data){
    data.forEach(function(item){
      item.oPredictByDays.sort((day1,day2)=>{return new Date(day2.dtResult) - new Date(day1.dtResult);});
    });
    return data;
  },
  rankByDay:function(points){  
    var gamerPointByDay = [];
    points.forEach(function(pointByGamer){
      var item = {};
      item.name = pointByGamer.gamerName;
      item.data = [];
      pointByGamer.oPredictByDays.forEach(function(pointByGamerByDay){
        item.data.push(pointByGamerByDay.cumulPoint);
      });
      gamerPointByDay.push(item);
    });
    return gamerPointByDay;
  },
  rankByCategory:function(points){
    var categories = [];
    points[0].oPredictByDays.forEach(function(element){
      var language = wx.getSystemInfoSync().language.replace("_","-");   
      categories.push(new Intl.DateTimeFormat(language,{month:"2-digit",day:"2-digit"}).format(new Date(element.dtResult)));
    });
    return categories;
  },
  drawCharts(id, data) {
    const query = wx.createSelectorQuery().in(this);
    query
      .select("#" + id)
      .fields({ node: true, size: true })
      .exec((res) => {
        if (res[0]) {
          const canvas = res[0].node;
          const ctx = canvas.getContext("2d");
          canvas.width = res[0].width * this.data.pixelRatio;
          canvas.height = res[0].height * this.data.pixelRatio;
          uChartsInstance[id] = new uCharts({
            animation: true,
            background: "#FFFFFF",
            canvas2d: true,
            categories: data.categories,
            color: [
              "#1890FF",
              "#91CB74",
              "#FAC858",
              "#EE6666",
              "#73C0DE",
              "#3CA272",
              "#FC8452",
              "#9A60B4",
              "#ea7ccc",
            ],
            context: ctx,
            extra: {
              column: {
                type: "group",
                width: 30,
                activeBgColor: "#000000",
                activeBgOpacity: 0.08,
              },
            },
            height: this.data.cHeight * this.data.pixelRatio,
            legend: {},
            padding: [15, 15, 0, 5],
            pixelRatio: this.data.pixelRatio,
            series: data.series,
            type: "line",
            enableScroll: true,
            width: this.data.cWidth * this.data.pixelRatio,
            xAxis: {
              type: "grid",
              gridType: "dash",
              itemCount: 6, //x轴单屏显示数据的数量，默认为5个
              scrollShow: true, //新增是否显示滚动条，默认false
              scrollAlign: "left", //滚动条初始位置
              scrollBackgroundColor: "#F7F7FF", //默认为 #EFEBEF
              scrollColor: "#DEE7F7", //默认为 #A6A6A6
            },
            yAxis: {
              data: [
                {
                  min: 0,
                },
              ],
            },
          });
        } else {
          console.error("[uCharts]: 未获取到 context");
        }
      });
  },

  onReady: function(){
    this.setData({
      showSkeleton: false
    })
  },

  touchLineA(e) {
    uChartsInstance[e.target.id].scrollStart(e);
  },
  moveLineA(e) {
    uChartsInstance[e.target.id].scroll(e);
  },
  touchEndLineA(e) {
    uChartsInstance[e.target.id].scrollEnd(e);
  },

  onShow() {
    this.getTabBar().init();
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
      //this.getServerData();
      this.getRankTrending();
    }
  },
});
