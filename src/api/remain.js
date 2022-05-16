/**
 * 遗迹管理相关接口
 */
import service from '../request/index'

const baseUrl = window.globalUrl.HOME_API + '/datamanager';
// const baseUrl = 'http://intelligence-gateway:9999/datamanager'

//分页查询遗迹基本信息
export const getdRelicsPage = (params) => {
  return service.get(`${baseUrl}/parkRelicInformation/page`, { params });
};

//查询遗迹基本信息
export const getRelics = (params) => {
  return service.get(`${baseUrl}/parkRelicInformation`, { params });
};

//添加遗迹基本信息
export const addRelics = (params) => {
  return service.post(`${baseUrl}/parkRelicInformation/add`, params);
};

//修改遗迹基本信息
export const updateRelics = (params) => {
  return service.post(`${baseUrl}/parkRelicInformation/update`, params);
};

//删除遗迹基本信息
export const delRelics = (params) => {
  return service.get(`${baseUrl}/parkRelicInformation/delete/${params}`,);
};
//批量删除遗迹基本信息
export const batchDelRelics = (params) => {
  return service.post(`${baseUrl}/parkRelicInformation/batchDelete`, params);
};
/**
 * 上传文件
 */
export const addeRelicsImg = (params) => {
  return service.post(`${baseUrl}/parkRelicFile/uploadFiles`, params);
};
//通过ID查询遗迹基本信息
export const getEditRelics = (params) => {
  return service.get(`${baseUrl}/parkRelicInformation/getById/${params}`,);
};

//获取遗迹景观类型和级别字典
export const getDictType = (params) => {
  return service.get(`${window.globalUrl.HOME_API}/admin/dict/type/${params}`,);
};
/**
 * 公园一张图分页查询
 */
//查询遗迹基本信息
export const getOnemapInfo = (params) => {
  return service.get(`${baseUrl}/parkRelicInformation/onePicture/page`, { params });
};

//右侧分页
// old
// export const getOnemapTypesInfo = (params) => {
//   return service.post(`${baseUrl}/park-pic/onePicList`, params);
// };
export const getOnemapTypesInfo = (params) => {
  return service.post(`${baseUrl}/park-pic/search`, params);
};

// 一张图-获取遗迹点、视频点、景点、监测点详情
export const getPointInfo = (params) => {
  return service({
    url: `${baseUrl}/park-pic/getInfo`,
    params: params,
    method: 'post'
  })
}

// 一张图-获取遗迹点周边
export const getAroundInfo = (params) => {
  return service({
    url: `${baseUrl}/park-pic/searchSide`,
    params: params,
    method: 'post'
  })
}

//获取气象监测数据详情
export const getOnemapAirInfo = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/park-pic/getAirInfo`,
    params: params,
  })
}

//获取滑坡监测数据详情
export const getOnemapLandslideInfo = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/park-pic/getLandslideInfo`,
    params: params,
  })
}

//获取遗迹点分享海报
export const getPoster = (params) => {
  return service({
    method: 'get',
    url: `${baseUrl}/park-pic/getPoster`,
    params: params,
    responseType: 'blob'//arraybuffer
  })
}

