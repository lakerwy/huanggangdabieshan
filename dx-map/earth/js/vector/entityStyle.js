import BillboardGraphics from "cesium/Source/DataSources/BillboardGraphics";

/**
 * @typedef {Object} Fill
 * @property {String | Array<red,green,blue,alpha>} color
 */

/**
 * @typedef {Object} Stroke
 * @property {String | Array<red,green,blue,alpha>} color
 * @property {Number} width
 */

/**
 * @typedef {Object} Icon
 * @property {String} src
 */

/**
 * @typedef {Object} Text
 * @property {String} name
 */

/**
 * @typedef {Object} Circle
 * @property {Number} radius
 * @property {Fill} fill
 * @property {Stroke} stroke
 */

/**
 * @typedef {Object} Style
 * @property {Icon} [icon]
 * @property {Circle} [circle]
 * @property {Fill} [fill]
 * @property {Stroke} [stroke]
 * @property {Text} [text]
 */

/**
 * @param  {Style} options
 */
export function getEntityStyle(entity, options) {
  if (!options) {
    return;
  }

  if (options.icon) {
    let billboard = new BillboardGraphics({
      image: options.icon.src,
      heightReference: 1, // HeightReference.CLAMP_TO_GROUND
      HorizontalOrigin: 0, // center
      verticalOrigin: 0, // center
      disableDepthTestDistance: Number.POSITIVE_INFINITY // 防止遮挡
    });
    entity.billboard = billboard;
  }
}

/**
 *
 *
 * @export
 * @param {Array<Style>} options
 */
export function setEntityStyles(entity, options) {
  if (Array.isArray(options)) {
    // 数组合并
    let obj = null;
    options.forEach(x => {
      obj = { ...obj, ...x };
    });
    return getEntityStyle(entity, obj);
  }

  return getEntityStyle(entity, options);
}
