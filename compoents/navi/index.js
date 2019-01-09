// compoents/navi/index.js
/**
 * 标题组件
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    isFrist:Boolean,
    isLast:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    previousSrc:'images/triangle@right.png',
    previousSrcdis: 'images/triangle.dis@right.png',
    nextSrc: 'images/triangle@left.png',
    nextSrcdis: 'images/triangle.dis@left.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onNext:function(){
      if(!this.properties.isLast){
        this.triggerEvent('next', {}, {})
      }
      
    },

    onPrevious: function () {
      if (!this.properties.isFrist) {
        this.triggerEvent('previous', {}, {})
      }
    }
  }
})
