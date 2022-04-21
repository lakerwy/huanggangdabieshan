/**
 * @Description: 
 * @author 杜晓辉
 * @date 2021/8/17 15:15:44 
 */
import * as Cesium from 'cesium/Cesium'
export function RotateFlyBox(viewer) {

    // 相机看点的角度，如果大于0那么则是从地底往上看，所以要为负值，这里取-30度
    var pitch = Cesium.Math.toRadians(-30);
    // 给定飞行一周所需时间，比如10s, 那么每秒转动度数
    var angle = 360 / 10;
    // 给定相机距离点多少距离飞行，这里取值为5000m
    var distance = 5000;
    var startTime = Cesium.JulianDate.fromDate(new Date());

    var stopTime = Cesium.JulianDate.addSeconds(startTime, 10, new Cesium.JulianDate());

    viewer.clock.startTime = startTime.clone();  // 开始时间
    viewer.clock.stopTime = stopTime.clone();     // 结速时间
    viewer.clock.currentTime = startTime.clone(); // 当前时间
    viewer.clock.clockRange = Cesium.ClockRange.CLAMPED; // 行为方式
    viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK; // 时钟设置为当前系统时间; 忽略所有其他设置。
    // 相机的当前heading
    var initialHeading = viewer.camera.heading;
    var Exection = function TimeExecution() {
        // 当前已经过去的时间，单位s
        var delTime = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, viewer.clock.startTime);
        var heading = Cesium.Math.toRadians(delTime * angle) + initialHeading;
        viewer.scene.camera.setView({
            destination: position, // 点的坐标
            orientation: {
                heading: heading,
                pitch: pitch,

            }
        });
        viewer.scene.camera.moveBackward(distance);
        if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {
            viewer.clock.onTick.removeEventListener(Exection);
        }

    };

    viewer.clock.onTick.addEventListener(Exection);
}

export function addCameraFly(viewer) {
    const center = Cesium.Cartesian3.fromDegrees(110.38918175750614, 31.468682759788276,1800);
    let heading = Cesium.Math.toRadians(50.0);
    const pitch = Cesium.Math.toRadians(-20.0);
    const range = 3000.0;
    let x = 50;
    var self = this;
    viewer.scene.postRender.addEventListener(function () {
        x += 0.1;
        heading = Cesium.Math.toRadians(x);
        viewer.camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, range));
    })
}


export function flyRotate(viewer) {
    var options = {
        lng: 110.3889136,
        lat: 31.4691696,
        height: 1320.3085878134434,
        heading: 0.0,
        pitch: 0.0,
        roll: 0.0
    };
    var position = Cesium.Cartesian3.fromDegrees(options.lng, options.lat, options.height);
// 相机看点的角度，如果大于0那么则是从地底往上看，所以要为负值，这里取-30度
    var pitch = Cesium.Math.toRadians(-30);
    // 给定飞行一周所需时间，比如10s, 那么每秒转动度数
    var angle = 360 / 100;
    // 给定相机距离点多少距离飞行，这里取值为5000m
    var distance = 50;
    var startTime = Cesium.JulianDate.fromDate(new Date());

    // var stopTime = Cesium.JulianDate.addSeconds(startTime, 10, new Cesium.JulianDate());

    viewer.clock.startTime = startTime.clone();  // 开始时间
    // viewer.clock.stopTime = stopTime.clone();     // 结速时间
    viewer.clock.currentTime = startTime.clone(); // 当前时间
    viewer.clock.clockRange = Cesium.ClockRange.CLAMPED; // 行为方式
    viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK; // 时钟设置为当前系统时间; 忽略所有其他设置。
    // 相机的当前heading
    var initialHeading = viewer.camera.heading;
    var Exection = function TimeExecution() {
        // 当前已经过去的时间，单位s
        var delTime = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, viewer.clock.startTime);
        var heading = Cesium.Math.toRadians(delTime * angle) + initialHeading;
        viewer.scene.camera.setView({
            destination: position, // 点的坐标
            orientation: {
                heading: heading,
                pitch: pitch,

            }
        });
        viewer.scene.camera.moveBackward(distance);

        if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {
            viewer.clock.onTick.removeEventListener(Exection);
        }
    };
    window.Scene.Exections = Exection;

    viewer.clock.onTick.addEventListener(Exection);
}