import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import login from '@/components/login/login'
// import fail from '@/components/login/fail'
// import undefinedfail from '@/components/error/undefinedfail'

import Layout from '@/views/layout/layout'

Vue.use(Router)



export const constantRouterMap = [
  //首页
  {
    path: '/',
    component: Layout,
    name: 'home',
    redirect: '/home',
    // hidden:true,
    meta: {
      title: '工作台',
    },
    children: [
      {
        path: 'home',
        component: resolve => require(['@/views/home/index'],resolve),
        name: 'home',
        alwaysShow: true, // will always show the root menu
        meta: { title: '工作台', noCache: true },
      },
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        // component: () => import('@/views/redirect/index')
        component: resolve => require(['@/views/redirect/index'],resolve)
      }
    ],
    meta: { title: '后台管理-登录' }
  },
  {
    path: '/login',
    // component: () => import('@/views/login/index'),
    component: resolve => require(['@/views/login/index'],resolve),
    hidden: true
  },
  {
    path: '/activationPage',
    // component: () => import('@/views/login/index'),
    component: resolve => require(['@/views/login/activation_page'],resolve),
    hidden: true
  },
  {
    path: '/forget',
    // component: () => import('@/views/login/index'),
    component: resolve => require(['@/views/login/forget'],resolve),
    hidden: true
  },
  {
    path: '/password',
    component: resolve => require(['@/views/login/password'],resolve),
    hidden: true
  },
  {
    path: '/mobile',
    component: resolve => require(['@/views/login/mobile'],resolve),
    hidden: true
  },
  // {
  //   path: '*',
  //   component: () => import('@/views/errorPage/404'),
  //   hidden: true
  // }
  //合作商管理
  {
    path: '/partner',
    component: Layout,
    redirect: '/partner/list',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '合作商管理',
      noCache: true ,
      roles:'/partner'
    },
    children: [
      {
        path: 'list',
        component: resolve => require(['@/views/partner/list'],resolve),
        name: 'partner-list',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '合作商列表', noCache: true,
          roles:'/partner/list'
        },
      },
    ]
  },

]

export default new Router({
  // mode: 'history', // require service support
  // base:process.env.NODE_ENV == 'development'?'/':'/project/risk_web/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap_enterprise = [
  // 用户设置
  {
    path: '/user',
    component: Layout,
    redirect: '/user/data',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '用户设置',
      noCache: true ,
      roles:'/user'
    },
    children: [
      {
        path: 'data',
        component: resolve => require(['@/views/user/dataIndex'],resolve),
        alwaysShow: false, // will always show the root menu
        meta: {
          title: '用户资料', noCache: true,
          roles:'/user/data'
        },
        children:[
          {
            path: '',
            component: resolve => require(['@/views/user/data'],resolve),
            name: 'user_data',
            // alwaysShow: false, // will always show the root menu
            hidden:false,
            meta: {
              title: '信息修改', noCache: true,
              roles:'/user/data/index'
            },
          },
        ]
      },
    ]
  },
]
