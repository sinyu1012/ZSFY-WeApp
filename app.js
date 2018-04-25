//app.js
const Bmob = require('utils/bmob.js');

Bmob.initialize("1792ddc7735c77dfe0ae03d454488a78", "17290c2cd6b66d7b8095f13318411655");
App({
  version: '1.0',
  data: {
    basicInfo: "https://fyapi.sinyu1012.cn/test/BasicInfoServlet",
    getCookie: "https://fyapi.sinyu1012.cn/test/JWYzmServlet",
    loginUrl: "https://fyapi.sinyu1012.cn/test/LoginServlet",
    getJWInfoUrl: "https://fyapi.sinyu1012.cn/test/GetJWInfoServlet",
    bindUserUrl: "https://fyapi.sinyu1012.cn/test/MinipgBindUserServlet",
    openLogUrl: "https://fyapi.sinyu1012.cn/test/MinipgOpenLogServlet",
    isBindInfoUrl: "https://fyapi.sinyu1012.cn/test/IsBindUserServlet",
    updateCJUrl: "https://fyapi.sinyu1012.cn/test/Update_CJServlet",
    serachBookUrl: "https://fyapi.sinyu1012.cn/test/SerachBookServlet", 
    serachBookDetailUrl: "https://fyapi.sinyu1012.cn/test/SerachBookDetailServlet", 
    serachBookNextPageUrl: "https://fyapi.sinyu1012.cn/test/SerachBookNextPageServlet", 
    queryzaocao: "https://fyapi.sinyu1012.cn/test/QueryzaocaoServlet",
    queryDetailzaocao: "https://fyapi.sinyu1012.cn/test/QueryzaocaoDetailServlet"
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})