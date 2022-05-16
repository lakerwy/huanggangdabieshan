// 登录和注册接口
import service from '../request'
import qs from 'qs'

const baseUrl = window.globalUrl.HOME_API;

// 注册短信发送接
export const getSmsCode = (params) => {
  return service.get(`${baseUrl}/admin/mobile/sendsmstoregister/${params}`,)
}

// 图形验证码
export const getPicCode = (params) => {
  return service.get(`${baseUrl}/admin/sys/randomImage`, {params})
}

// 注册
export const register = (params) => {
  return service.post(`${baseUrl}/admin/sys/register`, params)
}




// 登录短信发送接
export const getLoginSmsCode = (params) => {
  return service.get(`${baseUrl}/admin/mobile/sendsmstologin/${params}`,)
}


// 用户名登录
export const loginByUsername = (username, password, code, randomStr) => {
  let grant_type = 'password'
  let dataObj = qs.stringify({'username': username, 'password': password})

  return service({
    url: `${baseUrl}/auth/oauth/token`,
    headers: {
      isToken: false,
      'TENANT-ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: {randomStr, code, grant_type},
    data: dataObj
  })
}

export const refreshToken = (refresh_token) => {
  const grant_type = 'refresh_token'
  return service({
    url: `${baseUrl}/auth/oauth/token`,
    headers: {
      'isToken': false,
      'TENANT-ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: {refresh_token, grant_type, scope}
  })
}

export const loginByMobile = (mobile, code) => {
  const grant_type = 'mobile'
  return service({
    url: `${baseUrl}/auth_trade/mobile/token/sms`,
    headers: {
      isToken: false,
      'TENANT-ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: {mobile: 'SMS@' + mobile, code: code, grant_type}
  })
}

export const logout = () => {
  return service({
    url: `${baseUrl}/auth/token/logout`,
    method: 'delete'
  })
}


// 获取用户头像
export const getAvatar = (params) => {
  return service.get(`${baseUrl}/admin/sys-file/avatar/${params}`,)
}

// 获取用户全部信息
export const getUserInfo = (params) => {
  return service.get(`${baseUrl}/admin/user/allinfo/${params}`,)
}

// 忘记密码
export const resetPwd = (params) => {
  return service.post(`${baseUrl}/admin/user/forgetPwd`, params)
}

export const getResetSmsCode = (params) => {
  return service.get(`${baseUrl}/admin/mobile/sendsms/${params}`,)
}
