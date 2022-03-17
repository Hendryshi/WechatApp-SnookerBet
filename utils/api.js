//api.js 我们将所有的接口统一管理
const request = require("./request"); //引入封装好的js文件
module.exports = {

  getMatch(idevent, options){
    return request.get(`api/Snooker/GetEventWithMatch/${idevent}`, options)
  },

  getMatchOnGoing(options){
    return request.get("api/Snooker/GetOnGoingMatch", options);
  },

  /**
   * @param {integer} idEvent mandatory
   * @param {string} wechatName not mandatory 
  */
  getPredict(idEvent,wechatName,reEdit, options){
    return request.get(`api/Quiz/GetQuizPredict/?e=${idEvent}&wn=${wechatName}&re=${reEdit}`, options);
  },

  postPredict(options){
    return request.post("api/Quiz/UpdateQuizPredict", options);
  },

  /**
   * @param {integer} idEvent not mandatory 
  */
  getRankSummary(options){
    return request.get("api/Quiz/GetQuizSummary", options);
  },

  getRankTrending(options){
    return request.get("api/Quiz/GetQuizTrending", options);
  },

  getMatchPredict(idEvent, idRound, numberMatch, options){
    if(idEvent && idRound && numberMatch){
      return request.get(`api/Quiz/GetQuizMatch/?e=${idEvent}&r=${idRound}&n=${numberMatch}`, options);
    }
  },

  GetQuizEvent(options){
    return request.get("api/Quiz/GetQuizEvent", options); 
  }

};
