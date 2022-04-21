/*
 * @Descripttion: 
 * @version: 1.0.1
 * @Author: 杜晓辉
 * @Date: 2021-08-05 17:22:53
 * @LastEditors: 杜晓辉
 * @LastEditTime: 2021-08-05 17:23:09
 */
// importScripts('foo.js', 'bar.js','ajax.js'); 
// onmessage = function(event){
//     console.log(" worker线程！！",event.data);
//     postMessage("OK");
// }
//线段插值点
onmessage=function(positions) {
    //let positions = poly.positions;
    console.log("线程传递的参数",positions);
    positionsCartographic = [];
    var terrainSamplePositions = [];
    for (let index = 0; index < positions.length - 1; index++) {
        const element = positions[index];
        var ellipsoid = viewer.scene.globe.ellipsoid;
        var cartographic = ellipsoid.cartesianToCartographic(element);
        positionsCartographic.push(cartographic);
    }
    for (let i = 0; i < positionsCartographic.length; i++) {
        const m_Cartographic0 = positionsCartographic[i];
        const m_Cartographic1 = positionsCartographic[i + 1];
        if (m_Cartographic1) {
            var a = Math.abs(m_Cartographic0.longitude - m_Cartographic1.longitude) * 10000000;
            var b = Math.abs(m_Cartographic0.latitude - m_Cartographic1.latitude) * 10000000;
            //等距采样
            if (a > b) b = a;
            var length = parseInt(b / 2);
            if (length > 1000) length = 1000;
            if (length < 2) length = 2;
            // var length = 4;//等分采样
            for (var j = 0; j < length; j++) {
                terrainSamplePositions.push(
                    new Cesium.Cartographic(
                        Cesium.Math.lerp(m_Cartographic0.longitude, m_Cartographic1.longitude, j / (length - 1)),
                        Cesium.Math.lerp(m_Cartographic0.latitude, m_Cartographic1.latitude, j / (length - 1))
                    )
                );
            }
            terrainSamplePositions.pop();
        } else {
            terrainSamplePositions.push(m_Cartographic0);
        }
    }
    let positions_Inter = [];
    for (var n = 0; n < terrainSamplePositions.length; n++) {
        //地理坐标（弧度）转经纬度坐标
        var m_cartographic = terrainSamplePositions[n];
        var height = viewer.scene.globe.getHeight(m_cartographic);
        var point = Cesium.Cartesian3.fromDegrees(m_cartographic.longitude / Math.PI * 180, m_cartographic.latitude / Math.PI * 180, height);
        positions_Inter.push(point);
    }
    postMessage(positions_Inter);
}
//错误信息
