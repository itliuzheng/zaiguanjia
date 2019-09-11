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

  {
    path: '/apply_detail/:id',
    component: resolve => require(['@/views/financing/detail'],resolve),
    name: 'financing_apply_detail',
    hidden:true,
    meta: {
      title: '申请单详情', noCache: true,
      roles:'/financing/apply_detail'
    },
  },
  {
    path: '/apply_detail_sub/:id',
    component: resolve => require(['@/views/financing/detail_sub'],resolve),
    name: 'financing_apply_detail_sub',
    hidden:true,
    meta: {
      title: '运单详情', noCache: true,
      roles:'/financing/apply_detail_sub'
    },
  },
  // {
  //   path: '*',
  //   component: () => import('@/views/errorPage/404'),
  //   hidden: true
  // }
]

export default new Router({
  // mode: 'history', // require service support
  // base:process.env.NODE_ENV == 'development'?'/':'/project/risk_web/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

//融资企业
export const asyncRouterMap_enterprise = [
  // 企业认证信息
  {
    path: '/certification',
    component: Layout,
    redirect: '/certification',
    alwaysShow: false, // will always show the root menu
    meta: {
      title: '企业认证信息',
      noCache: true ,
      roles:'/certification'
    },
    children: [
      {
        path: '',
        name: 'certification_index',
        component: resolve => require(['@/views/certification/index'],resolve),
        alwaysShow: true, // will always show the root menu
        meta: {
          title: '企业认证信息', noCache: true,
          roles:'/certification/data'
        },
      },
    ]
  },
  // 运单管理
  // {
  //   path: '/waybill',
  //   component: Layout,
  //   redirect: '/waybill/inquire',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: '运单管理',
  //     noCache: true ,
  //     // roles:'/decision'
  //   },
  //   children: [
  //     {
  //       path: 'inquire',
  //       component: resolve => require(['@/views/waybill/inquire'],resolve),
  //       name: 'waybill_inquire',
  //       // alwaysShow: true, // will always show the root menu
  //       meta: {
  //         title: '运单查询', noCache: true,
  //         // roles:'/decision/rules'
  //       },
  //     },
  //   ]
  // },
  // 授信管理
  {
    path: '/approval',
    component: Layout,
    redirect: '/approval/inquire',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '授信管理',
      noCache: true ,
      roles:'/approval'
    },
    children: [
      {
        path: 'inquire',
        component: resolve => require(['@/views/approval/inquire'],resolve),
        name: 'approval_inquire',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '授信查询', noCache: true,
          roles:'/approval/inquire'
        },
      },
      {
        path: 'detail/:id',
        component: resolve => require(['@/views/approval/detail'],resolve),
        name: 'approval_detail',
        hidden:true,
        alwaysShow: false, // will always show the root menu
        meta: {
          title: '详情', noCache: true,
          roles:'/approval/detail'
        },
      },
      {
        path: 'detail_end/:id',
        component: resolve => require(['@/views/approval/detail_end'],resolve),
        name: 'approval_detail_end',
        hidden:true,
        alwaysShow: false, // will always show the root menu
        meta: {
          title: '详情', noCache: true,
          roles:'/approval/detail_end'
        },
      },
    ]
  },
  // 合同管理
  {
    path: '/contract',
    component: Layout,
    redirect: '/contract/pending',
    // alwaysShow: true, // will always show the root menu
    meta: {
      title: '合同管理',
      noCache: true ,
      roles:'/contract'
    },
    children: [
      {
        path: 'pending',
        component: resolve => require(['@/views/contract/pending'],resolve),
        name: 'contract_pending',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '待签合同', noCache: true,
          roles:'/contract/pending'
        },
      },
      {
        path: 'progress',
        component: resolve => require(['@/views/contract/progress'],resolve),
        name: 'contract_progress',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '签署进度', noCache: true,
          roles:'/contract/progress'
        },
      },
      {
        path: 'record',
        component: resolve => require(['@/views/contract/record'],resolve),
        name: 'contract_record',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '签署记录', noCache: true,
          roles:'/contract/record'
        },
      },
    ]
  },
  // 融资管理
  {
    path: '/financing',
    component: Layout,
    redirect: '/financing/apply',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '融资管理',
      noCache: true ,
      roles:'/financing'
    },
    children: [
      {
        path: 'apply',
        component: resolve => require(['@/views/financing/apply'],resolve),
        name: 'financing_apply',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '申请运费贷', noCache: true,
          roles:'/financing/apply'
        },
      },
      {
        path: 'requisition',
        component: resolve => require(['@/views/financing/requisition'],resolve),
        name: 'financing_requisition',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '申请单查询', noCache: true,
          roles:'/financing/requisition'
        },
      },
      {
        path: 'pending',
        component: resolve => require(['@/views/financing/pending'],resolve),
        name: 'financing_pending',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '待签约', noCache: true,
          roles:'/financing/pending'
        },
      },
      {
        path: 'inquire',
        component: resolve => require(['@/views/financing/inquire'],resolve),
        name: 'financing_inquire',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '签约放款进度查询', noCache: true,
          roles:'/financing/inquire'
        },
      },
      {
        path: 'record',
        component: resolve => require(['@/views/financing/record'],resolve),
        name: 'financing_record',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '签约放款记录', noCache: true,
          roles:'/financing/record'
        },
      },
    ]
  },
  // 还款管理
  {
    path: '/repayment',
    component: Layout,
    redirect: '/repayment/inquire',
    // alwaysShow: true, // will always show the root menu
    meta: {
      title: '还款管理',
      noCache: true ,
      roles:'/repayment'
    },
    children: [
      {
        path: 'inquire',
        component: resolve => require(['@/views/repayment/inquire'],resolve),
        name: 'repayment_inquire',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '待还列表', noCache: true,
          roles:'/repayment/inquire'
        },
      },
      {
        path: 'detail',
        component: resolve => require(['@/views/repayment/detail'],resolve),
        name: 'repayment_detail',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '还款列表', noCache: true,
          roles:'/repayment/detail'
        },
      },
    ]
  },
  // 逾期管理
  {
    path: '/overdue',
    component: Layout,
    redirect: '/overdue/inquire',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '逾期管理',
      noCache: true ,
      // roles:'/decision'
    },
    children: [
      {
        path: 'inquire',
        component: resolve => require(['@/views/overdue/index'],resolve),
        name: 'overdue_inquire',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '逾期查询', noCache: true,
          // roles:'/decision/rules'
        },
      },
    ]
  },
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
//金融机构
export const asyncRouterMap_financial = [
  // 运单管理
  // {
  //   path: '/waybill',
  //   component: Layout,
  //   redirect: '/waybill/inquire',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: '运单管理',
  //     noCache: true ,
  //     // roles:'/decision'
  //   },
  //   children: [
  //     {
  //       path: 'inquire',
  //       component: resolve => require(['@/views/waybill/inquire'],resolve),
  //       name: 'waybill_inquire',
  //       // alwaysShow: true, // will always show the root menu
  //       meta: {
  //         title: '运单查询', noCache: true,
  //         // roles:'/decision/rules'
  //       },
  //     },
  //   ]
  // },
  // 授信管理
  {
    path: '/approval',
    component: Layout,
    redirect: '/approval/inquire',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '授信管理',
      noCache: true ,
      roles:'/approval'
    },
    children: [
      {
        path: 'inquire',
        component: resolve => require(['@/views/approval/inquire'],resolve),
        name: 'approval_inquire',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '授信查询', noCache: true,
          roles:'/approval/inquire'
        },
      },
      {
        path: 'detail/:id',
        component: resolve => require(['@/views/approval/detail'],resolve),
        name: 'approval_detail',
        hidden:true,
        alwaysShow: false, // will always show the root menu
        meta: {
          title: '详情', noCache: true,
          roles:'/approval/detail'
        },
      },
      {
        path: 'detail_end/:id',
        component: resolve => require(['@/views/approval/detail_end'],resolve),
        name: 'approval_detail_end',
        hidden:true,
        alwaysShow: false, // will always show the root menu
        meta: {
          title: '详情', noCache: true,
          roles:'/approval/detail_end'
        },
      },
    ]
  },
  // 合同管理
  {
    path: '/contract',
    component: Layout,
    redirect: '/contract/start',
    // alwaysShow: true, // will always show the root menu
    meta: {
      title: '合同管理',
      noCache: true ,
      roles:'/contract'
    },
    children: [
      {
        path: 'start',
        component: resolve => require(['@/views/contract/start'],resolve),
        name: 'contract_start',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '发起合同', noCache: true,
          roles:'/contract/start'
        },
      },
      {
        path: 'progress',
        component: resolve => require(['@/views/contract/progress'],resolve),
        name: 'contract_progress',
        meta: {
          title: '签署进度', noCache: true,
          roles:'/contract/progress'
        },
      },
      {
        path: 'confirm',
        component: resolve => require(['@/views/contract/confirm'],resolve),
        name: 'contract_confirm',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '确认合同', noCache: true,
          roles:'/contract/confirm'
        },
      },
      {
        path: 'record',
        component: resolve => require(['@/views/contract/record'],resolve),
        name: 'contract_record',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '签署记录', noCache: true,
          roles:'/contract/record'
        },
      },
    ]
  },
  // 融资审核
  {
    path: '/financing_review',
    component: Layout,
    redirect: '/financing_review/first',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '融资审核',
      noCache: true ,
      roles:'/financing_review'
    },
    children: [
      {
        path: 'first',
        component: resolve => require(['@/views/financingReview/first'],resolve),
        name: 'financingReview_first',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '初审', noCache: true,
          roles:'/financing_review/first'
        },
      },
      {
        path: 'first_record',
        component: resolve => require(['@/views/financingReview/first_record'],resolve),
        name: 'financingReview_first_record',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '初审记录', noCache: true,
          roles:'/financing_review/first_record'
        },
      },
      {
        path: 'final',
        component: resolve => require(['@/views/financingReview/final'],resolve),
        name: 'financingReview_final',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '终审', noCache: true,
          roles:'/financing_review/final'
        },
      },
      {
        path: 'final_record',
        component: resolve => require(['@/views/financingReview/final_record'],resolve),
        name: 'financingReview_final_record',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '终审记录', noCache: true,
          roles:'/financing_review/final_record'
        },
      },
      {
        path: 'requisition',
        component: resolve => require(['@/views/financingReview/requisition'],resolve),
        name: 'financingReview_requisition',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '申请单查询', noCache: true,
          roles:'/financing_review/requisition_record'
        },
      },
    ]
  },

  // 放款管理
  {
    path: '/loan',
    component: Layout,
    redirect: '/loan/start',
    // alwaysShow: true, // will always show the root menu
    meta: {
      title: '放款管理',
      noCache: true ,
      roles:'/loan'
    },
    children: [
      {
        path: 'start',
        component: resolve => require(['@/views/loan/start'],resolve),
        name: 'loan_start',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '签约放款', noCache: true,
          roles:'/loan/start'
        },
      },
      {
        path: 'record',
        component: resolve => require(['@/views/loan/record'],resolve),
        name: 'loan_record',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '签署记录', noCache: true,
          roles:'/loan/record'
        },
      },
    ]
  },
  // 还款管理
  {
    path: '/repayment',
    component: Layout,
    redirect: '/repayment/inquire',
    // alwaysShow: true, // will always show the root menu
    meta: {
      title: '还款管理',
      noCache: true ,
      roles:'/repayment'
    },
    children: [
      {
        path: 'inquire',
        component: resolve => require(['@/views/repayment/inquire'],resolve),
        name: 'repayment_inquire',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '待还列表', noCache: true,
          roles:'/repayment/inquire'
        },
      },
      {
        path: 'detail',
        component: resolve => require(['@/views/repayment/detail'],resolve),
        name: 'repayment_detail',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '还款列表', noCache: true,
          roles:'/repayment/detail'
        },
      },
    ]
  },
  // 逾期管理
  {
    path: '/overdue',
    component: Layout,
    redirect: '/overdue/inquire',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '逾期管理',
      noCache: true ,
      // roles:'/decision'
    },
    children: [
      {
        path: 'inquire',
        component: resolve => require(['@/views/overdue/index'],resolve),
        name: 'overdue_inquire',
        // alwaysShow: true, // will always show the root menu
        meta: {
          title: '逾期查询', noCache: true,
          // roles:'/decision/rules'
        },
      },
    ]
  },

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
            name: 'user_data_set',
            // alwaysShow: false, // will always show the root menu
            hidden:false,
            meta: {
              title: '信息修改', noCache: true,
              roles:'/user/data/index'
            },
          },
          {
            path: 'modify',
            component: resolve => require(['@/views/user/data_modify'],resolve),
            name: 'data_modify',
            // alwaysShow: false, // will always show the root menu
            hidden:true,
            meta: {
              title: '信息修改', noCache: true,
              roles:'/user/data/modify'
            },
          }
        ]
      },
      {
        path: 'modify',
        component: resolve => require(['@/views/user/modify'],resolve),
        name: 'modify',
        meta: {
          title: '修改密码',
          roles: '/user/modify'
        }
      }
    ]
  },

]
