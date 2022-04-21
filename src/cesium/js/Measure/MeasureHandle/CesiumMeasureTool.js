/*
 * @Descripttion: 
 * @version: 1.0.1
 * @Author: 杜晓辉
 * @Date: 2021-06-29 12:42:14
 * @LastEditors: 杜晓辉
 * @LastEditTime: 2021-08-05 15:42:40
 */
import * as Cesium from 'cesium/Cesium'
import {
  measureLineSpace,
  measureAreaSpace,
  measureTriangle,
  removeMeasureArr,
  removeObj
} from './measure';
import {
  measureHeight,
  measureHeightArr
} from './MeasureHeight'

/**
 * 测量工具
 * 线 面
 */
export function CesiumMeasure(param, flag) {

  var viewer;
  if (null === param || undefined === param) return;
  var t = this;
  viewer = param.viewer;
  viewer.scene.globe.depthTestAgainstTerrain = true;
  if(window.Scene._handler){
    window.Scene._handler.destroy();;
  };
  var   handlercl = null;
  handlercl = window.Scene._handler = new  Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  if (param.type == "" || param.viewer == undefined){
    console.log("测量工具初始化失败viewer:"+viewer+"||type:"+param.type);
    return;
  }
  if ("areaSpace" == param.type) {
    measureAreaSpace(viewer,handlercl,"areaSpace",flag);
  } else if ("lineSpace" == param.type) {
    measureLineSpace(viewer,handlercl,"lineSpace",flag);
  }else if("TriangleSpace" == param.type){
    measureTriangle(viewer,handlercl,param.type,flag);
  }else if("HeightSpace" == param.type){
    measureHeight(viewer,handlercl,param.type,flag);
  }


function createAreaSpace() {
  var t = this;
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(t.lon, t.lat, t.heigth)
  });
  measureAreaSpace(viewer);  //测面
}

function createLineSpace() {
  var t = this;
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(t.lon, t.lat, t.heigth)
  });
  measureLineSpace(viewer); //测线
}

function remove() {
  if (removeMeasureArr != 0) {
    for (var i in removeMeasureArr) viewer.entities.remove(removeMeasureArr[i]);
    removeMeasureArr = []
  }
}

return this;
};

/************************************************* CesiumMeasure end  ***************************************************** */
/************************************************* Cesiumplot start  ***************************************************** */

export function CesiumTriangle(param, flag) {
  var viewer;
  viewer = param.viewer;
  if(viewer&&param.type){
    measureTriangle(viewer,param.type);
  }
  return;
};

export function CesiumHeight(param,flag) {
  var viewer;
  viewer = param.viewer;
  if(viewer&&param.type){
    measureHeight(viewer,param.type);
  }
  return;
}

export function removeTool(viewer) {
  // CesiumMeasure.remove();
  // CesiumTriangle.remove();
  if (removeMeasureArr != 0) {
    for (var i in removeMeasureArr) viewer.entities.remove(removeMeasureArr[i]);
    //removeMeasureArr = [];
  }
  if (removeObj != 0) {
    for (var i in removeObj) viewer.entities.remove(removeObj[i]);
    //removeObj = [];
  }
  if (measureHeightArr != 0) {
    for (var i in measureHeightArr) viewer.entities.remove(measureHeightArr[i]);
  }
};
