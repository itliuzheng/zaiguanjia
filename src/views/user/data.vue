<template>
  <div>

    <div class="form-modify" v-if="userType == 2">

      <el-form class="desc" :model="dialogForm" ref="form" label-position="right" label-width="120px">
        <el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="dialogForm.loginName" :disabled="true"></el-input>
            <!--<a href="/#/password"><el-button>修改密码</el-button></a>-->
            <router-link to="/password"><el-button>修改密码</el-button></router-link>

          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="dialogForm.mobile" :disabled="true"></el-input>
            <!--<a href="/mobile"><el-button>修改</el-button></a>-->
            <router-link to="/mobile"><el-button>修改</el-button></router-link>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="dialogForm.companyEmail" ></el-input>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <div class="header">
        <p class="fl">企业信息</p>
        <a href="#/user/data/modify?type=qiye"><el-button class="fr" type="primary" >修改</el-button></a>
      </div>
      <div class="content">
        <table>
          <tr>
            <td v-if="userType ==3">机构全称</td>
            <td v-if="userType ==4">监管方全称</td>
            <td>{{page.companyName}}</td>
          </tr>
          <tr>
            <td>注册资金（万）</td>
            <td>{{page.registeredCapital}}</td>
          </tr>
          <tr>
            <td>法定代表人</td>
            <td>{{page.legalPerson}}</td>
          </tr>
          <tr>
            <td>地址</td>
            <td>{{page.address}}</td>
          </tr>
          <tr>
            <td>电话</td>
            <td>{{page.companyPhone}}</td>
          </tr>
          <tr>
            <td>传真</td>
            <td>{{page.fax}}</td>
          </tr>
          <tr>
            <td>邮箱</td>
            <td>{{page.companyEmail}}</td>
          </tr>
        </table>
      </div>
      <div class="header">
        <p class="fl">联系人</p>
        <a href="#/user/data/modify?type=user"><el-button class="fr" type="primary" >修改</el-button></a>
      </div>
      <div class="content">
        <table>
          <tr>
            <td>姓名</td>
            <td>{{page.contactPerson}}</td>
          </tr>
          <tr>
            <td>手机</td>
            <td>{{page.mobile}}</td>
          </tr>
          <tr>
            <td>邮箱</td>
            <td>{{page.contactEmail}}</td>
          </tr>
          <tr>
            <td>职务</td>
            <td>{{page.position}}</td>
          </tr>
        </table>
      </div>
    </div>

  </div>
</template>
<script>
  import ajax from '@/utils/ajax'

  export default {
    data(){
      let userType = this.$store.getters.userType;

      return {
        userType:userType,
        api:'/user/',
        activeName: 'first',
        dialogForm:{},
        page:{}
      }
    },
    beforeMount:function(){

      this.ajaxPage(1);
    },
    methods:{
      ajaxPage:function (page) {
         let url = `${this.api}get`;

        var _this = this;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'get',
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.page = data.data;
                _this.dialogForm = data.data;
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      handleClick(tab, event) {

      },
    },
  }
</script>
<style lang="scss">
  .form-modify{
    margin: 0 auto;
    .el-form-item__content{
      text-align: left;
      .el-input{
        width: 200px;
        margin-right: 20px;
      }
    }
    .el-form-item{
      margin-bottom: 20px;
    }
  }
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
    .header{
      height: 70px;
      p{
        font-size: 16px;
        color: #333;
        line-height: 70px;
        font-weight: bold;
      }
      button{
        margin-top: 19px;
        padding-top: 8px;
        padding-bottom: 8px;
      }
    }
    table{
      td{
        border: 1px solid #ececec;
        height: 50px;
      }
      tr{
        td:first-child{
          background: #f4f6f9;
          width: 240px;
        }
      }
    }
</style>
