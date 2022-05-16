import service from '../../router/axios'

const baseUrl = `${window.globalUrl.HOME_API}trade-website`;

/**
 *
 * @param 发包审核
 */
// 获取发包列表 供应信息列表
export const getApplyLists = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/getSupplyInfo`,
    data: params,
    isForm: true
  })
}
// 获取供应信息详情
export const getApplyDetail = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/getDetailSupplyInfo`,
    data: params,
    isForm: true
  })
}
// 发包审核
export const auditApplyByCountry = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/auditSupplyInfoByCj`,
    data: params,
    isForm: true
  })
}
export const auditApplyByTown = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/auditSupplyInfoByZj`,
    data: params,
    isForm: true
  })
}
export const auditApplyByDep = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/auditSupplyInfoByZgj`,
    data: params,
    isForm: true
  })
}

// 删除供应信息
export const deleteApply = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/deleteSupplyInfo`,
    data: params,
    isForm: true
  })
}

// 编辑供应信息
export const editApply = (params) => {
  return service({
    method: 'get',
    url: `${baseUrl}/cqjyService/editSupplyInfo`,
    params: params,
  })
}

// 查看图片
export const getImageUrl = (params) => {
  return service({
    method: 'get',
    url: `${baseUrl}/cqjyService/downLoadImages`,
    params: params,
  })
}

// 获取供应信息地块信息
export const getLandInfo = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/getDkxxInfoByGybh`,
    data: params,
    isForm: true
  })
}

// 获取供应信息地块信息
export const getProLandInfo = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/getDkxxInfoByXmbh`,
    data: params,
    isForm: true
  })
}
