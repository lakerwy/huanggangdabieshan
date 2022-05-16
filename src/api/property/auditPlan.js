import service from '../../router/axios'

const baseUrl = `${window.globalUrl.HOME_API}trade-website`;

/**
 *
 * @param 规划条件审核
 */
// 获取规划条件列表
export const getLists = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/getAllProjectInfo`,
    data: params,
    isForm: true
  })
}

// 上传附件 多文件
export const uploadAuditFiles = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/upLoadDkpgFile`,
    data: params,
  })
}

// 审核规划条件
export const auditPlanInfo = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/cqjyService/updateProjectInfo`,
    data: params,
    isForm: true
  })
}