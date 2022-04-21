/**
 * @Description: 
 * @author 杜晓辉
 * @date 2021/9/7 14:30:35 
 */

export  function removeImgLayer(viewer) {
  if(viewer) {
    let number = viewer.imageryLayers.length;
    let len = window.EarthBaseConfig && window.EarthBaseConfig.WMTSLayerImg ?  window.EarthBaseConfig.WMTSLayerImg.length : 0;
    for (let i = number - 1; i >= len ; i--) {
      let cueLayer = viewer.imageryLayers.get(i);
      if (cueLayer) {
        viewer.imageryLayers.remove(cueLayer);
      }
    }
  }
}