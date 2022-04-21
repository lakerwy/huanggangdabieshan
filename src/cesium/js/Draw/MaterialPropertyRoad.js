/**
 * @Description: 
 * @author 杜晓辉
 * @date 2021/8/17 15:16:30 
 */
/**
 * 流动纹理线
 * @param color 颜色
 * @param duration 持续时间 毫秒
 * @constructor
 */
import * as Cesium from 'cesium/Cesium'
function PolylineTrailLinkTEMaterialProperty(color, duration) {
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = color;
    this.duration = duration || 3000;
    this._time = (new Date()).getTime();
    this.isTranslucent = function () {
        return true;
    }
}

Object.defineProperties(PolylineTrailLinkTEMaterialProperty.prototype, {
    isConstant: {
        get: function () {
            return false;
        }
    },
    definitionChanged: {
        get: function () {
            return this._definitionChanged;
        }
    },
    color: Cesium.createPropertyDescriptor('color')
});
PolylineTrailLinkTEMaterialProperty.prototype.getType = function (time) {
    return 'PolylineTrailLinkTE';
}
PolylineTrailLinkTEMaterialProperty.prototype.getValue = function (time, result) {
    if (!Cesium.defined(result)) {
        result = {};
    }
    result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
    result.image = Cesium.Material.PolylineTrailLinkTEImage;
    result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
    return result;
}
PolylineTrailLinkTEMaterialProperty.prototype.equals = function (other) {
    return this === other ||
        (other instanceof PolylineTrailLinkTEMaterialProperty)
    //&& Property.equals(this._color, other._color))
}
Cesium.PolylineTrailLinkTEMaterialProperty = PolylineTrailLinkTEMaterialProperty;
Cesium.Material.PolylineTrailLinkTEType = 'PolylineTrailLinkTE';
Cesium.Material.PolylineTrailLinkTEImage = "/img/colors.png";  //public/img/rocket.png  ///img/colors.png
Cesium.Material.PolylineTrailLinkTESource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                {\n\
                                                    czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                    vec2 st = materialInput.st;\n\
                                                    vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                                                    material.alpha = colorImage.a * color.a;\n\
                                                    material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
                                                    return material;\n\
                                                }";
Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkTEType, {
    fabric: {
        type: Cesium.Material.PolylineTrailLinkTEType,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
            image: Cesium.Material.PolylineTrailLinkTEImage,
            time: 20
        },
        source: Cesium.Material.PolylineTrailLinkTESource
    },
    translucent: function (material) {
        return true;
    }
});

