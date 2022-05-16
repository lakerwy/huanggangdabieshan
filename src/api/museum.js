/**
 * 遗迹管理相关接口
 */
 import service from '../request/index'

 const baseUrl = window.globalUrl.HOME_API + '/datamanager';
//  const baseUrl = 'http://192.168.99.127:9999/datamanager';
 
//获取标本分类
export const getSampleTypes = () => {
  return service.post(`${baseUrl}/sample/queryTypeList`,{} );
}; 

 //标本详情
export const getSampleInfo = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/sample/infoSample`,
    params: params,
  })
}

 //获取标本列表
 export const getSamplesArr = (params) => {
  return service.post(`${baseUrl}/sample/queryList`,params );
};

 //获取展厅列表
 export const showLists = () => {
  return service.post(`${baseUrl}/show-room/queryList`,{} );
};

 //获取展物列表
 export const getCollectionsArr = (params) => {
  return service.post(`${baseUrl}/show-room/queryItems`,params );
};


//删除标本
export const delSample = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/sample/delSample`,
    params: params,
  })
}

//批量删除标本
export const delSamples = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/sample/delSamples`,
    params: params,
  })
}

//删除展厅
export const delExhibition = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/show-room/delShow`,
    params: params,
  })
}
//删除展物
export const delCollection = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/show-room/delItem`,
    params: params,
  })
}

//展物详情
export const getCollectionInfo = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/show-room/infoItem`,
    params: params,
  })
}

//批量删除展物
export const delCollections = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/show-room/delItems`,
    params: params,
  })
}

 //获取推文列表
 export const getTweetList = (params) => {
  return service.post(`${baseUrl}/article/artList`,params );
};

 //获取新增推文
 export const addTweet = (params) => {
  return service.post(`${baseUrl}/article/addArt`,params );
};


 //获取推文详情
 export const getTweetDetail = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/article/artInfo`,
    params: params,
  })
}

 //删除推文
export const delTweet = (params) => {
  return service({
    method: 'post',
    url: `${baseUrl}/article/delArt`,
    params: params,
  })
}

 //修改推文
 export const editTweet = (params) => {
  return service.post(`${baseUrl}/article/upArt`,params );
};
