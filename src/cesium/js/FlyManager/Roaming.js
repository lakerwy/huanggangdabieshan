/*
 * @Descripttion: 
 * @version: 1.0.1
 * @Author: 杜晓辉
 * @Date: 2021-06-29 12:42:14
 * @LastEditors: 杜晓辉
 * @LastEditTime: 2021-08-10 18:32:11
 */
// import * as Cesium from 'cesium/Build/Cesium/Cesium'
import * as Cesium from 'cesium/Cesium'
export default class Roaming {
    /**
     * @author jiaxuan <jiax@creatar.com>
     * @param {*} viewer Cesium.Viewer
     * @param {Object} options {Lines:[经度,纬度,高度,...],time(总时间单位是秒s):Number,isSpline（是否插值）:Boolen}
     */
    constructor(viewer, options, callback) {
        if (viewer instanceof Cesium.Viewer) {
            this.viewer = viewer
        } else {
            console.log('viewer对象传入不正确')
        }
        this.isSpline = options.isSpline || false
        this.isLoop = options.isLoop || false
        this.Lines = this._format(options.Lines)
        this._cartesian3 = this._toCartesian3()
        this.time = Number(options.time)
        this.callback = callback
        this.pitch = -20
        this.height = 0
        this.roll = 0
        this._index = 1
        this._angle = 20
        this.endflag = false
        if (this.isSpline) {
            this._spline()
        }
        this._timeArray = this._computeTime()
        this._fly()
    }

    /**
     * @description 把[经度,纬度,高度,...]这种格式转化为[{longitude:115.546,latitude:48.165,height:100},....]
     * @param {Array} lines option.Lines
     * @returns {Array} [{longitude:115.546,latitude:48.165,height:100},....]这种格式的经纬度数组
     */
    _format(lines) {
        // 把经纬高格式化
        if (lines instanceof Array) {
            const positions = []
            if (lines.length % 3 === 0) {
                for (const i in lines) {
                    if (i % 3 === 0) {
                        positions.push({
                            longitude: lines[i],
                            latitude: lines[Number(i) + 1],
                            height: lines[Number(i) + 2]
                        })
                    }
                }
            } else if (lines.length % 2 === 0) {
                for (const i in lines) {
                    if (i % 2 === 0) {
                        positions.push({
                            longitude: lines[i],
                            latitude: lines[Number(i) + 1],
                            height: 0
                        })
                    }
                }
            }
            return positions
        } else {
            console('传入数组')
        }
    }

    /**
     * @description 转经纬度坐标为世界坐标
     * @returns {Array} 世界坐标数组
     */
    _toCartesian3() {
        const positions = []
        for (const i in this.Lines) {
            positions.push(Number(this.Lines[i].longitude))
            positions.push(Number(this.Lines[i].latitude))
            positions.push(Number(this.Lines[i].height))
        }
        return Cesium.Cartesian3.fromDegreesArrayHeights(positions)
    }

    /**
     * @description 计算出每段路需要的时间
     * @returns {Array} 每段需要时间的数组
     */
    _computeTime() {
        let TotalDistance = 0
        const distanceArray = []
        const incrementArray = []
        for (const i in this._cartesian3) {
            if (i > 0) {
                const distance = Cesium.Cartesian3.distance(this._cartesian3[i - 1], this._cartesian3[i])
                distanceArray.push(distance)
                TotalDistance = TotalDistance + distance
            }
        }
        if (isNaN(this.time)) {
            console.log('时间是已秒为单位的纯数字')
        } else {
            for (const i in distanceArray) {
                incrementArray.push(distanceArray[i] / TotalDistance * this.time)
            }
        }
        return incrementArray
    }

    _fly() {
        // 漫游
        const that = this
        this.endflag = false
        this._setExtentTime(this._timeArray[this._index - 1])
        this._heading = this._bearing(this.Lines[this._index - 1].latitude, this.Lines[this._index - 1].longitude, this.Lines[this._index].latitude, this.Lines[this._index].longitude)
        this._moveCamera = function () {
            const delTime = Cesium.JulianDate.secondsDifference(that.viewer.clock.currentTime, that.viewer.clock.startTime)
            const originLat = that.Lines[that._index - 1].latitude
            const originLng = that.Lines[that._index - 1].longitude
            const originAlt = that.Lines[that._index - 1].height
            const endPosition = Cesium.Cartesian3.fromDegrees(
                originLng + ((that.Lines[that._index].longitude - originLng) / that._timeArray[that._index - 1]) * delTime,
                originLat + ((that.Lines[that._index].latitude - originLat) / that._timeArray[that._index - 1]) * delTime,
                originAlt + ((that.Lines[that._index].height - originAlt) / that._timeArray[that._index - 1]) * delTime + that.height
            )
            // that.viewer.entities.add({
            //     position: endPosition,
            //     point: {
            //         pixelSize: 10,
            //         color: Cesium.Color.YELLOW
            //     }
            // })
            that.viewer.camera.setView({
                destination: endPosition,
                orientation: {
                    heading: Cesium.Math.toRadians(that._heading),
                    pitch: Cesium.Math.toRadians(that.pitch),
                    roll: Cesium.Math.toRadians(that.roll)
                }
            });
            if (Cesium.JulianDate.compare(that.viewer.clock.currentTime, that.viewer.clock.stopTime) >= 0) {
                that.viewer.clock.onTick.removeEventListener(that._moveCamera)
                if (that._index < that.Lines.length - 1) {
                    if (!that.isSpline) {
                        that._fixedPointSteering()
                    } else {
                        that._fly()
                        that._index = that._index + 1
                    }
                } else {
                    if (that.isLoop) {
                        that.again()
                    } else {
                        that.EndRoaming()
                    }

                    // this.callback()
                }
            }
        }
        this.viewer.clock.onTick.addEventListener(this._moveCamera)
    }

    _fixedPointSteering() {
        // 转向
        this._angle = 10
        const that = this
        const heading = this._bearing(this.Lines[this._index].latitude, this.Lines[this._index].longitude, this.Lines[this._index + 1].latitude, this.Lines[this._index + 1].longitude)
        let difference = heading - Cesium.Math.toDegrees(this.viewer.camera.heading)
        if (difference >= 180) {
            difference = -(360 - difference)
        } else if (difference <= -180) {
            difference = 360 - (-difference)
        }
        const turnTime = Math.abs(difference) / this._angle
        if (difference < 0) {
            this._angle = -10
        }
        this._setExtentTime(turnTime)
        this._initialHeading = this.viewer.camera.heading
        this._moveCamera = function () {
            const delTime = Cesium.JulianDate.secondsDifference(that.viewer.clock.currentTime, that.viewer.clock.startTime)
            const headingOnce = Cesium.Math.toRadians(delTime * that._angle) + that._initialHeading
            that.viewer.scene.camera.setView({
                destination: Cesium.Cartesian3.fromDegrees(that.Lines[that._index].longitude, that.Lines[that._index].latitude, Number(that.Lines[that._index].height) + that.height),
                orientation: {
                    heading: headingOnce,
                    pitch: Cesium.Math.toRadians(that.pitch),
                    roll: Cesium.Math.toRadians(that.roll)
                }
            })
            if (Cesium.JulianDate.compare(that.viewer.clock.currentTime, that.viewer.clock.stopTime) >= 0) {
                that.viewer.clock.onTick.removeEventListener(that._moveCamera)
                that._index = that._index + 1
                if (that._index <= that.Lines.length - 1) {
                    that._fly()
                }
            }
        }
        this.viewer.clock.onTick.addEventListener(this._moveCamera)
    }

    /**
     * @description 计算航向角
     * @param {Number} startLat 开始点的纬度
     * @param {Number} startLng 开始点的经度
     * @param {Number} destLat 结束点的纬度
     * @param {Number} destLng 结束点的经度
     * @returns {Number} 开始点到结束点的航向度数
     */
    _bearing(startLat, startLng, destLat, destLng) {
        startLat = Cesium.Math.toRadians(startLat)
        startLng = Cesium.Math.toRadians(startLng)
        destLat = Cesium.Math.toRadians(destLat)
        destLng = Cesium.Math.toRadians(destLng)

        const y = Math.sin(destLng - startLng) * Math.cos(destLat)
        const x = Math.cos(startLat) * Math.sin(destLat) - Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng)
        const brng = Math.atan2(y, x)
        const brngDgr = Cesium.Math.toDegrees(brng)

        return (brngDgr + 360) % 360
    }

    /**
     * @description 设置时钟
     * @param {Number} time 时间
     */
    _setExtentTime(time) {
        const startTime = Cesium.JulianDate.fromDate(new Date())
        const stopTime = Cesium.JulianDate.addSeconds(startTime, time, new Cesium.JulianDate())
        this.viewer.clock.startTime = startTime.clone() // 开始时间
        this.viewer.clock.stopTime = stopTime.clone() // 结速时间
        this.viewer.clock.currentTime = startTime.clone() // 当前时间
        this.viewer.clock.clockRange = Cesium.ClockRange.CLAMPED // 行为方式-达到终止时间后停止
        this.viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK // 时钟设置为当前系统时间; 忽略所有其他设置。
    }

    /**
     * @description 设置俯仰角
     * @param {Number} pitch 俯仰角
     */
    setPitch(pitch) {
        pitch = Number(pitch)
        if (isNaN(pitch)) {
            console.log('请输入数字')
        } else {
            this.pitch = pitch
        }
    }

    /**
     * @description 设置视角高
     * @param {Number} height 视角高
     */
    setHeight(height) {
        height = Number(height)
        if (isNaN(height)) {
            console.log('请输入数字')
        } else {
            this.height = height
        }
    }

    setRoll(roll) {
        roll = Number(roll)
        if (isNaN(roll)) {
            console.log('请输入数字')
        } else {
            this.roll = roll
        }
    }

    /**
     * @description 暂停继续
     * @param {Boolean} flag 暂停继续true继续false暂停
     */
    PauseOrContinue(flag) {
        flag = Boolean(flag)
        this.viewer.clock.shouldAnimate = flag
        if (flag) {
            this.viewer.clock.onTick.addEventListener(this._moveCamera)
        } else {
            this.viewer.clock.onTick.removeEventListener(this._moveCamera)
        }
    }

    EndRoaming() {
        // 退出漫游
        this.endflag = true
        this.viewer.clock.onTick.removeEventListener(this._moveCamera)
        this.callback()
    }

    again() {
        // 再次重新飞行
        this._index = 1
        this._fly()
    }

    _spline() {
        // 圆滑插值
        const times = []
        for (const i in this._cartesian3) {
            times.push(i / (this._cartesian3.length - 1))
        }
        const spline = new Cesium.CatmullRomSpline({
            times: times,
            points: this._cartesian3
        });
        const positions = [];
        for (let i = 0; i <= 1000; i++) {
            const cartesian3 = spline.evaluate(i / 1000);
            positions.push(cartesian3);
        }
        this._cartesian3 = positions
        const CatmullRomSplinePositions = []
        for (const i in positions) {
            const Cartographic = Cesium.Cartographic.fromCartesian(positions[i])
            const latitude = Cesium.Math.toDegrees(Cartographic.latitude)
            const longitude = Cesium.Math.toDegrees(Cartographic.longitude)
            const height = Cartographic.height
            CatmullRomSplinePositions.push(longitude)
            CatmullRomSplinePositions.push(latitude)
            CatmullRomSplinePositions.push(height)
        }
        this.Lines = this._format(CatmullRomSplinePositions)
    }
    getCartesian3() {
        return this._cartesian3
    }
}
