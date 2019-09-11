<template>
  <div class="main">
    <div v-if="active == -1"></div>
    <div v-else-if="active != 3">
      <div class="top-step padding-20" >
        <p class="l-text">认证流程说明：录入上传企业信息>>风控审核>>认证成功</p>
        <div class="step" v-if=" active == 0">
          <h2>资料录入说明</h2>
          <el-steps :active="entry_active" align-center>
            <el-step title=" " description="企业信息录入"></el-step>
            <el-step title=" " description="申请人信息录入"></el-step>
            <el-step title=" " description="联系人信息录入"></el-step>
            <el-step title=" " description="增信信息录入"></el-step>
          </el-steps>
        </div>
      </div>
      <div class="entry-box padding-20">
        <div v-if="active == 0">
          <corporate-info ref="is_validate" :entry_active="entry_active" @onChangeValue="changeValue" :title="initTitle" ></corporate-info>
        </div>
        <div v-else class="step-sub">
          <div v-if="active == 2">
            <p class="reason-title">
              您的企业信息已经提交，正在验证和审核您的信息<br/>
              请耐心等待，我们会通过<span class="blue">电话</span>以及<span class="blue">短信</span>方式与您联系并反馈结果，敬请留意！
            </p>
          </div>
          <div v-else-if="active == 4">
            <img src="@/images/icon/date_end.png" alt="">
            <p class="red" style="margin-top: 20px;">很遗憾此次认证未通过！</p>
            <el-button @click="changeActive" type="primary" plain v-if="data.buttonAvailable">继续认证</el-button>
          </div>
          <!--<div v-else-if="active == 5">-->
            <!--<p class="red">{{data.statusName}}</p>-->
            <!--<p class="height-20"></p>-->
            <!--<el-button @click="changeActive" type="primary" plain v-if="data.buttonAvailable">继续认证</el-button>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <div v-else>

      <div class="padding-20">
        <div class="clearfix">
          <p  v-if="edit_show"></p>
          <p class="text-right" @click="editActive(true)" v-else>返回</p>
        </div>
        <corporate-info-end v-if="edit_show" ></corporate-info-end>

        <corporate-info v-else ref="is_validate" @onChangeValue="changeValue" title="edit" ></corporate-info>
      </div>
    </div>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'
  import GET_STATUS from '@/utils/getStatus'
  import {CorporateInfo,CorporateInfoEnd} from "./component";

  export default {
    components: {
      CorporateInfoEnd,
      CorporateInfo,
    },
    data(){
      let userType = this.$store.getters.userType;

      return {
        active:-1,
        entry_active:0,
        GET_STATUS:GET_STATUS,
        api:'/corporate/financing-company-info/',
        userType:userType,
        info:{},
        data:{},
        edit_show:true,
        initTitle:''
      }
    },
    beforeMount:function(){

      // this.active = 0
      this.getInit();
    },
    methods:{
      editActive(data){
        this.edit_show = data;
      },
      getInit(){

        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        let url = `${this.api}get-status`;
        var _this = this;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'get',
          }).then(function (res) {
            loading.close();
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.data = data.data;

                if(data.data.status == GET_STATUS.APPROVAL_SUCCESS){
                  _this.active = 3;     //审批通过
                }else if(data.data.status == GET_STATUS.MACHINE_AUDIT || data.data.status == GET_STATUS.MACHINE_AUDIT_SUCCESS || data.data.status == GET_STATUS.TO_BE_MATCHED || data.data.status == GET_STATUS.PENDING){
                  _this.active = 2;     //认证中
                }else if(data.data.status == GET_STATUS.MACHINE_APPLICATION_REJECTION || data.data.status == GET_STATUS.APPROVAL_REJECTION || data.data.status == GET_STATUS.MACHINE_AUDIT_REJECTION ){
                  _this.active = 4;     //认证失败
                }else if(data.data.status == GET_STATUS.CREDIT_EXPIRED || data.data.status == GET_STATUS.REGULATOR_CREDIT_END){
                  // _this.active = 5;     //到期
                  _this.active = 4;   //暂时没有到期状态
                }else{
                  _this.active = 0;
                  _this.getStatus();
                }
              }else{
                _this.active = 0;
              }
            }else{
              _this.active = 0;
            }

          }).catch(error => {
            reject(error)
          })
         })

      },
      getStatus(){
        let url = `${this.api}authenticate-info`;
        var _this = this;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'get',
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                if(!data.data.companyInfo){
                  _this.entry_active = 0;
                }else if(!data.data.authorizedInfo){
                  _this.entry_active = 1;
                }else if(!data.data.contactInfo){
                  _this.entry_active = 2;
                }else{
                  _this.entry_active = 3;
                }

              }
            }
          }).catch(error => {
            reject(error)
          })
         })

      },
      changeValue(value,info){
        console.log('changeValue==',value);
        console.log('changeValue==',info);

        if(value++ > 3){
          this.entry_active = 0;
        }else{
          this.entry_active = value;
        }
      },
      changeActive(){
        this.initTitle = 'edit';
        this.active = 0;
      }
    }
  }
</script>
<style lang="scss">
  .step{
    .el-step__title{
      height: 20px;
    }
  }
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
  #app .main-container .main{
    padding: 0;
    margin: 0;
  }
  .padding-20{
    padding: 0 20px;

  }
  .top-step{
    margin-bottom: 60px;
    .l-text{
      font-size: 16px;
      color: #666;
      text-align: left;
      margin-bottom: 60px;
    }
  }
  .step{
    h2{
      margin-bottom: 50px;
    }
  }
  .entry-box{
    border-top: 10px solid #f0f0f0;
  }
  .blue{
    color: $blue;
  }
  .red{
    color: #de2b2b;
    line-height: 1;
  }
  .text-right{
    float: right;
    text-align: right;
    color: $blue;
    cursor: pointer;
    padding-right: 20px;
  }
  .step-sub{
    margin-top: 60px;
    a{
      font-size: 14px;
      line-height: 2;
      font-weight: bold;
    }
    .reason-title{
      font-weight: bold;
      line-height: 34px;
      margin-top: 10px;
      font-size: 14px;
    }
    .reason{
      width: 450px;
      max-height: 180px;
      border: 1px solid #ddd;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      margin: 0 auto 30px;
      padding: 15px;
      li{
        line-height: 24px;
        font-size: 14px;
        color: #333;

      }
    }
  }
  .height-20{
    height: 20px;
  }
</style>
