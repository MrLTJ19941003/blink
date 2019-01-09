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


}

export {BookModel}