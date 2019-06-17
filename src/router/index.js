import Vue from 'vue'
import VueRouter from 'vue-router'
import Util from '../libs/util';
import Antd from 'ant-design-vue'
import routers from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  //mode: 'history',
  routes: routers
};

export const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
  //Antd.LoadingBar.start();
  Util.title(to.meta.title);
  if (to.meta.requireAuth) {
    if (localStorage.getItem('token') != '' && localStorage.getItem('token') != null) {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}//登录成功以后跳转到该路由
      });
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  //Antd.LoadingBar.finish();
  window.scrollTo(0, 0);
});
