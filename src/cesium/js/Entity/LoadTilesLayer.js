/**
 * @Description:
 * @author 杜晓辉
 * @date 2021/4/8 15:02:38
 */

// import * as Cesium from 'cesium/Build/Cesium/Cesium'
import * as Cesium from 'cesium/Cesium'
export default  class TilesLayerManager {
    constructor(viewer){
        this.viewer = viewer;
    }

    /**
     * 不进行位置变换的三维模型数据加载方法
     * @param result
     * @constructor
     */
    AddTilesLayer(result){
        if(result != null && result.length>0 ){
            for (let i = 0;i<result.length;i++){  //viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                let tileset = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                    url : result[i].url,
                    maximumMemoryUsage:81920,//tileet可以使用的最大内存量（以MB为单位）。
                    preloadFlightDestinations:true,
                    skipLevelOfDetail : true,
                    baseScreenSpaceError : 64,
                    skipScreenSpaceErrorFactor : 16,
                    skipLevels : 1,
                    immediatelyLoadDesiredLevelOfDetail : false,
                    loadSiblings : false,
                    cullWithChildrenBounds : true
                    // maximumScreenSpaceError:32,//用于驱动细节细化程度的最大屏幕空间错误。
                    // dynamicScreenSpaceError : true,
                    // dynamicScreenSpaceErrorDensity : 0.00278,
                    // dynamicScreenSpaceErrorFactor : 4.0,
                    // dynamicScreenSpaceErrorHeightFalloff : 0.25
                }));
                // tileset.readyPromise.then(function () {
                //     var boundingSphere = tileset.boundingSphere;
                //     this.viewer.camera.flyToBoundingSphere(boundingSphere);
                //     console.log(tileset._root);
                // }).otherwise(function (error) {
                //     throw (error);
                // });
            }
        }
    };

    AddTransFromTiles(result){
        if(result != null && result.length>0 ){
            for (let i = 0;i<result.length;i++){
                this.MoveTilesLoad(result[i])
                }
            }

    };
    MoveTilesLoad(resul){
        if(resul == null){
            return ;
        }
        let  tileset = new Cesium.Cesium3DTileset({
            url: resul.url,
            maximumMemoryUsage:81920,//tileet可以使用的最大内存量（以MB为单位）。
            preloadFlightDestinations:true,
            skipLevelOfDetail : true,
            baseScreenSpaceError : 4,
            skipScreenSpaceErrorFactor : 1,
            skipLevels : 0,
            immediatelyLoadDesiredLevelOfDetail : false,
            loadSiblings : false,
            cullWithChildrenBounds : true
        });
        let  params = {
            tx:resul.tx,
            ty:resul.ty,
            tz:resul.tz,
            rx:0,
            ry:0,
            rz:0,
        };

        this.viewer.scene.primitives.add(tileset);

        tileset.readyPromise.then(function () {
            update3dtilesMaxtrix(tileset);
        });
        //平移、贴地、旋转模型
        function update3dtilesMaxtrix(tileset) {
            //旋转
            var mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(params.rx));
            var my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(params.ry));
            var mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(params.rz));
            var rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
            var rotationY = Cesium.Matrix4.fromRotationTranslation(my);
            var rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
            //平移
            var position = Cesium.Cartesian3.fromDegrees(params.tx, params.ty, params.tz);
            var m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
            //旋转、平移矩阵相乘
            Cesium.Matrix4.multiply(m, rotationX, m);
            Cesium.Matrix4.multiply(m, rotationY, m);
            Cesium.Matrix4.multiply(m, rotationZ, m);
            //赋值给tileset
            tileset._root.transform = m;
        }

        //示例参数，根据实际情况设置（可定制UI实现动态调整，直到满意为止）
        // var  params = {
        //     tx: 106.5330505371,  //模型中心X轴坐标（经度，单位：十进制度）120.474028,32.010502
        //     ty: 29.4914218783,    //模型中心Y轴坐标（纬度，单位：十进制度）
        //     tz: 12,    //模型中心Z轴坐标（高程，单位：米）
        //     rx: 0,    //X轴（经度）方向旋转角度（单位：度）
        //     ry: 0,    //Y轴（纬度）方向旋转角度（单位：度）
        //     rz: 0,     //Z轴（高程）方向旋转角度（单位：度）
        // };
        //平移、贴地、旋转模型
        //this.viewer.zoomTo(tileset);
        return tileset;
    }
}
