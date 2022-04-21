/*
 * @Descripttion: 
 * @version: 1.0.1
 * @Author: 杜晓辉
 * @Date: 2021-06-29 12:42:14
 * @LastEditors: 杜晓辉
 * @LastEditTime: 2021-08-05 15:43:09
 */
import * as Cesium from 'cesium/Cesium'
export var measureHeightArr = [];
export function measureHeight(viewer,handler,type,flag) {
  if(type !="HeightSpace") {
    return;
  }
  viewer.scene.globe.depthTestAgainstTerrain = true;
  //var handler;  // new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  //var handler_g = handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  var positions = [];
  var poly = null;
  //var tooltip = document.getElementById("toolTip");
  var height = 0;
  var cartesian = null;
  var floatingPoint;
  var endpoint;
  //tooltip.style.display = "block";
  handler.setInputAction(function (movement) {
    // tooltip.style.left = movement.endPosition.x + 3 + "px";
      // tooltip.style.top = movement.endPosition.y - 25 + "px";
      // tooltip.innerHTML ='<p>单击开始，双击结束</p>';
      //var ray = viewer.camera.getPickRay(movement.endPosition);
      //cartesian = viewer.scene.globe.pick(ray, viewer.scene);
      cartesian = viewer.scene.pickPosition(movement.endPosition);
      //cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);

      //console.log(positions);
      if (positions.length >= 2) {
        if (!Cesium.defined(poly)) {
          poly = new PolyLinePrimitive(positions);
        } else {
          positions.pop();
          positions.push(cartesian);
        }
        height = getHeight(positions);
        //poly = new PolyLinePrimitive(positions);
      }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  handler.setInputAction(function (movement) {
      //tooltip.style.display = "none";
      cartesian = viewer.scene.pickPosition(movement.position);
      if (positions.length == 0) {
        positions.push(cartesian.clone());
        positions.push(cartesian);
        floatingPoint = viewer.entities.add({
          //parent:measure_entities,
          name: '高度',
          position: positions[0],
          point: {
            pixelSize: 5,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            heightReference: Cesium.HeightReference.none
          },
          label: {
            text: "0米",
            font: '18px sans-serif',
            fillColor: Cesium.Color.GOLD,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            showBackground:true,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            pixelOffset: new Cesium.Cartesian2(0, 0)
          }
        });
        measureHeightArr.push(floatingPoint);
      }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  handler.setInputAction(function (movement) {
    handler.destroy();
    //positions.pop();//清除移动点
    //tooltip.style.display = "none";
    //viewer_g.entities.remove(floatingPoint);
    // console.log(positions);
    //在三维场景中添加Label
    endpoint = viewer.scene.pickPosition(movement.position);

    var textDisance = height + "米";
    var point1cartographic = Cesium.Cartographic.fromCartesian(positions[0]);
    var point2cartographic = Cesium.Cartographic.fromCartesian(positions[1]);
    var point_temp = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(point1cartographic.longitude), Cesium.Math.toDegrees(point1cartographic.latitude), point2cartographic.height);

    //var cartographicse = Cesium.Cartographic.fromCartesian(_positions[1]);
    //floatingPoint.label.text = textDisance+'米';
    endpoint = viewer.entities.add({
      //parent:measure_entities,
      name: '直线距离',
      //position : point_temp,
      position: endpoint,
      point: {
        pixelSize: 5,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        heightReference: Cesium.HeightReference.none
      },
      // label: {
      //   text: textDisance,
      //   font: '18px sans-serif',
      //   fillColor: Cesium.Color.GOLD,
      //   style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      //   outlineWidth: 1,
      //   verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      //   disableDepthTestDistance: Number.POSITIVE_INFINITY,
      //   pixelOffset: new Cesium.Cartesian2(0, 10)
      // }
    });
    measureHeightArr.push(endpoint);
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

  //获取任意两点坐标中点坐标值
  function getMidLab(p1,p2){
    var   p1Midpoint =  new Cesium.Cartesian3((p1.x+p2.x)*0.5,(p1.y+p2.y)*0.5,(p1.z+p2.z)*0.5);
    return p1Midpoint;
  }

  function getHeight(_positions) {
    var cartographic = Cesium.Cartographic.fromCartesian(_positions[0]);
    var cartographic1 = Cesium.Cartographic.fromCartesian(_positions[1]);
    var height_temp = cartographic1.height - cartographic.height;
    return height_temp.toFixed(2);
  }

  var PolyLinePrimitive = (function () {
    function _(positions) {
      this.options = {
        //parent:measure_entities,
        name: '直线',
        polyline: {
          show: true,
          positions: [],
          material: Cesium.Color.CRIMSON,
          width: 2
        },
        ellipse: {
          show: true,
          center: positions[positions.length - 1],
          //center:cartographicse,
          // semiMinorAxis : 30.0,
          // semiMajorAxis : 30.0,
          // height: 20.0,
          material: Cesium.Color.CORNFLOWERBLUE.withAlpha(0.5),
          outline: true // height must be set for outline to display
        }
      };
      this.positions = positions;
      this._init();
    }

    _.prototype._init = function () {
      var _self = this;
      var _update = function () {
        var temp_position = [];
        temp_position.push(_self.positions[0]);
        var point1cartographic = Cesium.Cartographic.fromCartesian(_self.positions[0]);
        var point2cartographic = Cesium.Cartographic.fromCartesian(_self.positions[1]);
        var point_temp = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(point1cartographic.longitude), Cesium.Math.toDegrees(point1cartographic.latitude), point2cartographic.height);
        temp_position.push(point_temp);
        //console.log(temp_position);
        return temp_position;
      };
      var _update_ellipse = function () {
        return _self.positions[0];
      };
      var _semiMinorAxis = function () {
        var point1cartographic = Cesium.Cartographic.fromCartesian(_self.positions[0]);
        var point2cartographic = Cesium.Cartographic.fromCartesian(_self.positions[1]);
        /**根据经纬度计算出距离**/
        var geodesic = new Cesium.EllipsoidGeodesic();
        geodesic.setEndPoints(point1cartographic, point2cartographic);
        var s = geodesic.surfaceDistance;
        return s;
      };
      var _height = function () {
        var height_temp = getHeight(_self.positions);
        floatingPoint.label.text = height_temp + '米';
        var  p2 = new Cesium.Cartesian3(_self.positions[0].x, _self.positions[0].y,_self.positions[1].z);
        //floatingPoint.position = getMidLab(_self.positions[0],p2);
        //floatingPoint.position = new Cesium.Cartesian3(_self.positions[0].x, _self.positions[0].y,(_self.positions[1].z+_self.positions[0].z)*0.5);
        var cartographic2 = Cesium.Cartographic.fromCartesian(_self.positions[1]);
        return cartographic2.height;
        //return height_temp;
      };
      //实时更新polyline.positions
      this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
      this.options.position = new Cesium.CallbackProperty(_update_ellipse, false);
      this.options.ellipse.semiMinorAxis = new Cesium.CallbackProperty(_semiMinorAxis, false);
      this.options.ellipse.semiMajorAxis = new Cesium.CallbackProperty(_semiMinorAxis, false);
      this.options.ellipse.height = new Cesium.CallbackProperty(_height, false);
      var curent = viewer.entities.add(this.options);
      measureHeightArr.push(curent);
    };
    return _;
  })();
};

