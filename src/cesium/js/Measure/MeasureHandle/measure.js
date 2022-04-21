/*
 * @Descripttion: 
 * @version: 1.0.1
 * @Author: 杜晓辉
 * @Date: 2021-06-29 12:42:14
 * @LastEditors: 杜晓辉
 * @LastEditTime: 2021-08-05 15:43:02
 */
import * as Cesium from 'cesium/Cesium'
//测量空间直线距离
/******************************************* */
export var removeMeasureArr = [];

export function measureLineSpace(viewer, handler, type, flag) {
  if (type != "lineSpace") {
    return;
  }
  //var  Linehandler = null;
  // 取消双击事件-追踪该位置
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  var positions = [];
  var poly = null;
  // var tooltip = document.getElementById("toolTip");
  var distance = 0;
  var cartesian = null;
  var floatingPoint;
  // tooltip.style.display = "block";

  //鼠标起点定位后 鼠标移动开始画线移动
  handler.setInputAction(function (movement) {
    cartesian = viewer.scene.pickPosition(movement.endPosition);
    if (positions.length >= 2) {
      if (!Cesium.defined(poly)) {
        poly = new PolyLinePrimitive(positions);
      } else {
        positions.pop();
        // cartesian.y += (1 + Math.random());
        positions.push(cartesian);
      }
      distance = getSpaceDistance(positions);
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  //左键点击事件
  handler.setInputAction(function (movement) {
    cartesian = viewer.scene.pickPosition(movement.position);
    if (positions.length == 0) {
      positions.push(cartesian.clone());
    }
    positions.push(cartesian);
    //在三维场景中添加Label
    //   var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    var textDisance = distance + "米";
    if (distance > 0) {
      // console.log(textDisance + ",lng:" + cartographic.longitude/Math.PI*180.0);
      floatingPoint = viewer.entities.add({
        name: '空间直线距离',      // position: Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180,cartographic.height),
        position: positions[positions.length - 1],
        label: {
          text: textDisance,
          font: '18px sans-serif',
          fillColor: Cesium.Color.GOLD,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(5, -10),
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          showBackground: true,
        }
      });
    }

    removeMeasureArr.push(floatingPoint);
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  //右键取消
  handler.setInputAction(function (movement) {
    handler.destroy(); //关闭事件句柄

  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

  var PolyLinePrimitive = (function () {
    function _(positions) {
      this.options = {
        name: '直线',
        polyline: {
          show: true,
          positions: [],
          material: Cesium.Color.CHARTREUSE,
          width: 3,
          clampToGround: true
        }
      };
      this.positions = positions;
      this._init();
    }

    _.prototype._init = function () {
      var _self = this;
      var _update = function () {
        return _self.positions;
      };
      //实时更新polyline.positions
      this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
      removeMeasureArr.push(viewer.entities.add(this.options));
    };

    return _;
  })();

  //空间两点距离计算函数
  function getSpaceDistance(positions) {
    var distance = 0;
    for (var i = 0; i < positions.length - 1; i++) {

      var point1cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
      var point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1]);
      /**根据经纬度计算出距离**/
      var geodesic = new Cesium.EllipsoidGeodesic();
      geodesic.setEndPoints(point1cartographic, point2cartographic);
      var s = geodesic.surfaceDistance;
      //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
      //返回两点之间的距离
      s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
      distance = distance + s;
    }
    return distance.toFixed(2);
  }
};

// measureLineSpace(viewer);
export function measureAreaSpace(viewer, handler, type, flag) {
  if (type != "areaSpace") {
    return;
  }
  //var handler = null;
  // 取消双击事件-追踪该位置
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  var positions = [];
  var tempPoints = [];
  var floatingRegion;
  var polygon = null;
  var cartesian = null;
  var floatingPoint;//浮动点
  handler.setInputAction(function (movement) {
    cartesian = viewer.scene.pickPosition(movement.endPosition);
    if (positions.length >= 2) {
      if (!Cesium.defined(polygon)) {
        polygon = new PolygonPrimitive(positions);
      } else {
        positions.pop();
        // cartesian.y += (1 + Math.random());
        positions.push(cartesian);
      }
    }

  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  handler.setInputAction(function (movement) {
    cartesian = viewer.scene.pickPosition(movement.position);
    if (positions.length == 0) {
      positions.push(cartesian.clone());
    }
    //positions.pop();
    positions.push(cartesian);
    //在三维场景中添加点
    var cartographic = Cesium.Cartographic.fromCartesian(positions[positions.length - 1]);
    var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
    var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
    var heightString = cartographic.height;
    tempPoints.push({ lon: longitudeString * 1, lat: latitudeString * 1, hei: heightString * 1 });
    floatingPoint = viewer.entities.add({
      name: '多边形面积',
      position: positions[positions.length - 1],
    });
    removeMeasureArr.push(floatingPoint);
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  handler.setInputAction(function (movement) {
    handler.destroy();
    var textArea = getArea(tempPoints) + "平方米";
    floatingRegion = viewer.entities.add({
      name: '多边形面积',
      position: positions[positions.length - 1],
      label: {
        text: textArea,
        font: '18px sans-serif',
        fillColor: Cesium.Color.GOLD,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.TOP,
        pixelOffset: new Cesium.Cartesian2(0, -13),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        showBackground: true,
        heightReference: Cesium.HeightReference.NONE,
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT
      }
    });
    removeMeasureArr.push(floatingRegion);
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  var radiansPerDegree = Math.PI / 180.0;//角度转化为弧度(rad)
  var degreesPerRadian = 180.0 / Math.PI;//弧度转化为角度
  //计算多边形面积
  function getArea(points) {
    var res = 0;
    //拆分三角曲面
    for (var i = 0; i < points.length - 2; i++) {
      var j = (i + 1) % points.length;
      var k = (i + 2) % points.length;
      var totalAngle = Angle(points[i], points[j], points[k]);
      var dis_temp1 = distance(positions[i], positions[j]);
      var dis_temp2 = distance(positions[j], positions[k]);
      res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle));
      // console.log(res);
    }
    return (res).toFixed(4);
    //return (res / 1000000.0).toFixed(4);
  }
  /*角度*/
  function Angle(p1, p2, p3) {
    var bearing21 = Bearing(p2, p1);
    var bearing23 = Bearing(p2, p3);
    var angle = bearing21 - bearing23;
    if (angle < 0) {
      angle += 360;
    }
    return angle;
  }
  /*方向*/
  function Bearing(from, to) {
    var lat1 = from.lat * radiansPerDegree;
    var lon1 = from.lon * radiansPerDegree;
    var lat2 = to.lat * radiansPerDegree;
    var lon2 = to.lon * radiansPerDegree;
    var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
    if (angle < 0) {
      angle += Math.PI * 2.0;
    }
    angle = angle * degreesPerRadian;//角度
    return angle;
  }
  var PolygonPrimitive = (function () {
    function _(positions) {
      this.options = {
        name: '多边形',
        polygon: {
          hierarchy: [],
          outline: true,
          outlineWidth: 3,
          //perPositionHeight:true,
          outlineColor: Cesium.Color.CYAN,//设置轮廓颜色为黑色
          followSurface: false,
          material: Cesium.Color.CYAN.withAlpha(0.3),
          clampToGround: true,
          classificationType: Cesium.ClassificationType.BOTH,
        },
        polyline: {
          positions: [],
          //positions:points,
          width: 5,
          clampToGround: true,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.4,
            color: Cesium.Color.BLUE
          }),
        },
      }
      this.hierarchy = positions;
      this.positions = positions;
      this._init();
    }
    _.prototype._init = function () {
      var _self = this;
      var _update = function () {
        return _self.hierarchy, _self.positions;
      };
      //实时更新polygon.hierarchy
      //this.options.polygon.hierarchy = new Cesium.CallbackProperty(_update, false);
      this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
      //viewer.entities.add(this.options);
      removeMeasureArr.push(viewer.entities.add(this.options));
    };

    return _;
  })();

  function distance(point1, point2) {
    var point1cartographic = Cesium.Cartographic.fromCartesian(point1);
    var point2cartographic = Cesium.Cartographic.fromCartesian(point2);
    /**根据经纬度计算出距离**/
    var geodesic = new Cesium.EllipsoidGeodesic();
    geodesic.setEndPoints(point1cartographic, point2cartographic);
    var s = geodesic.surfaceDistance;
    //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
    //返回两点之间的距离
    s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
    return s;
  }
};

/**
 *
 * @param viewer
 * @param handler
 * @param removeObj
 */
//****************************三角测量************************************************//
export var removeObj = [];
export function measureTriangle(viewer, handler, type, flag) {
  if (type != "TriangleSpace") {
    return;
  }
  viewer.scene.globe.depthTestAgainstTerrain = true;
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  //var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  //handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
  var positionsTriangle = [];
  var removeChange = [];
  var tempPoints;//保存直角点
  var poly = null;
  var cartesian = null;
  var floatingPoint;//浮动点
  var floatingPoint_g;
  //存全局的临时点2
  var lingshi2 = [];

  var measure_entities = viewer.entities.add(new Cesium.Entity());
  handler.setInputAction(function (movement, type) {
    try {
      cartesian = viewer.scene.pickPosition(movement.endPosition);
      // var ray = viewer.camera.getPickRay(movement.endPosition);
      // cartesian = viewer.scene.globe.pick(ray, viewer.scene);
      if (cartesian == null && cartesian == undefined) return;
      //cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
      if (positionsTriangle.length >= 2) {
        if (!Cesium.defined(poly)) {
          poly = new PolylinePrimitive(positionsTriangle);
        } else {
          positionsTriangle.pop();
          positionsTriangle.push(cartesian.clone());
          tempPoints = point_conf(positionsTriangle);
          create();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  handler.setInputAction(function (movement) {
    if (positionsTriangle.length == 0) {
      cartesian = viewer.scene.pickPosition(movement.position);
      // var ray = viewer.camera.getPickRay(movement.position);
      // cartesian = viewer.scene.globe.pick(ray, viewer.scene);
      positionsTriangle.push(cartesian.clone());
      positionsTriangle.push(cartesian.clone());
      //tempPoints= point_conf(positionsTriangle);
      floatingPoint_g = floatingPoint = viewer.entities.add({
        parent: measure_entities,
        name: '多边形面积',
        position: positionsTriangle[0],
        point: {
          pixelSize: 4,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 1.4,
          heightReference: Cesium.HeightReference.none
        }
      });
      removeObj.push(floatingPoint_g);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  var remove = function () {
    if (removeChange.leng == 0) return;
    for (var i in removeChange) viewer.entities.remove(removeChange[i]);
  }
  var create = function () {
    //在三维场景中添加线
    remove();
    var tempPositions1 = [];
    var tempPositions2 = [];

    tempPositions1.push(positionsTriangle[0].clone());
    tempPositions1.push(tempPoints.clone());
    //var  dis = getHeight(tempPositions1);
    var textDistance = (getHeight(tempPositions1)) + "米";


    tempPositions2.push(tempPoints.clone());
    tempPositions2.push(positionsTriangle[1].clone());
    //textDistance = (getDistance(tempPositions2) / 1000) + "公里";
    //var dise = getDistance(tempPositions2);
    var textDistance2 = (getDistance(tempPositions2)) + "米";

    var midheight = null;
    if (tempPositions1[0] || tempPositions2[0]) {
      midheight = getMidLab(tempPositions1[0], tempPositions2[0]);
    }
    var lonlat = viewer.entities.add({
      parent: measure_entities,
      name: '等经纬度',
      //position: tempPositions1[0].clone(),
      position: midheight,
      polyline: {
        show: true,
        positions: tempPositions1,
        // material :  new Cesium.PolylineDashMaterialProperty({
        //   color: Cesium.Color.RED
        // }),
        arcType: Cesium.ArcType.NONE,
        material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.CRIMSON),
        width: 13,
      },
      label: {
        text: textDistance,
        font: '18px sans-serif',
        fillColor: Cesium.Color.CRIMSON,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        showBackground: true,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        pixelOffset: new Cesium.Cartesian2(0, 0)
      }
    })


    var midping = null;
    if (tempPositions2) {
      lingshi2 = tempPositions1;
    }
    if (tempPositions2[0] || positionsTriangle[positionsTriangle.length - 1]) {
      midping = getMidLab(tempPositions2[0], positionsTriangle[positionsTriangle.length - 1]);
    }

    var line = viewer.entities.add({
      parent: measure_entities,
      name: '等高度直线',
      //position: tempPositions2[0].clone(),
      position: midping,
      polyline: {
        show: true,
        positions: tempPositions2,
        // material :  new Cesium.PolylineDashMaterialProperty({
        //   color: Cesium.Color.RED
        // }),
        arcType: Cesium.ArcType.NONE,
        material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.DARKTURQUOISE),
        width: 13,
      },
      label: {
        text: textDistance2,
        font: '18px sans-serif',
        fillColor: Cesium.Color.DARKTURQUOISE,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        showBackground: true,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        pixelOffset: new Cesium.Cartesian2(0, 0)
      }
    })

    //初始化
    removeChange = [];
    removeChange = [line, lonlat];
    removeObj.push(lonlat), removeObj.push(line);
  }
  //获取任意两点坐标中点坐标值
  function getMidLab(p1, p2) {
    var p1Midpoint = new Cesium.Cartesian3((p1.x + p2.x) * 0.5, (p1.y + p2.y) * 0.5, (p1.z + p2.z) * 0.5);
    return p1Midpoint;
  }
  handler.setInputAction(function (movement) {
    handler.destroy();
    // handler_g.destroy();//关闭事件句柄
    // tempPoints =point_conf(positionsTriangle);
    create();
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  function getHeight(positions) {
    var cartographic = Cesium.Cartographic.fromCartesian(positions[0]);
    var cartographic1 = Cesium.Cartographic.fromCartesian(positions[1]);
    var height_temp = cartographic1.height - cartographic.height;
    return height_temp.toFixed(2);
  }

  function point_conf(_positions) {
    var cartographic = Cesium.Cartographic.fromCartesian(_positions[0]);
    var cartographic1 = Cesium.Cartographic.fromCartesian(_positions[1]);
    var point_temp = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude), cartographic1.height);
    return point_temp;
  }

  //空间两点距离计算函数
  function getSpaceDistance(positions) {
    var distance = 0;
    for (var i = 0; i < positions.length - 1; i++) {

      var point1cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
      var point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1]);

      /**根据经纬度计算出距离**/
      var geodesic = new Cesium.EllipsoidGeodesic();
      geodesic.setEndPoints(point1cartographic, point2cartographic);
      var s = geodesic.surfaceDistance;
      //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
      //返回两点之间的距离
      s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
      distance = distance + s;
    }
    return distance.toFixed(2);
  }

  function getDistance(positions) {
    var point1cartographic = Cesium.Cartographic.fromCartesian(positions[1]);
    var point2cartographic = Cesium.Cartographic.fromCartesian(positions[0]);
    /**根据经纬度计算出距离**/
    var geodesic = new Cesium.EllipsoidGeodesic();
    geodesic.setEndPoints(point1cartographic, point2cartographic);
    var s = geodesic.surfaceDistance;
    //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
    //返回两点之间的距离
    s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
    return s.toFixed(2);
  }

  var PolylinePrimitive = (function () {

    function _(positions) {
      this.options = {
        parent: measure_entities,
        name: '直线',
        polyline: {
          show: true,
          positions: [],
          //material : Cesium.Color.GOLD ,
          width: 7,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.5,
            color: Cesium.Color.BLUE
          }),
        },
        label: {
          font: '18px sans-serif',
          fillColor: Cesium.Color.GOLD,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          showBackground: true,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          pixelOffset: new Cesium.Cartesian2(0, 0)
        }
      };
      this.positions = positions;
      this._init();
    }

    _.prototype._init = function () {
      var _self = this;
      var _update = function () {
        return _self.positions;
      };
      var _update_label = function () {
        //console.log("位置"+_self.positions);
        var midzhi = null;
        if (_self.positions) {
          midzhi = getMidLab(_self.positions[0], _self.positions[1]);
        }
        //return _self.positions[1].clone();
        return midzhi;
      };
      var _text = function () {
        var text_temp = getSpaceDistance(_self.positions);
        //text_temp = (text_temp / 1000) +"公里";
        text_temp = (text_temp) + "米";
        return text_temp;
      };
      //实时更新polygon.hierarchy
      this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
      this.options.position = new Cesium.CallbackProperty(_update_label, false);
      this.options.label.text = new Cesium.CallbackProperty(_text, false);
      removeObj.push(viewer.entities.add(this.options));
    };
    return _;
  })();
};

