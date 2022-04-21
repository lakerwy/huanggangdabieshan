<!--
 * @Author: 任继民
 * @Date: 2021-04-06 16:55:43
 * @LastEditors: 任继民
 * @LastEditTime: 2021-04-06 17:01:01
 * @Description: 水气监测
-->
<template>
  <section class="brume layoutPage">
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
.brume {
  
}
</style>