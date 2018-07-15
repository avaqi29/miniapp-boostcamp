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
    weather_pic : "",
    forecast: []
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
    //console.log("hello world")
    //var that = this;
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '上海市',
      },

      success: res => {
        //console.log(res.data)
        let result = res.data.result
        this.getMainView(result)
        //set forecast
        this.getListView(result)
        this.setToday(result)
      },
      complete: () => {
        wx.stopPullDownRefresh()
      }
    })
  },

  getMainView(result){
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

  getListView(result){
    let getForecast = result.forecast
    let forecast = []
    let nowHour = new Date().getHours()
    for (let i = 0; i < 24; i += 3) {
      forecast.push({
        time: (i + nowHour) % 24 + "时",
        iconPath: '/pics/' + getForecast[i / 3].weather + '-icon.png',
        temp: getForecast[i / 3].temp + "°"
      })
      }
    forecast[0].time = '现在'
    this.setData({
      forecast: forecast
    })
  },
  setToday(result) {
    let date = new Date()
    this.setData({
      todayTemp: `${result.today.minTemp}° - ${result.today.maxTemp}°`,
      todayDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 今天`
    })
  },

  onTapDayWeather(){
    wx.showToast({
      title: 'dad',
    })
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },
  onTapLocation() {
    wx.getLocation({
      success: res => {
        console.log(res.latitude, res.longitude)
      }
    })
  }


})
