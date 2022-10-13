// pages/Player_VS_Player/Player_VS_Player.js
//获取应用实例
// var app = getApp()
// var util = require('../../utils/util.js');
var upstepflag = 0; //为1可放置上骰子
var downstepflag = 0; //为1可放置下骰子
var upflag = 1;//为1可投掷骰子
var downflag = 0;
var index = 0;
var upScore = 0;//记录分数
var downScore = 0;
var uparr = [];//数组记录棋盘状况
var downarr = [];
  for (let i = 0; i < 9; i++) {
    uparr[i]=0;  
    downarr[i]=0;   
  }


Page({
  /**
   * 页面的初始数据
   */
  data: {
    img:["/image/0.jpg","/image/0.jpg","/image/0.jpg","/image/0.jpg","/image/0.jpg","/image/0.jpg","/image/0.jpg","/image/0.jpg","/image/0.jpg"],
    dimg:["/image/0.jpg","/image/0.jpg","/image/0.jpg","/image/0.jpg","/image/0.jpg","/image/0.jpg","/image/0.jpg","/image/0.jpg","/image/0.jpg"],
    imgleft:"/image/0.jpg",
    imgright:"/image/0.jpg",
    diceArrays:["/image/0.jpg","/image/1.jpg","/image/2.jpg","/image/3.jpg","/image/4.jpg","/image/5.jpg","/image/6.jpg"]

  },

  //投掷左骰子
  updiceClick:function () {
    if (upstepflag == 0 && upflag == 1 && downflag==0){
        index =  Math.floor(Math.random() * 6+1)
        upstepflag = 1
        downstepflag = 0
        upflag = 0
        downflag = 1
        this.setData({
          imgleft: this.data.diceArrays[index]
        })
              
    } 
  },
  //投掷右骰子
  downdiceClick:function () {
    if (downstepflag == 0 && upflag == 0 && downflag == 1) {
      index =  Math.floor(Math.random() * 6+1)
      downstepflag = 1
      upstepflag = 0
      upflag = 1
      downflag = 0
      this.setData({
        imgright: this.data.diceArrays[index]
      })
                 
  }
  },


  // 放置上骰子
 upstep(event) {
   var id=event.currentTarget.dataset.id;
   if(upstepflag==1 && uparr[id]==0 && downstepflag==0){
     uparr[id]=index
     this.data.img[id]=this.data.diceArrays[index]
     upstepflag=0   
    this.setData({
      img: this.data.img,
    })
    this.downmove(id)
    this.end()


   }  
   
  },
  //放置下骰子
  downstep(event) {
    var id=event.currentTarget.dataset.id;
    if(downstepflag==1 && downarr[id]==0 && upstepflag==0){
      downarr[id]=index
      this.data.dimg[id]=this.data.diceArrays[index]
      downstepflag=0   
     this.setData({
       dimg: this.data.dimg,
     })
     this.upmove(id)
     this.end()
    }  
    
   },
 

  //消除
  downmove(id){
    if(id>=0 && id<=2){
      for(let i=0;i<=2;i++){
        if(downarr[i]==index){
          downarr[i]=0
          this.data.dimg[i]=this.data.diceArrays[0]
          this.setData({
            dimg: this.data.dimg
          })
        }
      }
    }

    else if(id>=3 && id<=5){
      for(let i=3;i<=5;i++){
        if(downarr[i]==index){
          downarr[i]=0
          this.data.dimg[i]=this.data.diceArrays[0]
          this.setData({
            dimg: this.data.dimg
          })
        }
      }
    }

    else if(id>=6 && id<=8){
      for(let i=6;i<=8;i++){
        if(downarr[i]==index){
          downarr[i]=0
          this.data.dimg[i]=this.data.diceArrays[0]
          this.setData({
            dimg: this.data.dimg
          })
        }
      }
    }

  },

  upmove(id){
    if(id>=0 && id<=2){
      for(let i=0;i<=2;i++){
        if(uparr[i]==index){
          uparr[i]=0
          this.data.img[i]=this.data.diceArrays[0]
          this.setData({
            img: this.data.img
          })
        }
      }
    }

    else if(id>=3 && id<=5){
      for(let i=3;i<=5;i++){
        if(uparr[i]==index){
          uparr[i]=0
          this.data.img[i]=this.data.diceArrays[0]
          this.setData({
            img: this.data.img
          })
        }
      }
    }

    else if(id>=6 && id<=8){
      for(let i=6;i<=8;i++){
        if(uparr[i]==index){
          uparr[i]=0
          this.data.img[i]=this.data.diceArrays[0]
          this.setData({
            img: this.data.img
          })
        }
      }
    }

  },

  //计算分数
Score:function(arr){
  var sum=0
  for(let i=0;i<9;i=i+3)
  {
    //三个相等
    if(arr[i]==arr[i+1] && arr[i+1]==arr[i+2]){
      sum+=arr[i]*9
    }
    //三个都不等
    else if(arr[i]!=arr[i+1] && arr[i]!=arr[i+2] && arr[i+1]!=arr[i+2]){
      sum+= arr[i]+arr[i+1]+arr[i+2]
    }
    //两个相等
    else{
      if(arr[i]==arr[i+1]){
        sum += arr[i]*4 + arr[i+2]
      }
      else if(arr[i]==arr[i+2]){
        sum += arr[i]*4 + arr[i+1]
      }
      else{
        sum += arr[i+1]*4 + arr[i]
      }
    }

  }
  return sum
},

//判断结束
  end(){
    var countup=0
    var countdown=0
    //遍历数组统计骰子个数
    for(let i=0;i<9;i++){
      if(uparr[i]==0){
        countup++
      }
      if(downarr[i]==0){
        countdown++
    }
  }
  //如果两个棋盘都没满，就继续游戏
  if(countup!=0 && countdown!=0){
    return
  }
  //否则弹窗结束游戏
  else{
    upstepflag = 0
    downstepflag = 0
    upflag = 0
    downflag = 0

    upScore=this.Score(uparr)
    downScore=this.Score(downarr)
    // this.setData({
    //   upscore:upScore,
    //   downscore:downScore
    // })

    if(upScore > downScore){
      var winner="玩家1获胜！"
    }
    else if(upScore < downScore){
      var winner="玩家2获胜！"
    }
    else{
      var winner="平局！"
    }
  //结束弹窗
    wx.showModal({
      title: "玩家1:玩家2="+upScore+":"+downScore,
      // content:"玩家1:"+upScorr,
      content:winner,
      // content:"玩家1:"+upScorr",玩家2:"+downScore,
   
      success: function (res) {
        if (res.confirm) {
          upstepflag = 0; //为1可放置上骰子
          downstepflag = 0; //为1可放置下骰子
          upflag = 1;//为1可投掷骰子
          downflag = 0;
          index = 0;
          upScore = 0;//记录分数
          downScore = 0;
          uparr = [];//数组记录棋盘状况
          downarr = [];
            for (let i = 0; i < 9; i++) {
              uparr[i]=0;  
              downarr[i]=0;   
            }
          wx.navigateTo({
            url: "./Player_VS_Player"
          });

        }
        else if(res.cancel){
          wx.navigateTo({
            url: '../Menu/Menu',
          })
        }
      },
    })

  }
},

  
})

