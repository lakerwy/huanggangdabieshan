/*
 * @Descripttion: 
 * @version: 1.0.1
 * @Author: 杜晓辉
 * @Date: 2021-06-09 14:53:22
 * @LastEditors: 杜晓辉
 * @LastEditTime: 2021-06-18 11:17:28
 */
import {Cartesian3toCartographic} from "../Utilities/UtilitiesFunction"

import * as echarts from 'echarts';
//剖面分析
/******************************************* **
剖面分析直接调用Profile()即可，左键画线，右键停止
createProfileChart()方法绘制剖面图
** ****************************************** */
let   ProfileEntity = [];

export  function Profile(viewer) {
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
    var positions = [];
    var positionsCartographic = [];
    var positions_Inter = [];
    var poly = null;
    var distance = 0;
    var cartesian = null;
    var floatingPoint;
    var DistanceArray = [];
    let pmpoint = 0;
    var profileItem = [];


    //let $menuBox = $('#SideBar');
    //let outerW = $menuBox.outerWidth();
    let outerW = 0;
    handler.setInputAction(function (movement) {
        movement.endPosition.x = movement.endPosition.x - outerW;
        cartesian = viewer.scene.pickPosition(movement.endPosition);
        if (positions.length >= 2) {
            if (!Cesium.defined(poly)) {
                poly = new PolyLinePrimitive(positions);
            } else {
                positions.pop();
                positions.push(cartesian);
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction(function (movement) {
        movement.position.x = movement.position.x - outerW;
        cartesian = viewer.scene.pickPosition(movement.position);
        if (positions.length == 0) {
            positions.push(cartesian.clone());
        }
        positions.push(cartesian);
        pmpoint = pmpoint + 1;
        if (poly) {
            let views = Object.assign({},window.Scene.viewer.scene.globe.ellipsoid);
            let worker = new Worker("./worker/worker.js")
            worker.postMessage({point: poly.positions,
                viewer:views
            });
            worker.onmessage = function(event) {
                //主线程接收到工作线程的消息
                 console.log(event.data);
                 //关闭线程
                 worker.terminate();
            }

            //interPoints(poly.positions);
            distance = getSpaceDistance(positions_Inter);
 
        } else {
            distance = getSpaceDistance(positions);
        }
        var textDisance = distance + "米";
        DistanceArray.push(distance);
        floatingPoint = viewer.entities.add({
            position: positions[positions.length - 1],
            id:"position"+ pmpoint,
            // point: {
            //     pixelSize: 5,
            //     color: Cesium.Color.RED,
            //     outlineColor: Cesium.Color.WHITE,
            //     outlineWidth: 2,
            //     heightReference: Cesium.HeightReference.NONE
            // },
            label: {
                text: textDisance,
                font: '18px sans-serif',
                fillColor: Cesium.Color.GOLD,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 2,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(20, -20),
                heightReference: Cesium.HeightReference.NONE
            }
        });
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction(function (movement) {
        handler.destroy();//关闭事件句柄
        positions.pop();//最后一个点无效
        createProfileChart(profileItem);
        document.getElementById("profileChart").style.display = "block";
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    var PolyLinePrimitive = (function () {
        function _(positions) {
            this.options = {
                id:"drawpoumian_Line",
                polyline: {
                    show: true,
                    positions: [],
                    material: Cesium.Color.CHARTREUSE,
                    width: 2,
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
            viewer.entities.add(this.options);
            ProfileEntity.push(this.options);//floatingPoint
            ProfileEntity.push(floatingPoint);
        };
        return _;
    })();

    //空间两点距离计算函数
    function getSpaceDistance(positions) {
        profileItem = [
            {
                point: Cartesian3toCartographic(window.Scene.viewer,positions[0]),
                distance: 0
            }
        ];
        var distance = 0;
        for (var i = 0; i < positions.length - 1; i++) {

            var point1cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
            var point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1]);
            /**根据经纬度计算出距离**/
            var geodesic = new Cesium.EllipsoidGeodesic();
            geodesic.setEndPoints(point1cartographic, point2cartographic);
            var s = geodesic.surfaceDistance;
            //返回两点之间的距离
            s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
            distance = distance + s;
            var m_Item = {
                point: Cartesian3toCartographic(window.Scene.viewer,positions[i + 1]),
                distance: distance
            };
            profileItem.push(m_Item);
        }
        return distance.toFixed(2);
    }

    //线段插值点
    function interPoints(positions) {
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
        positions_Inter = [];
        for (var n = 0; n < terrainSamplePositions.length; n++) {
            //地理坐标（弧度）转经纬度坐标
            var m_cartographic = terrainSamplePositions[n];
            var height = viewer.scene.globe.getHeight(m_cartographic);
            var point = Cesium.Cartesian3.fromDegrees(m_cartographic.longitude / Math.PI * 180, m_cartographic.latitude / Math.PI * 180, height);
            positions_Inter.push(point);
        }
    }
};
//Echart绘制剖面图
/******************************************* **
调用分析结果createProfileChart()方法绘制剖面图
** ****************************************** */
function createProfileChart(Positions) {
    // console.log(Positions);
    var x_Range = parseInt(Positions[Positions.length - 1].distance);
    // console.log(x_Range);
    var ProfileData = [];
    var ProfileData_Lon = [];

    var y_Min = 10000000;
    for (let index = 0; index < Positions.length; index++) {
        const element = Positions[index];
        var m_distance = element.distance.toFixed(2);
        var m_Lon = element.point.longitude.toFixed(8);
        var m_Lat = element.point.latitude.toFixed(8);
        var m_height = element.point.height.toFixed(4);
        if (m_height < y_Min) {
            y_Min = m_height;
        }
        var m_data = [m_distance, m_height];
        ProfileData.push(m_data);
        ProfileData_Lon.push([m_Lon, m_Lat]);
    }
    // console.log(ProfileData);
    var lineChart = echarts.init(document.getElementById("profileChart"),"dark");
    // background: rgba(255, 255, 255, 1);
    var lineoption = {
        backgroundColor: '#0c2d55',
        title: {
            text: '剖面分析',
            x: 'center',
            y: '7px',
            textStyle: {
                color: '#68a9ff',
                fontSize:18,
                padding: [0, 8, 0, 8],
            },
        },
        color: ['#fcba62', '#69f0ff'],
        tooltip: {
            trigger: 'axis',
            formatter(params) {
                // console.log(params['data']);
                return "当前高度：" + params[0].data[1] +" m";
            }
        },
        toolbox: {
            feature: {
                 saveAsImage: {},
                myTool2: {
                    show: true,
                    title: '自定义扩展方法',
                    icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                    onclick: function (){
                        document.getElementById("profileChart").style.visibility = "hidden";
                        if(ProfileEntity != null && ProfileEntity.length>0){
                            for(let i= 0;i<ProfileEntity.length;i++){
                                //window.Scene.viewer.entities.remove(ProfileEntity[i]);
                                window.Scene.viewer.entities.removeById(ProfileEntity[i].id);
                            }

                        }
                        // alert('myToolHandler2')
                    }
                }
            }
        },
        legend: {
            x: 'left',
            top: '8%',
            left: '15%',
            textStyle: {
                color: '#68a9ff',
                fontSize: 16,
                padding: [0, 8, 0, 8],
            },
            data: ['剖面线']
        },
        grid: {
            top: '15%',
            left: '10%',
            right: '5%',
            bottom: '15%',
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisLine: {
                    lineStyle: {
                        color: '#425b78',
                    },
                },
                axisLabel: {
                    color: '#b9bec6',
                },
                splitLine: {
                    show: false,
                },
                boundaryGap: false,
                //data: ['2020-06-21', '2020-06-22', '2020-06-23', '2020-06-24', '2020-06-25', '2020-06-26', '2020-06-27'], //this.$moment(data.times).format("HH-mm") ,
            },
            {
                type: 'value',
                max: 'dataMax',
                scale: true
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '单位：m/m',
                nameTextStyle: {
                    color: '#b9bec6',
                    fontSize: 12,
                },
                axisLine: {
                    lineStyle: {
                        color: '#425b78',
                        fontSize: 14,
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#587485',
                    },
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#b9bec6',
                    },
                },
            },
            {
                type: 'value',
                min: y_Min,
                scale: true
            }
        ],
        series: [
            {
                name: '剖面线',
                type: 'line',
                data: ProfileData,
                markPoint: {
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: 'rgba(223,172,105,0.5)',
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(212,190,161,0)',
                                    },
                                ],
                                false
                            ),
                        },
                    },
                    data: [
                        { type: 'max', name: '最高点' },
                        { type: 'min', name: '最低点' }
                    ]
                }
            }
        ]
    };
    


    lineChart.setOption(lineoption);

    document.getElementById("profileChart").style.backgroundColor = 'rgba(255, 255, 255, 1)';
    document.getElementById("profileChart").style.visibility = 'visible';
    window.onresize = function(){
        lineChart.resize()
    };
}

