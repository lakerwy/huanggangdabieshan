import service from '../../router/axios'

const baseUrl = `${window.globalUrl.HOME_API}trade-website`;

/**
 *
 * @param 竞价大厅
 */
// 竞价大厅
export const getBiddingProjects = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/getItemInfoByZj`,
    data: params,
    isForm: true
  })
}

// 设置
export const updateBidding = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/manageJjInfo`,
    data: params,
    isForm: true
  })
}

// 获取已结束项目的竞价状态
export const getProStatus = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/getItemJjztInfo`,
    data: params,
    isForm: true
  })
}

// 获取竞价记录
export const getBiddingRecords = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/getItemJjjlInfo`,
    data: params,
    isForm: true
  })
}
