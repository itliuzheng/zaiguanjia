import {constantRouterMap,asyncRouterMap_enterprise,asyncRouterMap_financial} from "@/router";
import store from '@/store'
import {removeToken} from "@/utils/token";
import router from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles,route) {
  if(route.meta && route.meta.roles) {
    let filter = false;
    roles.forEach((role) => {
      if (role.targetUrl == route.meta.roles) {filter = true;}
    })
    return filter;
  }else{
    return true;
  }
}


/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */

function filterAsynscRouter(asynvRouterMap,roles) {
  const accessedRouters = asynvRouterMap.filter( route => {
    if(hasPermission(roles,route)){
      if(route.children && route.children.length){
        route.children = filterAsynscRouter(route.children,roles)
      }
      return true;
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state :{
    routers:constantRouterMap,
    addRouters:[]
  },
  mutations:{
    SET_ROUTERS:(state,routers)=>{

      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers)

    }
  },
  actions:{
    GenerateRoutes({commit},data){
      return new Promise(resolve => {
        let accessedRouters;
        let userType = store.getters.userType;

        let asyncRouterMap;

        switch (userType) {
          case 1:
              removeToken();
              router.go(0);
                break;
          case 2 :
            //融资企业
            asyncRouterMap = asyncRouterMap_enterprise;
                break;
          case 3 :
            //金融机构
            asyncRouterMap = asyncRouterMap_financial;
                break;
          default:
            alert('账号为黑名单用户');
            break;
        }

        commit('SET_ROUTERS',asyncRouterMap);

        resolve()
      })
    }
  }
}
export default permission
