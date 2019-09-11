<template>
  <div class="register-container">

    <div class="header">
      <div class="content">
        <a href="/"><h1 class="logo" :style="LogoCss"></h1></a>
      </div>
    </div>

    <div class="form-box">

      <div class="title-container">
        <h3>{{lang.title}}</h3>
      </div>
      <div class="step">

        <el-steps :active="active" align-center>
          <el-step title="邀请码激活"></el-step>
          <el-step title="填写注册信息"></el-step>
          <el-step title="注册成功"></el-step>
        </el-steps>
      </div>

      <div v-if="active == 0">
        <el-form
        class="complete-form"
        ref="loginForm"
        :rules="loginRules"
        :model="loginForm"
        auto-complete="on"
        label-position="right"
        label-width="151px">


        <el-form-item prop="companyName" label="企业名称">
          <el-input class=""
                    @blur="inputBlur"
            v-model="loginForm.companyName"
            :placeholder="lang.username"></el-input>
        </el-form-item>
        <el-form-item prop="invitationCode" label="邀请码">
          <el-input class=""
                    @blur="inputBlur"
            v-model="loginForm.invitationCode"
            :placeholder="lang.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="" class="checked-item">
          <div class="checked">
            <el-checkbox v-model="checked1"></el-checkbox>
            <span>已阅读并同意<a href="javascript:;" target="_blank">《借款申请人承诺》</a><a href="javascript:;" target="_blank">《贷款人声明》</a></span>
          </div>
        </el-form-item>
        <el-form-item label="" class="checked-item">
          <div class="checked">
            <el-checkbox v-model="checked2"></el-checkbox>
            <span>已阅读并同意<a href="javascript:;" target="_blank">《授权服务协议》</a><a href="javascript:;" target="_blank">《无限连带责任担保合同》</a></span>
          </div>
        </el-form-item>
        <p class="error" v-if="error">企业名称或邀请码错误</p>
        <el-button class="login-button" :loading="loading" :disabled="disabled" type="primary" @click.native.prevent="handleNext" >{{lang.logIn}}</el-button>

        <div class="sub-active">
          <div class="fl" @click="goBack">返回账户登录</div>
        </div>
      </el-form>

      </div>
      <div v-else>
        <el-form
          class="complete-form"
          ref="completeForm"
          :model="completeForm"
          auto-complete="on"
          label-position="right"
          label-width="151px"
          :rules="completeRules">

          <el-form-item prop="mobile" label="手机号" >
            <!--<el-input v-model="completeForm.mobile"></el-input>-->
            <p>{{completeForm.mobile}}</p>
          </el-form-item>
          <el-form-item prop="password" label="密码" >
            <el-input v-model="completeForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="passwordAgain" label="确认密码" >
            <el-input  v-model="completeForm.passwordAgain" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="companyEmail" label="邮箱">
            <el-input v-model="completeForm.companyEmail"></el-input>
          </el-form-item>
          <el-form-item  label="办公地址" prop="address">
            <el-form-item
              class="select-item"
              label="省/直辖市"
              label-width="80px">
                <el-select
                  class="register-input"
                  v-model="completeForm.provinceCode"
                  @change="choseProvince">
                  <el-option
                    v-for="item in provinces"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="select-item" label="市级" label-width="80px">
              <el-select
                v-model="completeForm.cityCode"
                class="register-input"
                @change="choseCity"
                placeholder="市级地区">
                <el-option
                  v-for="item in citys"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="select-item" label="地区" label-width="80px">
              <el-select
                v-model="completeForm.districtCode"
                class="register-input"
                placeholder="地区">
                <el-option
                  v-for="item in areas"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="select-item"  label="详细地址" label-width="80px">
              <el-input  class="width-244" v-model="completeForm.address" ></el-input>
            </el-form-item>
          </el-form-item>
          <el-button class="login-button" :loading="loading" type="primary" @click.native.prevent="handleLogin" >完成</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'
  import tool from '@/components/component/tool'
  import {reconstructionCode} from "@/utils/tree";
  import { Message } from 'element-ui';

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
          if(!value.length){
            callback(new Error('邀请码不能为空'));
          }else if(value.length < 6){
            callback(new Error('邀请码不得少于6位'));
          }else{
            callback(new Error(validate.msg));
          }
        }else{
          callback();
        }
      }
      const validatePhone = (rule,value,callback)=>{
        let validate = tool.validatePhoneNum(value);
        if(!validate.boolean){
          callback(new Error(validate.msg));
        }else{
          callback();
        }
      }

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.completeForm.passwordAgain !== '') {
            this.$refs.completeForm.validateField('passwordAgain');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.completeForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        loginRules:{
          companyName:[{required:true,trigger:'blur',validator:validateUsername,message:'请填写企业名称'}],
          invitationCode:[{required:true,trigger:'change',validator:validatePassword}],
        },
        completeRules:{
          mobile:[{required:true,trigger:'blur',validator:validatePhone,message:'请填写手机号'}],
          password:[{required:true,trigger:'blur',validator:validatePass}],
          passwordAgain:[{required:true,trigger:'blur',validator:validatePass2}],
          companyEmail:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          address:[
            { required: true, message: '请输入详细地址', trigger: 'blur' },
          ],

        },
        loginForm:{
          companyName:'',
          invitationCode:''
        },
        completeForm:{
          userType:2,
          mobile:'',
          password:'',
          passwordAgain:'',
          companyEmail:'',
          provinceCode:'',
          cityCode:'',
          districtCode:'',
          address:'',
          InviteCompanyId:''
        },
        provinces:[],
        citys:[],
        areas:[],
        lang:{
          title:'企业账号注册',
          username:'企业名称',
          password:'邀请码',
          logIn:'下一步'
        },
        checked1:false,
        checked2:false,
        disabled:true,
        loading:false,
        redirect:null,
        error:null,
        active:0,
        LogoCss:{
          backgroundImage:"url("+require("@/images/logo.png")+")"
        }
      }
    },
    beforeMount(){
      this.getCity();
    },
    methods:{
      inputBlur(item){
        if(item.srcElement.value){
          this.disabled = false;
        }else{
          this.disabled = true;
        }
      },
      goBack(){
        this.$router.push({path:'/login'});
      },
      getCity:function(){
        var _this = this;
        let storage = JSON.parse(localStorage.getItem('city'));
        if(storage && storage.length != 0){
          _this.provinces = storage;
        }else{
         new Promise((resolve,reject) => {
          ajax({
            url:'/city',
            method:'get',
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              _this.provinces = reconstructionCode(data.data);

              localStorage.setItem('city',JSON.stringify(_this.provinces))
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
        }
      },
       choseProvince:function(e) {
        // 选省
        for (var index in this.provinces) {
          if (e === this.provinces[index].code) {
            this.citys = this.provinces[index].children;
            this.areas =this.provinces[index].children[0].children;
            this.$set(this.completeForm,'cityCode', this.provinces[index].children[0].code);
            this.$set(this.completeForm,'districtCode', null);
          }
        }
      },
      // 选市
      choseCity:function(e) {
        for (var index3 in this.citys) {
          if (e === this.citys[index3].code) {
            this.areas = this.citys[index3].children;
            // this.dialogForm.districtCode = this.citys[index3].children[0].code;
            this.$set(this.completeForm,'districtCode',this.citys[index3].children[0].code);

          }
        }
      },
      handleNext(){
        var _this = this;

        this.$refs.loginForm.validate(valid => {

          if(valid){
            if(!this.checked1 || !this.checked2){
              Message.error('请同意相关协议');
              return false;
            }
            _this.loading = true;
            let url = `/sys/invite-company/verify`;
            new Promise((resolve,reject) => {
              ajax({
                url:url,
                method:'post',
                data:_this.loginForm
              }).then(function (res) {
                let data = res.data;
                if(data.code == 1){
                  _this.active = 1;
                  _this.completeForm.InviteCompanyId = data.data.id;
                  _this.completeForm.mobile = data.data.mobile;
                }else{
                  Message.error(data.msg);
                }

                _this.loading = false;

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
      handleLogin(){
        var _this = this;
        this.$refs.completeForm.validate(valid => {

          if(valid){

            _this.loading = true;
            let url = `/user/register`;

            new Promise((resolve,reject) => {
              ajax({
                url:url,
                method:'post',
                data:_this.completeForm
              }).then(function (res) {
                let data = res.data;
                if(data.code == 1){
                  _this.active = 3;
                  Message.success(data.msg);
                  _this.$router.push({path:'/login'});

                }else{
                  Message.error(data.msg);
                }
                _this.loading = true;

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

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #222;
  $blue: #3e8ae5;

  .complete-form{
    .el-form-item__content{
      text-align: left;
    }
    .el-input{
      width: 324px;
    }
    .select-item{
      margin-bottom: 10px;
      .el-form-item__label{
        color: #999999;
      }
      .el-form-item__label:before{
        display: none;
      }
      .width-244{
        width: 244px;
      }
    }
    .register-input{
      .el-input{
        width: 244px;
      }
    }
    .checked-item{
      margin-bottom: 0;
    }
  }

  .register-container .el-checkbox{
    margin-right: 5px;
  }
  .el-step{
    .el-step__head.is-process{
      border-color: $blue;
      color: $blue;
    }
    .el-step__title.is-process{
      color: $blue;
    }
  }

</style>


<style rel="stylesheet/scss"  scoped lang="scss">
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
$blue:#409EFF;
  .h-10{
    height: 10px;
  }
  .sub-active{
    font-size: 14px;
    width: 390px;
    color: #333;
    margin: 10px auto 0;
    cursor: pointer;
  }
  .register-container{
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
    .step{
      margin-bottom: 50px;
    }
    .form-box{
      width: 560px;
      min-height: 442px;
      color: #333;
      background: #fff;
      margin: 100px auto 0;
      padding: 50px 0 0;

    }
    .complete-form{
      padding-bottom: 50px;
    }
    .error{
      text-align: center;
      color: #f56c6c;
      font-size: 12px;
      line-height: 1;
      height: 12px;
    }
    .checked{
      color: #333333;
      font-size: 12px;
      a{
        font-style: normal;
        color: $blue;
        cursor: pointer;
      }
    }
    .login-button{
      width: 390px;
      height: 40px;
      margin-top: 18px;
    }
  }

</style>
