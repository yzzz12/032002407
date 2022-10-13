// pages/Player_VS_AI/Player_VS_AI.js
var playerstep=0;//为1可以放置骰子
var computerstep=0;//为1可以放置骰子
var playerflag=1;//为1可以投掷骰子
var index=0;
var playerarr = [];
var computerarr = [];
var upScore = 0;//记录分数
var downScore = 0;
for(let i=0;i<9;i++)
{
  playerarr[i]=0;
  computerarr[i]=0;
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
//玩家投掷骰子
playerdiceClick:function () {
  if (playerstep == 0 && playerflag == 1){
      index =  Math.floor(Math.random() * 6+1)
      playerstep = 1
      playerflag = 0
      computerstep=0
      this.setData({
        imgright: this.data.diceArrays[index]
      })
            
  } 
},
// 玩家放置骰子
playerstep(event) {
 var id=event.currentTarget.dataset.id;
 if(playerstep==1 && playerarr[id]==0 && computerstep==0){
   playerarr[id]=index
   this.data.dimg[id]=this.data.diceArrays[index]
   playerstep=0   
  this.setData({
    dimg: this.data.dimg,
  })
  this.computermove(id)
  this.end()
 }
 //电脑投掷骰子  
  index =  Math.floor(Math.random() * 6+1)
  computerstep = 1
  playerstep = 0
  playerflag = 1
  this.setData({
    imgleft: this.data.diceArrays[index]
  })
     //电脑放置
  var n=[]//统计相同个数
  var m=[]
  var ma=0
  var max=0
  for(let i=0;i<3;i++){
    m[i]=0
    n[i]=0
  }
  if(computerstep==1){
    for(let i=0;i<9;i++){//遍历己方数组
      if(computerarr[i]==0){//找到一个空位置
        ma=i
        if(i>=0 && i<=2 && n[0]==0){
          for(let j=0;j<=2;j++){//遍历对面同列找相同数
            if(playerarr[j]==index){
              n[0]++;
            }
            m[0]=i;
          }
        }
        else if(i>=3 && i<=5 && n[1]==0){
          for(let j=3;j<=5;j++){
            if(playerarr[j]==index){
              n[1]++;
            }
            m[1]=i;
          }
       }
        else if(i>=6 && i<=8 && n[2]==0){
          for(let j=6;j<=8;j++){
            if(playerarr[j]==index){
              n[2]++;
            }
            m[2]=i;
          }
        } 
      }   
      max=n[0]
      var num=0
      for(let k=0;k<3;k++){
        if(n[k]==0){
          num++
        }
      }
      if(num!=3)
      {
        for(let k=0;k<3;k++)
        if(n[k]>=max)
        {
          max=n[k]
          ma=m[k]
        }
      }
    }
      // ma=8
      computerarr[ma]=index
      this.data.img[ma]=this.data.diceArrays[index]
      playerflag=1
      playerstep=0  
      computerstep=0 
     this.setData({
       img: this.data.img,
     })
    this.playermove(ma)
    this.end()

  

    }
 
},
//机器放置骰子
// computerstep() {
//   m=[]//统计相同个数
//   n=[]
//   ma=0
//   max=0
//   for(let i=0;i<3;i++){
//     m[i]=0
//     n[i]=0
//   }
//   if(computerstep==1){
//     // for(var i=0;i<9;i++){//遍历己方数组
//     //   if(computerarr[i]==0){//找到一个空位置
//     //     ma=i
//     //     if(i>=0 && i<=2 && n[0]==0){
//     //       for(var j=0;j<=2;j++){//遍历对面同列找相同数
//     //         if(playerarr[j]==index){
//     //           n[0]++;
//     //         }
//     //         m[0]=i;
//     //       }
//     //     }
//     //   }
//     //   else if(i>=3 && i<=5 && n[1]==0){
//     //     for(var j=3;j<=5;j++){
//     //       if(playerarr[j]==index){
//     //         n[1]++;
//     //       }
//     //       m[1]=i;
//     //     }
//     //   }
//     //   else if(i>=6 && i<=8 && n[2]==0){
//     //     for(var j=6;j<=8;j++){
//     //       if(playerarr[j]==index){
//     //         n[2]++;
//     //       }
//     //       m[2]=i;
//     //     }
//     //   }

//     //    max=n[0]
//     //   for(var k=0;k<3;k++){
//     //     if(n[k]>=max){
//     //       max=n[k]
//     //       ma=m[k]
//     //     }
//     //   }
//     // }
//       ma=8
//       computerarr[ma]=index
//       this.data.img[ma]=this.data.diceArrays[index]
//       playerstep=0   
//      this.setData({
//        img: this.data.img,
//      })
//     this.playermove(ma)
//     this.end()
    
//   }



// },



//消除
playermove(id){
  if(id>=0 && id<=2){
    for(let i=0;i<=2;i++){
      if(playerarr[i]==index){
        playerarr[i]=0
        this.data.dimg[i]=this.data.diceArrays[0]
        this.setData({
          dimg: this.data.dimg
        })
      }
    }
  }
  else if(id>=3 && id<=5){
    for(let i=3;i<=5;i++){
      if(playerarr[i]==index){
        playerarr[i]=0
        this.data.dimg[i]=this.data.diceArrays[0]
        this.setData({
          dimg: this.data.dimg
        })
      }
    }
  }

  else if(id>=6 && id<=8){
    for(let i=6;i<=8;i++){
      if(playerarr[i]==index){
        playerarr[i]=0
        this.data.dimg[i]=this.data.diceArrays[0]
        this.setData({
          dimg: this.data.dimg
        })
      }
    }
  }
},

computermove(id){
  if(id>=0 && id<=2){
    for(let i=0;i<=2;i++){
      if(computerarr[i]==index){
        computerarr[i]=0
        this.data.img[i]=this.data.diceArrays[0]
        this.setData({
          img: this.data.img
        })
      }
    }
  }

  else if(id>=3 && id<=5){
    for(let i=3;i<=5;i++){
      if(computerarr[i]==index){
        computerarr[i]=0
        this.data.img[i]=this.data.diceArrays[0]
        this.setData({
          img: this.data.img
        })
      }
    }
  }

  else if(id>=6 && id<=8){
    for(let i=6;i<=8;i++){
      if(computerarr[i]==index){
        computerarr[i]=0
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
    if(computerarr[i]==0){
      countup++
    }
    if(playerarr[i]==0){
      countdown++
  }
}
//如果两个棋盘都没满，就继续游戏
if(countup!=0 && countdown!=0){
  return
}
//否则弹窗结束游戏
else{
  computerstep = 0
  playerstep = 0
  // computerflag = 0
  playerflag = 0
  upScore=this.Score(computerarr)
  downScore=this.Score(playerarr)

  if(upScore > downScore){
    var winner="电脑获胜！"
  }
  else if(upScore < downScore){
    var winner="玩家获胜！"
  }
  else{
    var winner="平局！"
  }
//结束弹窗
  wx.showModal({
    title: "电脑:玩家="+upScore+":"+downScore,
    content:winner,
    // success: function (res) {
    //   if (res.confirm) {
    //     wx.navigateTo({
    //       url: "./Player_VS_Player"
    //     });
    //   }
    //   else if(res.cancel){
    //     wx.navigateTo({
    //       url: '../Menu/Menu',
    //     })
    //   }
    // },
    success: function (res) {
      if (res.confirm) {
        playerstep=0
        computerstep=0
        playerflag=1
        index=0
        playerarr = []
        computerarr = []
        for(var i=0;i<9;i++)
        {
          playerarr[i]=0;
          computerarr[i]=0;
        }
        wx.navigateTo({
          url: "./Player_VS_AI"
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