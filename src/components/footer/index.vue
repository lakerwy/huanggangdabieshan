<!--
 * @Author: 任继民
 * @LastEditors: 任继民
-->
<template>
  <div class="footer2">
    <div class="info">
      <div class="info1">Copyright 2020-2021 黄冈大别山世界地质公园  版权所有</div>
      <div>技术支持：湖北地信科技集团股份有限公司  咨询电话：4001680927</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@vh: 10.8vh;
.footer2 {
  position: absolute;
  bottom: 0;
  width: 100%;
	height: 78 / @vh;
  background-color: #fff;
  text-align: center;
  color: #000000;
	opacity: 0.8;
  // margin-top: 20 / @vh;
  font-size:12px;
  .info {
    div {
      // padding: 5px 0;
    }
    .info1 {
      // padding: 15px 0 5px 0;
      margin-top: 8 / @vh;
    }
  }
}
</style>
