Page({
  data: {

  },

  continue:function(){
    wx.navigateTo({
      url: '',
    })
  },
  rulers:function(){
    wx.navigateTo({
      url: '../ruler2/ruler2'
    })
  },
  getBack:function(){
    wx.navigateTo({
      url: '../Menu/Menu'
    })
  },
 
  onLoad: function (options) {
  },
})