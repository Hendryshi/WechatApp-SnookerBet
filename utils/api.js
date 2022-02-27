//api.js 我们将所有的接口统一管理
const request = require("./request"); //引入封装好的js文件
module.exports = {
  // 
  login(data) {
    return request.post("/learn/auth/login", data);
  },

  getMatch(idevent){
    return request.get(`?t=6&e=${idevent}`)
  }
};
