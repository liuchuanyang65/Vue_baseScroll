/*
 * http 请求
 * @Author: chuanyangliu
 * @Date: 2019-01-30 10:38:32
 * @Last Modified by: lichuanyang
 * @Last Modified time: 2019-03-20 13:31:09
 */
import axios from 'axios'
import APIS from '@/api/index'

window.axios = axios

const API_ROOT = process.env.VUE_APP_BASE_API || ''

// 注入默认配置
axios.defaults = Object.assign(axios.defaults, {
  timeout: 10000
})

// request 请求拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return err
  }
)

// response 响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  err => {
    return err
  }
)

// 通用请求方法
export default function http (option, data) {
  let name = typeof option === 'string' ? option : option.api
  let params = typeof option === 'string' ? {} : option.params
  let api = APIS[name]
  window.utils.showToast().show()
  // 配置对象
  let requestData = {
    url: API_ROOT + api.path, // 请求 URL
    method: api.method, // 请求方法
    // headers: {
    //   token:
    // },
    params: Object.assign(params, data, { token: window.sessionStorage.getItem('token') || 'token_cjzq_1550823544095KEoI' }) // 请求参数
  }

  // 发送请求
  return axios.request(requestData).then((res) => {
    return res.data
  }).catch(res => {
    return res
  })
}
