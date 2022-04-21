<!--
 * @Author: 任继民
 * @Date: 2021-03-17 10:03:08
 * @LastEditors: 任继民
 * @LastEditTime: 2021-03-17 10:31:06
 * @Description: 应急通讯
-->
<template>
  <section class="emCommun layoutPage">
    <section class="leftBg">
      <LeftChart />
    </section>
    <section class="mapData">

    </section>
    <section class="rightBg">
      <RightChart />
    </section>
  </section>
</template>
<script>
import LeftChart from './components/left-Chart';
import RightChart from './components/right-Chart'
export default {
  components: {
    LeftChart,
    RightChart
  },
  data() {
    return {
      
    }
  },
  mounted() {
    
  },
  methods: {
    
  },
}
</script>
<style lang="scss" scoped>
.emCommun {
  
}
</style>