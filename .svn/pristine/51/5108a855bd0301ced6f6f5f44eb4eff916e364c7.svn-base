/**
 * @Description: 
 * @author 杜晓辉
 * @date 2021/8/17 15:18:20 
 */
/**
 * 
 * @param {*} viewer 
 */
import * as Cesium from 'cesium/Cesium'
export  function   RemoveLayerExceptBase(viewer){
    if(viewer){
        let number = viewer.imageryLayers.length;
        //viewer.imageryLayers.removeAll(true);
        for (let i =0;i<number;i++){
            let  cueLayer =viewer.imageryLayers.get(i);
            if(cueLayer ){
                //viewer.imageryLayers.remove(cueLayer,true);
                if(viewer.imageryLayers.length >3 && i>2 ){
                    viewer.imageryLayers.remove(cueLayer);
                }
            }
        }
    }
}

/**
 *
 * @param viewer
 * @param positionArr
 */
export function removeEntityById(viewer,positionArr) {
    if(positionArr != null && positionArr.length>0 ){
        for(let i= 0;i<positionArr.length;i++){
            viewer.entities.removeById(positionArr[i].id);
        }
    }else {
        return;
    }
}