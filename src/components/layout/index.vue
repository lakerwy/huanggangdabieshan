<template>
  <div class="page">
    <myHeader />
    <router-view class="container"></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import myHeader from '../header/index'

export default defineComponent({
  components: {
    myHeader
  },
  setup() {
    
  },
})
</script>


<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/bg.png');
  background-position: 0 0;
  background-size: 100% auto;
  background-repeat: no-repeat;
  .container {
    height: calc(100% - 56px);
  }
}
</style>