/**
 * 大屏相关接口
 */
 import service from '../request/index'

 const baseUrl = window.globalUrl.HOME_API + '/datamanager/screen';
 
//getVideoRegion
// 视频区域分类
export const getVideoRegion = () => {
  return service({
    url: `${baseUrl}/getVideoRegion`,
    method: 'get'
  })
} 

  // 根据region获取视频数据
  export const getVideo = (data) => {
    return service({
      url: `${baseUrl}/getvideo`,
      data:data,
      method: 'post'
    })
  } 

  // 气象监测详情 传 参数 siteId
  export const getWaterData = (params) => {
    return service({
      url: `${baseUrl}/getWater/data`,
      params: params,
      method: 'get'
    })
  } 

   // 监测 类型(1-气象；2-山体滑坡,不传查全部)
 export const getWaterTypes = (params) => {
  return service({
    url: `${baseUrl}/getWater/types`,
    params: params,
    method: 'get'
  })
} 

 // 地质灾害数据(siteId,time=2020-10-10)
 export const getLandslideData = (params) => {
  return service({
    url: `${baseUrl}/landslide/data`,
    params: params,
    method: 'get'
  })
} 

 // 获取地质遗迹级别个数(1世界级,2国家级,3省级,4地方级)
 export const getRelicLevel = (name) => {
  return service({
    url: `${baseUrl}/relic/level?name=`+name,
    method: 'get'
  })
} 

// 获取公园概览数据
export const getSurvey = (params) => {
  return service({
    url: `${baseUrl}/survey`,
    params: params,
    method: 'get'
  })
} 

//水情监测数据
export const getWater = (params) => {
  return service({ 
    url: `${baseUrl}/water`,
    params: params,
    method: 'post'
  })
}

//获取最大噪音值
export const getMaxNoise = (params) => {
  return service({ 
    url: `${baseUrl}/air/noise`,
    params: params,
    method: 'get'
  })
}