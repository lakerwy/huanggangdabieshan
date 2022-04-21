import { Point, LineString, MultiLineString } from "ol/geom";
import { Style, Stroke, Icon } from "ol/style";

export function arrowLineStyle(color) {
  let fn = (feature, resolution) => {
    let geometry = feature.getGeometry();
    if (!(geometry instanceof LineString)) {
      return;
    }

    let styles = [
      new Style({
        stroke: new Stroke({
          color: color || "green",
          width: 10
        })
      })
    ];

    let lineLength = geometry.getLength();
    let factor = (30 * resolution) / lineLength; // 30像素等分因子
    for (let i = 0; i <= 1; i += factor) {
      let arrowCoordinate = geometry.getCoordinateAt(i);
      let pre = geometry.getCoordinateAt(i - 0.0001);
      let next = geometry.getCoordinateAt(i + 0.0001);
      let dx1 = pre[0] - arrowCoordinate[0];
      let dy1 = pre[1] - arrowCoordinate[1];
      let dx2 = arrowCoordinate[0] - next[0];
      let dy2 = arrowCoordinate[1] - next[1];
      let rotation1 = Math.atan2(dy1, dx1);
      let rotation2 = Math.atan2(dy2, dx2);
      if (Math.abs(rotation1 - rotation2) < Math.PI / 180) {
        let dx = next[0] - pre[0];
        let dy = next[1] - pre[1];
        let rotation = Math.atan2(dy, dx);
        styles.push(
          new Style({
            geometry: new Point(arrowCoordinate),
            image: new Icon({
              src: require("../../assets/img/arrow.png"),
              anchor: [0.75, 0.5],
              rotateWithView: false,
              rotation: -rotation
            })
          })
        );
      }
    }
    return styles;
  };

  return fn;
}
