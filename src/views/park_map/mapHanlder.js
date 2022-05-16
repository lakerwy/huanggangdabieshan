// import { getCenterByFeature } from "@map/js/feature";
import Vue from "vue";

const DmLayerID = "dmLayerId";
const QueryResultLayerID = "temp_query_result"; // 空间查询结果图层

// 行政区划数据
export function getRegionData() {
  let item = {
    id: "region",
    name: "行政区划",
    dataSource: {
      type: "4",
      data: "data/huanggang.geojson",
    },
    styles: (feature) => {
      let name = feature.get("Name");
      let styles = [
        {
          stroke: {
            color: "rgba(0, 153, 255, 1)",
            width: 3,
          },
          fill: {
            color: "rgba(255, 255, 255, 0.2)",
          },
        },
      ];

      let textStyle = {
        text: {
          font: "14px 微软雅黑 ",
          text: name,
          textBaseline: "middle",
          backgroundFill: {
            color: "#000",
          },
          fill: {
            color: "#fff",
          },
        },
      };
      styles.push(textStyle);
      return styles;
    },
  };
  return item;
}

export function addDmOnMap({
  component,
  data,
  lonKey = "lon",
  latKey = "lat",
  dialogType = "poi",
}) {
  if (!component || !Array.isArray(data)) {
    return;
  }
  component.clearSelectFeature();

  let id = DmLayerID;
  let dataSource = {
    type: "1", // List
    data: data.map((x, i) => {
      return {
        ...x,
        geometryType: "Point",
        coordinates: [parseFloat(x[lonKey]), parseFloat(x[latKey])],
        dialogType: dialogType,
        index: i,
      };
    }),
    geometryKey: "geometryType",
  };

  if (!component.vectorDataSource[id]) {
    let item = {
      id: id,
      dataSource: dataSource,
      zindex: 99999,
      isFit: true,
      fitOption: { padding: [200, 500, 200, 500] },
      styles: function (feature) {
        let index = feature.get("index");
        return {
          icon: {
            src: "imgs/img/icon-map" + (index + 1) + ".png",
          },
        };
      },
      hoverStyles: function (feature) {
        let index = feature.get("index");
        return {
          icon: {
            src: "imgs/img/icon-mapRed" + (index + 1) + ".png",
          },
        };
      },
    };
    component.vectorDataSource[id] = item;
  } else {
    let child = component.$refs[id];
    child.clear();
    child.addData(dataSource);
  }
}

export function clearQueryResult(component) {
  if (!component) {
    return;
  }
  let id = QueryResultLayerID;
  let child = component.$refs[id];
  if (child && child[0]) {
    child[0].source.clear();
  }
}

export function spatialSelectHandler({ component, type, callback }) {
  if (!component || !type) {
    return;
  }
  component.$refs.spatial.draw({
    type: type,
    callback: callback,
  });
}

export function addQueryResultOnMap({ component, features }) {
  clearQueryResult();
  if (!component) {
    return;
  }
  let id = QueryResultLayerID;
  let item = {
    id: id,
    name: "临时的查询图层",
    zindex: 9999999,
    styles: {
      circle: {
        fill: { color: "rgba(255,0,0,0.5)" },
        stroke: {
          width: 2,
          color: "#f00",
        },
        radius: 10,
      },
      fill: { color: "rgba(255,0,0,0.5)" },
      stroke: {
        width: 2,
        color: "#f00",
      },
    },
  };
    let child = component.$refs[id];
    if (child && child[0]) {
      child[0].source.addFeatures(features);
    }
}

export function viewDmOnMap({
  component,
  data,
  lonKey = "lon",
  latKey = "lat",
  isClick = false,
}) {
  if (!component) {
    return;
  }
  let map = component.getMap();
  let coordinates = map.inputCoordinate([
    parseFloat(data[lonKey]),
    parseFloat(data[latKey]),
  ]);
  let feature = map.getFeatureByCoordinate(coordinates, "id", data.id);
  if (feature) {
    component.selectFeature = feature;
    // component.goCoordinate([parseFloat(data[lonKey]), parseFloat(data[latKey])],15);
    if (coordinates && isClick) {
      // 视图居中
      map.getView().fit(feature.getGeometry(), {
        maxZoom: 16,
        duration: 3000,
        callback: () => {
          // 弹窗
          component.$refs.popup.show(coordinates);
        },
      });
    }
  }
}

export function clearDmOnMap({ component }) {
  if (!component) {
    return;
  }
  let id = DmLayerID;
  let child = component.$refs[id];
  child.clear();
  // delete component.vectorDataSource[id];
}

export function addPointsOnMap({
  component,
  data,
  lonKey = "lon",
  latKey = "lat",
  icon,
  hoverIcon,
  dialogType,
}) {
  if (!component || !Array.isArray(data)) {
    return;
  }

  let id = dialogType;
  let dataSource = {
    type: "1", // List
    data: data.map((x) => {
      return {
        ...x,
        geometryType: "Point",
        coordinates: [parseFloat(x[lonKey]), parseFloat(x[latKey])],
        dialogType: dialogType,
      };
    }),
    geometryKey: "geometryType",
  };

  if (!component.vectorDataSource[id]) {
    let item = {
      id: id,
      dataSource: dataSource,
      zindex: 99999,
      isFit: true,
      fitOption: { padding: [200, 500, 200, 500] },
      styles: icon
        ? {
          icon: {
            src: icon,
          },
        }
        : null,
      hoverStyles: hoverIcon
        ? {
          icon: {
            src: hoverIcon,
          },
        }
        : null,
    };
    component.vectorDataSource[id] = item;
  } else {
    let child = component.$refs[id];
    child.clear();
    child.addData(dataSource);
  }
}
