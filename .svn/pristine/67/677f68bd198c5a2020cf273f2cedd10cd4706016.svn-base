/*
 * @Descripttion: 
 * @version: 1.0.1
 * @Author: 杜晓辉
 * @Date: 2021-08-10 10:57:55
 * @LastEditors: 杜晓辉
 * @LastEditTime: 2021-08-10 10:58:41
 */
import * as Cesium from 'cesium/Cesium'
import {getTerrainPositionsheight, Creatguid} from "../Utilities/UtilitiesFunction"

/**
 * 三维空间添加空间标注点位
 */
export default class AddXYZpointManager {
    constructor(viewer) {
        this.viewer = viewer;
        this.XYPointLayer = [];
    }
    AddXYZtoScene(lon, lat, height) {
        const result = {
            id:Creatguid(),
            name:"标注点位置",
            temptype : "targetEntity",
        }
        let  heit  = getTerrainPositionsheight(this.viewer,{lon,lat});
        let  img = require('../../assets/标注icon.png');
        this.AddPointEntity(this.viewer,result.id,result,result.name,lon,lat,heit,img,true);
    }
    AddPointEntity(viewer, id, result, name,  lon, lat, height=0, img, show) {
        if (!viewer) return;
        if (viewer.entities.getById(id)) {
            return;
        }
        //result.temptype = "targetEntity";
        var entity = viewer.entities.add({
            id: id,
            name: name,
            show: show,
            properties: result,
            position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            billboard: {
                image: img,
                scale: 1.2,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.5),
                //scaleByDistance: new Cesium.NearFarScalar(8000, 1, 10000, 0),
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 1.8e9),
                clampToGround: true,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            }
        })
        if(entity){
            this.XYPointLayer.push(entity);
        }
    }
}