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
  //债管家
  {
    path: '/',
    component: layout,
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
]
