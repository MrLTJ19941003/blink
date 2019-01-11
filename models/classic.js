import {
  HTTP
} from '../utils/http.js' //封装了 wx.request的http类
/**
 * 期刊类
 */
class ClassicModel extends HTTP{
  prefix = 'classic'

  /**
   * 获取最新一期期刊数据
   */
  getLatest(Scallback){
    this.request({
      url: 'classic/latest',
      success: (res) => {
        let key = this._fullKey(res.index)
        wx.setStorageSync(key, res)
        Scallback(res)
        this._setLastIndexStorage(res.index)
      }
    })
  }
  /**
   * 获取根据 nextOrPrevious 来决定获取next 或者 previous期刊的数据
   */
  getClassic(index, nextOrPrevious, sCallback){
    let key = nextOrPrevious == 'next' ? this._fullKey(index + 1) : this._fullKey(index - 1)
    let classicModel = wx.getStorageSync(key)
    if (classicModel){
      sCallback(classicModel)
    }else{
      this.request({
        url: `/classic/${index}/${nextOrPrevious}`,//使用了模板字符串拼接
        success: (res) => {
          sCallback(res)
          let key = this._fullKey(res.index)
          wx.setStorageSync(key, res)
        }
      })
    }
  }
  /**
   * 
   */
  getMyFavor(sCallback, start=1,count=20){
    this.request({
      url: `/classic/favor`,
      data:{
        start : start,
        count : count
      },
      success: (res) => {
        sCallback(res)
      }
    })
    
  }
  /**
   * 
   */
  getClassicDetail(type,id,sCallback) {
    this.request({
      url: `/classic/${type}/${id}`,
      success: (res) => {
        sCallback(res)
      }
    })

  }

  /**
   * 判断是否是第一页
   */
  isFirst(index){
    return index == 1 ? true : false
  }
  /**
   * 判断是否是最后一页
   */
  isLast(index) {
    let key = this._fullKey('latest-' + index)
    let latestEpsoide = wx.getStorageSync(key)
    if (latestEpsoide) {
      if (index == latestEpsoide) {
        return true
      }
    }
    else return false
  }
  /**
   * 往缓存中存入index数据
   */
  _setLastIndexStorage(index){
    let key = this._fullKey('latest-' + index)
    wx.setStorageSync(key, index)
  }
  /**
   * 拼接 KEY 然后返回
   */
  _fullKey(partKey) {
    let key = this.prefix + '-' + partKey
    return key
  }
}

export { ClassicModel}