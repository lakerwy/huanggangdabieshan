/**
 * 目录树相关接口
 */
import service from '../request/index'

const baseUrl = window.globalUrl.HOME_API + '/datamanager/';
const videoUrl = window.globalUrl.VideoUrl;


// 一张图-获取目录
export const getTree = (params) => {
  return service({
    url: baseUrl + 'layer/list',
    params: params,
    method: 'post'
  })
}

//目录管理-增加目录
export const addTree = (params) => {
  return service({
    url: baseUrl + 'layer/add',
    data: params,
    method: 'post'
  })
}

//目录管理-删除目录
export const delTree = (params) => {
  return service({
    url: baseUrl + 'layer/delete',
    params: params,
    method: 'get'
  })
}

//目录管理-修改目录
export const updateTree = (params) => {
  return service({
    url: baseUrl + 'layer/update',
    data: params,
    method: 'post'
  })
}

//分页查询视频流列表
export const getVideo = (params) => {
  return service({
    url: videoUrl + 'api/dabieshan/list',
    params: params,
    method: 'get'
  })
}

export const addVideo = (form) => {
  return service({
    url: videoUrl + 'api/dabieshan/save',
    params: form,
    method: 'post'
  })
}

export const editVideo = (form) => {
  return service({
    url: videoUrl + 'api/dabieshan/update',
    params: form,
    method: 'post'
  })
}

export const delVideo = (id) => {
  return service({
    url: videoUrl + 'api/dabieshan/del?stream='+id,
    method: 'DELETE'
  })
}

export const playerVideo = (id) => {
  return service({
    url: videoUrl + 'api/dabieshan/getMedia?stream='+id,
    method: 'get'
  })
}

//属性查询 目录树
export function createTreeByArray(
  array,
  { idKey = "id", pidKey = "parentId", childrenKey = "children" } = {}
) {
  if (!Array.isArray(array) || !array.length) return;
  let map = {};
  array.forEach(item => (map[item[idKey]] = item));

  let roots = [];
  array.forEach(item => {
    const parent = map[item[pidKey]];
    if (parent) {
      (parent[childrenKey] || (parent[childrenKey] = [])).push(item);
    } else {
      roots.push(item);
    }
  });
  return roots;
}