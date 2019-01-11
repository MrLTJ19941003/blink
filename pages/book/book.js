// pages/book/book.js
import { BookModel } from '../../models/book.js'
import { KeywordModel } from '../../models/keyword.js'
import { random } from '../../utils/common.js'

const bookModel =new BookModel()
const keywordModel = new KeywordModel()
/**
 * 图书页面
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searching:false,
    hotTags:[],
    more:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const hostlist = bookModel.getHostList()
    const hotTagsPremise = keywordModel.getHot()

    Promise.all([hostlist, hotTagsPremise])
      .then(res => {
        console.log(res)
        this.setData({
          books: res[0],
          hotTags:res[1].hot
        })
    })
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
  /**
   * 搜索按钮事件
   */
  onSearching:function(event){
    this.setData({
      searching:true
    })
    
  },
  /**
   * 搜索关闭按钮事件
   */
  onCancel: function (event) {
    this.setData({
      searching: false
    })
  },
  onReachBottom:function(){
    this.setData({
      more: random(16)
    })
  }
})