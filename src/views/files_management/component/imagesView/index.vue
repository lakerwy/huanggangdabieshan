<template>
  <div class="images-view">
    <div class="tabs">
      <div 
        :class="['tab', {'active': activeName == item.value}]" 
        v-for="item in tabs" 
        :key="item.label"
        @click="handleTabClick(item)">{{item.label}}</div>
    </div>
    <div class="scrollbar content">
      <div class="image-item" v-for="i in tableData" :key="i.id" @click="choose(i)">
        <div class="img" :class="{'checked': i.checked}">
          <img v-if="i.isFolder == 1" src="imgs/trumb-file.png" alt="">
          <img v-else src="imgs/user.png" alt="">
        </div>
        <el-tooltip class="item" effect="light" :content="i.znName" placement="top">
          <p class="name">{{i.znName}}</p>
        </el-tooltip>
        <div class="masker" v-if="i.checked" @click.stop="cancel(i)">
          <img src="imgs/icon_check.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, unref } from 'vue'

export default {
  props: {
    tableData: {
      type: Array
    },
    currentFolder: {
      type: Object
    }
  },
  setup(props, context) {
    const tabs = [
      {label: '全部文件', value: ''},
      {label: '文件夹', value: '1'},
      {label: '文档', value: '2'},
      {label: '图片', value: '3'},
      {label: '视频', value: '4'},
      {label: '音频', value: '5'},
    ]
    const activeName = ref('');
    const { tableData, currentFolder } = toRefs(props)

    const handleTabClick = (tab) => {
      activeName.value = tab.value;
    }
    const choose = (i) => {
      i.checked = true;
      context.emit("update:tableData", unref(tableData));
      handleCheckedData();
    }
    const cancel = (i) => {
      i.checked = false;
      context.emit("update:tableData", unref(tableData));
      handleCheckedData();;
    }
    const handleCheckedData = () => {
      let data  = unref(tableData).filter(item => {
        return item.checked
      })
      context.emit('getSelectData', data);
    }
    const open = (val) => {
      context.emit('openFolder', val)
    }

    return {
      tabs,
      activeName,
      handleTabClick,
      tableData,
      choose,
      cancel,
      open
    }
  },
}
</script>

<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
.images-view {
  margin: 19 / @vh 48 / @vw 0 34 / @vw;
  width: calc(100% - 82px);
  .tabs {
    padding-right: 244 / @vw;
    display: flex;
    justify-content: space-between;
    .tab {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      line-height: 44px;
      color: #424e67;
      cursor: pointer;
      min-width: 56 / @vw;
      text-align: center;
    }
    .active {
      border-bottom: solid 2px #1c9fce;
    }
  }
  .content {
    padding-right: 190 / @vw;
    margin-top: 30 / @vh;
    max-height: 680 / @vh;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    .image-item {
      width: 150 / @vw;
      margin-left: 30 / @vw;
      margin-top: 20 / @vh;
      position: relative;
      cursor: pointer;
      .img {
        width: 100%;
        height: 150 / @vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        img {
          vertical-align: middle;
        }
      }
      .checked {
        background-color: #daf5ff;
      }
      .name {
        width: 90%;
        margin: 0 auto;
        padding-top: 8px;
        white-space: nowrap;
        text-align: center;
        color: #424e67;
        font-family: MicrosoftYaHei;
	      font-size: 14px;
        overflow: hidden;  
        text-overflow: ellipsis;
      }
      .masker {
        width: calc(100% - 2px);
        border: solid 1px #1ed0ff;
        height: 148 / @vh;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        cursor: pointer;
        img {
          margin: 3px 0 0 8px;
        }
      }
    }
  }
}
</style>