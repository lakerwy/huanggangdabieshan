import axios from 'axios'
import { ElMessage, MessageBox } from 'element-plus'
import qs from 'qs'
import store from '../store/index'
import router from '../router/index'
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
window.axiosSource = source;
axios.defaults.timeout = 50000
// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500 // 默认的
}
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

// request拦截器
axios.interceptors.request.use(config => {
  // 请求头部带认证信息
  const isToken = (config.headers || {}).isToken === false
  const token = store.getters.access_token
  if (token && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + token// token
  }
  if (config.isForm) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.data = qs.stringify(config.data);
  }
  config.cancelToken = window.axiosSource.token
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
axios.interceptors.response.use(
  response => {
    /**
    * code非200返错
    * 实际根据后台返回字段去判断
    */
    const status = Number(response.status) || 200
    if (status == 426) {
      ElMessage({
        message: response.data.msg,
        type: 'error'
      })
      return
    }
    if (status === 401) {
      // console.log(response);
      // ElMessage({
      //   message: '当前操作没有权限，请登录',
      //   type: 'error'
      // })
      // store.dispatch('FedLogOut').then(() => {})
      // setTimeout(() => {
      //   router.push({ name: 'login' })
      // }, 1000);
      // return
    }

    const res = response.data;
    return Promise.resolve(res)
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(new Error(error))
  }
)

export default axios