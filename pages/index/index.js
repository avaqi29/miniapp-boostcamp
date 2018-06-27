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

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data: {
    wxml_temperature: '',
    wxml_weather: '',
    weather_pic : ""
  },

  onLoad(){
    this.getNow()
  },
  
  onPullDownRefresh(){
    this.getNow(() => {
      wx.stopPullDownRefresh() //need considering removal
    })

  },

getNow(callback){
  console.log("hello world")
  var that = this;
  wx.request({
    url: 'https://test-miniprogram.com/api/weather/now',
    data: {
      city: '北京市',
    },

    success: res => {
      console.log(res.data)
      let result = res.data.result
      let temperature = result.now.temp
      let weather = result.now.weather
      console.log(temperature, weather)

      this.setData({
        wxml_temperature: temperature + '°',
        wxml_weather: weatherMap[weather],
        weather_pic: "/pics/" + weather + "-bg.png"
      })
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: weatherColorMap[weather],
      })
    },
    complete: () => {
      wx.stopPullDownRefresh()
    }
  })

}
})
