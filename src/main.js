import { createApp } from 'vue';
import ElementUI from 'element-plus';
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import router from './router';
import store from './store';
import echarts from 'echarts';
import scroll from 'vue-seamless-scroll/src';
import 'element-plus/lib/theme-chalk/index.css';
import './styles/common.scss';
import lazyPlugin from 'vue3-lazy';
// import './permission' // 权限
// import './error' // 日志
// import './cache'//页面缓冲
import App from './App.vue';
// import AVUE from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import './assets/style/common.less';
import axios from './router/axios';
import VueAxios from 'vue-axios';
const app = createApp(App)
// app.use(ElementUI)
app.use(store)
app.use(echarts)
app.use(router)
app.use(VueAxios, axios)
app.use(ElementUI, {locale})
app.use(scroll)
app.use(lazyPlugin,{
  error:'./assets/images/serch_museum.png',
  loading:'./assets/images/serch_museum.png',
});
// app.use(AVUE)
app.mount('#app')
