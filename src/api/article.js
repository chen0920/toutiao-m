/**
 * 文章相关的请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 */

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/articles',
    params
  })
}
