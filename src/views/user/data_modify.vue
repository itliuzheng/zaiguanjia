<template>
  <div>

    <div v-if="type == 'user'">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="姓名：">
          <el-input v-model="form.contactPerson"></el-input>
        </el-form-item>
        <el-form-item label="手机：">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="form.contactEmail"></el-input>
        </el-form-item>
        <el-form-item label="职务：">
          <el-input v-model="form.position"></el-input>
        </el-form-item>
        <div>
          <el-button type="primary" @click="onSubmit">保 存</el-button>
          <el-button @click="goBack">返 回</el-button>
        </div>
      </el-form>
    </div>
    <div v-else>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item :label="userType == 4?'监管方全称：':'机构全称：'">
          <el-input v-model="form.companyName"></el-input>
        </el-form-item>
        <el-form-item label="注册资金(万)：">
          <el-input v-model="form.registeredCapital"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人：">
          <el-input v-model="form.legalPerson"></el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input v-model="form.companyPhone"></el-input>
        </el-form-item>
        <el-form-item label="传真：">
          <el-input v-model="form.fax"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="form.companyEmail"></el-input>
        </el-form-item>
        <div>
          <el-button type="primary" @click="onSubmit">保 存</el-button>
          <el-button @click="goBack">返 回</el-button>
        </div>
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
      let userType = this.$store.getters.userType;
      return {
        userType:userType,
        api_init:'/user/',
        api:'/user/update',
        type:'qiye',
        form: {}
      }
    },
    beforeMount(){
      this.type = this.$route.query.type;
      this.ajaxPage();
    },
    methods:{
      ajaxPage:function (page) {
         let url = `${this.api_init}get`;

        var _this = this;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'get',
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.form = data.data;
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      onSubmit(){
        var _this = this;
        this.$refs.form.validate(valid => {
          if(valid){
            new Promise((resolve,reject) => {
              ajax({
                url:`${_this.api}`,
                method:'post',
                data:_this.form
              }).then(function (res) {
                let data = res.data;
                if(data.code == 1){
                  _this.$message.success(data.msg);
                  _this.$router.go(-1);
                }else{
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
      goBack() {
        this.$router.go(-1)
      },
    },
  }
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
  button{
    width: 120px;
    margin-right: 70px;
  }
</style>
