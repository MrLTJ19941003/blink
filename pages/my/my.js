// pages/my/my.js
import { BookModel } from '../../models/book.js'
import { ClassicModel } from '../../models/classic.js'
const bookModel = new BookModel()
const classicModel = new ClassicModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo:null,
    classicFavors:[],
    favorCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAuthorized()
    this._initData()
  },
  /**
   * 判断是否需要授权，如果已经授权直接获取用户信息
   */
  getAuthorized:function(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },
  /**
   * 
   */
  onGetUserInfo(event) {
    let userInfo = event.detail.userInfo
    wx.login({
      success(res){
        if (res.code) {
          console.log(res.code)
          console.log(userInfo)
        }
      }
    })
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo: data.userInfo
      })
    }
  },
  /**
   * 
   */
  onClassicPreview(event) {
    // let bid = event.detail.bid
    // let type = event.detail.type
    // console.log(bid)
    // console.log(type)
    // wx.navigateTo({
    //   url: `/pages/classic/classic?bid=${bid}&type=${type}` 由于是tarbar页面，跳转不能携带参数
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._initData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  _initData(){
    const bookFavorPromise = bookModel.getBookFavorCount()
    bookFavorPromise.then(res => {
      this.setData({
        favorCount: res.count
      })
    })
    classicModel.getMyFavor(res => {
      this.setData({
        classicFavors: res
      })
    })
  }
  
})