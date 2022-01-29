import uCharts from "../../components/u-charts/u-charts";
var uChartsInstance = {};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cWidth: "",
    cHeight: "",
    active: 0,
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
    this.getServerData();
  },

  //   这里 先暂时 应用 ucharts 里面提供的数据 调取他们的接口
  getServerData: function () {
    setTimeout(() => {
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      let res = {
        categories: [
          "第10天",
          "第9天",
          "第8天",
          "第7天",
          "第6天",
          "第5天",
          "第4天",
          "第3天",
          "第2天",
          "第1天"
        ],
        series: [
          {
            name: "佳佳",
            data: [250,250,230,180,140,100,100,70,50,20,10],
          },
          {
            name: "肥肥",
            data: [180,130,120,120,110,110,50,30,30,20,10],
          },
          {
            name: "玩家3",
            data: [300,280,270,159,100,80,50,80,30,50,10],
          }
        ],
      };
      this.drawCharts("canvasColumn", res);
    }, 500);

    // wx.request({
    //   url: "https://www.ucharts.cn/data.json",
    //   data: {},
    //   success: function (res) {
    //     let Column = { categories: [], series: [] };
    //     Column.categories = res.data.data.ColumnB.categories;
    //     Column.series = res.data.data.ColumnB.series;
    //     //自定义标签颜色和字体大小
    //     Column.series[1].textColor = "red";
    //     Column.series[1].textSize = 11;
    //     _self.showColumn("canvasColumn", Column);
    //   },
    //   fail: () => {
    //     console.log("请点击右上角【详情】，启用不校验合法域名");
    //   },
    // });
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
      this.getServerData();
    }
  },
});
