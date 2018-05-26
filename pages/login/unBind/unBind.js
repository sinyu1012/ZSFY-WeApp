// pages/interface/getPhone/getPhone.js
var Bmob = require('../../../utils/bmob.js');
var common = require('../../../utils/common.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading: true,
  },
  query:function(){
    var that = this
    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    })
    wx.request({
      url: getApp().data.unBindUserUrl,
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        that.setData({
          hiddenLoading: true
        })
        if (res.data.issuccess == 1) {
          wx.showToast({
            title: '解绑成功',
            image: '/image/common/smile.png',
            duration: 2000
          });
          app.store.bind = 0;
          app.store.name = '';
          app.store.xh = '';
          wx.clearStorage()
          wx.setStorage({
            key: 'isBindFlag',
            data:0,
            success: function (s) {
              console.log('异步保存成功isBindFlag:' +0)
            }
          })
          
        }else{
          wx.showToast({
            title: '请先绑定学号',
            image: '/image/common/smile.png',
            duration: 2000
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


})