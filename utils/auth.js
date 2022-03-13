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
                wx.setStorageSync("hasUserProfile", true);
                wx.setStorageSync("userProfile", result.userInfo);
                resolve(true);
              }
            },
            fail: (err)=>{
              console.log("get user profile error" + err.errMsg)
              reject(true);
              /*wx.showToast({
                title: '用户拒绝授权则无法继续下一步',
                icon: 'none'
              });*/
            }
          });
        }
      });
};

const getUserWechatName = function(){
  return wx.getStorageSync("userProfile").nickName;
};

const hasUserProfile = function(){   
    if(wx.getStorageSync("hasUserProfile") && wx.getStorageSync("userProfile")){
        return true;
    }else{
        return false;
    }
        
};

module.exports = {
    bindUserProfil: bindUserProfile,
    getUserWechatName: getUserWechatName,
    hasUserProfile: hasUserProfile
};