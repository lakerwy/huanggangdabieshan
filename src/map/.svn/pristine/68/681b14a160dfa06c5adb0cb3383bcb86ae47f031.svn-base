import Image from "ol/layer/Image";
import ImageCanvas from "ol/source/ImageCanvas";

/**
 * image canvae 画布图层
 */

/**
 * @typedef {Object} Options
 * @property {string} projection - 坐标系
 * @property {boolean} [crossOrigin] - 跨域，跨域访问时需配置
 * @property {Object} [imageOptions] - ol/layer/image其他参数，用于扩展
 * @property {Function} canvasFunction return canvaa;
 * eg:
 *  canvasFunction(extent, resolution, pixelRatio, size, projection){
 *    let canvas = document.createElement('canvas');
 *    canvas.width = size[0];
 *    canvas.height = size[1];
 *    canvas.style.display = 'block';
 *    return canvas;
 *  }
 */

class DxImageCanvasLayer extends Image {
  /**
   *
   * @param {Options} options
   */
  constructor(options) {
    let projection = options.projection;

    let crossOrigin = options.crossOrigin ? "Anonymous" : null;

    let wrapX = options.wrapX || false;

    let imageOptions = { ...options.imageOptions };

    let params = {
      ...imageOptions,
      source: new ImageCanvas({
        crossOrigin,
        wrapX,
        projection,
        canvasFunction: options.canvasFunction
      })
    };

    super(params);
  }
}

export default DxImageCanvasLayer;
