import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
const api = require("../../utils/api");

Page({
  data: {
    show: false,
    currentMatchIndex: 0,
    matchinfo: [],
    index: 0,
    idGamer: 0,
    gamerName: "",
    showConfirmDialog: false,
    showSkeleton: true,
    apiResponse: []
  },

  onLoad: function (options) {
    //this.data.idEvent = options.idEvent;
    //get wechatname from storage ?
    this.data.idEvent = 1014;
    this.data.wechatName = "congcong"; //"congcong";
    api.getPredict(this.data.idEvent, this.data.wechatName)
      .then(
        function (response) {
          console.log("get data");
          this.data.apiResponse = response.data;
          //new user + match started
          if (this.data.apiResponse.length === 0) {
            let second = 3;
            const timer = setInterval(() => {
              const toast = Toast.fail("竞猜不可用");
              if (second) {
                second--;
              } else {
                clearInterval(timer);
                Toast.clear();
                wx.switchTab({
                  url: '/pages/home/home'
                });
              }
            }, 1000);
          } else {
            if (response.data.oGamer && response.data.oGamer.idGamer !== 0) {
              this.data.idGamer = response.data.oGamer.idGamer;
              this.data.gamerName = response.data.oGamer.gamerName;
            }
            this.setData({
              currentRoundName: response.data.oQuizRounds[this.data.currentMatchIndex].roundName,
              currentRound: response.data.oQuizRounds[this.data.currentMatchIndex].idRound,
              maxScore: response.data.oQuizRounds[this.data.currentMatchIndex].distance,
              matchinfo: response.data.oQuizRounds,
              idGamer: this.data.idGamer,
              gamerName: this.data.gamerName,
              readonly: response.data.readOnly,
            });
          }
        }.bind(this)
      )
      .catch();
  },


  onReady: function () {
    
      this.setData({
        showSkeleton: false
      });
  },

  onDialogConfirm(event) {
    //this.data.gamer = response.data.oGamer;
    if (this.data.idGamer === 0 && this.data.gamerName !== "") {
      this.setData({
        inputNameError: false,
      });
      this.data.apiResponse.oGamer.gamerName = this.data.gamerName;
      this.data.apiResponse.oGamer.wechatName = this.data.wechatName;
    } else {
      this.setData({
        inputNameError: true,
      });
    }
    api.postPredict(this.data.apiResponse).then(function (res) {
        if (res.statusCode === 200) {
          Toast.success(res.data);
          wx.switchTab({
            url: '/pages/home/home'
          });
        }
      })
      .catch((err) => console.log(err));
  },
  onDialogClose(event) {
    this.setData({
      showConfirmDialog: false,
    });
  },
  onInputName(event) {
    //this.data.gamerName = event.detail.value;
    //this.data.gamerName = event.detail;
  },

  showPopup(e) {
    this.data.viewId = e.target.id;
    this.data.index = e.target.id.split("-")[0];
    this.data.scoreId = e.target.id.split("-")[1];
    this.setData({
      show: true,
    });
  },

  onClose() {
    this.setData({
      show: false,
    });
  },

  onConfirm(e) {
    var newScore = e.detail.value;
    this.data.matchinfo[this.data.currentMatchIndex].oPredicts[this.data.index][
      this.data.scoreId
    ] = newScore;
    this.setData({
      show: false,
      matchinfo: this.data.matchinfo,
    });
  },

  onGoPrevious() {
    this.data.currentMatchIndex -= 1;
    this.updateData(this.data.currentMatchIndex);
    this.scrollToTop();
  },
  updateData(index) {
    this.setData({
      currentRound: this.data.matchinfo[index].idRound,
      currentRoundName: this.data.matchinfo[index].roundName,
      currentMatchIndex: index,
      maxScore: this.data.matchinfo[index].distance,
      matchinfo: this.data.matchinfo,
    });
  },
  /**
   * round + 1;
   * with the winners updated from precedent round
   * the binding will be new matchinfo with index+1
   */
  onGoNext() {
    if (!this.data.readonly) {
      if (this.predictValidated()) {
        this.whoIsNextPlayer(this.data.matchinfo);
        this.data.currentMatchIndex += 1;
        this.updateData(this.data.currentMatchIndex);
        this.scrollToTop();
      } else {
        //user need to change their input, ?msg translation ?wx.getSystemInfoAsync language
        wx.showToast({
          title: "请输入有效分数",
          icon: "error",
          duration: 2000,
        });
      }
    } else {
      this.data.currentMatchIndex += 1;
      this.updateData(this.data.currentMatchIndex);
      this.scrollToTop();
    }
  },
  scrollToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },
  /**
   * Send the array of prediction to API after the validation of user's inputs
   * TODO: add user's nickname
   */
  onSubmit() {
    if (this.predictValidated()) {
      this.updateData(this.data.currentMatchIndex);
      this.data.apiResponse.oQuizRounds = this.data.matchinfo;
      this.setData({
        showConfirmDialog: true,
      });
    }
  },
  /**
   * determine the next player 1 & 2 for the next round
   */
  whoIsNextPlayer(arrayMatchInfo) {
    arrayMatchInfo[this.data.currentMatchIndex].oPredicts.forEach(
      function (match) {
        var nextMatchNumber = Math.floor((match.number + 1) / 2);
        var nextMatchPlayer =
          (match.number + 1) % 2 === 1 ? "player2" : "player1";
        var winner =
          match.player1.idPlayer === match.winnerId ?
          match.player1 :
          match.player2;
        var nextMatchIndex = arrayMatchInfo[
          this.data.currentMatchIndex + 1
        ].oPredicts.findIndex((item) => item.number === nextMatchNumber);
        //if the winner changes for current round
        if (
          arrayMatchInfo[this.data.currentMatchIndex + 1].oPredicts[
            nextMatchIndex
          ][nextMatchPlayer] !== winner
        ) {
          arrayMatchInfo[this.data.currentMatchIndex + 1].oPredicts[
            nextMatchIndex
          ].score1 = 0;
          arrayMatchInfo[this.data.currentMatchIndex + 1].oPredicts[
            nextMatchIndex
          ].score2 = 0;
          arrayMatchInfo[this.data.currentMatchIndex + 1].oPredicts[
            nextMatchIndex
          ].winnerId = 376;
        }
        arrayMatchInfo[this.data.currentMatchIndex + 1].oPredicts[
          nextMatchIndex
        ][nextMatchPlayer] = winner;
      }.bind(this)
    );
  },
  /**
   * one score should be the max score and the other one should smaller than the max
   */
  predictValidated() {
    var IsValidated = true;
    this.data.matchinfo[this.data.currentMatchIndex].oPredicts.forEach(
      function (match) {
        if (
          (match.score1 < this.data.maxScore &&
            match.score2 < this.data.maxScore) ||
          (match.score1 === match.score2 && match.score1 === this.data.maxScore)
        ) {
          IsValidated = false;
        }
      }.bind(this)
    );
    return IsValidated;
  },

  onPredictWinner(event) {
    var sMatchIndex = parseInt(event.target.id.split("-")[0]);
    if (
      !this.data.readOnly &&
      this.data.matchinfo[this.data.currentMatchIndex].oPredicts[sMatchIndex]
      .predictStatus === 0
    ) {

      var sPlayerId = parseInt(event.target.id.split("-")[1]);
      var score = event.target.id.split("-")[2];
      this.data.matchinfo[this.data.currentMatchIndex].oPredicts[
        sMatchIndex
      ].winnerId = sPlayerId;
      this.data.matchinfo[this.data.currentMatchIndex].oPredicts[sMatchIndex][
        score
      ] = this.data.maxScore;
      if (score === "score1") {
        this.data.matchinfo[this.data.currentMatchIndex].oPredicts[sMatchIndex][
          "score2"
        ] = 0;
      } else {
        this.data.matchinfo[this.data.currentMatchIndex].oPredicts[sMatchIndex][
          "score1"
        ] = 0;
      }
      this.setData({
        matchinfo: this.data.matchinfo,
      });
    }
  },
});