import ajax from '@/utils/ajax'
// import store from '@/store'

export function loginByUsername(username,password) {
  const data = {
    loginName:username,
    password
  }
  return ajax({
    url:'/user/login',
    method:'post',
    data
  })
}

export function getUserInfo() {

  // console.log(store.state.user.userType);

  return ajax({
    url: '/user/resources?',
    method: 'get',
  })

}
