<template>
  <div class="login-container" >
    <el-form
      class="login-form"
      ref="loginForm"
      :model="loginForm"
      auto-complete="on"
      label-position="left"
      :rules="loginRules">

      <div class="fl form-left">
        <div class="title-container">
          <h3>{{lang.title}}</h3>
        </div>

        <el-form-item class="width-246" prop="username">
          <el-input
            class="customize-input"
            v-model="loginForm.username"
            :placeholder="lang.username"
            name="username"
            type="text"
            prefix-icon="el-icon-user"
            auto-complete="on">
             <!--<i slot="prefix" class="el-icon-user" style="left:20px;"></i>-->
          </el-input>
        </el-form-item>
        <el-form-item class="width-246"  prop="password">
          <el-input
            class="customize-input"
            v-model="loginForm.password"
            :placeholder="lang.password"
            name="passwod"
            type="password"
            auto-complete="on"
            prefix-icon="el-icon-lock"
            @keyup.enter.native="handleLogin">
             <!--<i slot="prefix" class="el-input__icon el-icon-lock"></i>-->
          </el-input>
        </el-form-item>
        <p class="error" v-if="error">用户名或密码错误</p>
        <el-button class="login-button" :loading="loading" type="primary" @click.native.prevent="handleLogin" >{{lang.logIn}}</el-button>
        <div class="sub-active">
          <div class="fl" @click="goActivationPage">邀请码激活</div>
          <div class="fr" @click="forget">忘记密码</div>
        </div>
      </div>
      <div class="fl image-left">
        <img :src="require('@/images/login_bj.png')" alt="">
      </div>


    </el-form>
  </div>
</template>
<script>
  import tool from '@/components/component/tool'

  export default {
    name:'login',
    data(){
      const validateUsername = (rule,value,callback) =>{
        let validate = tool.validateRealName(value);
        if(!validate.boolean){
          callback(new Error(validate.msg));
        }else{
          callback();
        }
      }
      const validatePassword = (rule,value,callback)=>{
        let validate = tool.validatePassword(value);
        if(!validate.boolean){
          callback(new Error(validate.msg));
        }else{
          callback();
        }
      }
      return {
        loginRules:{
          username:[{required:true,trigger:'blur',validator:validateUsername,message:'请填写用户名'}],
          password:[{required:true,trigger:'blur',validator:validatePassword}]
        },
        loginForm:{
          username:'',
          password:''
        },
        lang:{
          title:'账户登录',
          username:'用户名',
          password:'密码',
          logIn:'登录'
        },
        loading:false,
        redirect:null,
        error:null,
      }
    },
    watch:{
      $route:{
        handler:function(route){   //其值是一个回调函数。即监听到变化时应该执行的函数
          this.redirect = route.query && route.query.redirect
        },
        // deep  其值是true或false；确认是否深入监听。（一般监听时是不能监听到对象属性值的变化的，数组的值变化可以听到。）
        immediate:true //其值是true或false；确认是否以当前的初始值执行handler的函数。
      }
    },
    methods:{
      goActivationPage(){
        this.$router.push({path:'/activationPage'});
      },
      forget(){
        this.$router.push({path:'/forget'});
      },
      handleLogin(){
        var _this = this;
        this.$refs.loginForm.validate(valid => {

          _this.error = false;
          if(valid){
            _this.loading = true;

            _this.$store.dispatch('LoginByUsername',_this.loginForm).then(()=>{
              _this.loading = false;
              _this.$router.push({path:_this.redirect||'/'});
            }).catch((error)=>{
              _this.loading = false;
              _this.error = true;
            })

          }else{
            console.log('error submit!');
            return false;
          }
        })
      }
    }
  }
</script>


<style rel="stylesheet/scss"  lang="scss">

      .login-container .el-input__icon{
        padding-left: 12px;
      }
</style>


<style rel="stylesheet/scss"  scoped lang="scss">
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

  .web_bg{

  }

  .form-left{
    width: 500px;
  }
  .image-left{
    img{
      width: 100%;
      height: 620px;
    }
  }
  .login-container{
    background: -webkit-linear-gradient(160deg, #496fbd 49%, #8caada 51%);
    padding-top: 230px;
    height: 100%;
    min-height: 1080px;
    .logo{
      width: 260px;
      height: 100px;
      -webkit-background-size: 100%;
      background-size: 100%;
      margin: 0 auto;
    }
    .title-container{
      text-align: center;
      color: #333;
      font-size: 20px;
      font-weight: 500;
      line-height: 1;
      padding-top: 150px;
      margin-bottom: 60px;
    }
    .login-form{
      width: 1000px;
      height: 620px;
      margin: 0 auto;
      background:#fff;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
    }
    .width-246{
      width: 246px;
      margin: 0 auto 24px;
    }
    .error{
      text-align: center;
      color: #f56c6c;
      font-size: 12px;
      line-height: 1;
      height: 12px;
    }
  }
  .login-button{
    width: 240px;
    margin-top: 6px;
  }
  .sub-active{
    color: #333333;
    font-size: 14px;
    margin: 10px auto 0;
    cursor: pointer;
    width: 240px;
    .fr{
      color: #de2b2b;
    }
  }

</style>
