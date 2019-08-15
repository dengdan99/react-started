import axios from 'axios'
import Qs from 'qs'
import { getToken } from '../utils';

/*
 * 创建axios实例
 */
const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [data => {
    return Qs.stringify(data)
  }],
})

service.interceptors.response.use(function (response) {
  if (response.status !== 200) {
    console.warn(response.data.msg)
  }
  return response
}, function (err) {
  console.log('axios response error:', err)
})



export function remoteGet (url: string, params = {}): Promise<AjaxResponse> {
  const token = getToken()
  if (token) params = Object.assign(params, { token })
  return service.get(url, {
    params,
    validateStatus: function (status) {
      return status >=200 && status < 300
    }
  }).then(res => {
    return res.data
  }).catch(err => {
    console.warn('get api error:', url)
    console.log(err)
  })
}

export function remotePost (url: string, params = {}): Promise<AjaxResponse> {
  const token = getToken()
  const config = {
    params: {}
  }
  if (token) config.params = { token }
  return service.post(url, params, config).then(res => {
    return res.data
  }).catch(err => {
    console.warn('post api error:', url)
    console.log(err)
  })
}
