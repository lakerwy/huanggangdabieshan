/**
 * 档案管理相关接口
 */
import service from '../request/index'

const baseUrl = window.globalUrl.HOME_API + '/datamanager/park-file';

// 获取文件目录树
export const getFilesTree = () => {
  return service({
    method: 'post',
    url: `${baseUrl}/queryFolder`
  })
}

// 移动文件
export const removeFiles = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/moveFile`,
    params: params,
  })
}

// 根据文件id获取文件
export const getFilesById = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/queryFileByPid`,
    params: params,
    isForm: true
  })
}

// 新增文件夹
export const addNewFolder = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/addFolder`,
    data: params,
  })
}

// 批量上传文件
export const uploadFiles = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/uploadFiles`,
    data: params,
  })
}

// 获取文件上传进度
export const getProgress = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/getUploadProgress`,
    data: params,
  })
}

// 只删除文件夹
export const deleteFolder = (params) => {
  return service({
    method: 'post',
    // url: `${baseUrl}/deleteFolder`,
    url: `${baseUrl}/deleteBatch`,
    data: params,
  })
}

// 批量删除文件
export const deleteFiles = (params) => {
  return service({
    method: 'post',
    // url: `${baseUrl}/deleteFileBatch`,
    url: `${baseUrl}/deleteBatch`,
    data: params,
  })
}

// 批量删除文件夹或文件
export const deleteFoldersOrFiles = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/deleteBatch`,
    data: params,
  })
}


// 搜索文件
export const searchFile = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/searchFile`,
    params: params,
  })
}

// 修改文件文件夹名
export const changeFileName = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/changeName`,
    params: params,
  })
}

