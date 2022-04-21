/**
 * @Description: 
 * @author 杜晓辉
 * @date 2021/8/17 15:16:21 
 */
import {getTerrainPositionsheight,Creatguid} from "../Utilities/UtilitiesFunction"

/**
 * @Description:
 * @author 杜晓辉
 * @date 2021/4/8 18:53:48
 */
// import * as Cesium from 'cesium/Build/Cesium/Cesium'
import * as Cesium from 'cesium/Cesium'
export default class LableEntityManage {
  constructor(viewer) {
    this.viewer = viewer;
  }
  AddLaEntity(result) {
    this.viewer.entities.add({
      name: '1号大棚',
      position: Cesium.Cartesian3.fromDegrees(106.5330505371, 29.4914218783, 300),
      label: { //文字标签
        text: '一号建筑',
        font: '500 30px Helvetica',// 15pt monospace
        scale: 0.5,
        style: Cesium.LabelStyle.FILL,
        fillColor: Cesium.Color.WHITE,
        pixelOffset: new Cesium.Cartesian2(110, -72),   //偏移量
        showBackground: true,
        backgroundColor: new Cesium.Color(26 / 255, 196 / 255, 228 / 255, 1.0)
      },
      billboard: { //图标
        image: require('../../assets/image/div1.png'),
        // width: 130,
        // height: 80,
        scale: 1,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,

        clampToGround: true, //开启贴地
        pixelOffset: new Cesium.Cartesian2(100, -35),   //偏移量
      },
    });
  }
  /**
   *
   * @param viewer
   * @param id
   * @param result
   * @param name
   * @param text
   * @param lon
   * @param lat
   * @param height
   * @param img
   * @param show
   * @constructor
   */
  AddemergLab(viewer, id, result, name, text, lon, lat, height, img, show) {
    if (!viewer) return;
    if (viewer.entities.getById(id)) {
      return;
    }
    //result.temptype = "targetEntity";
    //let  trrrainheight = getTerrainPositionsheight(viewer,{lon,lat});
    //let mb_iconPath = getMB_iconPath(mb_type);
    var entity = viewer.entities.add({
      id: id,
      name: name,
      show: show,
      properties: result,
      //parent: rainLayer3D,
      position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
      billboard: {
        image: img,
        //image: "../../../assets/imgs/icon-red.png",
        scale: 1.2,
        scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.5),
        //scaleByDistance: new Cesium.NearFarScalar(8000, 1, 10000, 0),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 1.8e9),
        clampToGround: true,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      },
      label: {
        text: text,
        //font: '14px SimHei ',
        font: '14px Helvetica',
        //Width:2,
        //fillColor: Cesium.Color.SKYBLUE, new Cesium.Color(255 / 255, 213 / 255, 65 / 255, 0.2);
        fillColor: new Cesium.Color(0 / 255, 255 / 255, 255 / 255),
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        //translucencyByDistance: new Cesium.NearFarScalar(200, 1, 500, 0),
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        scaleByDistance: new Cesium.NearFarScalar(4000,1, 16000, 0),
        pixelOffset: new Cesium.Cartesian2(0, -43),  //偏移量
        //distanceDisplayCondition : new Cesium.DistanceDisplayCondition(0, 5000),
      }
    }
    );
    return entity;
  }
  SetEmergencyCommandLayer(params) {
    if (params != null) {
      let img = params.icon;
      let hoverIcon = params.hoverIcon;
      let LayerCode = params.code;
      let LayerName = params.name;
      let curentity = null;
      for (let i = 0; i < params.data.length; i++) {
        let curdata = params.data[i];
        curdata.dialogType = LayerCode;
        curdata.hoverIcon = hoverIcon;
        let id_name = null;
        if(curdata.name != null){
          id_name = curdata.name;
        }else{
          id_name = Creatguid();
        }
        if (curdata.longitude != null && !curdata.latitude != null) {
          curentity = this.AddemergLab(this.viewer, id_name + i, curdata, LayerName, curdata.name, curdata.longitude, curdata.latitude, 1000, img, true);
        }else if(curdata.lon != null && !curdata.lat != null ){
          curentity = this.AddemergLab(this.viewer, id_name + i, curdata, LayerName, curdata.name, curdata.lon, curdata.lat, 1700, img, true);
        }else  continue;
        window.Scene.PointDataArr.push(curentity);

      }
    }

  }
  
  SetEmergencyCommunicLayer(params) {
    if (params != null) {
      let curentity = null;
      let LayerCode = params.code;
      let Iconobj = params.icons;
      let hoverIcons = params.hoverIcons;
      let Layername = params.name;
      for (let i = 0; i < params.data[0].length; i++) {
        let curdata = params.data[0][i];
        curdata.dialogType = LayerCode;
        let type = curdata.type;
        let imgpath = null;
        const keys = Object.keys(Iconobj);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key === type) {
            imgpath = Iconobj[key];
          }
        }
        curentity = this.AddemergLab(this.viewer, curdata.cimsi + i, curdata, curdata.name, curdata.name, curdata.nlongitude / 100000, curdata.nlatitude / 100000, 800, imgpath, true);
        window.Scene.MultiTypePointsArr.push(curentity);
      }
    }
  }

  /**
   * 
   * @param params
   * @constructor
   */
  ZHYYManagerZJvideo(params){
    if(params){
      let  curEntity = null;
      let  style = params.style;
      // let  hoverStyle = params.hoverStyle;
      // let  geometryKey = params.data.geometryKey;
      // let  type =  params.data.type;
      let videodata = params.data.data;
      if(videodata){
        for(let i = 0;i<videodata.length;i++){
          let curdata = videodata[i];
          //let geometryType = curdata.geometryType;
          let infoType = curdata.infoType;
          // let lat = curdata.lat;
          // let lon = curdata.lon;
          // let name = curdata.name;
          // let url = curdata.url;
          let id_name = null;
          if(curdata.name != null){
            id_name = curdata.name;
          }else{
            id_name = Cesium.createGuid();
          }
          curEntity = this.AddemergLab(this.viewer, id_name + i, curdata, infoType, curdata.name, parseFloat(curdata.lon), parseFloat(curdata.lat), 100, style.icon.src, true);
          window.Scene.ZJSPPointsArr.push(curEntity);
        }
      }
      
    }
    
  }
  WaterOnEarth(params){
    if(params){
      let  curEntity = null;
      let  style = params.style;
      let  hoverStyle = params.hoverStyle;
      let  geometryKey = params.data.geometryKey;
      let  type =  params.data.type;
      if(params.data.data != null && params.data.data.length >0){
        for(let i = 0;i<params.data.data.length;i++){
          let  curdata = params.data.data[i];
          let  infoType = curdata.infoType;
          let id_name = null;
          if(curdata.shortName != null){
            //id_name = curdata.shortName;
            id_name = Creatguid();
          }else{
            id_name = Creatguid();
          }
          curEntity = this.AddemergLab(this.viewer, id_name + i, curdata, infoType, curdata.shortName, parseFloat(curdata.gatherStationLongitude) , parseFloat(curdata.gatherStationLatitude) , 1000, style.icon.src, true);
          window.Scene.ZJSPPointsArr.push(curEntity);
          
        }
      }
      
    }
  }
  SLFHOEarth(params){
    if(params){
      let  curEntity = null;
      let  style = params.style;
      let  hoverStyle = params.hoverStyle;
      let  geometryKey = params.data.geometryKey;
      let  type =  params.data.type;
      if(params.data){
        for(let i = 0;i<params.data.data.length;i++){
          let curdata = params.data.data[i];
          //let geometryType = curdata.geometryType;
          let infoType = curdata.infoType;
          // let lat = curdata.lat;
          // let lon = curdata.lon;
          // let name = curdata.name;
          // let url = curdata.url;
          let id_name = null;
          if(curdata.name != null){
            id_name = curdata.name;
          }else{
            id_name = Cesium.createGuid();
          }
          curEntity = this.AddemergLab(this.viewer, id_name + i, curdata, infoType, curdata.name, parseFloat(curdata.longitude) , parseFloat(curdata.latitude), 100, style.icon.src, true);
          window.Scene.ZJSPPointsArr.push(curEntity);
        }
      }

    }
  }
  PersonOnEarth(params){
    if(params){
      let  curEntity = null;
      let  style = params.style;
      let  hoverStyle = params.hoverStyle;
      let  geometryKey = params.data.geometryKey;
      let  type =  params.data.type;
      if(params.data){
        for(let i = 0;i<params.data.data.length;i++){
          let curdata = params.data.data[i];
          //let geometryType = curdata.geometryType;
          let infoType = curdata.infoType;
          // let lat = curdata.lat;
          // let lon = curdata.lon;
          // let name = curdata.name;
          // let url = curdata.url;
          let id_name = null;
          if(curdata.name != null){
            id_name = curdata.name;
          }else{
            id_name = Cesium.createGuid();
          }
          curEntity = this.AddemergLab(this.viewer, id_name + i, curdata, infoType, curdata.name,  parseFloat(curdata.lon), parseFloat(curdata.lat), 100, style.icon.src, true);
          window.Scene.ZJSPPointsArr.push(curEntity);
        }
      }

    }
    
  }
  
}

export function AddtargetLab(viewer, id, result, name, text, lon, lat, height, img, show) {
  if (!viewer) return;
  if (viewer.entities.getById(id)) {
    viewer.entities.removeById(id);
    //return;
  }
  var entity = viewer.entities.add(
      {
        id: id,
        name: name,
        show: show,
        properties: result,
        //parent: rainLayer3D,
        position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
        billboard: {
          image: img,
          //image: "../../../assets/imgs/icon-red.png",
          scale: 1,
          scaleByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.5),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          //scaleByDistance: new Cesium.NearFarScalar(8000, 1, 10000, 0),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM
        },
        label: {
          text: text,
          //font: '14px SimHei ',
          font: '14px Helvetica',
          //Width:2,
          fillColor: Cesium.Color.DODGERBLUE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          //translucencyByDistance: new Cesium.NearFarScalar(200, 1, 500, 0),
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          //scaleByDistance: new Cesium.NearFarScalar(100, 1, 1000, 0),
          pixelOffset: new Cesium.Cartesian2(0, -50)   //偏移量
        }
      }
  )
}

export function AddHrightLab(viewer, id, result, name, text, lon, lat, height, img, show) {
  if (!viewer) return;
  if (viewer.entities.getById(id)) {
    viewer.entities.removeById(id);
  }
  var entity = viewer.entities.add(
      {
        id: id,
        name: name,
        show: show,
        properties: result,

        //parent: rainLayer3D,
        position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
        billboard: {
          image: img,
          //image: "../../../assets/imgs/icon-red.png",
          scale: 0.8,
          scaleByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.5),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          //scaleByDistance: new Cesium.NearFarScalar(8000, 1, 10000, 0),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM
        },
        label: {
          text: text,
          //font: '14px SimHei ',
          font: '18px Helvetica',
          //Width:2,
          fillColor: Cesium.Color.LIME ,
          outlineColor: Cesium.Color.BLACK,
          //backgroundColor:Cesium.Color.GHOSTWHITE,
          showBackground:true,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          //translucencyByDistance: new Cesium.NearFarScalar(200, 1, 500, 0),
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          //scaleByDistance: new Cesium.NearFarScalar(100, 1, 1000, 0),
          pixelOffset: new Cesium.Cartesian2(0, -45)   //偏移量
        }
      }
  )
}