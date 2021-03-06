Component({
  data: {
    active: 0,
    list: [
      {
        icon: "wap-home",
        text: "首页",
        url: "/pages/home/home",
      },
      {
        icon: "fire",
        text: "直播",
        url: "/pages/live/live",
      },
      {
        icon: "award",
        text: "排名",
        url: "/pages/rank/rank",
      }
      // {
      //   icon: "user-o",
      //   text: "我的",
      //   url: "/pages/user/user",
      // },
    ],
  },
  methods: {
    onChange(event) {
      // this.setData({ active: event.detail });
      let _this = this;
      wx.switchTab({
        url: _this.data.list[event.detail].url,
      });
    },
    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(
          (item) => item.url === `/${page.route}`
        ),
      });
    },
  },
});
