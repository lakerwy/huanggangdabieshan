/*
 * @Author: 任继民
 * @Date: 2021-05-13 17:08:13
 * @LastEditors: 任继民
 * @LastEditTime: 2021-05-21 13:03:56
 * @Description: axios请求
 */
import axios from "axios";
// import qs from "qs";
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use((config) => {
  if (config.formData) {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  }
  // 请求头部带认证信息
  if (localStorage.token) {
    config.headers["token"] = "";
  }

  return config;
}, (error) => {
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  (response) => {
    /**
  * code非200返错
  * 实际根据后台返回字段去判断
  */
     return Promise.resolve(response.data)
  },
  (error) => {
    console.log("err" + error); // for debug
    if (error && error.response) {
      switch (error.response.status) {
        // 没权限退出登录
        case 401:
          break;
        // 权限不足
        case 403:
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  },
);

export default service;
