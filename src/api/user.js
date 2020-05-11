/**
 * 用户相关的请求模块
 */

import request from '@/utils/request'

/**
 *登陆/注册
 */
export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 *登陆/注册
 */
export const sendSms = data => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${data}`,
    data
  })
}
