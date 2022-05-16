import * as Cesium from "cesium";

export function addFlyLine({
  entities,
  start,
  end,
  width = 1,
  color = "rgba(255,249,0,0.5)",
  height = 5000
}) {
  // let points = generateCurve(start, end);
  let pointsNum = 200;

  let ps = getParabolaLine(start, end, height, pointsNum);
  var pointArr = [];
  for (var i = 0; i < ps.length; i++) {
    pointArr.push(ps[i][0], ps[i][1], ps[i][2]);
  }
  let points = Cesium.Cartesian3.fromDegreesArrayHeights(pointArr);

  let lineEntity = new Cesium.Entity({
    description: "飞行背景线",
    polyline: new Cesium.PolylineGraphics({
      width: width,
      positions: points,
      material: Cesium.Color.fromCssColorString(color)
    })
  });

  let rgba = Cesium.Color.fromCssColorString(color);
  let r = Math.round(rgba.red * 255);
  let g = Math.round(rgba.green * 255);
  let b = Math.round(rgba.blue * 255);

  let index = 0;
  let num = 2;
  let total = pointsNum;
  let startIndex = 0;

  let animateLineEntity = new Cesium.Entity({
    description: "飞行尾迹线",
    polyline: {
      width: width * 20,
      // positions: points,
      positions: new Cesium.CallbackProperty(() => {
        if (index >= total) {
          index = 0;
          startIndex = 0;
        }

        index = index + num;
        if (index - startIndex > 20) {
          startIndex = index - 20;
        }
        let ps = points.slice(startIndex, index);
        return ps;
      }, false),
      material: new Cesium.ImageMaterialProperty({
        image: getArrowCanvas(r, g, b),
        transparent: true
      })
    }
  });
  entities.add(lineEntity);
  entities.add(animateLineEntity);

  return lineEntity;
}

/**
 * 生成流动曲线
 * @param startPoint 起点
 * @param endPoint 终点
 * @returns {Array}
 */
function generateCurve(start, end, height = 1000) {
  let startPoint = Cesium.Cartesian3.fromDegrees(start[0], start[1], height);
  let endPoint = Cesium.Cartesian3.fromDegrees(end[0], end[1], height);

  let addPointCartesian = new Cesium.Cartesian3();
  Cesium.Cartesian3.add(startPoint, endPoint, addPointCartesian);

  let midPointCartesian = new Cesium.Cartesian3();
  Cesium.Cartesian3.divideByScalar(addPointCartesian, 2, midPointCartesian);

  let midPointCartographic = Cesium.Cartographic.fromCartesian(
    midPointCartesian
  );
  midPointCartographic.height =
    Cesium.Cartesian3.distance(startPoint, endPoint) / 10 + height;

  let midPoint = new Cesium.Cartesian3();
  Cesium.Ellipsoid.WGS84.cartographicToCartesian(
    midPointCartographic,
    midPoint
  );

  let spline = new Cesium.CatmullRomSpline({
    times: [0.0, 0.5, 1.0],
    points: [startPoint, midPoint, endPoint]
  });

  let curvePoints = [];

  for (let i = 0, len = 300; i < len; i++) {
    curvePoints.push(spline.evaluate(i / len));
  }

  return curvePoints;
}

function getParabolaLine(pt1, pt2, height, num) {
  let h = height && height > 5000 ? height : 5000;
  let L =
    Math.abs(pt1[0] - pt2[0]) > Math.abs(pt1[1] - pt2[1])
      ? Math.abs(pt1[0] - pt2[0])
      : Math.abs(pt1[1] - pt2[1]);
  let n = num && num > 50 ? num : 50;
  let result = [];
  let dlt = L / n;
  if (Math.abs(pt1[0] - pt2[0]) > Math.abs(pt1[1] - pt2[1])) {
    //以lon为基准
    let delLat = (pt2[1] - pt1[1]) / n;
    if (pt1[0] - pt2[0] > 0) {
      dlt = -dlt;
    }
    for (let i = 0; i < n; i++) {
      let tempH =
        h -
        (Math.pow(-0.5 * L + Math.abs(dlt) * i, 2) * 4 * h) / Math.pow(L, 2);
      let lon = pt1[0] + dlt * i;
      let lat = pt1[1] + delLat * i;
      result.push([lon, lat, tempH]);
    }
  } else {
    //以lat为基准
    let delLon = (pt2[0] - pt1[0]) / n;
    if (pt1[1] - pt2[1] > 0) {
      dlt = -dlt;
    }
    for (let j = 0; j < n; j++) {
      let tempH1 =
        h -
        (Math.pow(-0.5 * L + Math.abs(dlt) * j, 2) * 4 * h) / Math.pow(L, 2);
      let lon1 = pt1[0] + delLon * j;
      let lat1 = pt1[1] + dlt * j;
      result.push([lon1, lat1, tempH1]);
    }
  }

  return result;
}

function getArrowCanvas(r, g, b) {
  let canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 100;
  let context = canvas.getContext("2d");

  context.fillStyle = `rgba(${r},${g},${b},1)`;
  context.beginPath();
  context.moveTo(800, 50);
  context.lineTo(600, 0);
  context.lineTo(600, 30);
  context.lineTo(0, 50);
  context.lineTo(600, 70);
  context.lineTo(600, 100);
  context.fill();

  return canvas;
}
