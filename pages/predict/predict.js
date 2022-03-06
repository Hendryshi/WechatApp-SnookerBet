const api = require("../../utils/api");

Page({
    data:{
        show:false,
        currentMatchIndex: 0,
        matchinfo:[],
        index:0
    },

    onLoad: function (options) {  
        //this.data.idEvent = options.idEvent;
        this.data.idEvent = 1134;
        api.getPredict(this.data.idEvent,"Yejia").then(function(response){
            this.data.apiResponse = response.data;
            //gamer apiResponse.oGamer {idGamer, idEvent,wechatName,gamerName}
            this.setData({
                currentRoundName: response.data.oQuizRounds[this.data.currentMatchIndex].roundName,
                currentRound: response.data.oQuizRounds[this.data.currentMatchIndex].idRound,
                maxScore: response.data.oQuizRounds[this.data.currentMatchIndex].distance,
                matchinfo: response.data.oQuizRounds,
                readonly: response.data.readOnly
            });
        }.bind(this))
        .catch(); 
    },

    showPopup(e){
        this.data.viewId = e.target.id;
        this.data.index = e.target.id.split("-")[0];
        this.data.scoreId = e.target.id.split("-")[1];      
        this.setData({
            show:true
        })
    },

    onClose(){
        this.setData({
            show:false
        })
    },

    onConfirm(e){
        var newScore = e.detail.value;   
        this.data.matchinfo[this.data.currentMatchIndex].oPredicts[this.data.index][this.data.scoreId] = newScore;      
        this.setData({
            show:false,
            matchinfo: this.data.matchinfo            
        })
    },

    onGoPrevious(){
        this.data.currentMatchIndex -= 1;
        this.updateData(this.data.currentMatchIndex);
        this.scrollToTop();
    },
    updateData(index){
        this.setData({
            currentRound: this.data.matchinfo[index].idRound,
            currentRoundName: this.data.matchinfo[index].roundName,
            currentMatchIndex: index,
            maxScore: this.data.matchinfo[index].distance,
            matchinfo: this.data.matchinfo
        }); 
    },
    /**
     * round + 1;
     * with the winners updated from precedent round
     * the binding will be new matchinfo with index+1
     */
    onGoNext(){
        if(this.predictValidated()){
            this.whoIsNextPlayer(this.data.matchinfo);       
            this.data.currentMatchIndex += 1;
            this.updateData(this.data.currentMatchIndex);
            this.scrollToTop();
        }else{
            //user need to change their input, ?msg translation ?wx.getSystemInfoAsync language
            wx.showToast({
                title: "请输入有效分数",
                icon: "error",
                duration: 2000
              })
        }      
    },
    scrollToTop(){
        wx.pageScrollTo({
            scrollTop: 0
        });
    },
    /**
     * Send the array of prediction to API after the validation of user's inputs
     * TODO: add user's nickname 
    */
    onSubmit(){
        if(this.predictValidated()){
            this.updateData(this.data.currentMatchIndex);
            this.data.apiResponse.oQuizRounds = this.data.matchinfo;
            this.data.apiResponse.oGamer.wechatName = "fanfan";
            this.data.apiResponse.oGamer.gamerName = "smart";
            api.postPredict(this.data.apiResponse).then(function(res){
                console.log(res);
            })
            .catch(err => console.log(err));
        }
    },
    /**
     * determine the next player 1 & 2 for the next round
    */
     whoIsNextPlayer(arrayMatchInfo){
        arrayMatchInfo[this.data.currentMatchIndex].oPredicts.forEach(function(match){
            var nextMatchNumber = Math.floor(( match.number + 1)/2);
            var nextMatchPlayer = (match.number + 1) % 2 === 1 ? "player2":"player1";
            var winner = match.player1.idPlayer === match.winnerId ? match.player1 : match.player2;
            var nextMatchIndex = arrayMatchInfo[this.data.currentMatchIndex + 1].oPredicts.findIndex(item => item.number === nextMatchNumber);
            arrayMatchInfo[this.data.currentMatchIndex + 1].oPredicts[nextMatchIndex][nextMatchPlayer] = winner;
            arrayMatchInfo[this.data.currentMatchIndex + 1].oPredicts[nextMatchIndex].winnerId = 0;
            arrayMatchInfo[this.data.currentMatchIndex + 1].oPredicts[nextMatchIndex].score1 = 0 ;
            arrayMatchInfo[this.data.currentMatchIndex + 1].oPredicts[nextMatchIndex].score2 = 0 ;
        }.bind(this));
    },
    /**
     * one score should be the max score and the other one should smaller than the max
    */
    predictValidated(){
        var IsValidated = true;
        this.data.matchinfo[this.data.currentMatchIndex].oPredicts.forEach(function(match){
            if((match.score1 < this.data.maxScore && match.score2 < this.data.maxScore)||(match.score1 === match.score2 && match.score1 === this.data.maxScore)){
                IsValidated = false;
            }
        }.bind(this));
        return IsValidated;
    },

    onPredictWinner(event){
        var sMatchIndex = parseInt(event.target.id.split("-")[0]);
        var sPlayerId = parseInt(event.target.id.split("-")[1]);
        var score = event.target.id.split("-")[2];
        this.data.matchinfo[this.data.currentMatchIndex].oPredicts[sMatchIndex].winnerId = sPlayerId;
        this.data.matchinfo[this.data.currentMatchIndex].oPredicts[sMatchIndex][score] =  this.data.maxScore;
        
        if(score === "score1"){
            this.data.matchinfo[this.data.currentMatchIndex].oPredicts[sMatchIndex]["score2"] = 0;  
        }else{
            this.data.matchinfo[this.data.currentMatchIndex].oPredicts[sMatchIndex]["score1"] = 0;  
        }     
        this.setData({
            matchinfo: this.data.matchinfo
        });
    }
})