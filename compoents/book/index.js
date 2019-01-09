// compoents/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object,
    showLike: {
      type: Boolean,
      value: true
    }
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
    onTap:function(){
      const bid = this.data.book.id
      wx.navigateTo({
        url: `/pages/book_detail/book_detail?bid=${bid}`,
      })
    }
  }
})
