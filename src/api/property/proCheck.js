// 产权登记
import service from '../../router/axios'

const baseUrl = `${window.globalUrl.HOME_API}trade-website/`;

// 获取列表 已经备案的项目
export const getLists = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}cqjyService/getHtbajgItemInfo`,
    data: params,
    isForm: true
  })
}

// 登记产权信息
export const registerCqInfo = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}cqjyService/registerCqInfo`,
    data: params,
    isForm: true
  })
}
