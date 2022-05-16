<template>
  <div class="pointInfo" v-if="currentObj">
    <div class="close" @click="close"><i class="el-icon-close"></i></div>
    <div class="title">
      <img
        src="imgs/image_onemap/serch_museum.png"
        alt=""
        style="width: 30px"
      />
      <b>{{ currentObj.name }}</b>
    </div>
    <div class="content-site">
      <ul>
        <li><span>景点名称：</span>{{ currentObj.name }}</li>
        <li><span>所属路线（景区）：</span>{{ currentObj.adress }}</li>
        <li><span>基础设施：</span>{{ currentObj.jcss }}</li>
        <li><span>周边吃喝玩乐：</span>{{ currentObj.chwl }}</li>
        <li><span>旅游分类：</span>{{ currentObj.poitype }}</li>
      </ul>
      <p style="text-align: right">
        <!-- todo hyx -->
        <button class="btn_more" @click="aroundInfo">周边</button>
      </p>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, toRefs, watch, inject } from "vue";
import { getAroundInfo } from "@/api/remain";
import { ElMessage } from 'element-plus'

export default defineComponent({
  props: ['selectId', "data","oldData"],
  setup(props, context) {
    const showAround = inject('showAround')
    const { data } = toRefs(props)
    const { oldData } = toRefs(props)
    const img = ref('');
    const arr = ref([])
    const currentObj = ref({})
    const videourl = ref(null)
    const aroundInfo = () => {
      let params = {
        id: oldData.value.id,
        type: oldData.value.type,
      };
      getAroundInfo(params).then(res => {
        if (res.success && res.body.length > 0) {
          showAround(true, res.body)
          close()
        } else {
          ElMessage({
            message: '暂无周边详情！',
            type: 'error'
          });
        }
      });
    }
    const filterTime = (val) => {
      const year = val.year;
      const month = val.month < 10 ? '0' + val.month : val.month;
      const day = val.day < 10 ? '0' + val.day : val.day;
      const hour = val.hour < 10 ? '0' + val.hour : val.hour;
      const minute = val.minute < 10 ? '0' + val.minute : val.minute;
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + '00';
    }
    const close = () => {
      context.emit('closePop')
    }
    watch(data, () => {
      currentObj.value = {};
      currentObj.value = data.value;
    }, { immediate: true }
    )

    return {
      close,
      arr,
      img,
      videourl,
      currentObj,
      filterTime,
      aroundInfo
    }
  },
})
</script>
<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
.pointInfo {
  width: 374 / @vw;
  background-color: rgba(255, 255, 255, 0.9);
  padding-bottom: 1px;
  .close {
    position: absolute;
    right: 10 / @vw;
    top: 10 / @vh;
    cursor: pointer;
    .el-icon-close {
      font-size: 25px;
      color: #a9a9a9;
    }
  }
  .title {
    display: flex;
    align-items: center;
    width: 318 / @vw;
    height: 36 / @vh;
    padding-top: 10 / @vh;
    margin-left: 28 / @vw;
    color: #2cab7c;
    img {
      margin-right: 10 / @vw;
    }
  }
  .content-site {
    margin-left: 28 / @vw;
    margin-top: 7 / @vh;
    position: relative;
    ul {
      padding: 0;
      li {
        list-style: none;
        font-size: 14 / @vw;
        margin-bottom: 5px;
        //padding: 3 / @vh 0;
        span {
          color: #2cab7c;
        }
      }
    }
    img {
      position: absolute;
      width: 155 / @vw;
      height: 112 / @vh;
      top: 3 / @vh;
      right: 27 / @vw;
    }
  }
  .content-tep {
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 5%;
      li {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 48%;
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 100%;
          color: #fff;
          background: #64c2a0;
          padding: 3px 0;
          margin-bottom: 6px;
        }
      }
      li:nth-child(2n) {
        margin-left: 4%;
      }
    }
  }
  .btn_more {
    font-size: 14px;
    border: 0;
    background-color: #13a36e;
    color: #fefefe;
    padding: 6px 15px;
    cursor: pointer;
    margin-right:20px;
  }
}
</style>