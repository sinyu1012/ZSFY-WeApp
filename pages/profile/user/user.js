var app = getApp();

Page({
  data: {
    userInfo: {
      avatar: '/image/more/avatar.png',
      nickName: '',
      name: '',
      studentId: '',
      dormitory: ''
    },
    userInfo1: {},
    bind: false
  },
  onShow: function() {
    // 获取用户基本信息

    this.getUserInfo();
  },
  getUserInfo: function() {
    var store = app.store;
    var that = this
    console.log(store)
    if (!app.globalData.userInfo) {
      wx.showToast({
        title: '请先授权',
        image: '/image/common/smile.png',
        duration: 1000
      });
      setTimeout(function () {
        wx.navigateTo({
          url: '../../otherpages/authorization/authorization',
        })
      }, 1000);
    }
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo1: userInfo
      })
    })
    if (JSON.stringify(store) !== '{}') {
      var userInfo = {
        avatar: store.avatarUrl,
        name: store.name,
        nickName: store.nickName,
        studentId: store.xh,
        dormitory: store.usedBAddress ? store.usedBAddress.replace(/[^0-9]/g, '') : '--'
      };

      // 更新数据
      this.setData({
        userInfo: userInfo
      });

      this.setData({
        bind: store.bind
      });
      
    }
  }
});
