/**
 * @Description: 
 * @author 杜晓辉
 * @date 2021/8/17 15:18:41 
 */
import * as Cesium from 'cesium/Cesium'
export function  AddWebWMSLayer(viewer,result){
    let EPSG = null;
    let boxrectangle = null;
    if (result.boundingBox && result.boundingBox.length>0) {
        //let bbox = JSON.parse(result.boundingBox);
        let bbox = result.boundingBox;
        //boxrectangle = new Cesium.Rectangle.fromDegrees(110.16334533691406,31.453771591186523,110.41053771972656,31.56723976135254);
        if (bbox && bbox.length > 0 && bbox[0] !=null && bbox[1] !=null) {
            //boxrectangle = new Cesium.Rectangle.fromDegrees(bbox[0], bbox[1], bbox[2], bbox[3]);
            boxrectangle = new Cesium.Rectangle.fromDegrees(110.16334533691406,31.453771591186523,110.41053771972656,31.56723976135254);
        }
    }
    if(result && result.layer !=null){
        if ( result.projection == "EPSG:4326") {
            EPSG = new Cesium.GeographicTilingScheme();
        } else {
            EPSG = new Cesium.WebMercatorTilingScheme();
        }
        var imgWMSprovider = new Cesium.WebMapServiceImageryProvider({
            url:result.url,
            //layers:result.layer,
            parameters:{...result.restOption},
            crs:'EPSG:4326',
            maximumLevel:18,
            tilingScheme:new Cesium.GeographicTilingScheme(),
            //rectangle: new Cesium.Rectangle.fromDegrees(LayerExtent.Extent[0], LayerExtent.Extent[1], LayerExtent.Extent[2], LayerExtent.Extent[3]),
            proxy: new Cesium.DefaultProxy('/proxy/')
        });
        viewer.imageryLayers.addImageryProvider(imgWMSprovider);
    }
};