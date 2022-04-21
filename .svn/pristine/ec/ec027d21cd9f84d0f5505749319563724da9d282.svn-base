/*
 * @Author: 任继民
 * @Date: 2021-03-02 14:03:10
 * @LastEditors: 任继民
 * @LastEditTime: 2021-03-03 10:53:51
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts';
import scroll from 'vue-seamless-scroll'

Vue.use(scroll);
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
