import {
  HTTP
} from '../utils/http-p.js' //封装了 wx.request的http类 使用 promise
/**
 * 期刊类
 */
class ClassicModelP extends HTTP {
  prefix = 'classic'
  
  /**
   * 
   */
  getMyFavor(start = 1, count = 20) {
    return this.request({
      url: `/classic/favor`,
      data: {
        start: start,
        count: count
      }
    })

  }
  /**
   * 
   */
  getClassicDetail(type, id) {
    return this.request({
      url: `/classic/${type}/${id}`
    })

  }

  /**
   * 判断是否是第一页
   */
  isFirst(index) {
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
  _setLastIndexStorage(index) {
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

export { ClassicModelP }