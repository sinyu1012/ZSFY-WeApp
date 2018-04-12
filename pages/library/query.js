var app = getApp();
var that;
Page({
  data: {
    query: '',//查询的关键字
    bookList: [],
    bookDetail: '',
    detailStatus: false,
    windowHeight: 0,
    windowWidth: 0,
    pageNum:1
  },

  onLoad: function (option) {
    if (option.q) {
      this.setData({
        query: option.q
      });
      this.queryBook();
    }
  },
  onShow: function (option) {
    that=this
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  handleInput: function (e) {
    this.setData({
      query: e.detail.value
    });
  },

  // 获取焦点
  inputFocus: function (e) {
    if (e.target.id === 'query') {
      this.setData({
        queryFocus: true
      });
    }
  },

  // 失去焦点
  inputBlur: function (e) {
    if (e.target.id === 'query') {
      this.setData({
        queryFocus: false
      });
    }
  },

  queryBook: function (e) {
    if (e && e.target.id === 'query') {
      this.setData({
        query: e.detail.value
      });
    }
    // 加载中
    wx.showLoading({
      title: '查询中',
      mask: true
    });

    wx.request({
      url: getApp().data.serachBookUrl,
      method: 'POST',
      data: {
        bookName: this.data.query
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: requestRes => {
        var _requestRes = requestRes.data;
        console.log(requestRes);
        if (_requestRes.lists.length > 0) {
          this.setData({
            bookList: _requestRes.lists
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '查询失败',
            image: '/image/common/fail.png',
            duration: 2000
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: '未知错误',
          image: '/image/common/fail.png',
          duration: 2000
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },

  getDetail: function (href) {
    this.setData({
      bookDetail: ''
    });
    // 加载中
    wx.showLoading({
      title: '查询中',
      mask: true
    });

    wx.request({
      url: getApp().data.serachBookDetailUrl,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        href: href
      },
      success: requestRes => {
        var _requestRes = requestRes.data;
        console.log(_requestRes);

        if (_requestRes.tv_libdetail_detail != "") {
          this.setData({
            bookDetail: _requestRes
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '查询失败',
            image: '/image/common/fail.png',
            duration: 2000
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: '未知错误',
          image: '/image/common/fail.png',
          duration: 2000
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },

  showDetail: function (e) {
    var id = e.currentTarget.id;

    if (id) {
      this.getDetail(id);
    }
    // 更新视图
    this.setData({
      detailStatus: true
    });
  },
  pullUpLoad: function (e) {
    this.nextPage()
  },
  nextPage:function(e){
    this.setData({
      pageNum: this.data.pageNum+1
    })
    console.log('pageNum:'+this.data.pageNum)    
    // 加载中
    wx.showLoading({
      title: '查询中',
      mask: true
    });

    wx.request({
      url: getApp().data.serachBookNextPageUrl,
      method: 'POST',
      data: {
        bookName: this.data.query,
        num:this.data.pageNum
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: requestRes => {
        var _requestRes = requestRes.data;
        console.log(requestRes);
        if (_requestRes.lists.length > 0) {
          this.setData({
            bookList: that.data.bookList.lists+ _requestRes.lists
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '查询失败',
            image: '/image/common/fail.png',
            duration: 2000
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: '未知错误',
          image: '/image/common/fail.png',
          duration: 2000
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },
  hideDetail: function (e) {
    if (e.target.id === 'query-detail' || e.target.id === 'close-detail') {
      this.setData({
        detailStatus: false
      });
    }
  }
});
