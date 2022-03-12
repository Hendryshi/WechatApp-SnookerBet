//api.js 我们将所有的接口统一管理
const request = require("./request"); //引入封装好的js文件
module.exports = {
  
  login(data) {
    return request.post("/learn/auth/login", data);
  },

  getMatch(idevent){
    return request.get(`api/Snooker/GetEventWithMatch/${idevent}`)
  },

  /**
   * @param {integer} idEvent mandatory
   * @param {string} wechatName not mandatory 
  */
  getPredict(idEvent,wechatName){
    return request.get(`api/Quiz/GetQuizPredict/?e=${idEvent}&wn=${wechatName}`);
  },

  postPredict(oPredictData){
    return request.post("api/Quiz/UpdateQuizPredict", oPredictData);
  },

  /**
   * @param {integer} idEvent not mandatory 
  */
  getRankSummary(idEvent){
    if(idEvent){
      return request.get(`api/Quiz/GetQuizSummary/?e=${idEvent}`);
    }else{
      return request.get("api/Quiz/GetQuizSummary");
    }  
  },
  getRankTrending(idEvent){
    if(idEvent){
      return request.get(`api/Quiz/GetQuizTrending/?e=${idEvent}`);
    }else{
      return request.get("api/Quiz/GetQuizTrending");
    } 
  },
  getMatchPredict(idEvent, idRound, numberMatch){
    if(idEvent && idRound && numberMatch){
      return request.get(`api/Quiz/GetQuizMatch/?e=${idEvent}&r=${idRound}&n=${numberMatch}`);
    }
  },

  GetQuizEvent(){
    return request.get("api/Quiz/GetQuizEvent"); 
  }

};
