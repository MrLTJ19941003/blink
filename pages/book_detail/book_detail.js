// pages/book_detail/book_detail.js
import {
  BookModel
} from '../../models/book.js'
import { LikeModel } from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:[],
    bookDetail:{},
    likeStatus:false,
    likeCount:0,
    postting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    const bid = options.bid
    const detail = bookModel.getBookDetail(bid)
    const favor = bookModel.getBookFavor(bid)
    const comment = bookModel.getBookComment(bid)

    Promise.all([detail, favor, comment])
      .then(res=>{
        console.log(res)
        this.setData({
          bookDetail: res[0],
          likeStatus: res[1].like_status,
          likeCount: res[1].fav_nums,
          comment: res[2]
        })
        wx.hideLoading()
    })

    // detail.then(res=>{
    //   this.setData({
    //     bookDetail:res
    //   })
    // })
    // favor.then(res => {
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
    // comment.then(res => {
    //   this.setData({
    //     comment: res
    //   })
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
   * 点赞按钮事件
   */
  onLike:function(event){
    let behavior = event.detail.behavior
    // likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
    likeModel.like(behavior, this.data.bookDetail.id, 400)
  },
  /**
   * 短评评论按钮事件
   */
  onFakePost:function(event){
    this.setData({
      postting: true
    })
  },
  /**
   * 短评取消按钮事件
   */
  onCancel: function (event){
    this.setData({
      postting: false
    })
  },
  /**
   * 短评按钮点击事件（提交评论短评）
   * 从event下的detail中的content取得内容，
   * 这里的内容是小程序子组件向父组件利用事件通信传递过来的
   */
  onPostComment:function(event){
    let content = event.detail.content || event.detail.value

    if(!content){
      wx.showToast({
        title: '短评不能为空',
        icon: 'none'
      })
      return
    }

    if(content>12){
      wx.showToast({
        title: '短评最多12个字',
        icon:'none'
      })
      return
    }
    bookModel.postBookComment(this.data.bookDetail.id, content)
      .then(res=>{
        wx.showToast({
          title: '+ 1',
          icon:'none'
        })
          this.data.comment.comments.unshift({
            content,
            nums:1
          })
          this.setData({
            comment: this.data.comment,
            postting:false
          })
      })
  }
})