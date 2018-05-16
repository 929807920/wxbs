var flag = false;
Page({
  data:{
    name:"",
    tel:"",
    area:"",
    areavalue:"",
    addre:"",
    dateValue:'预约日期',
    timeValue: '预约日期',
    display1:"flex",
    display2:"none",
    marks: [
      { name: 'desktop', value: ' 台式机'},
      { name: 'notebook',value: ' 笔记本'},
      { name: 'printer', value: ' 打印机' }
    ],
    comment:""
  },

   onLoad: function(options) { 
      flag=options.flag;
      console.log("..."+flag)
    if(!flag){
      this.setData({
          display1:"flex",
          display2:"none",
        })
      
    }else{
       this.setData({
          display1:"none",
          display2:"flex",
          name:options.name,
          tel:options.tel,
          addre:options.addre
       })
    }
  } ,
  
  toChooseAddre:function(){
    wx.redirectTo({
       url: '../chooseAddre/chooseAddre'
    });
  },

  timePickerBindchange:function(e){
    this.setData({
      timeValue:e.detail.value
    })
  },
  datePickerBindchange:function(e){
    this.setData({
      dateValue:e.detail.value
    })
  },
  //点击立即预约
  formSubmit: function(e) {
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    //判断的顺序依次是：姓名-手机号-地址-具体地址-预约日期-预约时间-开荒面积
    if(this.data.name==""){
       warn="请输入您的地址信息";
    }else if(e.detail.value.date=='预约日期'){
      warn = "请选择预约日期";
    }else if(e.detail.value.time=='预约时间'){
      warn = "请选择预约时间";
    } else if (e.detail.value.marks.length==0) {
      warn = "请选择服务";
    }else{

      //下面对选择面积后判断需要的时间和阿姨的个数
      var timeNum = 0;
      var personNum = 0;
      
      var desktop = 0;
      var notebook = 0;
      var printer = 0;
      if (e.detail.value.marks.length == 0) {
        wx.showModal({
          title: '提示',
          content: warn
        })
      }
      flag = false;//若必要信息都填写，则不用弹框，且页面可以进行跳转
      var that = this;
      wx.navigateTo({
        url: '../../order/order?tel=' + that.data.tel + "&addre=" + that.data.addre + "&door=" + that.data.door + "&date=" + e.detail.value.date + "&time=" + e.detail.value.time + "&personNum=" + personNum + "&timeNum=" + timeNum + "&desktop=" + desktop + "&notebook=" + notebook
        //？后面跟的是需要传递到下一个页面的参数
      });
      console.log('form发生了submit事件，携带数据为：', e.detail.value); 
    }


   //如果信息填写不完整，弹出输入框
    if(flag==true){
      wx.showModal({
      title: '提示',
      content:warn
    })
  }
}
})