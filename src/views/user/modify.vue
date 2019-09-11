<template>
  <div class="main">
    <div class="user-box">
      <!--<el-form ref="form" :model="form" label-width="120px">-->
        <!--<el-form-item-->
          <!--label="旧密码"-->
          <!--prop="oldPassword">-->
          <!--<el-input-->
            <!--v-model="passwordForm.oldPassword" placeholder="请输入新密码"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item-->
          <!--label="新密码"-->
          <!--prop="password">-->
          <!--<el-input-->
            <!--v-model="passwordForm.password" placeholder="请输入新密码"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item prop="passwordAgain"-->
          <!--label="确认密码">-->
          <!--<el-input-->
            <!--v-model="passwordForm.passwordAgain" placeholder="再次输入新密码"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-button type="primary" @click="onSubmit">提 交</el-button>-->
      <!--</el-form>-->

      <el-form
        class="forget-form"
        ref="passwordForm"
        :model="passwordForm"
        label-position="right"
        label-width="100px"
        :rules="passowrdRules">
        <el-form-item
          label="旧密码"
          prop="oldPassword">
          <el-input
            v-model="passwordForm.oldPassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
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
        <el-button class="login-button" :loading="loading" type="primary" @click.native.prevent="handlePassword" >确定</el-button>
      </el-form>

    </div>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'

  export default {
    components:{
    },
    data(){
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

      return {
        passowrdRules:{
          oldPassword:[{required:true,trigger:'blur',validator:validatePass}],
          password:[{required:true,trigger:'blur',validator:validatePass}],
          passwordAgain:[{required:true,trigger:'blur',validator:validatePass2}],

        },
        passwordForm:{
          password:'',
          passwordAgain:''
        },
        loading:false,
      }
    },
    beforeMount(){
    },
    methods:{
      handlePassword(){
        var _this = this;
        this.$refs.passwordForm.validate(valid => {
          if(valid){
            _this.loading = true;
            new Promise((resolve,reject) => {
              ajax({
                url:`/user/change/password`,
                method:'post',
                data:{
                  oldPassword:_this.passwordForm.oldPassword,
                  password:_this.passwordForm.password,
                  passwordAgain:_this.passwordForm.passwordAgain
                }
              }).then(function (res) {
                let data = res.data;
                if(data.code == 1){
                  _this.loading = false;

                    _this.$store.dispatch('FedLogOut').then(() => {
                      _this.$message.success('修改密码成功，请重新登录');
                      _this.$router.push({path:'/login'});
                    });
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
      }
    },
  }
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
  .user-box{
    width: 770px;
    margin: 0 auto;
  }
  button{
    width: 120px;
  }
</style>
