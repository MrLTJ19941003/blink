// pages/classic/classic.js
import { ClassicModel} from '../../models/classic.js'
import { ClassicModelP } from '../../models/classicPromise.js'
import { LikeModel } from '../../models/like.js'
let classic = new ClassicModel()
let likeModel = new LikeModel()
//使用promise重构了ClassicModel, 由于 getLatest 、getClassic两个方法的回调函数中耦合了一些数据操作，数据操作不宜放入页面js中处理，所以此classicP中不重构 getLatest 、getClassic两个方法
let classicP = new ClassicModelP()
/**
 * 期刊页面
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData:{},
    isFrist:false,
    isLast:true,
    like:false,
    count:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getLatest()
  },
  /**
   * 根据type和id获取期刊详情
   */
  _getClassicDetail(type,id){
    classicP.getClassicDetail(type, id)
      .then(res=>{
        this.setData({
          classicData: res,
          like: res.like_status,
          count: res.fav_nums
        })
      })
  },
  /**
   * 获取最新一期期刊详情
   */
  _getLatest(){
    classic.getLatest(res=>{
      this.setData({
        classicData: res,
        like: res.like_status,
        count: res.fav_nums
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
   * 喜欢按钮的点击事件监听
   */
  onLike: function(event){
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },
  /**
   * 上一期刊按钮
   */
  onPrevious: function (event) {
    this._getClassic('previous')
  },
  /**
   * 下一期刊按钮
   */
  onNext: function (event) {
    this._getClassic('next')
  },
  /**
   * 由于上一期和下一期大部分业务都一样，将公共部分提取出来当做参数
   */
  _getClassic:function(nextOrPreivous){
    let index = this.data.classicData.index
    classic.getClassic(index, nextOrPreivous, (res) => {
      this._getLikeFavor(res.id,res.type)
      this.setData({
        classicData: res,
        isFrist:classic.isFirst(res.index),
        isLast: classic.isLast(res.index)
      })
    })
    console.log(this.data)
  },
  /**
   * 获取期刊点赞信息
   */
  _getLikeFavor(id,type){
    const likeFavorPromise = likeModel.getLikeFavor(id,type)
    likeFavorPromise.then(res=> {
        this.setData({
          like: res.like_status,
          count: res.fav_nums
        })
    })
  }
})