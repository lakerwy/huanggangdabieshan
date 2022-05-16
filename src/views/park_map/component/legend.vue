<template>
  <div class="legend-container">
    <!-- <h3>图例</h3> -->
    <p style="text-align:center;" v-if="data.length==0">暂无图例</p>
    <div style="max-height:448px;overflow-y:auto;" class="legends" v-if="data.length>0">
      <div v-for="(item, index) in data" :key="index" style="line-height: 32px;">
      <template v-if="item.legend.length == 1">
        <img
        style="vertical-align:middle;margin-right:6px"
          :src="
            `data:${item.legend[0].contentType};base64,${item.legend[0].imageData}`
          "
        />
      </template>
      <span>{{ item.layerName }}</span>
      <template v-if="item.legend.length > 1">
        <div v-for="(legend, i) in item.legend" :key="i">
          <img
            style="vertical-align:middle;margin-right:6px;margin-left:15px;"
            :src="`data:${legend.contentType};base64,${legend.imageData}`"
          />
          <span>{{ legend.label }}</span>
        </div>
      </template>
    </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style lang="less" scoped>
.legend-container {
    color: #91d5df;
    padding: 20px;
}
.legends::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.legends::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 4px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #08e7f6;
}
.legends::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: transparent;
}
</style>
