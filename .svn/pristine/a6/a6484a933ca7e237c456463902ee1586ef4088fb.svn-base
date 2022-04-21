<!--
 * @Author: 任继民
 * @Date: 2021-03-03 09:53:00
 * @LastEditors: 任继民
 * @LastEditTime: 2021-03-03 10:21:03
 * @Description: 标题
-->
<template>
  <section class="column-title">
    <div>
      <span class="square"></span>
      <span class="title">{{titleName}}</span>      
    </div>
    <div>
      <slot />
    </div>
  </section>
</template>
<script>
export default {
  props: {
    titleName: {
      type: String,
      default: '标题'
    } 
  },
  data() {
    return {
      
    }
  },
}
</script>
<style lang="scss" scoped>
.column-title {
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .square {
    display: inline-block;
    width: 17px;
    height: 17px;
    background-color: #68a9ff;  
    margin-right: 20px;  
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    color: #68a9ff;    
  }
}
</style>