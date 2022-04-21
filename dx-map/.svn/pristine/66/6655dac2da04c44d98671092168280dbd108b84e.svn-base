<template>
  <div class="container">
    <div class="left">
      <router-link to="/test/earth">三维地图</router-link>
      <div class="title">地图服务</div>
      <router-link to="/test/earth/earth_server_arcgis"
        >ArcGIS Server服务</router-link
      >
      <router-link to="/test/earth/earth_server_geoserver"
        >GeoServer服务</router-link
      >
      <router-link to="/test/earth/earth_server_xyz">XYZ服务</router-link>
      <router-link to="/test/earth/earth_server_stamen">stamen服务</router-link>
      <div class="title">矢量数据</div>
      <router-link to="/test/earth/earth_vector_datasource"
        >dataSource方式</router-link
      >
      <router-link to="/test/earth/earth_vector_dataSourceCluster"
        >dataSource方式(聚合)</router-link
      >
      <div class="title">控件</div>
      <router-link to="/test/earth/earth_control_basemap">底图切换</router-link>
      <router-link to="/test/earth/earth_control_contextmenu"
        >右键菜单</router-link
      >
      <div class="title">地形</div>
      <router-link to="/test/earth/earth_terrain_local">本地数据</router-link>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0;
  margin: 0;
  display: inline-grid;
  grid-template-columns: 150px 1fr;
}

.left > * {
  display: block;
}

.left > .title {
  font-weight: bold;
  font-size: 20px;
}
</style>
