import Vue from 'vue'
import App from './App'
import router from './router'
//导入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入全局样式文件
import './assets/css/global.css'
//导入store（全局vuex）
import store from './store';
//导入封装的axios
import {requestGet,requestPost,requestPostForm} from './service/http.js'
// 分页
import ListPagination from './components/ListPagination'
//引入权限控制指令
import hasPermission from '@/common/hasPermission'
Vue.use(ElementUI);
Vue.use(hasPermission);
Vue.component('ListPagination',ListPagination);
Vue.config.productionTip = false;
//将封装的请求挂载在vue上
Vue.prototype.$postForm = requestPostForm;
Vue.prototype.$post = requestPost;
Vue.prototype.$get = requestGet;
new Vue({
  router,
  store:store,
  render: h => h(App)
}).$mount('#app');

