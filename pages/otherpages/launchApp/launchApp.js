Page({
  download: function (e) {
    const that = this;
    wx.navigateTo({
      url: '../webView/webView'
    })
  },
  launchAppError: function (e) {
    console.log(e.detail.errMsg)
  }

})