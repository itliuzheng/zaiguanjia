import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import login from '@/components/login/login'
// import fail from '@/components/login/fail'
// import undefinedfail from '@/components/error/undefinedfail'

import Layout from '@/views/layout/layout'
const layout = () => import('@/views/layout_pc/layout');

Vue.use(Router)



export const constantRouterMap = [
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
  //债管家
  {
    path: '/',
    component: layout,
    name: 'index',
    redirect: '/',
    alwaysShow: true, // will always show the root menu
    hidden:true,
    meta: {
      title: '债管家',
      noCache: true ,
    },
    children: [
      {
        path: '',
        component: resolve => require(['@/views/index/index'],resolve),
        name: 'index',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '首页', noCache: true,
        },
      },
    ]
  },
  {
    path: '/introduction',
    component: layout,
    redirect: '/introduction/',
    alwaysShow: true, // will always show the root menu
    hidden:true,
    meta: {
      title: '业务介绍',
      noCache: true ,
    },
    children: [
      {
        path: '/',
        component: resolve => require(['@/views/introduction/index'],resolve),
        name: 'introduction',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '业务介绍', noCache: true,
        },
      },
    ]
  },
  {
    path: '/hall_list',
    component: layout,
    redirect: '/hall_list/',
    alwaysShow: true, // will always show the root menu
    hidden:true,
    meta: {
      title: '交易大厅',
      noCache: true ,
    },
    children: [
      {
        path: '/',
        component: resolve => require(['@/views/hall_list/index'],resolve),
        name: 'hall_list',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '交易大厅', noCache: true,
        },
      },
    ]
  },
  {
    path: '/about',
    component: layout,
    redirect: '/about',
    alwaysShow: true, // will always show the root menu
    hidden:true,
    meta: {
      title: '关于我们',
      noCache: true ,
    },
    children: [
      {
        path: '/',
        component: resolve => require(['@/views/about/index'],resolve),
        name: 'about',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '公司简介', noCache: true,
        },
      },
    ]
  },
  // {
  //   path: '*',
  //   component: () => import('@/views/errorPage/404'),
  //   hidden: true
  // }

]

export default new Router({
  mode: 'history', // require service support
  base:'/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  //合作商管理
  {
    path: '/_admin',
    component: Layout,
    name: 'home',
    redirect: '/_admin',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '合作商管理',
      noCache: true ,
      roles:'/'
    },
    children: [
      {
        path: '',
        component: resolve => require(['@/views/partner/list'],resolve),
        name: 'partner-list',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '合作商列表', noCache: true,
          roles:'/home'
        },
      },
    ]
  },
  //委单管理
  {
    path: '/_admin/bill',
    component: Layout,
    redirect: '/_admin/bill/list',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '委单管理',
      noCache: true ,
      roles:'/bill'
    },
    children: [
      {
        path: 'info',
        component: resolve => require(['@/views/bill/info'],resolve),
        name: 'bill-info',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '委单发布', noCache: true,
          roles:'/bill/info'
        },
      },
      {
        path: 'list',
        component: resolve => require(['@/views/bill/list'],resolve),
        name: 'bill-list',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '委单列表', noCache: true,
          roles:'/bill/list'
        },
      },
      {
        path: 'modify/:id',
        component: resolve => require(['@/views/bill/info'],resolve),
        name: 'bill-info-id',
        hidden:true,
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '委单发布', noCache: true,
          roles:'/bill/info'
        },
      },
    ]
  },
  // 系统管理
  {
    path: '/_admin/system',
    component: Layout,
    redirect: '/system/set',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '系统管理',
      noCache: true ,
      roles:'/system'
    },
    children: [
      {
        path: 'set',
        component: resolve => require(['@/views/system/set'],resolve),
        name: 'set',
        meta: {
          title: '权限设置',
          roles: '/system/set'
        }
      }
    ]
  },
]
