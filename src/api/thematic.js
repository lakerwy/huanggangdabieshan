import Http from "@/http/index";
import baseUrl from "@/http/baseUrl";

const url = baseUrl;
const liveUrl = window.global.liveApi;

/**
 * 森林火灾热力图
 * @param params
 */
export const getFireHeatMapRequest = () => {
  return Http.get(`${url}/api/fireproof/alarm/fire_heat_map`);
};

/**
 * 周界监控点专题图
 * @param params
 */
export const getCameraRequest = () => {
  return Http.get(`${url}/api/monitor/boundary/video_point/map`);
};

/**
 * 景区人流分布热力图
 * @param params
 */
export const getPeopleHeatMapRequest = () => {
  return Http.get(`${url}/api/tourist/heat_map`);
};

/**
 * 巡护路线专题图
 * @param params
 */
export const getPatrolRouteRequest = () => {
  return Http.get(`${url}/api/patrol/route/map`);
};

/**
 * 巡护人员位置
 * @param params
 */
export const getPersonsRequest = () => {
  return Http.get(`${url}/api/patrol/staff/point`);
};

/**
 * 查询巡护任务简报
 * @param params
 */
export const getPatrolTaskRequest = params => {
  return Http.get(`${url}/api/patrol/task/report`, { params });
};

/**
 * 查询巡护事件
 * @param params
 */
export const getPatrolRecordRequest = params => {
  return Http.get(`${url}/api/patrol/record/list`, { params });
};

/**
 * 火灾报警
 * @param params
 */
export const getFireWarnRequest = () => {
  return Http.get(`${url}/api/fireproof/fire/show`);
};

/**
 * 周界报警
 * @param params
 */
export const getCameraWarnRequest = () => {
  return Http.get(`${url}/api/monitor/boundary/alarm/list`);
};

/**
 * 获取摄像头播放地址
 * @param params
 */
export const getCameraUrlRequest = params => {
  //cctv1
  // return Http.get(`${url}/api/monitor/boundary/video/previewUrl`, {params});
  return Http.get(`${liveUrl}/api/v2/getMedia`, { params });
};

/**
 * 获取防火监测塔
 * @param {*} params 
 * @returns 
 */
export const getFireTownRequest = params => {
  return Http.get(`${url}/api/fireproof/tower/tree`, { params });
};
