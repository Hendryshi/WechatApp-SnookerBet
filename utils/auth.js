/**
 * Trigger getting user profil after the tap action
 * then stock user's nickName into Storage
 * @return {object} a new Promise 
*/
const bindUserProfile = function(){
    return new Promise((resolve,reject)=>{
        if(wx.getUserProfile){
          wx.getUserProfile({
            lang: 'zh_CN',
            desc: '需要用户授权登录',
            success: (result)=>{
              if(result){
                //result.userInfo [nickName: "sophie_zhf", avatarUrl: "https://...", language:"zh_CN"]
                //set user info into storage
                wx.setStorageSync("userProfile", result.userInfo);
                resolve(true);
              }
            },
            fail: (err)=>{
              console.log("get user profile error" + err.errMsg)
              reject(true);
            }
          });
        }
      });
};

const getUserWechatName = function(){
  return wx.getStorageSync("userProfile").nickName;
};

const hasUserProfile = function(){   
    if(wx.getStorageSync("userProfile")){
        return true;
    }else{
        return false;
    }
        
};

module.exports = {
    bindUserProfile: bindUserProfile,
    getUserWechatName: getUserWechatName,
    hasUserProfile: hasUserProfile
};