// compoents/like/index.js
/**
 * 点赞组件
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLike:{
      type:Boolean,
      value:false
    },
    count:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesUrl:'images/like.png',
    noUrl:'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(event){
      // 自定义事件
      let isLike = this.properties.isLike
      let count = this.properties.count;
      count = isLike ? count-1 : count+1;
      this.setData({
        isLike: !isLike,
        count:count
      })
      // 激活
      let behavior = this.properties.isLike ? "like" : "cancel"
      this.triggerEvent('like',{
        behavior: behavior
      },{})
    }
  }
})
