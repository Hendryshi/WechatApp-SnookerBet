import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
const api = require("../../utils/api");
const auth = require("../../utils/auth");

Page({
  data: {
    show: false,
    currentMatchIndex: 0,
    startMatchIndex: 0,
    currentRoundName: "第一轮",
    matchinfo: [],
    index: 0,
    idGamer: 0,
    nbEditPredict: 0,
    gamerName: "",
    showConfirmDialog: false,
    showReEditConfirmDialog:false,
    apiResponse: [],
    showEmpty: true
  },

  onLoad: function (options) {
    this.data.idEvent = options.idEvent;
    //only for test
    //this.data.wechatName = "mercedes";
    this.getStQuiz();
    this.data.wechatName = auth.getUserWechatName();
    this.updatePredictInfo(false);
  },

  getStQuiz(){
    var stQuiz = wx.getStorageSync("stQuiz");
    this.setData({
      stQuiz: stQuiz
    });
  },

  updateData(index) {
    this.setData({
      currentRound: this.data.matchinfo[index].idRound,
      currentRoundName: this.data.matchinfo[index].roundName,
      currentMatchIndex: index,
      maxScore: this.data.matchinfo[index].distance,
      matchinfo: this.data.matchinfo
    });
  },

  onReEdit() {
    this.showReEditConfirm(true);
  },

  onReEditDialogClose(evt){
    this.showReEditConfirm(false);
  },

  onReEditDialogConfirm(evt){
    this.updatePredictInfo(true);
  },

  showReEditConfirm(bShow){
    this.setData({
      showReEditConfirmDialog: bShow,
    });
  },

  showConfirmDialog(bShow){
    this.setData({
      showConfirmDialog: bShow,
    });
  },

  updatePredictInfo(isReEdit){
    api.getPredict(this.data.idEvent, this.data.wechatName, isReEdit)
    .then(response => {
        this.data.apiResponse = response.data;
        //new user + match started
        if (this.data.apiResponse.length === 0) {
          this.setData({showEmpty: true});
        } else {
          this.setData({
            idEvent: this.data.idEvent,
            wechatName: this.data.wechatName,
            matchinfo: response.data.oQuizRounds,
            readonly: response.data.readOnly, //only for test response.data.readOnly,
            idGamer: response.data.oGamer.idGamer,
            gamerName: response.data.oGamer.gamerName,
            nbEditPredict: response.data.oGamer.nbEditPredict, //0 -> can re-edit; 1-> no re-edit
          });

          if(!this.data.readonly)
            this.setStartRoundIndex(this.data.matchinfo);
          this.updateData(this.data.startMatchIndex);
        }
      })
  },

  onReady: function () {
  },

  showToastNoPredict() {
    let second = 3;
    const toast = Toast.fail({
      message: "竞猜不可用",
    });
    const timer = setInterval(() => {
      if (second) {
        toast.setData({
          message: "竞猜不可用",
        });
        second--;
      } else {
        clearInterval(timer);
        Toast.clear();
        wx.switchTab({
          url: "/pages/home/home",
        });
      }
    }, 1000);
  },

  onChangePoint: function (evt) {
    var matchIndex = evt.currentTarget.id.split("-")[0];
    if (
      !this.data.readOnly &&
      this.data.matchinfo[this.data.currentMatchIndex].oPredicts[matchIndex]
        .predictStatus === 0
    ) {
      var oRandomMatch = this.getRandomWinner(
        this.data.matchinfo[this.data.currentMatchIndex].oPredicts[matchIndex]
      );
      this.data.matchinfo[this.data.currentMatchIndex].oPredicts[matchIndex] =
        oRandomMatch;
    }
    this.setData({
      matchinfo: this.data.matchinfo,
    });
  },

  getRandomWinner: function (oMatch) {
    var arrPlayers = [oMatch.player1.idPlayer, oMatch.player2.idPlayer];
    var playerRandom = Math.floor(Math.random() * arrPlayers.length);
    if (arrPlayers[playerRandom] === oMatch.player1.idPlayer) {
      oMatch.winnerId = parseInt(oMatch.player1.idPlayer);
      oMatch.score1 = this.data.maxScore;
      oMatch.score2 = Math.floor(Math.random() * (this.data.maxScore - 0)) + 0;
    } else {
      oMatch.winnerId = parseInt(oMatch.player2.idPlayer);
      oMatch.score2 = this.data.maxScore;
      oMatch.score1 = Math.floor(Math.random() * (this.data.maxScore - 0)) + 0;
    }
    return oMatch;
  },

  onDialogConfirm(event) {
    //this.data.gamer = response.data.oGamer;
    if (this.data.idGamer === 0 && this.data.gamerName !== "" || this.data.idGamer !== 0) {
      this.setData({
        inputNameError: false,
      });
      this.data.apiResponse.oGamer.gamerName = this.data.gamerName;
      this.data.apiResponse.oGamer.wechatName = this.data.wechatName;
      var predictBody = {};
      predictBody.data = this.data.apiResponse;
      api
        .postPredict(predictBody)
        .then(function (res) {
          if (res.statusCode === 200) {
            Toast({
              type: 'success',
              message: '成功发送竞猜比分',
              duration: 3000,
              onClose: () => {
                wx.switchTab({
                  url: "/pages/home/home",
                });
              },
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      this.setData({
        inputNameError: true,
      });
    }
  },
  onDialogClose(event) {
    this.showConfirmDialog(false);
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
    if(this.data.currentMatchIndex > this.data.startMatchIndex){
      this.data.currentMatchIndex -= 1;
      this.updateData(this.data.currentMatchIndex);
      this.scrollToTop(); 
    }
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
        //user need to change their input
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
   */
  onSubmit() {
    if (this.predictValidated()) {
      this.updateData(this.data.currentMatchIndex);
      this.data.apiResponse.oQuizRounds = this.data.matchinfo;
      this.showConfirmDialog(true);
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
          match.player1.idPlayer === match.winnerId
            ? match.player1
            : match.player2;
        var nextMatchIndex = arrayMatchInfo[
          this.data.currentMatchIndex + 1
        ].oPredicts.findIndex((item) => item.number === nextMatchNumber);
        //if the winner changes for current round
        if (
          arrayMatchInfo[this.data.currentMatchIndex + 1].oPredicts[
            nextMatchIndex
          ][nextMatchPlayer].idPlayer !== winner.idPlayer
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

  setStartRoundIndex(quizRound){
    for (
      var currentRoundIndex = 0;
      currentRoundIndex < quizRound.length;
      currentRoundIndex++
    ) {
      if (
        quizRound[currentRoundIndex].oPredicts.findIndex(
          (oMatch) => oMatch.predictStatus === 0
        ) !== -1
      ) {
        this.setData({
          startMatchIndex: currentRoundIndex
        })
        
        return currentRoundIndex;
      }
    }
  },
});
