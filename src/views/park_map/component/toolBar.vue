<template>
  <div>
    <div className="toolBar">
      <div v-for="(item,index) in icons" className="" :key="index">
        <img :src="item.image" @click="toolClick(item.toolName)" :title="item.toolName">
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive} from "vue";

export default defineComponent({
  setup(){
    const icons = reactive([
          {
            image: "imgs/image_onemap/icon_tool1.png",
            toolName: "tool1",
            toolTitle: "图层",
          },
          {
            image: "imgs/image_onemap/icon_tool2.png",
            toolName: "tool2",
            toolTitle: "放大",
          },
          {
            image: "imgs/image_onemap/icon_tool3.png",
            toolName: "tool3",
            toolTitle: "缩小",
          },
          {
            image: "imgs/image_onemap/icon_tool4.png",
            toolName: "tool4",
            toolTitle: "全屏",
          },
          {
            image: "imgs/image_onemap/icon_tool5.png",
            toolName: "tool5",
            toolTitle: "测距",
          },
          {
            image: "imgs/image_onemap/icon_tool6.png",
            toolName: "tool6",
            toolTitle: "清除",
          },
          {
            image: "imgs/image_onemap/icon_tool7.png",
            toolName: "tool7",
            toolTitle: "抓手",
          },
    ])
    const toolClick = (item)=>{

    }

    const zoomIn = (map)=> {
      var currentZoom = map.getView().getZoom();
      var maxZoom = map.getView().getMaxZoom();
      maxZoom = maxZoom ? maxZoom : 18;
      if (currentZoom < maxZoom) {
        map.getView().setZoom(currentZoom + 1);
        return { status: true, message: "已成功放大了一级。" };
      } else {
        return { status: false, message: "已是最大级别，无法再放大了！" };
      }
    }
    return {
      icons,
      toolClick
    }
  }
})

</script>

<style>
.toolBar {
  height: 256px;
  width: 32px;
  position: absolute;
  right: 34px;
  z-index: 9999999;
  bottom: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
</style>