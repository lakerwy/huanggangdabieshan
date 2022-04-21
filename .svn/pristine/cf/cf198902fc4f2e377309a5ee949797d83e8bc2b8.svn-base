/*
 * @Author: 任继民
 * @Date: 2021-03-02 14:03:10
 * @LastEditors: 任继民
 * @LastEditTime: 2021-05-21 12:57:21
 * @Description:
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home/index")
  }
  // 巡护管理
  // {
  //   path: '/patrol',
  //   name: 'Patrol',
  //   component: () => import('../views/patrol/index')
  // },
  // // 防火预警
  // {
  //   path: '/fireWarning',
  //   name: 'FireWarning',
  //   component: () => import('../views/fireWarning/index')
  // },
  // // 周界监控
  // {
  //   path: '/perimeter',
  //   name: 'perimeter',
  //   component: () => import('../views/perimeter/index')
  // },
  // // 应急通讯
  // {
  //   path: '/emergencyCommunication',
  //   name: 'emergencyCommunication',
  //   component: () => import('../views/emergencyCommunication/index')
  // },
  // // 水气监测
  // {
  //   path: '/brumeMonitor',
  //   name: 'brumeMonitor',
  //   component: () => import('../views/brumeMonitor/index')
  // },
];

const router = new VueRouter({
  routes
});

export default router;
