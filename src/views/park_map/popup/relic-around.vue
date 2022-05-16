<template>
  <div class="detail">
    <div class="close" @click="closeAround"><i class="el-icon-close"></i></div>
    <div class="top">
      <img src="imgs/image_onemap/icon_detail.png" alt="" />
      <b>周边详情</b>
    </div>
    <div class="content">
      <el-table
        :data="arr"
        stripe
        border
        size="small"
        height="100%"
        :highlight-current-row="true"
        style="width: 100%; color: #000 !important"
      >
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="position" label="位置"> </el-table-column>
        <el-table-column prop="type" label="类型" width="80">
          <template #default="{ row }">
            {{ fiterType(row.type) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from "vue";
export default defineComponent({
  props: ['arr'],
  setup(props, context) {
    const tableAlias = ref([]);
    onBeforeMount(
      tableAlias.value = [
        {
          key: 'name',
          name: '名称'
        },
        {
          key: 'position',
          name: '位置'
        },
        {
          key: 'type',
          name: '类型'
        }
      ]
    )
    const closeAround = () => {
      context.emit('closeAround')
    }
    const fiterType = (key) => {
      switch (key) {
        case 1:
          return '景点'
        case 2:
          return '遗迹点'
        case 3:
          return '视频点'
        case 4:
          return '监测点'
      }
    }
    return {
      closeAround,
      fiterType,
      tableAlias
    }
  }
})
</script>

<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.detail {
  position: absolute;
  top: 161 / @vh;
  right: 33%;
  width: 660 / @vw;
  height: 786 / @vh;
  background-color: rgba(255, 255, 255, 0.9);
  .close {
    position: absolute;
    right: 12px;
    top: 12px;
    cursor: pointer;
    .el-icon-close {
      font-size: 25px;
      color: #a9a9a9;
    }
  }
  .top {
    display: flex;
    align-items: center;
    width: 607 / @vw;
    height: 40 / @vh;
    padding: 10px;
    margin-left: 28 / @vw;
    border-bottom: 1px solid #dadada;
    color: #2cab7c;
    img {
      margin-right: 10 / @vw;
    }
  }
  .content {
    margin-left: 32px;
    margin-top: 8px;
    width: 608px;
    height: 590px;
  }
}
/deep/.el-table {
  background-color: transparent;
}
/deep/.el-table__empty-block {
  background-color: transparent !important;
}

/deep/.el-table th {
  background-color: transparent !important;
}

/deep/.el-table thead th {
  padding: 6px 0;
  color: #18639d !important;
  background: rgba(3, 103, 123, 0.2);
}
/deep/.el-table tbody td {
  padding: 5px 0;
}

/deep/.el-table thead th {
  background: rgba(3, 103, 123, 0.2) !important;
}
/deep/.el-table tbody th:hover {
  background: transparent !important;
}

/deep/.el-table tr {
  background-color: transparent !important;
  color: #000 !important;
}

/deep/.el-table td,
/deep/.el-table th.is-leaf {
  border-bottom: 1px solid #8db5bc;
}

/deep/.el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: transparent !important;
}

/deep/.el-table__body-wrapper {
  height: 533px !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
}
/deep/::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px;
  cursor: pointer;
}
/deep/::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 4px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(78, 127, 175, 0.8);
}
/deep/::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(151, 129, 129, 0.2);
  border-radius: 4px;
  background: transparent;
}
</style>