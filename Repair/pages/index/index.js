//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '十月妈咪店铺报修',
    userName: '',
    userPassword: '',
    response: '', //存取返回数据
  },
userNameInput:function(e){
  this.setData({
    userName:e.detail.value
  })
},
userPasswordInput: function (e) {
  this.setData({
    userPassword: e.detail.value
  })
  console.log(e.detail.value)
},
login:function(){
  var that = this;
  if (this.data.userName != '' && this.data.userPassword != ''){
    console.log("111111")
    wx.request({
      url: 'http://localhost:8080/login',
      data: {
        userName: this.data.userName,
        password: this.data.userPassword
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("==========="+res.data);
        that.setData({
          id_token: res.data.id_token,
          response: res
        })
        try {
          wx.setStorageSync('id_token', res.data.id_token)
        } catch (e) {
        }
        wx.navigateTo({
          url: 'index',
        })
        console.log(res.data)
      },
      fail: function (res) {
        console.log(res.data);
        console.log(".....fail.....");
      }
    })
  }else{
    console.log("用户名或密码不能为空")
  } 
}
})
