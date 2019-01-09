import {config} from '../config.js'

/**
 * 错误吗列表映射
 */
const tips = {
  1:'抱歉，出现了一个未知的错误',
  // 100x 通用类型:
  0:'OK, 成功',
  1000:'输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1005: '不正确的开发者key',
  1006: '服务器内部错误',
  // 200x 点赞类型
  2000: '你已经点过赞了',
  2001: '你还没点过赞',
  // 300x 期刊类型
  3000: '该期内容不存在',
  // HTTP 状态码
  400: '请求包含不支持的参数',
  401: '未授权',
  403: '被禁止访问',
  404: '请求的资源不存在',
  413: '上传的File体积太大',
  500: '内部错误'
}
/**
 * 封装 wx.request 方法
 */
class HTTP {
  request(params){
    if(!params.method){
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      data: params.data,
      method:params.method,
      header: {
        'content-type':'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')){
            params.success && params.success(res.data)
        }else{
          let error_code = res.statusCode
          this._show_error(error_code)
        }
      },
      fail:(err)=>{
        this._show_error(1)
      }
    })
  }

  _show_error(error_code){
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }


}

export {HTTP}