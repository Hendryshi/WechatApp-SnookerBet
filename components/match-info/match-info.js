Component({
  options: {
    multipleSlots: true,
  },

  properties: {
    matchDate: {
      type: String,
      value:
        "2022/01/25 - 9:30",
    },
    score1: {
      type: String,
      value: "10",
    },
    score2: {
      type: String,
      value: "4",
    },
    matchType:{
        type: String,
        value: ""
    }
  },
  externalClasses: ["custom-class"],
  data: {},

  methods: {},
});
