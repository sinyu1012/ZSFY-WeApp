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
    bind: false
  },
  onLoad: function() {
    // 获取用户基本信息
    this.getUserInfo();
  },
  getUserInfo: function() {
    var store = app.store;
    console.log(store)

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
