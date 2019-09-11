<template>
  <div class="forget-container">
    <div class="header">
      <div class="content">
        <h1 class="logo" :style="LogoCss"></h1>
      </div>
    </div>
    <div v-if="is_code">

      <el-form
        class="forget-form"
        ref="loginForm"
        :model="loginForm"
        label-position="left"
        :rules="loginRules">

        <div class="title-container">
          <h3>手机验证</h3>
        </div>

        <el-form-item
          label="+86"
          label-width="46px"
          prop="mobile">
          <el-input
            class="width-240"
            v-model.number="loginForm.mobile"
            placeholder="请输入注册手机号"
            clearable
            type="text"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
          ></el-input>
          <el-button class="button-absoulte" @click="getSms">{{getSmsText}}</el-button>
        </el-form-item>
        <el-button class="login-button" :loading="loading" type="primary" @click.native.prevent="handleNext" >确定</el-button>
        <div class="sub-active clearfix">
          <div class="fl" @click="goBack">返回</div>
        </div>
      </el-form>

    </div>
    <div class="modify-password" v-else>

      <el-form
        class="forget-form"
        ref="passwordForm"
        :model="passwordForm"
        label-position="right"
        label-width="100px"
        :rules="passowrdRules">

        <div class="title-container">
          <h3>修改密码</h3>
        </div>

        <!--<span class="forget-label">新密码</span>-->
        <el-form-item
          label="新密码"
          prop="password">
          <el-input
            v-model="passwordForm.password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item prop="passwordAgain"
          label="确认密码">
          <el-input
            v-model="passwordForm.passwordAgain" placeholder="再次输入新密码"></el-input>
        </el-form-item>
        <el-button class="login-button" :loading="loading" type="primary"
                   @click.native.prevent="handlePassword" >确定</el-button>
        <div class="sub-active clearfix">
          <div class="fl" @click="goBack">返回</div>
        </div>
      </el-form>
    </div>

  </div>
</template>
<script>
  import ajax from '@/utils/ajax'
  import tool from '@/components/component/tool'

  export default {
    name:'login',
    data(){
      const validatePhone = (rule,value,callback)=>{
        let validate = tool.validatePhoneNum(value);
        if(!validate.boolean){
          callback(new Error(validate.msg));
        }else{
          callback();
        }
      }
      const validateSms = (rule,value,callback)=>{
        let validate = tool.validateSms(value);
        if(!validate.boolean){
          callback(new Error(validate.msg));
        }else{
          callback();
        }
      }

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          callback(new Error('密码不能小于六位'));
        }else {
          if (this.passwordForm.passwordAgain !== '') {
            this.$refs.passwordForm.validateField('passwordAgain');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passwordForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      //process.env.NODE_ENV == 'development'?'测试环境':'生产环境'

      let _this = this;
      return {
        forget_api:process.env.srconfig == 'pro'?'http://119.147.171.108':'http://119.147.171.111:81',
        sms_api:`${_this.forget_api}/sms/sms/validateCode`,
        loginRules:{
          mobile:[
            {trigger:'blur',validator:validatePhone},
            {type:'number',message:'必须为数字'},

          ],
          code:[{required:true,trigger:'blur',validator:validateSms}]
        },
        passowrdRules:{
          password:[{required:true,trigger:'blur',validator:validatePass}],
          passwordAgain:[{required:true,trigger:'blur',validator:validatePass2}],

        },
        loginForm:{
          mobile:'',
          code:''
        },
        passwordForm:{
          password:'',
          passwordAgain:''
        },
        getSmsText:'获取验证码',
        loading:false,
        redirect:null,
        is_code:true,
        LogoCss:{
          backgroundImage:"url("+require("../../images/logo.png")+")"
        }
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
      goBack(){
        this.$router.push({path:'/login'});
      },
      getSms(){

        var _this = this;
        // this.$refs.loginForm.validateField('mobile');

        this.$refs['loginForm'].validateField('mobile',(validMessage)=>{
            if(validMessage != ""){
                return false;
            }

            new Promise((resolve,reject) => {
              ajax({
                url:_this.sms_api+`?mobile=${_this.loginForm.mobile}`,
                method:'post',
              }).then(function (res) {
                let data = res.data;
                if(data.code == 1){
                  _this.$message.success(data.data);
                //  getSmsText
                }else{
                  _this.$message.error(data.msg);
                }

              }).catch(error => {
                reject(error)
              })
             })

        })

      },
      handleNext(){
        var _this = this;
        this.$refs.loginForm.validate(valid => {

          if(valid){

            _this.loading = true;
            new Promise((resolve,reject) => {
              ajax({
                url:`/user/validate/mobile`,
                method:'post',
                data:{
                  mobile:_this.loginForm.mobile,
                  code:_this.loginForm.code
                }
              }).then(function (res) {
                let data = res.data;
                if(data.code == 1){
                  _this.loading = false;
                  _this.is_code = false;
                }else{
                  _this.loading = false;
                  _this.$message.error(data.msg);
                }

              }).catch(error => {
                reject(error)
              })
             })

          }else{
            console.log('error submit!');
            return false;
          }
        })
      },
      handlePassword(){
        var _this = this;
        this.$refs.passwordForm.validate(valid => {
          if(valid){
            _this.loading = true;
            new Promise((resolve,reject) => {
              ajax({
                url:`/user/forget/password`,
                method:'post',
                data:{
                  mobile:_this.loginForm.mobile,
                  password:_this.passwordForm.password,
                  passwordAgain:_this.passwordForm.passwordAgain
                }
              }).then(function (res) {
                let data = res.data;
                if(data.code == 1){
                  _this.loading = false;

                  _this.$message.success('修改密码成功，请重新登录');
                  _this.$router.push({path:'/login'});
                }else{
                  _this.is_code = true;
                  _this.loading = false;
                  _this.$message.error(data.msg);
                }

              }).catch(error => {
                reject(error)
              })
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
  /* 修复input 背景不协调 和光标变色 */
  $blue:#3e8ae5;
  $bg:#283443;
  $light_gray:#333;
  $cursor: #222;

    .forget-container {
      .el-form-item{
        width: 290px;
        margin: 0 auto 20px;
        border:1px solid #dddddd;
        background: none;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0;
      }
      .el-form-item__content{
        text-align: left;
      }
      .el-input {
        display: inline-block;
        height: 40px;
        input {
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          color: $light_gray;
          height: 40px;
          caret-color: $cursor;
          /*
          &:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
            -webkit-text-fill-color: $cursor !important;
          }
          */
        }
      }
      .login-button{
        width: 290px;
      }
      .el-form-item__label{
        color: #3e8ae5;
        line-height: 40px;
        text-align: center;
        border-right: 1px solid #dddddd;
      }
    }


</style>


<style rel="stylesheet/scss"  scoped lang="scss">
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
  $blue:#3e8ae5;

    .width-240{
      width: 240px;
    }
  .forget-container{
    min-height: 100%;
    background: #f0f0f0;
    .header{
      width: 100%;
      height: 100px;
      background: #fff;
      .content{
        width: 1200px;
        margin: 0 auto;
        padding-top: 20px;
      }
    }
    .logo{
      height: 60px;
      -webkit-background-size: auto 100%;
      background-size: auto 100%;
      background-repeat: no-repeat;
    }
    .title-container{
      text-align: center;
      color: #333;
      font-weight: 500;
      margin-bottom: 30px;
    }
    .button-absoulte{
      position: absolute;
      top: 1px;
      height: 39px;
      border: 0 none;
      color: $blue;
      border-left: 1px solid #ddd;
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0;
      right: 0;
    }
    .forget-label{
      color: #fff;
      padding: 0 15px;
      display: inline-block;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
    }
    .modify-password{
      .forget-label{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        line-height: 50px;
        width: 80px;
        text-align: center;
      }
    }
    .forget-form{
      width: 530px;
      height: 322px;
      color: #333;
      background: #fff;
      margin: 100px auto;
      padding-top: 50px;
    }
  }
  .sub-active{
    width: 290px;
    margin: 10px auto 0;
    color: #333;
    cursor: pointer;
    font-size: 14px;
  }

</style>
