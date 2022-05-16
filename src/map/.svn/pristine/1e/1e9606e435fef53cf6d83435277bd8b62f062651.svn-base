import ImageLayer from "ol/layer/Image";
import Static from "ol/source/ImageStatic";

/**
 * 静态图片图层
 */

/**
 * @typedef {Object} Options
 * @property {String} url - 图片地址
 * @property {string} projection - 坐标系
 * @property {boolean} [crossOrigin] - 跨域，跨域访问时需配置
 * @property {Object} [imageOptions] - ol/layer/image其他参数，用于扩展
 */

class StaticImageLayer extends ImageLayer {
  /**
   *
   * @param {Options} options
   */
  constructor(options) {
    let url = options.url;

    let imageExtent = options.imageExtent;

    let projection = options.projection;

    let crossOrigin = options.crossOrigin ? "Anonymous" : null;

    let imageOptions = { ...options.imageOptions };

    let params = {
      ...imageOptions,
      source: new Static({
        crossOrigin,
        projection,
        url,
        imageExtent
      })
    };

    super(params);
  }
}

export default StaticImageLayer;
