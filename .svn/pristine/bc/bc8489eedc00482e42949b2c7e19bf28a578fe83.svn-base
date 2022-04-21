/**
 * @Description:
 * @author 杜晓辉
 * @date 2021/6/26 14:43:59
 */

import * as turf from '@turf/turf'
export default class BufferAnalyse {
    constructor(viewer) {
        this.viewer =  viewer;
    }
    initPointBuffer(lng,lat,height) {
        //let point = [106.422638966289, 29.5698367125623];
        let point = [lng, lat,height];
        this.addPoint(point);
        // let pointF = turf.point(point);
        // let buffered = turf.buffer(pointF, 7000, { units: 'meters' });
        // let coordinates = buffered.geometry.coordinates;
        // let points = coordinates[0];
        // let degreesArray = this.pointsToDegreesArray(points);
        // this.addBufferPolyogn(Cesium.Cartesian3.fromDegreesArray(degreesArray));
    }
    //添加点
    addPoint(point) {
        this.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(point[0], point[1], height),
            point: {
                pixelSize: 3,
                clampToGround: true,
                color: Cesium.Color.CRIMSON,
                outlineWidth: 10,
                outlineColor: Cesium.Color.CRIMSON.withAlpha(0.8),
            },
            billboard:{
                image: require("../../assets/location4.png"),
                width: 35,
                height: 40,
                clampToGround: true,
                scale: 1,
                pixelOffset: new Cesium.Cartesian2(0, -20),
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.5),
                //scaleByDistance: new Cesium.NearFarScalar(8000, 1, 10000, 0),
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 1.8e9),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            }
        });
    }
    //初始化线缓冲
    initPolylineBuffer(positionArr) {
        let points = positionArr;
        let degreesArray = this.pointsToDegreesArray(points);
        this.addPolyline(Cesium.Cartesian3.fromDegreesArray(degreesArray));
        let polylineF = turf.lineString(points);
        let buffered = turf.buffer(polylineF, 30, { units: 'meters' });
        let coordinates = buffered.geometry.coordinates;
        points = coordinates[0];
        degreesArray = this.pointsToDegreesArray(points);
        this.addBufferPolyogn(Cesium.Cartesian3.fromDegreesArray(degreesArray));
    }
    //添加线
    addPolyline(positions) {
        this.viewer.entities.add({
            polyline: {
                positions: positions,
                width: 2,
                material: Cesium.Color.YELLOW,
            }
        })
    }

    //初始化面缓冲
    initPolygonBuffer() {
        let points = [
            [106.438549830166, 29.5701073244566],
            [106.440695597377, 29.5701073244566],
            [106.440738512722, 29.5688755679036],
            [106.438700033871, 29.5687262630581],
            [106.438034846035, 29.5690248725284],
            [106.438549830166, 29.5701073244566]
        ];

        let degreesArray = this.pointsToDegreesArray(points);
        this.addPolygon(Cesium.Cartesian3.fromDegreesArray(degreesArray));

        let polygonF = turf.polygon([points]);
        let buffered = turf.buffer(polygonF, 60, { units: 'meters' });
        let coordinates = buffered.geometry.coordinates;
        points = coordinates[0];
        degreesArray = this.pointsToDegreesArray(points);
        this.addBufferPolyogn(Cesium.Cartesian3.fromDegreesArray(degreesArray));
    }
    //添加面
    addPolygon(positions) {
        this.viewer.entities.add({
            polygon: {
                hierarchy: new Cesium.PolygonHierarchy(positions),
                material: Cesium.Color.YELLOW.withAlpha(0.6),
                classificationType: Cesium.ClassificationType.BOTH
            },
            polyline: {
                positions: positions,
                width: 2,
                material: Cesium.Color.YELLOW.withAlpha(0.4),
            }
        });
    }

    //添加缓冲面
    addBufferPolyogn(positions) {
        this.viewer.entities.add({
            polygon: {
                hierarchy: new Cesium.PolygonHierarchy(positions),
                material: Cesium.Color.RED.withAlpha(0.6),
                classificationType: Cesium.ClassificationType.BOTH
            },
        });
    }
    //格式转换
    pointsToDegreesArray(points) {
        let degreesArray = [];
        points.map(item => {
            degreesArray.push(item[0]);
            degreesArray.push(item[1]);
        });
        return degreesArray;
    }
}