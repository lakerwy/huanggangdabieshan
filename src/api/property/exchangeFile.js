// 交易档案
import service from '../../router/axios'

const baseUrl = `${window.globalUrl.HOME_API}trade-website/`;

// 获取列表 已经产权登记的项目
export const getLists = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}cqjyService/getCqdjjgItemInfo`,
    data: params,
    isForm: true
  })
}

// 累积成交面积
export const getTotalAreaRank = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}cqjyService/staticCjmj`,
    data: params,
    isForm: true
  })
}

// 累积成交面积
export const getTotalFundsRank = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}cqjyService/staticCjje`,
    data: params,
    isForm: true
  })
}

// 交易统计
export const getStatics = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}cqjyService/staticJytj`,
    data: params,
    isForm: true
  })
}
