import {
  HTTP
} from '../utils/http-p.js'

class KeywordModel extends HTTP{
  key = 'q'
  maxLength = 10
  getHistory(){
    let keywords = wx.getStorageSync(this.key)
    if (!keywords){
      return []
    }
    return keywords
  }

  getHot(){
    return this.request({
      url: 'book/hot_keyword'
    })
  }

  addToHistory(keyword){
    let keywords = this.getHistory()
    const has = keywords.includes(keyword)
    if (!has){
      if (keywords.length >= this.maxLength){
        keywords.pop()
      }
      keywords.unshift(keyword)
      wx.setStorageSync(this.key, keywords)
    }
  }
  /**
  * 根据q关键字搜索书籍
  */
  getBooksBySearchResult(q, start = 0, count = 20, summary = 1) {
    return this.request({
      url: '/book/search',
      data: {
        q: q,
        start: start,
        count: count,
        summary: summary
      }
    })
  }
}

export { KeywordModel}