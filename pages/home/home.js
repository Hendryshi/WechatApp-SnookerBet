Page({
  data: {
    gameName: "斯诺克单局限时赛",
    dataArr: [
      {
        Round: "第一轮",
        AB_ZhiChu: "1111",
        AB_ShouRu: "2222",
        AB_Bill: [
          {
            AB_LeiBie: "吃饭1",
            AB_Money: "11",
            AB_Remark: "备注",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "支出",
          },
          {
            AB_LeiBie: "吃饭1",
            AB_Money: "22",
            AB_Remark: "备注2",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "支出",
          },
          {
            AB_LeiBie: "红包1",
            AB_Money: "33",
            AB_Remark: "备注33",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "收入",
          },
          {
            AB_LeiBie: "红包1",
            AB_Money: "33",
            AB_Remark: "备注33",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "收入",
          },
          {
            AB_LeiBie: "红包1",
            AB_Money: "33",
            AB_Remark: "备注33",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "收入",
          },
          {
            AB_LeiBie: "红包1",
            AB_Money: "33",
            AB_Remark: "备注33",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "收入",
          },
          {
            AB_LeiBie: "红包1",
            AB_Money: "33",
            AB_Remark: "备注33",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "收入",
          },
          {
            AB_LeiBie: "红包1",
            AB_Money: "33",
            AB_Remark: "备注33",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "收入",
          }
        ],
      },
      {
        Round: "第二轮",
        AB_ZhiChu: "1111",
        AB_ShouRu: "2222",
        AB_Bill: [
          {
            AB_LeiBie: "吃饭2",
            AB_Money: "22",
            AB_Remark: "",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "支出",
          },
          {
            AB_LeiBie: "吃饭2",
            AB_Money: "22",
            AB_Remark: "",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "支出",
          },
          {
            AB_LeiBie: "吃饭2",
            AB_Money: "22",
            AB_Remark: "",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "支出",
          },
          {
            AB_LeiBie: "吃饭2",
            AB_Money: "22",
            AB_Remark: "",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "支出",
          },
          {
            AB_LeiBie: "吃饭2",
            AB_Money: "22",
            AB_Remark: "",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "支出",
          },
          {
            AB_LeiBie: "吃饭2",
            AB_Money: "22",
            AB_Remark: "",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "支出",
          },
        ],
      },
      {
        Round: "第三轮",
        AB_ZhiChu: "1111",
        AB_ShouRu: "2222",
        AB_Bill: [
          {
            AB_LeiBie: "吃饭3",
            AB_Money: "33",
            AB_Remark: "",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "支出",
          },
        ],
      },
      {
        Round: "第四轮",
        AB_ZhiChu: "1111",
        AB_ShouRu: "2222",
        AB_Bill: [
          {
            AB_LeiBie: "吃饭4",
            AB_Money: "44",
            AB_Remark: "",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "支出",
          },
        ],
      },
      {
        Round: "第五轮",
        AB_ZhiChu: "1111",
        AB_ShouRu: "2222",
        AB_Bill: [
          {
            AB_LeiBie: "吃饭4",
            AB_Money: "44",
            AB_Remark: "",
            AB_Date: "2011-11-11 15:38:16",
            AB_FenLei: "支出",
          },
        ],
      },
    ],
    Time: 0,
  },

  onShow() {
    this.getTabBar().init();
  },

  onPageScroll: function (e) {
    let topHeight = 120;
    var that = this;
    var query = wx.createSelectorQuery().in(that);
    query.selectViewport().scrollOffset();
    query.selectAll("#header").boundingClientRect();
    // query.select("#header").boundingClientRect();
    query.exec(function (res) {
      // console.log(res);
      let time = "";
      var resultIndex = res[1].findIndex((v) => {
        return v.top === topHeight;
      });
      if (resultIndex == -1) {
        let tempArr = [];
        for (let index = 0; index < res[1].length; index++) {
          let data = res[1][index];
          tempArr.push(data.top);
        }
        let tempIndex = that.getClosestValueIndex(tempArr, topHeight);
        // console.log(tempIndex);
        time = res[1][tempIndex].dataset.selectdata;
      } else {
        time = res[1][resultIndex].dataset.selectdata;
      }
      // console.log(time);

      that.setData({
        Time: time,
      });
    });
  },

  getClosestValueIndex: function (arr, num) {
    var newArr = [];
    arr.map(function (x) {
      // 对数组各个数值求差值
      newArr.push(Math.abs(x - num));
    });
    // 求最小值的索引
    var index = newArr.indexOf(Math.min.apply(null, newArr));
    // return arr[index];
    return index;
  },

  ClickCell() {
    console.log("点击cell");
  },
});
