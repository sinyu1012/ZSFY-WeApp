//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    //课表数据首次获取并存到数据表中，下次直接读取数据库
    wlist: [
      // { "xqj": 3, "skjc": 1, "skcd": 3, "kcmc": "开发中，可到APP中使用" },//星期，从第几节开始，几节，内容
    ]
  },
  onLoad: function () {
    console.log('onLoad')
    var that=this
    wx.request({
      url: getApp().data.getTimetable,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data:{
        xh: wx.getStorageSync('xh')
        // xh:'2016124008'
      },
      success: function (res) {
       console.log(res)
       that.setData({
         wlist: res.data
       });
      }
    })
  }
})
