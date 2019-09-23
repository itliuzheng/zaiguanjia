<template>
  <div class="navbar">
    <h1 class="logo-text">{{title}}</h1>
    <div class="fl" ></div>
    <div class="right-menu">
      <div class="fl process go-home">
        <router-link to="/">首页</router-link>
      </div>
      <div class="fl process ">
        <p>{{username}},欢迎您！</p>
      </div>
      <div class="fl process go-out" @click="logout">
        <p>登出</p>
      </div>
    </div>
  </div>
</template>
<script>
  import Hamburger from '@/components/Hamburger'
  import router from '@/router'
  import ajax from '@/utils/ajax'
  // import store from 'store'

  export default {
    components:{
      Hamburger,
    },
    data(){
      let username =  this.$store.getters.name;

      return {
        title:'资产管理后台',
        username:username,
        processd:process.env.srconfig == 'pro'?'生产环境':'测试环境',
        homeIndex:'',
        product:[{
          "id": "",  //主键
          "name": "", //产品名称
          "createDate": "", //date
          "delFlag": "", //删除标识：1-删除，0-正常
          "remark": "" //备注
        }],
      }
    },
    methods:{
      toggleSideBar(){},
      logout(){
        let _this = this;
        this.$store.dispatch('LogOut').then(() => {
          // location.reload()// In order to re-instantiate the vue-router object to avoid bugs
          router.go(0)
        })
      }
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  $blue-text:#4b96f0;
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .logo-text{
    color: #fff;
    float: left;
    font-size: 20px;
    width: 200px;
    text-align: center;
    /*background: url("~@/images/wuliu-logo.png") no-repeat center;*/
    /*text-indent:-999em;*/
    /*-webkit-background-size: auto 36px;*/
    /*background-size: auto 36px;*/
    background-color: #4b96f0;
  }
  .hamburger-container {
    height: 50px;
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    color: #333;
    padding-right: 40px;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 60px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        color: #333;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
      }
    }
  }
}
  .process{
    margin-left: 40px;
    position: relative;
    padding-left: 35px;
    &:before{
      content: '';
      width: 26px;
      height: 26px;
      position: absolute;
      left: 0;
      top: 50%;
      -webkit-transform: translate(0, -50%);
      -moz-transform: translate(0, -50%);
      -ms-transform: translate(0, -50%);
      -o-transform: translate(0, -50%);
      transform: translate(0, -50%);
      background: url("~@/images/layout_admin/yonghu.png") no-repeat;
      -webkit-background-size: 100%;
      background-size: 100%;
    }
  }
  .go-home:before{
    background: url("~@/images/layout_admin/shouye.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
  }
  .go-out:before{
    background: url("~@/images/layout_admin/tuichu.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;

  }
  .go-home,.go-out{
    cursor: pointer;
    &:hover{
      color: #4b96f0;
    }
  }
</style>
