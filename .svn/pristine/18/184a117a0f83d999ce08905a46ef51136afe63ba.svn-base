/**
 * @Description:
 * @author 杜晓辉
 * @date 2021/8/13 16:29:01
 */
import * as Cesium from 'cesium/Cesium'

export  default  class DrawHandleEarth {
    constructor(viewer,type) {
        this.viewer =  viewer;
        this.type = type;
        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    }
    drawPoint( callback){
        if(this.viewer !==null  && this.type ==="Point"){
            this.handler.setInputAction(function position(event) {
                let cartesian = this.viewer.scene.pickPosition(movement.position);
                if(cartesian){
                    callback(cartesian);
                }
            })
        }
    }
    drawLine(viewer,type,callback){
        let that = this;
        if(this.type !=="LineString"){
            return;
        }
        //取消双击时间，追踪位置
        this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        let positions = [];
        let poly = null;
        let distance = 0;
        let cartesian = null;
        this.handler.setInputAction((movement)=>{
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



}