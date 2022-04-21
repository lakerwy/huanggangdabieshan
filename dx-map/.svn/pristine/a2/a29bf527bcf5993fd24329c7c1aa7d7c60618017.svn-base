const route = [
  {
    path: "/test/earth",
    name: "earth",
    component: () => import("./test.vue"),
    redirect: { name: "t_earth" },
    children: [
      {
        path: "earth",
        name: "t_earth",
        component: () => import("./components/earth.test.vue")
      },
      {
        path: "earth_server_arcgis",
        name: "t_earth_server_arcgis",
        component: () => import("./components/earth.server.arcgis.test.vue")
      },
      {
        path: "earth_server_geoserver",
        name: "t_earth_server_geoserver",
        component: () => import("./components/earth.server.geoserver.test.vue")
      },
      {
        path: "earth_server_xyz",
        name: "t_earth_server_xyz",
        component: () => import("./components/earth.server.xyz.test.vue")
      },
      {
        path: "earth_server_stamen",
        name: "t_earth_server_stamen",
        component: () => import("./components/earth.server.stamen.test.vue")
      },
      {
        path: "earth_control_basemap",
        name: "t_earth_control_basemap",
        component: () => import("./components/earth.control.basemap.test.vue")
      },
      {
        path: "earth_control_contextmenu",
        name: "t_earth_control_contextmenu",
        component: () =>
          import("./components/earth.control.contextmenu.test.vue")
      },
      {
        path: "earth_terrain_local",
        name: "t_earth_terrain_local",
        component: () => import("./components/earth.terrain.local.test.vue")
      },
      {
        path: "earth_vector_datasource",
        name: "t_earth_vector_datasource",
        component: () => import("./components/earth.vector.datasource.test.vue")
      },
      {
        path: "earth_vector_dataSourceCluster",
        name: "t_earth_vector_dataSourceCluster",
        component: () =>
          import("./components/earth.vector.dataSourceCluster.test.vue")
      }
    ]
  }
];

export default route;
