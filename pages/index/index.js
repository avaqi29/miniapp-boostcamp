//index.js
//获取应用实例
const app = getApp()

const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

Page({
  data: {
    wxml_temperature: '14°',
    wxml_weather: '阴天'
  },

  onLoad(){
    console.log("hello world")
    var that = this;
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now', 
      data: {
        city: '上海市',
      },
      
      success: res=> {
        console.log(res.data)
        let result = res.data.result
        let temperature = result.now.temp
        let weather = result.now.weather
        console.log(temperature, weather)
        
        this.setData({
          wxml_temperature: temperature + '°',
          wxml_weather: weatherMap[weather] 
        })
      }


    })


  }
})
