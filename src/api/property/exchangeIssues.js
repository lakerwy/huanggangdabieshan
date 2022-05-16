import service from '../../router/axios'

const baseUrl = `${window.globalUrl.HOME_API}trade-website`;
const baseUrl2 = `${window.globalUrl.HOME_API}`;

/**
 *
 * @param 交易审核
 */
// 获取交易信息 交易列表 已结束的竞价记录
export const getExchangeLists = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/getJjjsEndItemInfo`,
    data: params,
    isForm: true
  })
}
// 交易信息详情
export const getExchangeDetail = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/getJyDetailInfo`,
    data: params,
    isForm: true
  })
}
// 交易项目审核
export const auditExchange = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/auditJyInfo`,
    data: params,
    isForm: true
  })
}
// 删除交易信息
export const deleteExchange = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/deleteJyInfo`,
    data: params,
    isForm: true
  })
}

// 获取产权类型
export const getProType = (params) => {
  return service({
    method: 'get',
    url: `${baseUrl2}admin/dict/type/property_type`,
    params: params,
  })
}

// 获取流转类型
export const getType = (params) => {
  return service({
    method: 'get',
    url: `${baseUrl2}admin/dict/type/flow_type`,
    params: params,
  })
}

// 获取行政区划
export const getRegion = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/getXzqhInfo`,
    params: params,
  })
}

// 到游仙区的行政区划
export const getRegionToCity = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/getXzqhInfoToCity`,
    params: params,
  })
}
