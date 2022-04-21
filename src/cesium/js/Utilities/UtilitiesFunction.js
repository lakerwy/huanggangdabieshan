/*
 * @Descripttion: 
 * @version: 1.0.1
 * @Author: 杜晓辉
 * @Date: 2021-06-05 17:10:44
 * @LastEditors: 杜晓辉
 * @LastEditTime: 2021-06-18 11:17:17
 */
/**
 * 笛卡尔坐标转换为经纬度坐标系
 * @param viewer
 * @param catresian3
 * @returns {{}}
 * @constructor
 */
import * as Cesium from 'cesium/Cesium'
 export  function Cartesian3toCartographic(viewer,catresian3){
    if(viewer == null &&catresian3 ==null){
        return ;
    }
    const obj = {};
   let  ellipsoid =  viewer.scene.globe.ellipsoid;
   let  cartesian3 = new Cesium.Cartesian3(catresian3.x,catresian3.y,catresian3.z);
   let  carttographic = ellipsoid.cartesianToCartographic(cartesian3);
   let  longitude = Cesium.Math.toDegrees(carttographic.longitude);
   let  latitude = Cesium.Math.toDegrees(carttographic.latitude);
   let  height = carttographic.height;
   obj.lon = longitude;
   obj.lat = latitude;
   obj.height = height;
   let  Cartographic =  new Cesium.Cartographic(obj.lon,obj.lat,obj.height);
   return Cartographic;
}
export function getCurrentExtent(viewer) {
    // 范围对象
    var extent = {};
    var VieRectangle = viewer.camera.computeViewRectangle(Cesium.Ellipsoid.WGS84);
    extent.xmin = Cesium.Math.toDegrees(VieRectangle.west);
    extent.ymin=  Cesium.Math.toDegrees(VieRectangle.south);
    extent.xmax=  Cesium.Math.toDegrees(VieRectangle.east);
    extent.ymax = Cesium.Math.toDegrees(VieRectangle.north);
    extent.height = Math.ceil(viewer.camera.positionCartographic.height);
    return extent;
}

export  function GetViewExtent(viewer) {
    var extent = {};
    var scene = viewer.scene;
    var ellipsoid = scene.globe.ellipsoid;
    var canvas = scene.canvas;

    var car3_lt = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), ellipsoid);// canvas左上角
    var car3_rb = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, canvas.height), ellipsoid); // canvas右下角

    // 当canvas左上角和右下角全部在椭球体上
    if (car3_lt && car3_rb) {
        var carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
        var carto_rb = ellipsoid.cartesianToCartographic(car3_rb);
        extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude);
        extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude);
        extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude);
        extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude);
    } else if (!car3_lt && car3_rb) { // 当canvas左上角不在但右下角在椭球体上
        var car3_lt2 = null;
        var yIndex = 0;
        var xIndex = 0;
        do {
            // 这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
            yIndex <= canvas.height ? yIndex += 10 : canvas.height;
            xIndex <= canvas.width ? xIndex += 10 : canvas.width;
            car3_lt2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(xIndex, yIndex), ellipsoid);
        } while (!car3_lt2);
        var carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt2);
        var carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb);
        extent.xmin = Cesium.Math.toDegrees(carto_lt2.longitude);
        extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
        extent.xmax = Cesium.Math.toDegrees(carto_rb2.longitude);
        extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
    }
    else if (car3_lt && !car3_rb) { // 当canvas左上角在但右下角不在椭球体上
        var car3_rb2 = null;
        var yIndex = canvas.height;
        var xIndex = canvas.width;
        do {
            // 这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
            yIndex >= 10 ? yIndex -= 10 : 10;
            xIndex >= 10 ? xIndex -= 10 : 10;
            car3_rb2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(yIndex, yIndex), ellipsoid);
        } while (!car3_rb2);
        var carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt);
        var carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb2);
        extent.xmin = Cesium.Math.toDegrees(carto_lt2.longitude);
        extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
        extent.xmax = Cesium.Math.toDegrees(carto_rb2.longitude);
        extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
    } else if (!car3_lt && !car3_rb) {
        var car3_lt2 = null;
        var yIndex = 0;
        var xIndex = 0;
        do {
            // 这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
            yIndex <= canvas.height ? yIndex += 10 : canvas.height;
            xIndex <= canvas.width ? xIndex += 10 : canvas.width;
            car3_lt2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(xIndex, yIndex), ellipsoid);
        } while (!car3_lt2);

        var car3_rb2 = null;
        var yIndex = canvas.height;
        var xIndex = canvas.width;
        do {
            // 这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
            yIndex >= 10 ? yIndex -= 10 : 10;
            xIndex >= 10 ? xIndex -= 10 : 10;
            car3_rb2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(yIndex, yIndex), ellipsoid);
        } while (!car3_rb2);

        var carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt2);
        var carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb2);
        extent.xmin = Cesium.Math.toDegrees(carto_lt2.longitude);
        extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
        extent.xmax = Cesium.Math.toDegrees(carto_rb2.longitude);
        extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
    }

    // 获取高度
    extent.height = Math.ceil(viewer.camera.positionCartographic.height);
    return extent;
}

/**
 *
 * @param viewer
 * @param positionArr
 */
export function getTerrainPositionsheight (viewer,objposition) {
    let Cartographic =  Cartesian3toCartographic(window.Scene.viewer,new Cesium.Cartesian3.fromDegrees(objposition.lon, objposition.lat, 0));
    // let Cartographics =  new Cesium.Cartographic.fromDegrees(110.13814928601926, 31.570772677194167);
    // let terrainPosition = window.Scene.viewer.scene.sampleHeight(Cartographic);
    let terrainData = window.Scene.viewer.terrainProvider;
    var positions = [
        Cesium.Cartographic.fromDegrees(Cartographic.longitude, Cartographic.latitude)    //输入经纬度
    ];
    var terrainHeight  = null;
    var promise = Cesium.sampleTerrain(terrainData,18,positions);
    Cesium.when(promise, function (updatedPositions) {
        terrainHeight = updatedPositions[0].height;
    });

    return  terrainHeight;
}

/**
 *
 * @param viewer
 * @param lon
 * @param lat
 * @param height
 * @constructor
 */
export function FlytoEntity(viewer, lon, lat, height = 5500) {
    //AddMBEntity(viewer, lon, lat, 100);
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
        orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
        }
    });
};

/**
 * 生成GUID 
 * @returns 
 */
export function Creatguid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

/**
 * 已出图层数组
 * @param viewer
 * @param entityArr
 */
export  function removeLayer(viewer,entityArr) {
  if (viewer && entityArr !==null && entityArr.length>0){
    for(let  curentity of entityArr){
      viewer.entities.remove(curentity);
    }
  }
}

export  function RestorationViwer(viewer) {
  viewer.camera.setView({
    destination :new  Cesium.Cartesian3(-1966386.6600895405, 5242492.19311227,3270708.5233220723),// -1966386.6600895405, 5242492.19311227,3270708.5233220723
    orientation: {
      heading : 6.189050778847438, // east, default value is 0.0 (north) //6.189050778847438
      pitch : -0.7778268233321644,    // default value (looking down)//-0.7778268233321644  
      roll: 0.0005462445771966529                          // default value //0.0005462445771966529
    }
  });
}