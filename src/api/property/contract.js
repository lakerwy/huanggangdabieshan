import service from '../../router/axios'

const baseUrl = `${window.globalUrl.HOME_API}trade-website`;

/**
 *
 * @param 合同备案
 */
// 获取合同列表
export const getContracts = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/getJyshjgItemInfo`,
    data: params,
    isForm: true
  })
}

// 上传合同附件
export const uploadFiles = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/upLoadContractFile`,
    data: params,
  })
}
// 合同信息录入
export const addContract = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/importContractInfo`,
    data: params,
    isForm: true
  })
}
// 获取区域信息
export const getRegionList = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/getXzqhInfo`,
    data: params,
  })
}


