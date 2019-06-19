import main from '../views/main/main.vue';

export default [
  {
    path: '/',
    name: 'login',
    meta: {
      icon: 'ios-settings',
      title: '登录页',
      hideInMenu: true,
      requireAuth: false //表示当前响应的请求是否需要进行登录拦截验证【true：需要；false：不需要】
    },
    component: resolve => {
      require(['../views/login/login.vue'], resolve)
    }
  },
  {
    path: '/login',
    name: 'login-default',
    meta: {
      icon: 'ios-settings',
      title: '登录页',
      hideInMenu: true,
      requireAuth: false //表示当前响应的请求是否需要进行登录拦截验证【true：需要；false：不需要】
    },
    component: resolve => {
      require(['../views/login/login.vue'], resolve)
    }
  },
  {
    path: '/adminCenter',
    name: 'adminCenter',
    meta: {
      icon: 'ios-settings',
      title: '系统首页',
      hideInMenu: true,
      requireAuth: false //表示当前响应的请求是否需要进行登录拦截验证【true：需要；false：不需要】
    },
    component: resolve => {
      require(['../views/main/main.vue'], resolve);
    }
  },
  {
    path: '/sys',
    name: 'sys',
    component: main,
    meta: {
      icon: 'ios-construct',
      title: '系统管理',
      code: 'system-manage',
      requireAuth: true //表示当前响应的请求是否需要进行登录拦截验证【true：需要；false：不需要】
    },
    children: [
      {
        path: 'dictList',
        name: 'dictList',
        meta: {
          icon: 'ios-paper',
          title: '字典维护',
          code: 'system-manage-dict',
          requireAuth: true //表示当前响应的请求是否需要进行登录拦截验证【true：需要；false：不需要】
        },
        component: resolve => {
          require(['../views/sys/dict/dictList.vue'], resolve);
        }
      },
      {
        path: 'shuttle',
        name: 'shuttle',
        meta: {
          icon: 'ios-paper',
          title: '穿梭demo',
          code: 'system-manage-dict',
          requireAuth: false //表示当前响应的请求是否需要进行登录拦截验证【true：需要；false：不需要】
        },
        component: resolve => {
          require(['../views/sys/shuttle/shuttle.vue'], resolve);
        }
      }
    ]
  }
]
