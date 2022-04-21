/*
 * @Descripttion: 
 * @version: 1.0.1
 * @Author: 杜晓辉
 * @Date: 2021-06-18 10:57:52
 * @LastEditors: 杜晓辉
 * @LastEditTime: 2021-06-18 11:15:56
 */
import * as Cesium from 'cesium/Cesium'
import {Cartesian3toCartographic,getTerrainPositionsheight} from "../Utilities/UtilitiesFunction"

export default  class  LoadJsonManager{
    constructor(viewer){
        this.viewer = viewer;
    }
    AddJsonLayer(res){
        let colorse = this.color2Rgb(res.style);
        let R = colorse[0]/255;
        let G = colorse[1]/255;
        let B = colorse[2]/255;
        var linecolor = new Cesium.Color(R, G, B, 0.9); // 线颜色
        //var linecolor = new Cesium.Color(255/255, 140/255, 0/255, 0.9); // 线颜色
        var outline = new Cesium.Color(65/255, 105/255, 225/255, 1); // 线框颜色

        var dataSource =  Cesium.GeoJsonDataSource.load(res.url,{
                clampToGround:true
            }
        );
        dataSource.then(function load(dataSource) {
            window.Scene.viewer.dataSources.add(dataSource);
            dataSource.name = res.serviceName;
            if(dataSource){
                if(dataSource.name ==="神农架区域边界"){
                    window.Scene.JsonWorlddataSource = dataSource;
                }else {
                    window.Scene.JsonCHNdataSource = dataSource;
                }
            }
            var entities = dataSource.entities.values;
            for (var o = 0; o < entities.length; o++) {
                var r = entities[o];
                r.nameID = o;   //给每条线添加一个编号，方便之后对线修改样式
                if(r.polyline){
                    //r.polyline.width = 6;  //添加默认样式
                    // r.polyline.width = 4;
                    r.polyline.width = res.width;
                    (r.polyline.material = new Cesium.PolylineOutlineMaterialProperty({
                        color: linecolor,
                        outlineWidth: 0.2,
                        //outlineColor: linecolor,
                        outlineColor: Cesium.Color.DODGERBLUE.withAlpha(0.9)
                    }),10)
                }else if(r._position){
                    let Cartographic =  Cartesian3toCartographic(window.Scene.viewer,r._position._value);
                    let Cartographics =  new Cesium.Cartographic.fromDegrees(110.13814928601926, 31.570772677194167);
                    let terrainPosition = window.Scene.viewer.scene.sampleHeight(Cartographic);
                    let terrainData = window.Scene.viewer.terrainProvider;
                    var positions = [
                        Cesium.Cartographic.fromDegrees(Cartographic.longitude, Cartographic.latitude)    //输入经纬度
                    ];
                    var promise = Cesium.sampleTerrain(terrainData,18,positions);
                    Cesium.when(promise, function (updatedPositions) {
                        var terrainHeight = updatedPositions[0].height;
                        r._position._value = Cesium.Cartesian3.fromDegrees(Cartographic.longitude, Cartographic.latitude, terrainHeight);
                    });  

                    //r._position._value = Cesium.Cartesian3.fromDegrees(Cartographic.longitude, Cartographic.latitude, terrainPosition);
                    //r._position._value =  Cesium.Cartesian3.fromDegrees(cartographic.longitude, cartographic.latitude, cartographic.height),
                    r.label =  {
                        text: r.properties.name,
                            //font: '14px SimHei ',
                            font: '14px Helvetica',
                            //Width:2,
                            //fillColor: Cesium.Color.SKYBLUE, new Cesium.Color(255 / 255, 213 / 255, 65 / 255, 0.2);
                            fillColor: new Cesium.Color(0 / 255, 255 / 255, 255 / 255),
                            outlineColor: Cesium.Color.BLACK,
                            outlineWidth: 2,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            //translucencyByDistance: new Cesium.NearFarScalar(200, 1, 500, 0),
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            scaleByDistance: new Cesium.NearFarScalar(2000, 1.2, 8000, 0),
                            pixelOffset: new Cesium.Cartesian2(0, -50),  //偏移量
                        //distanceDisplayCondition : new Cesium.DistanceDisplayCondition(0, 5000),
                    }
                    r.billboard = {
                        image: require("../../assets/icon-管护中心.png"),
                        //image: "../../../assets/imgs/icon-red.png",
                        scale: 0.8,
                        scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.5),
                        //scaleByDistance: new Cesium.NearFarScalar(8000, 1, 10000, 0),
                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 1.8e9),
                        clampToGround: true,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    };
                    // r.point = new Cesium.PointGraphics({
                    //     color: linecolor,
                    //     pixelSize: 6,
                    //     outlineWidth:1.5,
                    //     outlineColor:Cesium.Color.GOLD,
                    //     heightReference:Cesium.HeightReference.none,
                    // });
                    if (Cesium.defined(r.position)) {
                        // 给每个实体不同的配色，每个实体对应一个建筑物，每个建筑物则对应一种颜色，根据建筑物高度不同，设置不同显示颜色
                        r.name = r.properties.name;
                    }
                }

            }
        });
    };

    /**
 * 十六进制颜色转为RGB
 * @param sColor
 * @returns {string}
 */
 color2Rgb(sColor) {
    sColor = sColor.toLowerCase();
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i=1; i<7; i+=2) {
            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));
        }
        //return "RGB(" + sColorChange.join(",") + ")";
        return sColorChange;
    }
    //return sColor;
}

}

