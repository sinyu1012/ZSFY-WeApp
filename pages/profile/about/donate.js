var app = getApp();

Page({
  data: {
    mode: 'wechatpay',
    donorList: []
  },

  onLoad: function() {
   // this.getDonorList();
  },

  // 获取捐赠列表
  getDonorList: function() {
    // 加载中
    wx.showLoading({
      title: '获取中',
      mask: true
    });

    wx.request({
      url: app.api + '/donation',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + app.store.token
      },
      success: requestRes => {
        var _requestRes = requestRes.data;

        if (_requestRes.statusCode === 200) {
          this.setData({
            donorList: _requestRes.data
          });
        } else {
          wx.showToast({
            title: '获取失败',
            image: '/images/common/fail.png',
            duration: 2000
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '获取失败',
          image: '/images/common/fail.png',
          duration: 2000
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },

  // 切换方式
  switchMode: function(e) {
    if (e.target.id) {
      this.setData({
        mode: e.target.id
      });
    }
  },

  // 预览图片
  previewImage: function() {
    var qrUrl = {
      wechatpay: [
        'http://p99dm2apg.bkt.clouddn.com/wechatpay_qrcode.png'
      ],
      alipay: [
        'http://p99dm2apg.bkt.clouddn.com/alipay_qrcode.png'
      ]
    };

    wx.previewImage({
      urls: qrUrl[this.data.mode]
    });
  }
});
