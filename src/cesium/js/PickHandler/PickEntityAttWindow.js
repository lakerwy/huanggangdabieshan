/**
 * @Description:实现三维视图选择高亮、定位、实体视图窗口属性展示
 * @author 杜晓辉
 * @date 2021/6/21 21:26:02
 */
import * as Cesium from 'cesium/Cesium'

/**
 * 
 */
export default class PickEntityManager {
  constructor(viewer) {
    this.viewer = viewer;
    this.scene = viewer.scene;
    this.camera = viewer.camera;
    this.handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas);
    this.pick = null;
    this.cartesian = null;
  }

  /**
   * 
   * @param callbackhandle
   * @param callback
   * @constructor
   */
  PickOpenAtt(callbackhandle, callback) {
    this.handler.setInputAction((movement) => {
      let ray = this.camera.getPickRay(movement.position);
      this.cartesian = this.scene.globe.pick(ray, this.scene);
      this.pick = this.scene.pick(movement.position);
    
      console.log("拾取的要素！！");
      console.log(this.pick);
      callbackhandle(this.pick);
      if (this.pick && this.pick.id) {
        this.viewer.scene.postRender.addEventListener(() => {
          if (this.cartesian) {
            let curpx_position = this.updataPopupPosition(this.cartesian);
            callback(curpx_position);
          }
        })
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  /**
   *
   * @param cartesian
   */
  updataPopupPosition(cartesian) {
    if (!cartesian) return;
    let px_position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, cartesian);
    // let  res = false;
    // let  e  = cartesian;
    // let  i = this.viewer.camera.position;
    // let  n = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(i).height;
    // if (!(n += 1 * viewer.scene.globe.ellipsoid.maximumRadius, Cesium.Cartesian3.distance(i, e) > n)) {
    //     res = true;
    // }
    // if(res){
    //
    // }
    return px_position;
  }
}