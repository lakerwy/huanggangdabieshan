/**
 * 雷达实体
 */
import * as Cesium from "cesium";

/**
 *
 * @param {Object} param
 * @param {import("cesium/Source/DataSources/EntityCollection")} param.entities
 * @param {Number} param.lon
 * @param {Number} param.lat
 * @param {Number} [param.radius] = 30
 * @param {Number} [param.height] = 0
 * @param {Object} [param.entityOptions]
 * @returns entity
 */
export function getRadarEntity({
  entities,
  lon,
  lat,
  radius = 30,
  height = 0,
  color = "rgba(255,0,0,1)",
  entityOptions
}) {
  entityOptions = entityOptions || {};

  let rotation = Cesium.Math.toRadians(90);

  function getRotationValue() {
    rotation += 0.02;
    return rotation;
  }

  let rgba = Cesium.Color.fromCssColorString(color);
  let r = Math.round(rgba.red * 255);
  let g = Math.round(rgba.green * 255);
  let b = Math.round(rgba.blue * 255);

  let entity_ = new Cesium.Entity({
    ...entityOptions,
    position: Cesium.Cartesian3.fromDegrees(lon, lat),
    ellipse: new Cesium.EllipseGraphics({
      semiMajorAxis: radius,
      semiMinorAxis: radius,
      height: height,
      material: new Cesium.ImageMaterialProperty({
        image: getStaticRaderCanvas(r, g, b),
        transparent: true
      })
    })
  });

  let entity = new Cesium.Entity({
    ...entityOptions,
    position: Cesium.Cartesian3.fromDegrees(lon, lat),
    ellipse: new Cesium.EllipseGraphics({
      semiMajorAxis: radius,
      semiMinorAxis: radius,
      height: height,
      material: new Cesium.ImageMaterialProperty({
        image: getRaderCanvas(r, g, b),
        transparent: true
      }),
      stRotation: new Cesium.CallbackProperty(getRotationValue, false)
    })
  });

  entities.add(entity_);
  entities.add(entity);
  return entity;
}

function getStaticRaderCanvas(r, g, b) {
  let canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 300;
  let context = canvas.getContext("2d");

  context.strokeStyle = `rgba(${r},${g},${b},1)`;
  context.fillStyle = "rgba(0,0,0,0.3)";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(300, 150);
  context.arc(150, 150, 150, 0, 2 * Math.PI);
  context.stroke();
  context.fill();

  context.strokeStyle = `rgba(${r},${g},${b},1)`;
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(300, 150);
  context.arc(150, 150, 50, 0, 2 * Math.PI);
  context.stroke();

  context.strokeStyle = `rgba(${r},${g},${b},1)`;
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(300, 150);
  context.arc(150, 150, 100, 0, 2 * Math.PI);
  context.stroke();

  context.strokeStyle = `rgba(${r},${g},${b},1)`;
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(0, 150);
  context.lineTo(300, 150);
  context.stroke();

  context.strokeStyle = `rgba(${r},${g},${b},1)`;
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(150, 0);
  context.lineTo(150, 300);
  context.stroke();

  context.strokeStyle = `rgba(${r},${g},${b},1)`;
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(150, 0);
  context.lineTo(150, 300);
  context.stroke();

  return canvas;
}

function getRaderCanvas(r, g, b) {
  let canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 300;
  let context = canvas.getContext("2d");

  let grd = context.createLinearGradient(175, 100, canvas.width, 150);
  grd.addColorStop(0, `rgba(${r},${g},${b},0)`);
  grd.addColorStop(1, `rgba(${r},${g},${b},1)`);
  context.fillStyle = grd;
  context.beginPath();
  context.moveTo(150, 150);
  context.arc(150, 150, 150, (-90 / 180) * Math.PI, (0 / 180) * Math.PI);
  context.fill();

  return canvas;
}
