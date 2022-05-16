/**
 * 图片实体
 */

import * as Cesium from "cesium";

/**
 *
 * @param {Object} param
 * @param {import("cesium/Source/DataSources/EntityCollection")} param.entities
 * @param {Number} param.lon
 * @param {Number} param.lat
 * @param {Number} param.height
 * @param {String} param.src
 * @param {Number} param.scale
 * @param {Object} param.entityOptions
 * @returns entity
 */
export function getIconEntity({
  entities,
  lon,
  lat,
  height,
  src,
  scale = 1,
  entityOptions
}) {
  entityOptions = entityOptions || {};

  // 椎体位置
  let position = Cesium.Cartesian3.fromDegrees(lon, lat, height);

  let entity = new Cesium.Entity({
    ...entityOptions,
    position: position,
    billboard: new Cesium.BillboardGraphics({
      image: src,
      scale: scale,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.CENTER,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    })
  });
  entities.add(entity);
  return entity;
}
