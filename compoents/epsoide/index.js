// compoents/epsoide/index.js
const month_list = [
  '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月',
  '十一月',
  '十二月',
]
/**
 * 日期组件
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:String,
      observer:function(newVal,oldVal,changedPath){
        let val = newVal < 10 ?'0'+newVal : oldVal
        this.setData({
          _index: val
        })
      }
    }
  },

  attached:function(){
    let data = new Date()
    let year = data.getFullYear()
    let month = data.getMonth()
    this.setData({
      year:year,
      month: month_list[month]
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    year:0,
    month:'',
    _index:''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
