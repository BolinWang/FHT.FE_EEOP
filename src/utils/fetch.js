import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getSessionId } from '@/utils/auth'

/* 防止重复提交，利用axios的cancelToken */
let cancelPromise
const requestPath = {}
const CancelToken = axios.CancelToken

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  interceptors: true // 是否开启response拦截器
  /*   timeout: 5000 // 请求超时时间 */

})

// request拦截器
service.interceptors.request.use(config => {
  /* 发起请求时，取消掉当前正在进行的相同请求 */
  config.cancelToken = new CancelToken(c => {
    cancelPromise = c
  })
  const dataMethod = config.method.toUpperCase() === 'POST' ? config.data.method : config.params.method
  const requestUrlAndMethod = (config.url.endsWith('/') ? config.url : `${config.url}/`) + dataMethod
  console.log(requestPath)
  if (requestPath[requestUrlAndMethod]) {
    requestPath[requestUrlAndMethod]('取消重复请求')
    requestPath[requestUrlAndMethod] = cancelPromise
  } else {
    requestPath[requestUrlAndMethod] = cancelPromise
  }
  const defaultConfig = {
    version: '1.0',
    timestamp: new Date().getTime(),
    reqId: '0010C2379272774D6EC087B917CE2A71438DEF90',
    sign: '8F4C4A8E9D850EDD9692DE38723D0543'
  }
  if (config.method.toUpperCase() === 'POST') {
    if (store.getters.sessionId && !config.noSessionId) {
      config.data['sessionId'] = getSessionId()
    }
    if (!config.noAssign) {
      config.data = Object.assign(config.data, defaultConfig)
    }
  } else {
    if (store.getters.sessionId) {
      config.params['sessionId'] = getSessionId()
    }
    if (!config.noAssign) {
      config.params = Object.assign(config.params, defaultConfig)
    }
  }
  // 处理mock
  if (process.env.MOCK && config.isMock) {
    config.url = `${config.url}/${config.data.method || 'isMock'}`
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (!response.config.interceptors || res.code * 1 === 0) {
      return response.data
    }
    if (res.code * 1 === 1011) {
      if (res.message === '无数据') {
        return response.data
      } else if (res.message === '数据不存在') {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
    }
    Message({
      message: res.message || '未知错误，请联系管理员',
      type: 'error',
      duration: 5 * 1000
    })
    // sessionId 失效
    if (res.code * 1 === 1016) {
      MessageBox.confirm(res.message + '，请重新登录', '提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    return Promise.reject('error')
  },
  error => {
    if (error.message === '取消重复请求') {
      return Promise.reject(error)
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service
