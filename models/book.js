import {
  HTTP
} from '../utils/http-p.js'

class BookModel extends HTTP{
  getHostList(){
    return this.request({
      url:'book/hot_list'
    })
  }

  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }

  getBookDetail(bid){
    return this.request({
      url:`book/${bid}/detail`
    })
  }

  getBookFavor(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }

  getBookComment(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  postBookComment(bid,content) {
    return this.request({
      url: `book/add/short_comment`,
      data:{
        book_id: bid,
        content: content
      },
      method:'POST'
    })
  }

  getBookFavorCount(){
    return this.request({
      url: `/book/favor/count`
    })
  }

}

export {BookModel}