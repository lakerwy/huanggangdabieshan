
/**
 * @author 杜晓辉 <jiax@creatar.com>
 * @class
 * @classdesc 绘制图形的类
 * @callback endDrawingCallback
 * @param {Object} viewer Cesium.Viewer
 * @param {endDrawingCallback} callback 结束绘制后的回调函数
 */
// import * as Cesium from 'cesium/Build/Cesium/Cesium'
import * as Cesium from 'cesium/Cesium'
export default class DrawGraph {
  constructor(viewer) {
    if (Cesium.defined(viewer)) {
      this._viewer = viewer;
      this._handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
      if (this._viewer.entities.getById('OperationTips') == undefined) {
        this.label = this._viewer.entities.add({
          id: 'OperationTips',
          label: {
            font: '10px sans-serif',
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            showBackground: true,
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT
          }
        })
      } else {
        this.label = this._viewer.entities.getById('OperationTips')
      }
    }
  }
  destroyHandeler() {
    this._handler.destroy()
  }
  drawMark(callback, obj = {
    billboard: {},
    label: {}
  }) {
    this.destroyHandeler()
    //绘制标注;
    let that = this;
    this._handler = new Cesium.ScreenSpaceEventHandler(this._viewer.canvas)
    let billboard = {
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4wEJATEo7kZgyQAABYNJREFUWMO9l1tsHFcZx3/nzG1nd72+rR2aNLRpQl1UhIqStgiKBDSlJKVFaUVExQMvSKEWVWmj2g9cGh6QeOMFAZUKD/DENY1iESGoKkV1UTCoIU2gDUqTteNb7Hi9u7M7O+fMnMMDa8mgBGzW5ZM+aXRmNP/f/D6NdI5gXY1VFAACwBi0zoiaCVFT0W5rCvmA6mqTiYO72KoSa8H9rqCeWeaU9csu94jMfECptNhqaR21kko71meSRF+PY40AXj1815YAuAAFCVFqyBB3joRyvM/hkC9kf6wlKw7MZ5laStIzxtjvXK82Tg31l+z+n/+d3x9+X/cAoxcaRKnBIN5/SyB+MpKT+24LBABzSrAgPTxj/EylH2s1k7sH+4pfzWT6U4y3JQaklIKFehLmsd+41Rf79uQEA57AEyCEwHEkviPpCRxyrhyQQn47R+5DnuPy+Mm57gGyNCMU9v4A+2hBgrawkloWUqhnEGcWZSzGWlwJUoidruM8OXXpLxhrux8BmSFLzT0mTYv11OWqsGRAI7M0UktdZUQqI1YZaWqQQuA77kcPfPCBojYm6hrAERDH6vbIl1z3NK3AwSJpZ5aWTqm3NLWWohFrYm1whEvOc7f5jtMrpewe4NpKE61NVHXAE5Zc4oIQqMwSq4yorWk0FbWWJssg9D18x207jqOtMd2PoFZvYy0XbZZZkxoR+A5CCFIDbZ3RamuasUapjJwbUPB9Atd9R+GuCpF1D5C0NcBkqtNLKkn3rAEYCzrNUNpgDRT9gOFCiOsGxuIe7xFGJbb7X1FKKwmD8JK0zneVRtejlFqkiJoKlRhcHMr5kDv6i+ws5Qldb6JtxInESjKzBQaQgLGEfvBjC0NS8Jy1lIQAKSQ5z2W4kKMv9Ew7E6fizD5XdFlRBn70yWLXAALg4PEruNKhEOQda9P9jpRf9KS8z5Fy0MMQNhb72pULFRGEn/b6tr0VvvdulhPLS58obA0AwBMT81jAk4JiWHIl2XbheMO52XP5kfqbP5ytXN7t+94hIZ3fFAeGOPqVI12HA8i1i1995hbyfo7Qz5PoJM2MnUbFf/ra5+89fdv24ck7du/2pes//MI3vw462ZLwfzFwo/rWsWPs3bsXpfRjjuv+8q9/e+tSodjzkLX26jNPj26tgRvVC8eOMT09zbVrC38olUrnw3x+JG617tda873vv/juAwAsLS1x5MtPLVljXhsc6BeJUp86/OQXRJJszRj+K0A+n2diYoJGo3FyqFxu+5770K9/8bNdruv+fwCeHxvj6swMs7NXp/r7+88We4q74jj+sEoSfvDiS+8+AEDl8mWeGh1dTbU6PTw0hNbq4J47R9xarfbvj4p1vXUAA+UyEydPUq1WJ96zbTgKguDjVy6/s6enVFoLdYEAyHU66LQHOP8JaEMAY+PjzMzMcPHtt98olXr/3NfbuyNutT4yeuRLAHmgD+gHSkAPUOishx0g/2ZZGwIAOHHiZZ49ejRqNaNXyuVBMpM9+thnD5U6oX1AcV3oWvCaDfdmFjYM8OCD+3n5+HGWl5dPlQcHV3JB8MDefffeBWjArhuDu067BdJO33D3smGAsfFx5mZnefPcufNB4E8Vi8Wy6zj3AVVgtRMigDZQ73QDaAKqA/O/AwA8/MgBnvjc4fb15eXfhbmAZrP5yNPPPBt2bntAAtQ63ezAZDcLp6Nqw7Vz+61MVypEUaOey4WPz83P375arU6ePfuG7uhf7nz1hjeLmzLw/PgYlcoVJicnL7aazTNY21ev1w8AvUDUCd/UNmlTBgAmX3+dxYVFs7i4MKiVPriystJTrVZ/22xGl4F4s+/blAH453Htj1NTnL9w4fTc/Nwrtdrq4o4dO3THwKaPSv8AcBiCCOdyOGgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDEtMDlUMDE6NDk6NDArMDg6MDAOLzRRAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAxLTA5VDAxOjQ5OjQwKzA4OjAwf3KM7QAAAEN0RVh0c29mdHdhcmUAL3Vzci9sb2NhbC9pbWFnZW1hZ2ljay9zaGFyZS9kb2MvSW1hZ2VNYWdpY2stNy8vaW5kZXguaHRtbL21eQoAAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADI1NunDRBkAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMjU2ejIURAAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNTQ2OTY5NzgwxMkPCQAAABJ0RVh0VGh1bWI6OlNpemUAMTc1NDlCnxbtjgAAAGJ0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvd3d3cm9vdC9uZXdzaXRlL3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9maWxlcy8xMDYvMTA2MTIxNy5wbmcfrrn+AAAAAElFTkSuQmCC',
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    }
    let label = {
      text: '标注',
      font: '20px sans-serif',
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      fillColor: new Cesium.Color(1, 1, 1, 1),
      pixelOffset: new Cesium.Cartesian2(0, -40)
    }
    billboard = Object.assign(billboard, obj.billboard)
    label = Object.assign(label, obj.label)
    this._handler.setInputAction(function (event) {
      let pick = new Cesium.Cartesian2(event.position.x, event.position.y);
      let cartesian = that._viewer.scene.globe.pick(that._viewer.camera.getPickRay(pick), that._viewer.scene);

      // let pick = new Cesium.Cartesian2(event.position.x, event.position.y);
      // let cartesian = that._viewer.scene.globe.pick(that._viewer.camera.getPickRay(pick), that._viewer.scene);

      // console.log(cartesian)
      //添加实体
      let markEntity = that._viewer.entities.add({
        position: cartesian,
        billboard,
        label
      });
      that.destroyHandeler(); //停止绘制
      that.label.label.text = undefined
      that.label.position = undefined
      if (typeof callback == 'function') {
        callback({
          id: markEntity.id,
          position: event.position
        })
      } else {
        console.log('参数的类型不是function')
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    this.label.label.text = '鼠标左键绘制完结束'
    this._handler.setInputAction(function (event) {
      //坐标转换
      let pick1 = new Cesium.Cartesian2(event.endPosition.x, event.endPosition.y);
      let cartesian = that._viewer.scene.globe.pick(that._viewer.camera.getPickRay(pick1), that._viewer.scene);
      that.label.position = cartesian
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
  drawPolyline(callback, obj = {}) {
    this.destroyHandeler()
    //绘制折线
    this._handler = new Cesium.ScreenSpaceEventHandler(this._viewer.canvas)
    let that = this;
    let positions = [];
    let options = {
      polyline: {
        positions: positions,
        material: new Cesium.Color(1, 0, 0, 1),
        width: 3
      }
    }
    options.polyline = Object.assign(options.polyline, obj)
    let polylineEntity = this._viewer.entities.add(options);
    this.label.label.text = '鼠标左键点击绘制，鼠标右键结束。'
    //鼠标事件
    this._handler.setInputAction(function (event) {
      //坐标转换
      let pick = new Cesium.Cartesian2(event.position.x, event.position.y);
      let cartesian = that._viewer.scene.globe.pick(that._viewer.camera.getPickRay(pick), that._viewer.scene);
      // let cartesian = that._viewer.scene.camera.pickEllipsoid(event.position, that._viewer.scene.globe.ellipsoid);
      positions.push(cartesian)
      //增加坐标点直接赋值会有明显的卡顿所以用Cesium.CallbackProperty
      polylineEntity.polyline.positions = new Cesium.CallbackProperty(function () {
        return positions
      }, false)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    this._handler.setInputAction(function (event) {
      //坐标转换
      let pick = new Cesium.Cartesian2(event.endPosition.x, event.endPosition.y);
      let cartesian = that._viewer.scene.globe.pick(that._viewer.camera.getPickRay(pick), that._viewer.scene);

      // let cartesian = that._viewer.scene.camera.pickEllipsoid(event.endPosition, that._viewer.scene.globe.ellipsoid);
      positions.pop(); //删除鼠标移动的上一个位置坐标
      positions.push(cartesian)
      //直接赋值会有明显的卡顿所以用Cesium.CallbackProperty
      polylineEntity.polyline.positions = new Cesium.CallbackProperty(function () {
        return positions
      }, false)
      that.label.position = cartesian
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    this._handler.setInputAction(function (event) {
      polylineEntity.polyline.positions = positions
      that.destroyHandeler();
      that.label.label.text = undefined
      that.label.position = undefined
      if (typeof callback == 'function') {
        callback({
          id: polylineEntity.id,
          position: event.position,
          cartesian: positions
        })
      } else {
        console.log('参数的类型不是function')
      }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }
  drawPolygon(callback, obj = {}) {
    this.destroyHandeler()
    //绘制多边形
    this._handler = new Cesium.ScreenSpaceEventHandler(this._viewer.canvas)
    let that = this;
    let positions = [];
    let options = {
      polygon: {
        hierarchy: positions,
        material: new Cesium.Color(0, 0, 1, 0.5),
        heightReference: Cesium.HeightReference.NONE,
        height: 0
      }
    };
    options.polygon = Object.assign(options.polygon, obj)
    let polygonEntity = this._viewer.entities.add(options)
    this.label.label.text = '鼠标左键点击绘制，鼠标右键结束。'
    //鼠标事件
    this._handler.setInputAction(function (event) {
      let pick = new Cesium.Cartesian2(event.position.x, event.position.y);
      let cartesian = that._viewer.scene.globe.pick(that._viewer.camera.getPickRay(pick), that._viewer.scene);
      positions.push(cartesian)
      //增加坐标点直接赋值会有明显的卡顿所以用Cesium.CallbackProperty
      polygonEntity.polygon.hierarchy = new Cesium.CallbackProperty(function () {
        return new Cesium.PolygonHierarchy(positions) //直接返回positions会报错
      }, false)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this._handler.setInputAction(function (event) {
      //坐标转换
      let pick = new Cesium.Cartesian2(event.endPosition.x, event.endPosition.y);
      let cartesian = that._viewer.scene.globe.pick(that._viewer.camera.getPickRay(pick), that._viewer.scene);

      positions.pop(); //删除鼠标移动的上一个位置坐标
      positions.push(cartesian)
      //直接赋值会有明显的卡顿所以用Cesium.CallbackProperty
      polygonEntity.polygon.hierarchy = new Cesium.CallbackProperty(function () {
        return new Cesium.PolygonHierarchy(positions) //直接返回positions会报错
      }, false)
      that.label.position = cartesian
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    this._handler.setInputAction(function (event) {
      that.destroyHandeler();
      that.label.label.text = undefined
      that.label.position = undefined
      polygonEntity.polygon.hierarchy = new Cesium.PolygonHierarchy(positions)
      if (typeof callback == 'function') {
        callback({
          id: polygonEntity.id,
          position: event.position,
          cartesian: positions
        })
      } else {
        console.log('参数的类型不是function')
      }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }
  addModel(callback, obj = {}) {
    this.destroyHandeler()
    let that = this;
    this._handler = new Cesium.ScreenSpaceEventHandler(this._viewer.canvas)
    let options = {
      id: Cesium.createGuid(),
      show: true,
      scale: 200,
      minimumPixelSize: 1,
      clampAnimations: true,
    }
    options = Object.assign(options, obj)
    this._handler.setInputAction(function (event) {

      let pick = new Cesium.Cartesian2(event.position.x, event.position.y);
      let origin = that._viewer.scene.globe.pick(that._viewer.camera.getPickRay(pick), that._viewer.scene);

      let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(origin); //创建一个以鼠标左键点击的位置的经纬度为原点的东北上局部坐标系——4*4矩阵
      options.modelMatrix = modelMatrix
      let model = that._viewer.scene.primitives.add(Cesium.Model.fromGltf(options)); //将GLTF模型加载上
      if (typeof callback == 'function') {
        callback({
          id: model.id,
          position: event.position
        }) //回调返回id
      } else {
        console.log('参数的类型不是function')
      }
      that.destroyHandeler(); //停止绘制
      that.label.label.text = undefined
      that.label.position = undefined
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    this.label.label.text = '鼠标左键绘制完结束'
    this._handler.setInputAction(function (event) {
      //坐标转换
      let pick = new Cesium.Cartesian2(event.endPosition.x, event.endPosition.y);
      let cartesian = that._viewer.scene.globe.pick(that._viewer.camera.getPickRay(pick), that._viewer.scene);
      that.label.position = cartesian
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
}
