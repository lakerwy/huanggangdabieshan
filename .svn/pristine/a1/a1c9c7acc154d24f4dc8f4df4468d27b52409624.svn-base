import camera from "@/assets/images/camera.png";
import cameraHover from "@/assets/images/camera-hover.png";
import recordIcon from "@/assets/images/icon_巡护事件.png";
import recordHoverIcon from "@/assets/images/icon_巡护事件_高亮.png";
import recordStartIcon from "@/assets/images/标记_2.png";
import recordEndIcon from "@/assets/images/标记_1.png";
import fireIcon from "@/assets/images/火苗icon.png";
import personIcon from "@/assets/images/person.png";
import personHoverIcon from "@/assets/images/person-active.png";
import waterIcon from "@/assets/images/icon-水.png";
import waterHoverIcon from "@/assets/images/icon-水-选中.png";
import gasIcon from "@/assets/images/icon-气.png";
import gasHoverIcon from "@/assets/images/icon-气-选中.png";
import townIcon from "../../../assets/images/town.png";
import townHoverIcon from "../../../assets/images/town-选中.png";

import {
  getFireHeatMapRequest,
  getCameraRequest,
  getPeopleHeatMapRequest,
  getPatrolRouteRequest,
  getPersonsRequest,
  getPatrolRecordRequest,
  getFireTownRequest
} from "@/api/thematic";

import { getWaterRealShow } from "@/api/home";

// 火灾热力图
export async function getFireHeat() {
  let result = await getFireHeatMapRequest();

  if (result.code !== 200) {
    return null;
  }

  let data = [];
  result.data.forEach(x => {
    if (x.lon && x.lat) {
      let obj = {
        ...x,
        geometryType: "Point",
        coordinates: [parseFloat(x.lon), parseFloat(x.lat)]
      };
      data.push(obj);
    }
  });

  let heatDataSource = {
    type: "1",
    data: data,
    geometryKey: "geometryType"
  };

  let range =
    window.global && window.global.fireRankRange
      ? window.global.fireRankRange
      : [0, 5];
  let heatMapOptions = {
    radius: 15,
    blur: 20,
    weight: feature => {
      let value = feature.get("fire_rank");
      let weight = (value - range[0]) / (range[1] - range[0]);
      if (weight > 1) {
        weight = 1;
      }
      if (weight < 0) {
        weight = 0;
      }
      return weight;
    }
  };
  return { data: heatDataSource, options: heatMapOptions };
}

// 摄像头
export async function getCamera() {
  let result = await getCameraRequest();

  if (result.code !== 200) {
    return null;
  }
  let data = [];
  result.data.forEach(x => {
    if (x.lon && x.lat) {
      let obj = {
        ...x,
        geometryType: "Point",
        coordinates: [parseFloat(x.lon), parseFloat(x.lat)],
        infoType: "camera"
      };
      data.push(obj);
    }
  });
  let dataSource = {
    data: {
      type: "1",
      data: data,
      geometryKey: "geometryType"
    },
    isCluster: false,
    style: {
      icon: {
        src: camera
      }
    },
    hoverStyle: {
      icon: {
        src: cameraHover
      }
    }
  };
  return { data: dataSource };
}

// 景区热力图
export async function getPeopleHeatMap() {
  let result = await getPeopleHeatMapRequest();

  if (result.code !== 200) {
    return null;
  }

  let data = [];
  result.data.forEach(x => {
    if (x.lon && x.lat) {
      let obj = {
        ...x,
        geometryType: "Point",
        coordinates: [parseFloat(x.lon), parseFloat(x.lat)]
      };
      data.push(obj);
    }
  });

  let heatDataSource = {
    type: "1",
    data: data,
    geometryKey: "geometryType"
  };

  let range =
    window.global && window.global.peopleRange
      ? window.global.peopleRange
      : [0, 1000];
  let heatMapOptions = {
    radius: 15,
    blur: 20,
    weight: feature => {
      let value = feature.get("heat_val");
      let weight = (value - range[0]) / (range[1] - range[0]);
      if (weight > 1) {
        weight = 1;
      }
      if (weight < 0) {
        weight = 0;
      }
      return weight;
    }
  };
  return { data: heatDataSource, options: heatMapOptions };
}

// 巡护路线
export async function getPatrolRoute() {
  let result = await getPatrolRouteRequest();
  if (result.code !== 200) {
    return null;
  }
  let data = result.data.map(x => {
    let obj = {
      ...x,
      infoType: "route",
      noShowPopup: true
    };
    return obj;
  });
  let dataSource = {
    data: {
      type: "1",
      data: data,
      geometryKey: "geometry"
    },
    dataType: "wkt",
    style: {
      stroke: {
        color: "#ffff88",
        width: 4
      },
      circle: {
        fill: {
          color: "#ffff88"
        },
        radius: 4
      }
    },
    hoverStyle: [
      {
        circle: {
          fill: {
            color: "#6ff4f6"
          },
          radius: 4
        }
      },
      {
        stroke: {
          color: "#6ff4f6",
          width: 4,
          lineDash: [10, 20]
        }
      },
      {
        stroke: {
          color: "rgba(111,244,246,0.3)",
          width: 10
        }
      }
    ]
  };
  return { data: dataSource };
}

// 人员
export async function getPersons() {
  let result = await getPersonsRequest();

  if (result.code !== 200) {
    return null;
  }

  let data = [];
  result.data.forEach(x => {
    if (x.lon && x.lat) {
      let obj = {
        ...x,
        geometryType: "Point",
        coordinates: [parseFloat(x.lon), parseFloat(x.lat)],
        infoType: "person"
      };
      data.push(obj);
    }
  });
  let dataSource = {
    data: {
      type: "1",
      data: data,
      geometryKey: "geometryType"
    },
    isCluster: true,
    style: {
      icon: {
        src: personIcon
      }
    },
    hoverStyle: {
      icon: {
        src: personHoverIcon
      }
    }
  };
  return { data: dataSource };
}

/**
 * 巡护点 根据巡护人员id获取相对应的巡护点
 * @param  {string} id
 */
export async function routeRecordEvent(id) {
  let params = {
    staff_id: id
  };
  let result = await getPatrolRecordRequest(params);

  if (result.code !== 200 && !result.data) {
    return null;
  }

  let data = [];
  result.data.record_list.forEach(x => {
    if (x.lon && x.lat) {
      let obj = {
        ...x,
        geometryType: "Point",
        coordinates: [parseFloat(x.lon), parseFloat(x.lat)],
        infoType: "record"
      };
      data.push(obj);
    }
  });

  let dataSource = {
    data: {
      type: "1",
      data: data,
      geometryKey: "geometryType"
    },
    style: {
      icon: {
        src: recordIcon
      }
    }, 
    // feature => {
    //   let infoType = feature.get("infoType");
    //   if (infoType === "record") {
    //     return {
    //       icon: {
    //         src: recordIcon,
    //         offsetOrigin: "bottom-left"
    //       }
    //     };
    //   } else if (infoType === "record-start") {
    //     return {
    //       icon: {
    //         src: recordStartIcon
    //       }
    //     };
    //   } else if (infoType === "record-end") {
    //     return {
    //       icon: {
    //         src: recordEndIcon
    //       }
    //     };
    //   }
    // },
    hoverStyle: {
      icon: {
        src: recordHoverIcon
      }
    }, 
    // feature => {
    //   let infoType = feature.get("infoType");
    //   if (infoType === "record") {
    //     return {
    //       icon: {
    //         src: recordHoverIcon,
    //         offsetOrigin: "bottom-left"
    //       }
    //     };
    //   } else if (infoType === "record-start") {
    //     return {
    //       icon: {
    //         src: recordStartIcon
    //       }
    //     };
    //   } else if (infoType === "record-end") {
    //     return {
    //       icon: {
    //         src: recordEndIcon
    //       }
    //     };
    //   }
    // },
    isFit: true,
    fitOption: {
      maxZoom: 13
    }
  };
  return { data: dataSource };
}

/**
 * 根据告警列表，上图
 * @param  {[Object]} warnList
 */
export function showWarnOnMap(warnList) {
  if (!Array.isArray(warnList)) {
    return null;
  }

  let data = [];
  warnList.forEach(x => {
    if (x.lon && x.lat) {
      let obj = {
        ...x,
        geometryType: "Point",
        coordinates: [parseFloat(x.lon), parseFloat(x.lat)],
        infoType: "warn"
      };
      data.push(obj);
    }
  });

  let dataSource = {
    data: {
      type: "1",
      data: data,
      geometryKey: "geometryType"
    },
    style: {
      icon: {
        src: fireIcon
      }
    }
  };
  return { data: dataSource };
}

let waterStations = null;
let gasStations = null;

export async function getWaterAndGasStation() {
  let params = {
    type: 1
  };
  let res = await getWaterRealShow(params);
  if (res.code === 200 && Array.isArray(res.data)) {
    let list = res.data.map(x => {
      return x.wgGatherStation;
    });

    waterStations = [];
    list.forEach(x => {
      if (x.gatherStationLongitude && x.gatherStationLatitude) {
        let obj = {
          ...x,
          infoType: "water",
          geometryType: "Point",
          coordinates: [
            parseFloat(x.gatherStationLongitude),
            parseFloat(x.gatherStationLatitude)
          ]
        };
        waterStations.push(obj);
      }
    });
  }

  let params1 = {
    type: 2
  };
  let res1 = await getWaterRealShow(params1);
  if (res1.code === 200 && Array.isArray(res1.data)) {
    let list1 = res1.data.map(x => {
      return x.wgGatherStation;
    });
    gasStations = [];
    list1.forEach(x => {
      if (x.gatherStationLongitude && x.gatherStationLatitude) {
        let obj = {
          ...x,
          infoType: "gas",
          geometryType: "Point",
          coordinates: [
            parseFloat(x.gatherStationLongitude),
            parseFloat(x.gatherStationLatitude)
          ]
        };
        gasStations.push(obj);
      }
    });
  }
}

/**
 * 水站
 */
export async function getWaterOnMap() {
  if (!waterStations) {
    await getWaterAndGasStation();
  }

  if (!Array.isArray(waterStations)) {
    return null;
  }

  let dataSource = {
    data: {
      type: "1",
      data: waterStations,
      geometryKey: "geometryType"
    },
    isCluster: true,
    style: {
      icon: {
        src: waterIcon
      }
    },
    hoverStyle: {
      icon: {
        src: waterHoverIcon
      }
    }
  };
  return { data: dataSource };
}

/**
 * 气站
 */
export async function getGasOnMap() {
  if (!gasStations) {
    await gasStations();
  }

  if (!Array.isArray(gasStations)) {
    return null;
  }

  let dataSource = {
    data: {
      type: "1",
      data: gasStations,
      geometryKey: "geometryType"
    },
    isCluster: true,
    style: {
      icon: {
        src: gasIcon
      }
    },
    hoverStyle: {
      icon: {
        src: gasHoverIcon
      }
    }
  };
  return { data: dataSource };
}

/**
 * 防火监测塔
 */
export async function getFireTownOnMap() {
  let params = {
    pageIndex: 1,
    pageSize: 10,
    type: "00018"
  };
  let result = await getFireTownRequest(params);

  if (result.code !== 200) {
    return null;
  }

  let data = [];
  result.data.forEach(x => {
    if (x.longitude && x.latitude) {
      let obj = {
        ...x,
        geometryType: "Point",
        coordinates: [parseFloat(x.longitude), parseFloat(x.latitude)],
        infoType: "fireTown"
      };
      data.push(obj);
    }
  });
  let dataSource = {
    data: {
      type: "1",
      data: data,
      geometryKey: "geometryType"
    },
    isCluster: false,
    style: {
      icon: {
        src: townIcon
      }
    },
    hoverStyle: {
      icon: {
        src: townHoverIcon
      }
    }
  };
  return { data: dataSource };
}
