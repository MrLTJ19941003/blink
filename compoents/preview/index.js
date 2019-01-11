// compoents/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classicFavor:{
      type:Object,
      observer: function (newVal) {
        if (newVal) {
          var typeText = {
            100: "电影",
            200: "音乐",
            300: "句子"
          }[newVal.type]
        }
        this.setData({
          typeText: typeText
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeText: String
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick(event){
      this.triggerEvent('click', {
        bid: this.properties.classicFavor.id,
        type: this.properties.classicFavor.type
      }, {})
    }
  }
})
