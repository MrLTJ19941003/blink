// compoents/tag/index.js
Component({
  /**
   * 配置启用插槽
   */
  options:{
    multipleSlots:true
  },
  /**
   * 自定义组件中引用外部样式
   */
  externalClasses:['tag-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    text:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick:function(){
      this.triggerEvent('click', {
        content: this.data.text
      }, {})
    }
  }
})
