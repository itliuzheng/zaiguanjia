// export const currentUser = state => state.currentUser;
// export const isLogin = state => state.isLogin;
const getters ={
  sidebar:state => state.app.sidebar,
  token: state => state.user.token,
  financingType: state => state.user.financingType,
  userType: state => state.user.userType,
  userId: state => state.user.userId,

  // avatar: state => state.user.avatar,
  name: state => state.user.name,
  // introduction: state => state.user.introduction,
  // status: state => state.user.status,
  roles: state => state.user.roles,
  // setting: state => state.user.setting
  permission_routers:state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
}

export default getters
