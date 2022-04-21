import Ellipsoid from "cesium/Source/Core/Ellipsoid";

/**
 * 根据entity 返回其position和properties
 * @param {import("cesium/Source/DataSources/Entity")} entity
 * @returns { position, properties}
 */
export function getEntityPropertiesAndPosition(entity) {
  if (!entity) {
    return;
  }

  let position = entity.position._value;
  let properties = entity.properties;
  let info = null;
  if (properties) {
    info = {};
    properties.propertyNames.forEach(key => {
      info[key] = properties[key]._value;
    });
  }
  return { position, properties: info };
}
