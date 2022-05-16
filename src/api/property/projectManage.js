import service from '../../router/axios'

const baseUrl = `${window.globalUrl.HOME_API}trade-website/`;
/**
 *
 * @param 项目管理
 */
// 获取交易信息 交易列表
export const getProjectLists = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}cqjyService/getItemInfo`,
    data: params,
    isForm: true
  })
}

// 项目详情
export const getProjectInfo = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}cqjyService/getItemDetailInfo`,
    data: params,
    isForm: true
  })
}

// 编辑项目
export const editProjectInfo = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}cqjyService/editItemInfo`,
    data: params,
    isForm: true
  })
}

// 删除
export const deleteProject = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}cqjyService/getItemInfo`,
    data: params,
    isForm: true
  })
}
