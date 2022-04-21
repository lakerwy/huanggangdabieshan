/**
 * @Description:
 * @author 杜晓辉
 * @date 2021/3/19 15:04:33
 */
// import * as Cesium from 'cesium/Build/Cesium/Cesium'
import * as Cesium from 'cesium/Cesium'
/**
 *
 * @param views
 * @param index
 * @constructor
 */
export function AddTerrainLayers(viewer, index) {
  var scene = viewer.scene;
  var terrainProvider;
  //let type = window.EarthBaseConfig.EarthDEM[0].show;
  let  type = true;
  if (type &&  window.EarthBaseConfig.EarthDEM !==null && window.EarthBaseConfig.EarthDEM.length>0) {
    if (scene.terrainProvider._url) {
      terrainProvider = new Cesium.EllipsoidTerrainProvider({});
    }
    else {
      // terrainProvider = new Cesium.ArcGISTiledElevationTerrainProvider({
      //     url : 'http://192.168.99.56:6080/arcgis/rest/services/SNJ/dem_2m/ImageServer',
      //     //url:"http://192.168.99.56:6080/arcgis/rest/services/SNJ/dem_2m/ImageServer/WMTS?",
      //     //token : 'KED1aF_I4UzXOHy3BnhwyBHU4l5oY6rO6walkmHoYqGp4XyIWUd5YZUC1ZrLAzvV40pR6gBXQayh0eFA8m6vPg..'
      // });
      terrainProvider = new Cesium.CesiumTerrainProvider({
        url: window.EarthBaseConfig.EarthDEM[0].url,
        requestVertexNormals:true,
        requestWaterMask: true,
        requestMetadata:true

      });
    }
    scene.terrainProvider = terrainProvider;
  } else {
    scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
  }
}
