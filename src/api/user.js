/**
 * 用户相关的请求模块
 */

import request from '@/utils/request'
// import store from '@/store/'

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
 *发送短信验证
 */
export const sendSms = data => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${data}`,
    data
  })
}

/**
 *获取登录用户的信息
 */
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user',
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
