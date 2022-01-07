import Vue from 'vue'
import Router from 'vue-router'
import Index from "../views/layout/Index";
import Home from "../views/core/Home";
import ResultData from "../views/core/ResultData";
import UserManagement from '../views/system/usermanagement/UserManagement'
import DataReport from "../views/dataReport/DataReport";
import AddData from "../views/dataReport/AddData";
import TableManagement from "../views/dataReport/TableManagement";
import SuccessPage from "../views/dataReport/SuccessPage";
Vue.use(Router);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const router = new Router({
  routes :[
    { path: '/', redirect: '/index' },
    { path: '', redirect: '/index' },
    /*{ path: '/login', component: Login },
    // 忘记密码页面
    { path: '/forgetpwd', component: Forgetpwd },*/
    {
      path: '/index',
      component: Index,
      redirect:'/home',
      children: [
        { path: '/home',name: 'home',component: Home },
        {path: '/resultData',name: 'resultData',component: ResultData},
        { path: '/dataReport', component:DataReport},
    { path: '/userManagement',component: UserManagement },
        { path: '/addData',component: AddData },
        { path: '/tableManagement',component: TableManagement },
        { path: '/successPage',component: SuccessPage },
  
      ]
    }
  ]
});

/*
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数 表示放行
  // next()  放行    next('/login')  强制跳转
  if (to.path === '/login') return next();
  // 获取token
  //const tokenStr = window.sessionStorage.getItem('token');
  //if (!tokenStr) return next('login');
  next();


});
*/

export default router;
