/**
 * 由长度、顶部半径和底部半径定义的圆柱体、截锥体或圆锥体。
 */

import * as Cesium from "cesium";

/**
 *
 * @param {Object} param
 * @param {import("cesium/Source/DataSources/EntityCollection")} param.entities
 * @param {Number} param.lon
 * @param {Number} param.lat
 * @param {Number} param.height
 * @param {Number} param.length 长度
 * @param {Number} param.topRadius 顶部半径
 * @param {Number} param.bottomRadius 底部半径
 * @param {String} param.fillColor 填充色
 * @param {String} param.strokeColor 边框色
 * @param {Number} param.strokeWidth 边框宽度
 * @param {Boolean} param.isRotate 是否垂线自旋转
 * @param {Object} param.entityOptions
 * @returns entity
 */
export function getCylinderEntity({
  entities,
  lon,
  lat,
  height,
  length = 100,
  topRadius = 100,
  bottomRadius = 100,
  fillColor = "rgba(255,0,0,0.5)",
  strokeColor = "rgba(255,0,0,1)",
  strokeWidth = 1,
  isRotate,
  numberOfVerticalLines = 0,
  entityOptions
}) {
  entityOptions = entityOptions || {};

  let heading = 0; //偏航角（Y轴）
  let pitch = 0; //俯仰角（X轴）
  let roll = 0; //翻滚角（Z轴）

  // 椎体位置
  let position = Cesium.Cartesian3.fromDegrees(lon, lat, height);

  isRotate = isRotate !== undefined ? isRotate : true;

  let entity = new Cesium.Entity({
    ...entityOptions,
    position: position,
    //通过CallbackProperty延迟回调函数一直调用封装的偏航角方法
    //false，返回的值如果改变则一直调用自身，diaoyong()返回的值是orientation，而orientation会根据每次heading 的不同而发生改变
    orientation: isRotate
      ? new Cesium.CallbackProperty(() => {
          heading = heading + Cesium.Math.toRadians(10);
          var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
          var orientation = Cesium.Transforms.headingPitchRollQuaternion(
            position,
            hpr
          );
          return orientation;
        }, false)
      : undefined,
    cylinder: new Cesium.CylinderGraphics({
      length: length,
      topRadius: topRadius,
      bottomRadius: bottomRadius,
      heightReference: Cesium.HeightReference.NONE,
      fill: fillColor ? true : false,
      material: fillColor ? Cesium.Color.fromCssColorString(fillColor) : null,
      outline: strokeColor ? true : false,
      outlineColor: strokeColor
        ? Cesium.Color.fromCssColorString(strokeColor)
        : null,
      outlineWidth: strokeWidth,
      numberOfVerticalLines: numberOfVerticalLines
    })
  });
  entities.add(entity);
  return entity;
}
