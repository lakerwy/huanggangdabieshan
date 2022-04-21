/**
 * @Description:
 * @author 杜晓辉
 * @date 2021/8/19 14:53:47
 */
import * as Cesium from "cesium/Cesium";

// import * as CesiumHeatmap  from 'cesium-heatmap/CesiumHeatmap'

/**
 *cesium热力图管理类
 *
 *
 */
export default class HeatmapLayerManager {
  constructor(viewer) {
    this.viewer = viewer;
    this.heatmap = null;
  }

  AddHeatmap(result, valueKey) {
    var points = [];
    var max = 0;
    var width = 1000;
    var height = 600;
    var latMin = 31.258;
    var latMax = 31.893;
    var lonMin = 109.927;
    var lonMax = 111.018;
    for (var i = 0; i < result.data.data.length; i++) {
      let curdata = result.data.data[i];
      let lon = parseFloat(curdata.lon);
      let lat = parseFloat(curdata.lat);
      let value = parseFloat(curdata[valueKey]);

      let x = Math.floor(((lon - lonMin) / (lonMax - lonMin)) * width);
      let y = Math.floor(((latMax - lat) / (latMax - latMin)) * height);
      var point = {
        x,
        y,
        value
      };
      max = Math.max(max, value);
      points.push(point);
    }

    var heatmapInstance = h337.create({
      container: document.querySelector("#heatmap")
    });

    this.heatmap = heatmapInstance;
    var data = {
      max: max,
      data: points
    };
    heatmapInstance.setData(data);

    var canvas = document.getElementsByClassName("heatmap-canvas");

    this.viewer.entities.add({
      id: "heatmap",
      name: "heatmap",
      rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(
          lonMin,
          latMin,
          lonMax,
          latMax
        ),
        material: new Cesium.ImageMaterialProperty({
          image: canvas[0],
          transparent: true
        })
      }
    });
  }
}
