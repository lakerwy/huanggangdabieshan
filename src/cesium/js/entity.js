/**
 * 根据entity 返回其position和properties
 * @param {import("cesium/Source/DataSources/Entity")} entity
 * @returns { position, properties}
 */
export function getEntityPropertiesAndPosition(entity) {
  if (!entity) {
    return;
  }

  if (entity.position) {
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
}
