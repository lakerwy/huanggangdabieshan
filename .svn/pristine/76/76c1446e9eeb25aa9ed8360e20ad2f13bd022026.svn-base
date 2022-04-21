/**
 * @Description:
 * @author 杜晓辉
 * @date 2021/3/25 11:41:05
 */
import * as Cesium from 'cesium/Cesium'
export   default  class DrawManageBase {
    constructor(param,flag) {
        this.viewer = param.viewer;
        this.typeLine = param.type;
        this.height = param.height;
        this._positions = [];
        //开启深度测试
        this.viewer.scene.globe.depthTestAgainstTerrain = true;
        if(window.Scene._handler){
            window.Scene._handler.destroy();
        };
        this.handlercl =window.Scene._handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        //this.PolyLinePrimitive();
    }
    drawLine(viewer,type,callback){
        let that = this;
        if(type !=="lineSpace"){
            return;
        }
        //取消双击时间，追踪位置
        this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        let positions = [];
        let poly = null;
        let distance = 0;
        let cartesian = null;
        this.handlercl.setInputAction((movement)=>{
            cartesian = this.viewer.scene.pickPosition(movement.endPosition);
            if(positions.length>=2){
                if (!Cesium.defined(poly)) {
                    poly = new PolyLinePrimitive(positions);
                }else {
                    positions.pop();
                    positions.push(cartesian);
                }
            }
        },Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        //鼠标左键初始化
        this.handlercl.setInputAction((movement)=>{
            cartesian = this.viewer.scene.pickPosition(movement.position);
            if (positions.length == 0) {
                positions.push(cartesian.clone());
            }
            positions.push(cartesian);
            //removeMeasureArr.push(floatingPoint);
        },Cesium.ScreenSpaceEventType.LEFT_CLICK);
        //鼠标右键初始化
        this.handlercl.setInputAction((movement)=>{
            //this._positions = this.TransFromDegrees(positions);
            this._positions = callback(positions,that.height);
            for(let i= 0;i<window.Scene._DrawLineetityArr.length;i++){
                window.Scene.viewer.entities.remove(window.Scene._DrawLineetityArr[i]);
            }
            this.handlercl.destroy();
        },Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

        return positions;
    }
    TransFromDegrees(positions){
        let i;
        let _positions = [];
        for(i= 0;i<positions.length;i++){
            var ellipsoid=window.Scene.viewer.scene.globe.ellipsoid;
            var cartesian3=new Cesium.Cartesian3(positions[i].x,positions[i].y,positions[i].z);
            var cartographic=ellipsoid.cartesianToCartographic(cartesian3);
            var lat=Cesium.Math.toDegrees(cartographic.latitude);
            var lng=Cesium.Math.toDegrees(cartographic.longitude);
            var alt=cartographic.height;
            let obj={
                x:lat,
                y:lng,
                z:alt,
            }
            _positions.push(obj);
        }
        return _positions;
    }

}


var PolyLinePrimitive = (function (viewer) {
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
        //window.Scene.viewer.entities.add(this.options)
        window.Scene._DrawLineetityArr.push(window.Scene.viewer.entities.add(this.options));
    };
    return _;
})();
