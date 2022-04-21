/*
 * @Author: 任继民
 * @Date: 2021-05-13 17:10:58
 * @LastEditors: 任继民
 * @LastEditTime: 2021-05-21 13:25:05
 * @Description: 接口文件
 */
import Http from "@/http/index";
import baseUrl from '@/http/baseUrl'

const DYNAMICURL = baseUrl; // 'http://192.168.250.183:9090'
/**
 * 查询当日气象数据
 * @param params
 */
export const getWeatherShow = (params) => {
  return Http.get(`${DYNAMICURL}/api/fireproof/weather/show/20201557`, { params });
};

/**
 * 查询报警次数
 * @param {*} params 
 * @returns 
 */
export const getAlarmList = (params) => {
  return Http.get(`${DYNAMICURL}/api/fireproof/alarm/list`, { params });
};
/**
 * 统计报警次数和火灾发生数
 * @param {*} params 
 * @returns 
 */
export const getAlarmTotal = (params) => {
  return Http.get(`${DYNAMICURL}/api/fireproof/alarm/total`, { params });
};
/**
 * 森林火险等级热力图
 * @param {*} params 
 * @returns 
 */
export const getAlarmFireHeatMap = (params) => {
  return Http.get(`${DYNAMICURL}/api/fireproof/alarm/fire_heat_map`, {
    params,
  });
};
/**
 * 水质监测
 * @param {*} params 
 * @returns 
 */
export const getWaterbyClassify = (params) => {
  return Http.get(`${DYNAMICURL}/api/monitor/water/sum_by_classify`, {
    params,
  });
};
/**
 * 当日空气质量
 * @param {*} params 
 * @returns 
 */
export const getAirShow = (params) => {
  return Http.get(`${DYNAMICURL}/api/monitor/air/show`, { params });
};
/**
 * 大气类别分布统计
 * @param {*} params 
 * @returns 
 */
export const getAirbyClassify = (params) => {
  return Http.get(`${DYNAMICURL}/api/monitor/air/sum_by_classify`, { params });
};
/**
 * type=1 查询实时水文 type=2 查询实时空气质量
 * @param {*} params
 * @returns
 */
export const getWaterRealShow = (params) => {
  return Http.get(`${DYNAMICURL}/api/monitor/selectByType`, { params });
};
/**
 * 实时监测
 * @param {*} params 
 * @returns 
 */
export const getWaterShow = (params) => {
  return Http.get(`${DYNAMICURL}/api/monitor/water/show`, { params });
};
/**
 * 景区流量实时统计
 * @param {*} params 
 * @returns 
 */
export const getTouristShow = (params) => {
  return Http.get(`${DYNAMICURL}/api/tourist/show`, { params });
};
/**
 * 景区人流分布热力图
 * @param {*} params 
 * @returns 
 */
export const getTouristHeatMap = (params) => {
  return Http.get(`${DYNAMICURL}/api/tourist/heat_map`, { params });
};
/**
 * 周界报警统计
 * @param {*} params 
 * @returns 
 */
export const getMonitorbyCalendar = (params) => {
  return Http.get(`${DYNAMICURL}/api/monitor/boundary/alarm/sum_by_calendar`, {
    params,
  });
};
/**
 * 周界监控点专题图
 * @param {*} params 
 * @returns 
 */
export const getMonitorVideoMap = (params) => {
  return Http.get(`${DYNAMICURL}/api/monitor/boundary/video_point/map`, {
    params,
  });
};
/**
 * 巡护分类统计
 * @param {*} params 
 * @returns 
 */
export const getPatrolbyCalendar = (params) => {
  return Http.get(`${DYNAMICURL}/api/patrol/sum_by_calendar`, { params });
};
/**
 * 巡护路线专题图
 * @param {*} params 
 * @returns 
 */
export const getPatrolRouteMap = (params) => {
  return Http.get(`${DYNAMICURL}/api/patrol/route/map`, { params });
};
/**
 * 查询巡护任务简报
 * @param {*} params 
 * @returns 
 */
export const getPatrolTaskReport = (params) => {
  return Http.get(`${DYNAMICURL}/api/patrol/task/report`, { params });
};
/**
 * 查询巡护事件
 * @param {*} params 
 * @returns 
 */
export const getPatrolRecordList = (params) => {
  return Http.get(`${DYNAMICURL}/api/patrol/record/list`, { params });
};
/**
 * 科普科教
 * @param {*} params 
 * @returns 
 */
export const getKpkiList = (params) => {
  return Http.get(`${DYNAMICURL}/api/kpkj/list`, { params });
};
