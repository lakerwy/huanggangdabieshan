/**
 * @Description:
 * @author 杜晓辉
 * @date 2021/6/5 14:09:39
 */
import * as Cesium from 'cesium/Cesium'
export function AddArcGISLayerbyURI(viewer,result) {
    if(viewer!= null && result !=null){
        let CurLayer =  new Cesium.ArcGisMapServerImageryProvider({
            url: result.url + "?",
        });
        CurLayer.layercode = result.id;
        viewer.imageryLayers.addImageryProvider(CurLayer);
    }
}
export function SwitchArcGISLayerbyCode(viewer,code,state) {
    if(viewer){
            let number = viewer.imageryLayers.length;
            for (let i =0;i<number;i++){
                let  cueLayer =viewer.imageryLayers.get(i);
                if(cueLayer){
                    if(cueLayer._imageryProvider.layercode){
                        if(cueLayer._imageryProvider.layercode == code) {
                            //cueLayer.show = !cueLayer.show;
                            viewer.imageryLayers.remove(cueLayer);
                        }
                    }else if(cueLayer._imageryProvider._layer){
                        if(cueLayer._imageryProvider._layer == code) {
                            //viewer.imageryLayers.remove(cueLayer);
                            cueLayer.show = !cueLayer.show;
                        }
                    }

                }
            }
        }
}
