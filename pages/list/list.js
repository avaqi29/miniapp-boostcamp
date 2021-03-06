// pages/list/list.js

const dayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'] 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekWeather: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onReady() {
    console.log("onReady")
  },
  onLoad () {
    console.log("onLoad")
    this.getWeekWeather()
  
  },
  getWeekWeather(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data:{
        time: new Date().getTime(),
        city: "上海市"
      },
      success: res=>{
        let result = res.data.result
        this.setWeekWeather(result) 
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getWeekWeather(() => {
      wx.stopPullDownRefresh()
    })
  
  },

  onShareAppMessage: function () {
  
  },
  setWeekWeather(result) {
    let weekWeather = [] 
    for (let i = 0; i < 7; i++) {
      let date = new Date()
      date.setDate(date.getDate() + i)
      weekWeather.push({
        day: dayMap[date.getDay()],
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        temp: `${result[i].minTemp}° - ${result[i].maxTemp}°`,
        iconPath: '/pics/' + result[i].weather + '-icon.png'
      })
    }
    weekWeather[0].day = '今天'
    this.setData({
      weekWeather: weekWeather
    })
  }
})