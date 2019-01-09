import { HTTP } from '../utils/http.js' //封装了 wx.request的http类

/**
 * 点赞类
 */
class LikeModel extends HTTP {
  /**
   * 点赞点击按钮更新点赞状态
   */
  like(behavior,artID,category) {
    let url = behavior == 'like' ? 'like' :'like/cancel'
    this.request({
      url: url,
      method:'POST',
      data:{
        art_id: artID,
        type: category
      }
    })
  }
  /**
   * 获取点赞接口信息
   */
  getLikeFavor(id, type, sCallback) {
    this.request({
      url: '/classic/' + type + '/' + id + '/favor',
      success: (res) => {
        sCallback(res)
      }
    })
  }
}
export { LikeModel }