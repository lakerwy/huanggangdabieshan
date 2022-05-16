<template>
  <div>
    <div class="my-steps">
      <div class="step-con" v-for="(item, index) in steps" :key="item.name">
        <div class="step">
          <img :src="[active >= index ? item.aImg : item.img]" alt="">
          <span :class="{active: active >= index}">{{item.name}}</span>
        </div>
        <img v-show="index < steps.length - 1" src="imgs/line.png" alt="" class="line">
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup(props, context) {
    const steps = [
      { img: 'imgs/Ok.png', aImg: 'imgs/Ok.png', name: '基本信息' },
      { img: 'imgs/2.png', aImg: 'imgs/2-active.png', name: '图片上传' },
      { img: 'imgs/3.png', aImg: 'imgs/3-active.png', name: '完成录入' },
    ]
    const active = ref(0)

    const next = () => {
      if (active.value < steps.length - 1) {
        active.value ++;
      } 
      context.emit('getCurrentStep', active.value)
    }
    const back = () => {
      if (active.value >= 0) {
        active.value --;
      } 
      context.emit('getCurrentStep', active.value)
    }

    return {
      steps,
      active,
      next,
      back
    }
  },
})
</script>


<style lang="less" scoped>
@vw: 19.2vw;
.my-steps {
  display: flex;
  align-items: center;
  width: 1001 / @vw;
  .step-con {
    display: flex;
    align-items: center;
    width: 450/@vw;
  }
  .step {
    font-family: MicrosoftYaHei;
    font-size: 14 / @vw;
    line-height: 20px;
    min-width: 101 / @vw;
    color: #bfbfbf;
    cursor: pointer;
    white-space: nowrap;
    img {
      vertical-align: middle;
      margin-right: 9px;
    }
    span {
      white-space: nowrap;
    }
  }
  .line {
    margin: 0 14 / @vw;
    width: 320 / @vw;
  }
  .active {
    color: #00b6a7;
  }
}
</style>