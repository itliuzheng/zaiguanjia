import router from "./router";
import store from './store'
import {getToken} from "@/utils/token";
import { Message } from 'element-ui'

const whiteList = ['/','/hall_list/','/about','/about/','/introduction/'];


// permission judge function
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

router.beforeEach((to,from,next) =>{

  let token = getToken();


  if(token){
    if(to.path === '/login'){
      next({path:'/'});
    }else{
      next()
    }
  }else{

    let url = to.path;
    if(url[url.length-1] != '/'){
      url = url+'/';
    }
    if(whiteList.indexOf(url) != -1 ){ // 在免登录白名单，直接进入
      next();
    }else{
      next('/');
    }
  }

  let length = to.meta.meta? to.meta.meta.length: 0;
  //路由发生变化修改页面meta
  if(length){
    for(let i = 0;i<length;i++){
      let head = document.getElementsByTagName('head');
      let meta = document.createElement('meta');
      meta.name = to.meta.meta[i].name;
      meta.content = to.meta.meta[i].content;
      head[0].appendChild(meta);
    }
  }

  //路由发生变化修改页面title
  if(to.meta.title){
    document.title = to.meta.title;
  }


});
