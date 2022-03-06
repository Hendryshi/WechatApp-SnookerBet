//api.js 我们将所有的接口统一管理
const request = require("./request"); //引入封装好的js文件
module.exports = {
  // 
  login(data) {
    return request.post("/learn/auth/login", data);
  },

  getMatch(idevent){
    return request.get(`api/Snooker/GetEventWithMatch/${idevent}`)
  },

  /**
   * @param {integer} mandatory
   * @param {string} not mandatory 
  */
  getPredict(idEvent,wechatName){
    return request.get(`api/Quiz/GetQuizPredict/?e=${idEvent}&wn=${wechatName}`);
  },

  postPredict(oPredictData){
    return request.post("api/Quiz/UpdateQuizPredict", oPredictData);
  }
};
