/**
 * 构造动的扩散涟漪  实际上就是把图片圆形按时间改变半径
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
export function getCircleRippleEntity({
  entities,
  lon,
  lat,
  radius = 30,
  height = 0,
  color = "rgba(255,0,0,1)",
  deviationR = 1,
  entityOptions
}) {
  entityOptions = entityOptions || {};

  let rgba = Cesium.Color.fromCssColorString(color);
  let r = Math.round(rgba.red * 255);
  let g = Math.round(rgba.green * 255);
  let b = Math.round(rgba.blue * 255);

  let r1 = radius,
    r2 = radius;
  let r3 = radius * 2,
    r4 = radius * 2;

  let maxR = radius * 3;

  function changeR1() {
    r1 = r1 + deviationR;
    if (r1 >= maxR) {
      r1 = radius;
    }
    return r1;
  }

  function changeR2() {
    r2 = r2 + deviationR;
    if (r2 >= maxR) {
      r2 = radius;
    }
    return r2;
  }

  let entity = new Cesium.Entity({
    ...entityOptions,
    position: Cesium.Cartesian3.fromDegrees(lon, lat),
    ellipse: new Cesium.EllipseGraphics({
      semiMinorAxis: radius,
      semiMajorAxis: radius,
      height: height,
      material: Cesium.Color.fromCssColorString(color)
    })
  });

  let entity_ = new Cesium.Entity({
    ...entityOptions,
    position: Cesium.Cartesian3.fromDegrees(lon, lat),
    ellipse: new Cesium.EllipseGraphics({
      semiMinorAxis: new Cesium.CallbackProperty(changeR1, false),
      semiMajorAxis: new Cesium.CallbackProperty(changeR2, false),
      height: height,
      material: new Cesium.ImageMaterialProperty({
        image: getCircleCanvas(r, g, b),
        transparent: true,
        color: new Cesium.CallbackProperty(function() {
          var alp = 1 - r1 / maxR;
          return Cesium.Color.WHITE.withAlpha(alp);
        }, false)
      })
    })
  });

  entities.add(entity);
  entities.add(entity_);

  //第二个圆开始跑
  setTimeout(function() {
    function changeR11() {
      //这是callback，参数不能内传
      r3 = r3 + deviationR;
      if (r3 >= maxR) {
        r3 = radius;
      }
      return r3;
    }
    function changeR12() {
      r4 = r4 + deviationR;
      if (r4 >= maxR) {
        r4 = radius;
      }
      return r4;
    }
    entities.add({
      position: Cesium.Cartesian3.fromDegrees(lon, lat),
      ellipse: {
        semiMinorAxis: new Cesium.CallbackProperty(changeR11, false),
        semiMajorAxis: new Cesium.CallbackProperty(changeR12, false),
        height: height,
        material: new Cesium.ImageMaterialProperty({
          image: getCircleCanvas(r, g, b),
          transparent: true,
          color: new Cesium.CallbackProperty(function() {
            var alp = 1 - r1 / maxR;
            return Cesium.Color.WHITE.withAlpha(alp);
          }, false)
        })
      }
    });
  }, 3000);
  return entity;
}

function getCircleCanvas(r, g, b) {
  let canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 300;
  let context = canvas.getContext("2d");

  // 创建渐变
  var radgrad = context.createRadialGradient(150, 150, 0, 0, 150, 300);
  radgrad.addColorStop(0, `rgba(${r},${g},${b},1)`);
  // radgrad.addColorStop(0.6, `rgba(${r},${g},${b},0.4)`);
  radgrad.addColorStop(1, `rgba(${r},${g},${b},0.5)`);

  context.fillStyle = radgrad;
  context.arc(150, 150, 150, 0, 2 * Math.PI);
  context.fill();

  return canvas;
}
