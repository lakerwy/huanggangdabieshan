import * as Cesium from "cesium";

const MeasureType = {
  LINE: 1,
  AREA: 2,
  TRIANGLE: 3
};

class Measure {
  /**
   *
   * @param {Object} options
   * @param {import("cesium/Source/Widgets/Viewer/Viewer")} options.viewer
   */
  constructor(options) {
    options = options || {};

    if (!options.viewer) {
      throw new Error("measure:未传入viewer");
    }

    this.viewer = options.viewer;

    this.source = new Cesium.CustomDataSource("measure");

    this.viewer.dataSources.add(this.source);

    this.handler = null;

    this.tipEntity = null;

    this.type_ = MeasureType.LINE;
  }

  /**
   * 测线
   * @param {Object} param
   * @param {String} [param.id]
   * @param {Boolean} [param.clampToGround] = false 是否贴地
   * @param {Function} [param.callback]
   */
  drawLine({ id, clampToGround = false, callback } = {}) {
    if (!this.viewer) {
      return;
    }

    let positions = [];

    this.type_ = MeasureType.LINE;

    let entity = new Cesium.Entity({
      id: id,
      polyline: new Cesium.PolylineGraphics({
        width: 4,
        material: Cesium.Color.fromCssColorString("#f00"),
        clampToGround: clampToGround,
        positions: new Cesium.CallbackProperty(() => {
          return positions;
        }, false)
      })
    });

    this.source.entities.add(entity);

    this._drawStartHandler();
    // 鼠标左键
    this.handler.setInputAction(movement => {
      this._stopPropagation();

      let cartesian = this._getCatesian3FromPX(movement.position);
      if (cartesian && cartesian.x) {
        // 开始，第一个点为已添加的点，第二点为可移动的点
        if (positions.length == 0) {
          positions.push(cartesian.clone());
        }

        // 防止重复添加
        if (positions.length > 2) {
          if (positions[positions.length - 2].equals(cartesian)) {
            return;
          }
        }

        // 上点
        this.addPointEntity(cartesian, positions);

        // 增加可移动的点
        positions.push(cartesian);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // 鼠标移动
    this.handler.setInputAction(movement => {
      let cartesian = this._getCatesian3FromPX(movement.endPosition);
      if (cartesian) {
        this.addTipEntity(cartesian, positions);

        if (positions.length >= 2) {
          positions.pop();
          positions.push(cartesian);
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // 鼠标右键结束
    this.handler.setInputAction(movement => {
      this._stopPropagation();

      if (positions.length) {
        positions.pop();
      }

      this._drawEndhanlder(entity, callback);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    // 双击鼠标左键结束
    this.handler.setInputAction(movement => {
      this._stopPropagation();

      this._drawEndhanlder(entity, callback);
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  /**
   * 测面
   * @param {Object} param
   * @param {String} [param.id]
   * @param {Boolean} [param.clampToGround] = false 是否贴地
   * @param {Function} [param.callback]
   */
  drawArea({ id, clampToGround = false, callback } = {}) {
    if (!this.viewer) {
      return;
    }

    let positions = [];

    this.type_ = MeasureType.AREA;

    let polygon = new Cesium.PolygonHierarchy();

    let entity = new Cesium.Entity({
      id: id,
      polyline: new Cesium.PolylineGraphics({
        width: 4,
        material: Cesium.Color.fromCssColorString("#f00"),
        clampToGround: clampToGround,
        positions: new Cesium.CallbackProperty(() => {
          return positions;
        }, false)
      }),
      polygon: new Cesium.PolygonGraphics({
        hierarchy: new Cesium.CallbackProperty(function() {
          return polygon;
        }, false),
        material: Cesium.Color.WHITE.withAlpha(0.3),
        outline: true,
        outlineColor: Cesium.Color.fromCssColorString("#f00"),
        outlineWidth: 4,
        arcType: Cesium.ArcType.RHUMB,
        perPositionHeight: clampToGround ? false : true
      })
    });

    this.source.entities.add(entity);

    let pointEntities = [];

    this._drawStartHandler();

    // 鼠标左键
    this.handler.setInputAction(movement => {
      this._stopPropagation();

      let cartesian = this._getCatesian3FromPX(movement.position);
      if (cartesian && cartesian.x) {
        // 开始，第一个点为已添加的点，第二点为可移动的点
        if (positions.length == 0) {
          positions.push(cartesian.clone());
          polygon.positions.push(cartesian.clone());
        }

        // 防止重复添加
        if (positions.length > 2) {
          if (positions[positions.length - 2].equals(cartesian)) {
            return;
          }
        }

        // 上点
        if (pointEntities.length) {
          let pointLabel = pointEntities[pointEntities.length - 1].label;
          if (pointLabel) {
            pointLabel.show = false;
          }
        }
        let pointEntity = this.addPointEntity(cartesian, positions);
        pointEntities.push(pointEntity);

        // 增加可移动的点
        positions.push(cartesian);
        polygon.positions.push(cartesian.clone());
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // 鼠标移动
    this.handler.setInputAction(movement => {
      let cartesian = this._getCatesian3FromPX(movement.endPosition);
      if (cartesian) {
        this.addTipEntity(cartesian, positions);

        if (positions.length >= 2) {
          positions.pop();
          positions.push(cartesian);
          polygon.positions.pop();
          polygon.positions.push(cartesian);
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // 鼠标右键结束
    this.handler.setInputAction(movement => {
      this._stopPropagation();

      if (positions.length) {
        positions.pop();
        polygon.positions.pop();
      }

      positions.push(positions[0]);

      this._drawEndhanlder(entity, callback);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    // 双击鼠标左键结束
    this.handler.setInputAction(movement => {
      this._stopPropagation();

      positions.push(positions[0]);

      this._drawEndhanlder(entity, callback);
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  /**
   * 测高（三角测量）
   * @param {Object} param
   * @param {String} [param.id]
   * @param {Function} [param.callback]
   */
  drawTriangles({ id, callback } = {}) {
    if (!this.viewer) {
      return;
    }

    let positions = [];

    this.type_ = MeasureType.TRIANGLE;

    let entity = new Cesium.Entity({
      id: id,
      polyline: new Cesium.PolylineGraphics({
        width: 4,
        material: Cesium.Color.fromCssColorString("#f00"),
        positions: new Cesium.CallbackProperty(() => {
          return positions;
        }, false)
      })
    });

    this.source.entities.add(entity);

    this._drawStartHandler();

    // 鼠标左键
    this.handler.setInputAction(movement => {
      this._stopPropagation();

      let cartesian = this._getCatesian3FromPX(movement.position);
      if (!cartesian && !cartesian.z) return false;
      if (positions.length == 0) {
        positions.push(cartesian.clone());
        positions.push(cartesian.clone());
      } else {
        this._drawEndhanlder(entity, callback);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    let HLabelEntity = this._crateTrangleLabel(),
      VLabelEntity = this._crateTrangleLabel(),
      SLabelEntity = this._crateTrangleLabel();

    // // 鼠标移动
    this.handler.setInputAction(movement => {
      let cartesian = this._getCatesian3FromPX(movement.endPosition);
      if (cartesian) {
        this.addTipEntity(cartesian, positions);

        if (positions.length >= 2) {
          // 保留起点
          positions.splice(1);

          positions.push(cartesian.clone());
          // 直线点（三角的角点）
          let horizontalPosition = this._computesHorizontalLine(positions);
          positions.push(horizontalPosition.clone());
          positions.push(positions[0]);

          VLabelEntity.position = new Cesium.CallbackProperty(() => {
            return this._computesMidPoint(positions[0], horizontalPosition);
          }, false);
          VLabelEntity.label.text = new Cesium.CallbackProperty(() => {
            return (
              "高度:" +
              this._getHeading(positions[0], horizontalPosition) +
              "米"
            );
          }, false);

          HLabelEntity.position = new Cesium.CallbackProperty(() => {
            return this._computesMidPoint(cartesian, horizontalPosition);
          }, false);
          HLabelEntity.label.text = new Cesium.CallbackProperty(() => {
            return (
              "水平距离:" +
              this.getPositionDistance(
                this.transformCartesianArrayToWGS84Array([
                  cartesian,
                  horizontalPosition
                ])
              ) +
              "米"
            );
          }, false);

          SLabelEntity.position = new Cesium.CallbackProperty(() => {
            return this._computesMidPoint(positions[0], cartesian);
          }, false);
          SLabelEntity.label.text = new Cesium.CallbackProperty(() => {
            return (
              "直线:" +
              this.getPositionDistance(
                this.transformCartesianArrayToWGS84Array([
                  positions[0],
                  cartesian
                ])
              ) +
              "米"
            );
          }, false);
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  /**
   * 清除指定id的测量
   */
  clearById(id) {
    if (!this.source || !id) {
      return;
    }

    this.source.entities.removeById(id);
  }

  /**
   * 清除所有测量
   */
  clear() {
    if (!this.source) {
      return;
    }

    this.source.entities.removeAll();
  }

  /**
   * 移除测量图层
   */
  remove() {
    if (!this.viewer || !this.source) {
      return;
    }
    this.viewer.dataSources.remove(this.source, true);
  }

  clearAndRemove() {
    this.clear();
    this.remove();
  }

  addTipEntity(position, positions) {
    let context = "单击开始绘制";
    if (positions && positions.length) {
      context = "";
      if (this.type_ == MeasureType.LINE) {
        let length = (
          this.getPositionDistance(
            this.transformCartesianArrayToWGS84Array(positions)
          ) / 1000
        ).toFixed(4);
        context = `${length} 公里 \n`;
        context += "单击继续，双击或右键结束";
      } else if (this.type_ == MeasureType.AREA) {
        let area = (
          this.getPositionsArea(
            this.transformCartesianArrayToWGS84Array(positions)
          ) / 1000000.0
        ).toFixed(4);
        if (area > 0) {
          context = `${area} 平方公里 \n`;
          context += "单击继续，双击或右键结束";
        }
      } else if (this.type_ == MeasureType.TRIANGLE) {
        context += "单击结束";
      }
    }

    if (this.tipEntity) {
      this.tipEntity.position = position;
      this.tipEntity.label.text = context;
    } else {
      this.tipEntity = this._addLabel(position, context);
    }
  }

  addPointEntity(position, positions) {
    let context = null;
    if (this.type_ == MeasureType.LINE) {
      let length = (
        this.getPositionDistance(
          this.transformCartesianArrayToWGS84Array(positions)
        ) / 1000
      ).toFixed(4);
      if (length > 0) {
        context = `${length} 公里`;
      }
    } else if (this.type_ == MeasureType.AREA) {
      let area = (
        this.getPositionsArea(
          this.transformCartesianArrayToWGS84Array(positions)
        ) / 1000000.0
      ).toFixed(4);
      if (area > 0) {
        context = `${area} 平方公里`;
      }
    }

    let entity = new Cesium.Entity({
      position: position,
      point: new Cesium.PointGraphics({
        pixelSize: 10,
        color: Cesium.Color.fromCssColorString("#fff"),
        outlineColor: Cesium.Color.fromCssColorString("#f00"),
        outlineWidth: 1
      }),
      label: new Cesium.LabelGraphics({
        show: context ? true : false,
        text: context,
        font: "12px sans-serif",
        showBackground: true,
        backgroundColor: Cesium.Color.fromCssColorString("#fff"),
        fillColor: Cesium.Color.fromCssColorString("#000"),
        outlineWidth: 0,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        pixelOffset: new Cesium.Cartesian2(0, -20),
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      })
    });
    this.source.entities.add(entity);
    return entity;
  }

  _crateTrangleLabel() {
    let entity = new Cesium.Entity({
      label: new Cesium.LabelGraphics({
        font: "12px sans-serif",
        showBackground: true,
        backgroundColor: Cesium.Color.fromCssColorString("#fff"),
        fillColor: Cesium.Color.fromCssColorString("#000"),
        outlineWidth: 0,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.CENTER
      })
    });
    this.source.entities.add(entity);
    return entity;
  }

  _addLabel(position, text) {
    let entity = new Cesium.Entity({
      posiions: position,
      label: new Cesium.LabelGraphics({
        text: text,
        font: "12px sans-serif",
        showBackground: true,
        backgroundColor: Cesium.Color.fromCssColorString("#fff"),
        fillColor: Cesium.Color.fromCssColorString("#000"),
        outlineWidth: 0,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        pixelOffset: new Cesium.Cartesian2(10, 10),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        verticalOrigin: Cesium.VerticalOrigin.TOP
      })
    });
    this.source.entities.add(entity);
    return entity;
  }

  _drawStartHandler() {
    let scene = this.viewer.scene;
    this.handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    this.currentEntity = null;
  }

  _drawEndhanlder(entity, callback) {
    this.handler.destroy();
    this.handler = null;

    if (this.tipEntity) {
      this.source.entities.remove(this.tipEntity);
      this.tipEntity = null;
    }

    if (callback) {
      callback(entity);
    }
  }

  _stopPropagation() {
    this.viewer.selectedEntity = null;
  }

  _getCatesian3FromPX(px) {
    if (!this.viewer || !px) {
      return;
    }

    // let scene = this.viewer.scene;
    // let camera = this.viewer.camera;
    // let cartesian = camera.pickEllipsoid(px, scene.globe.ellipsoid);
    // return cartesian;

    var picks = this.viewer.scene.drillPick(px);
    var cartesian = null;
    var isOn3dtiles = false,
      isOnTerrain = false;
    // drillPick
    for (let i in picks) {
      let pick = picks[i];

      if (
        (pick && pick.primitive instanceof Cesium.Cesium3DTileFeature) ||
        (pick && pick.primitive instanceof Cesium.Cesium3DTileset) ||
        (pick && pick.primitive instanceof Cesium.Model)
      ) {
        //模型上拾取
        isOn3dtiles = true;
      }
      // 3dtilset
      if (isOn3dtiles) {
        this.viewer.scene.pick(px); // pick
        cartesian = this.viewer.scene.pickPosition(px);
        if (cartesian) {
          let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          if (cartographic.height < 0) cartographic.height = 0;
          let lon = Cesium.Math.toDegrees(cartographic.longitude),
            lat = Cesium.Math.toDegrees(cartographic.latitude),
            height = cartographic.height;
          cartesian = this.transformWGS84ToCartesian({
            lng: lon,
            lat: lat,
            alt: height
          });
        }
      }
    }
    // 地形
    let boolTerrain =
      this.viewer.terrainProvider instanceof Cesium.EllipsoidTerrainProvider;
    // Terrain
    if (!isOn3dtiles && !boolTerrain) {
      var ray = this.viewer.scene.camera.getPickRay(px);
      if (!ray) return null;
      cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
      isOnTerrain = true;
    }
    // 地球
    if (!isOn3dtiles && !isOnTerrain && boolTerrain) {
      cartesian = this.viewer.scene.camera.pickEllipsoid(
        px,
        this.viewer.scene.globe.ellipsoid
      );
    }
    if (cartesian) {
      let position = this.transformCartesianToWGS84(cartesian);
      if (position.alt < 0) {
        cartesian = this.transformWGS84ToCartesian(position, 0.1);
      }
      return cartesian;
    }
    return false;
  }

  /**
   * 坐标转换 84转笛卡尔
   * @param {Object} {lng,lat,alt} 地理坐标
   * @return {Object} Cartesian3 三维位置坐标
   */
  transformWGS84ToCartesian(position, alt) {
    return position
      ? Cesium.Cartesian3.fromDegrees(
          position.lng || position.lon,
          position.lat,
          (position.alt = alt || position.alt),
          Cesium.Ellipsoid.WGS84
        )
      : Cesium.Cartesian3.ZERO;
  }

  /**
   * 坐标数组转换 笛卡尔转84
   * @param {Array} WSG84Arr {lng,lat,alt} 地理坐标数组
   * @param {Number} alt 拔高
   * @return {Array} Cartesian3 三维位置坐标数组
   */
  transformWGS84ArrayToCartesianArray(WSG84Arr, alt) {
    if (WSG84Arr) {
      return WSG84Arr
        ? WSG84Arr.map(item => {
            return this.transformWGS84ToCartesian(item, alt);
          })
        : [];
    }
  }
  /**
   * 坐标转换 笛卡尔转84
   * @param {Object} Cartesian3 三维位置坐标
   * @return {Object} {lng,lat,alt} 地理坐标
   */
  transformCartesianToWGS84(cartesian) {
    if (cartesian) {
      var ellipsoid = Cesium.Ellipsoid.WGS84;
      var cartographic = ellipsoid.cartesianToCartographic(cartesian);
      return {
        lng: Cesium.Math.toDegrees(cartographic.longitude),
        lat: Cesium.Math.toDegrees(cartographic.latitude),
        alt: cartographic.height
      };
    }
  }
  /**
   * 坐标数组转换 笛卡尔转86
   * @param {Array} cartesianArr 三维位置坐标数组
   * @return {Array} {lng,lat,alt} 地理坐标数组
   */
  transformCartesianArrayToWGS84Array(cartesianArr) {
    return cartesianArr
      ? cartesianArr.map(item => {
          return this.transformCartesianToWGS84(item);
        })
      : [];
  }
  /**
   * 84坐标转弧度坐标
   * @param {Object} position wgs84
   * @return {Object} Cartographic 弧度坐标
   */
  transformWGS84ToCartographic(position) {
    return position
      ? Cesium.Cartographic.fromDegrees(
          position.lng || position.lon,
          position.lat,
          position.alt
        )
      : Cesium.Cartographic.ZERO;
  }
  /**
   * 获取84坐标的距离
   * @param {*} positions
   */
  getPositionDistance(positions) {
    let distance = 0;
    for (let i = 0; i < positions.length - 1; i++) {
      let point1cartographic = this.transformWGS84ToCartographic(positions[i]);
      let point2cartographic = this.transformWGS84ToCartographic(
        positions[i + 1]
      );
      let geodesic = new Cesium.EllipsoidGeodesic();
      geodesic.setEndPoints(point1cartographic, point2cartographic);
      let s = geodesic.surfaceDistance;
      s = Math.sqrt(
        Math.pow(s, 2) +
          Math.pow(point2cartographic.height - point1cartographic.height, 2)
      );
      distance = distance + s;
    }
    return distance.toFixed(3);
  }
  /**
   * 计算一组坐标组成多边形的面积
   * @param {*} positions
   */
  getPositionsArea(positions) {
    let result = 0;
    if (positions) {
      let h = 0;
      let ellipsoid = Cesium.Ellipsoid.WGS84;
      positions.push(positions[0]);
      for (let i = 1; i < positions.length; i++) {
        let oel = ellipsoid.cartographicToCartesian(
          this.transformWGS84ToCartographic(positions[i - 1])
        );
        let el = ellipsoid.cartographicToCartesian(
          this.transformWGS84ToCartographic(positions[i])
        );
        h += oel.x * el.y - el.x * oel.y;
      }
      result = Math.abs(h).toFixed(2);
    }
    return result;
  }

  // 高度
  _getHeading(startPosition, endPosition) {
    if (!startPosition && !endPosition) return 0;
    if (Cesium.Cartesian3.equals(startPosition, endPosition)) return 0;
    let cartographic = Cesium.Cartographic.fromCartesian(startPosition);
    let cartographic2 = Cesium.Cartographic.fromCartesian(endPosition);
    return (cartographic2.height - cartographic.height).toFixed(2);
  }

  // 偏移点
  _computesHorizontalLine(positions) {
    let cartographic = Cesium.Cartographic.fromCartesian(positions[0]);
    let cartographic2 = Cesium.Cartographic.fromCartesian(positions[1]);
    return Cesium.Cartesian3.fromDegrees(
      Cesium.Math.toDegrees(cartographic.longitude),
      Cesium.Math.toDegrees(cartographic.latitude),
      cartographic2.height
    );
  }

  _computesMidPoint(left, right) {
    let midPointCartesian = new Cesium.Cartesian3();
    Cesium.Cartesian3.midpoint(left, right, midPointCartesian);
    return midPointCartesian;
  }
}

export default Measure;
