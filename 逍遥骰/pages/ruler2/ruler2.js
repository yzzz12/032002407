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
      url: '../ruler1/ruler1'
    })
  },

  getBack:function(){
    wx.navigateTo({
      url: '../Menu/Menu'
    })
  },
  
})