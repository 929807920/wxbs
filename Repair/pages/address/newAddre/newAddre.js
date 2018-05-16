var index = 0;
Page({
  data: {
    name: "请填写您的姓名",
    tel: "请填写您的联系方式",
    region: 0,
    region: ['上海市', '上海市', '普陀区'],
    door: "街道门牌信息",
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function (e) {
    var warn = "";
    var that = this;
    var flag = false;
    if (e.detail.value.name == "") {
      warn = "请填写您的姓名！";
    } else if (e.detail.value.tel == "") {
      warn = "请填写您的手机号！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.tel))) {
      warn = "手机号格式不正确";
    } else if (e.detail.value.addre == '0') {
      warn = "请选择您的所在区域";
    } else if (e.detail.value.door == "") {
      warn = "请输入您的具体地址";
    } else {
      flag = true;
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      wx.redirectTo({
        url: '../chooseAddre/chooseAddre?tel=' + e.detail.value.tel +
        "&addre=" + that.data.region[e.detail.value.addre] +
        "&door=" + e.detail.value.door +
        "&name=" + e.detail.value.name +
        "&flag=" + flag +
        "&region=" + e.detail.value.addre
        //？后面跟的是需要传递到下一个页面的参数

      });
      console.log("addre的值：" + e.detail.value.addre)
    }
    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }

  },
  bindAddress: function () {
    wx.request({
      url: 'http://localhost:8080/hello',
      data: {
        name: '孙金旭',
        tel: '13162591257',
        addre: '上海市,上海市,普陀区',
        door: '123',
        flag: 0
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      },
      fail: function (res) {
        console.log("--------------fail--------------")
      }
    })
  },
})