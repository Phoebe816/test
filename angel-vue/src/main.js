// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'  //让浏览器支持ES6
// import VueResource from 'vue-resource'
import router from '@/router'
import '@/assets/css/reset.css'
import echarts from 'echarts'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'
// import $ from 'jquery'

// Vue.use(VueResource)
Vue.use(router);
Vue.use(ElementUI, { size: 'small'});
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

//注册全局组件
//Vue.component("topnav",Topnav);



/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  /*components: { App },
  template: '<App/>',*/
  render: h => h(App)
})
//index.html->main.js->App.vue
