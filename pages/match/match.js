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

  ClickCell(evt) {
    var id = evt.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/match-detail/match-detail?id=${id}`,
    });
  },
});
