import { Map, View } from "ol";
import Projection from "ol/proj/Projection";
import StaticImageLayer from "./layer/staticImageLayer";

import "ol/ol.css";

class DxStaticMap extends Map {
  constructor(options) {
    let url = options.url;

    let target = options.target || "map";

    if (!url) {
      throw new Error("图片地址为空！");
    }

    let width = options.width || 1024;
    let height = options.height || 968;

    let center = [width / 2, height / 2];

    let mapOptions = { ...options.mapOptions };

    var extent = [0, 0, width, height];
    var projection = new Projection({
      code: "pixel-coordinate",
      units: "pixels",
      extent: extent
    });

    let params = {
      ...mapOptions,
      target: target,
      layers: [
        new StaticImageLayer({
          url: url,
          imageExtent: extent,
          projection: projection
        })
      ],
      view: new View({
        projection: projection,
        center: center,
        zoom: 2,
        maxZoom: 8
      })
    };
    super(params);

    this.projection = projection;
  }
}

export default DxStaticMap;
