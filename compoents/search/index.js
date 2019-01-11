// compoents/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'
import { paginationBev } from '../behaviors/pagination.js'
const keywordModel = new KeywordModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors:[paginationBev],
  properties: {
    hotTags: {
      type:Array,
      value:[]
    },
    more:{
      type:String,
      observer:'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyTag:[],
    searching:false,
    inputText:'',
    loading:false,
    loadingCenter:false
  },
  /**
   * 在组件实例进入页面节点树时执行
   */
  attached() {
    const historyTag = keywordModel.getHistory()
    this.setData({
      historyTag: historyTag
    })
    console.log(this.properties)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 搜索面板取消按钮事件
     */
    onCancel:function(event){
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },
    /**
     * 搜索面板清空按钮事件
     */
    onEmpty: function (event) {
      this._closeResult()
    },
    /**
     * 搜索input 输入完成事件
     */
    onConfirm: function (event) {
      this._showResult()
      this._showLoadingCenter()
      const content = event.detail.value || event.detail.content
      keywordModel.getBooksBySearchResult(content)
        .then(res=>{
          this.setMoreData(res.books)
          this.setTotal(res.total)
          this.setData({
            inputText: content
          })
          keywordModel.addToHistory(content)
          this._hideLoadingCenter()
        })
    },
    /**
     * observer 需要调用的方法 （加载更多）
     */
    loadMore:function(){
      if(!this.data.inputText){
        return 
      }
      if(this._isLocked()){
        return 
      }
      const length = this.getCurrentStart()
      if(this.hasMore()){
        this._locked()
        keywordModel.getBooksBySearchResult(this.data.inputText, length).then(res => {
          this.setMoreData(res.books)
          this._unLocked()
        },()=>{
          this._unLocked()
        })
      }
      
    },
    /**
     * 判断锁状态
     */
    _isLocked(){
      return this.data.loading
    },
    /**
     * 加锁
     */
    _locked(){
      this.setData({
        loading:true
      })
    },
    /**
     * 解锁
     */
    _unLocked() {
      this.setData({
        loading: false
      })
    },
    /**
     * 改变搜索状态从而改变页面显示
     */
    _showResult() {
      this.setData({
        searching: true
      })
    },
    /**
     * 改变搜索状态从而改变页面显示
     */
    _closeResult() {
      this.initialize()
      this.setData({
        searching: false,
        inputText: ''
      })
    },
    /**
     * 
     */
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    /**
     * 
     */
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }
  }
})
