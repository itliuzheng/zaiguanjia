<template>
  <div class="main">
    <div class="table-header clearfix">
      <div class="header fl">企业认证申请</div>
      <div class="fr">
        <el-button class="el-button el-button--primary button-fr"  @click="goBack">返回</el-button>
      </div>
    </div>

    <table>
      <tr>
        <th>企业名称</th>
        <th>{{data.companyName}}</th>
        <th>被授权人姓名</th>
        <th>{{data.authorizedName}}</th>
      </tr>
      <tr>
        <th>提交时间</th>
        <th>{{data.createDate}}</th>
        <th>被授权人手机</th>
        <th>{{data.authorizedContactNumber}}</th>
      </tr>
      <tr>
        <th>注册手机</th>
        <th>{{data.registerMobile}}</th>
      </tr>
    </table>

    <div>

      <el-collapse class="t-l-box" v-model="activeNames" @change="handleChange">
        <el-collapse-item title="企业基本信息" name="1">
          <table>
            <tr>
              <th style="width:150px">企业全称</th>
              <th>{{data.companyName}}</th>
              <th>简称</th>
              <th>{{data.companyShortName}}</th>
              <th>简拼</th>
              <th>{{data.companyShortSpell}}</th>
            </tr>
            <tr>
              <th style="width:150px">社会信用统一代码</th>
              <th>{{data.socialCreditCode}}</th>
              <th>企业类型</th>
              <th>{{data.companyType}}</th>
              <th>法定代表人</th>
              <th>{{data.legalName}}</th>
            </tr>
            <tr>
              <th style="width:150px">营业期限</th>
              <th>{{data.operatingPeriod}}</th>
              <th>成立日期</th>
              <th>{{data.establishmentDate | dateFormat}}</th>
              <th>注册资本（万）</th>
              <th>{{data.registeredCapital}}</th>
            </tr>
            <tr>
              <th style="width:150px">登记机关</th>
              <th>{{data.registrationAuthority}}</th>
              <th>地址</th>
              <th>{{data.address}}</th>
              <th>联系电话</th>
              <th>{{data.contactNumber}}</th>
            </tr>
          </table>
          <table>
            <tr>
              <th style="width:150px">经营范围</th>
              <th>{{data.businessScope}}</th>
            </tr>
          </table>
          <div class="businessLicenseUrl">
            <img :src="data.businessLicenseUrl" alt="营业执照">
          </div>
        </el-collapse-item>
        <el-collapse-item title="法定代表人信息" name="2">
          <table>
            <tr>
              <th>姓名</th>
              <th>{{data.legalName}}</th>
              <th>性别</th>
              <th>
                <span v-if="data.legalSex == 1">男</span>
                <span v-else-if="data.legalSex == 2">女</span>
                <span v-else>保密</span>
              </th>
              <th>民族</th>
              <th>{{data.legalNation}}</th>
            </tr>
            <tr>
              <th>出生日期</th>
              <th>{{data.legalBirthDate | dateFormat}}</th>
              <th>身份证号</th>
              <th>{{data.legalIdCard}}</th>
              <th>住址</th>
              <th>{{data.legalAddress}}</th>
            </tr>
            <tr>
              <th>联系电话</th>
              <th >{{data.legalContactNumber}}</th>
            </tr>
          </table>
          <div class="businessLicenseUrl">
            <img :src="data.legalIdCardFrontUrl" alt="法定代表人身份证照片 正面">
            <img :src="data.legalIdCardBackUrl" alt="法定代表人身份证照片 背面">
          </div>
        </el-collapse-item>
        <el-collapse-item title="被授权人信息" name="3">
          <table>
            <tr>
              <th>姓名</th>
              <th>{{data.authorizedName}}</th>
              <th>性别</th>
              <th>
                <span v-if="data.authorizedSex == 1">男</span>
                <span v-else-if="data.authorizedSex == 2">女</span>
                <span v-else>保密</span>
              </th>
              <th>民族</th>
              <th>{{data.authorizedNation}}</th>
            </tr>
            <tr>
              <th>出生日期</th>
              <th>{{data.authorizedBirthDate | dateFormat}}</th>
              <th>身份证号</th>
              <th>{{data.authorizedIdCard}}</th>
              <th>住址</th>
              <th>{{data.authorizedAddress}}</th>
            </tr>
            <tr>
              <th>联系电话</th>
              <th >{{data.authorizedContactNumber}}</th>
            </tr>
          </table>
          <div class="businessLicenseUrl">
            <img :src="data.authorizedIdCardFontUrl" alt="被授权人身份证照片 正面">
            <img :src="data.authorizedIdCardBackUrl" alt="被授权人身份证照片 背面">
          </div>
        </el-collapse-item>
        <el-collapse-item title="账户信息" name="4">
          <table>
            <tr>
              <th>银行</th>
              <th>{{data.bankName}}</th>
              <th>分行</th>
              <th>{{data.bankBranch}}</th>
              <th>支行</th>
              <th>{{data.bankSubBranch}}</th>
              <th>账号</th>
              <th>{{data.bankAccount}}</th>
            </tr>
          </table>
        </el-collapse-item>
      </el-collapse>

      <div class="approval-box" v-if="data.status == 2">
        <div>
          <el-checkbox v-model="enterpriseBaseinfoAuth" label="企业基本信息已核实" ></el-checkbox>
          <el-checkbox v-model="materialAuth" label="授权资料已收集" ></el-checkbox>
          <el-checkbox v-model="surveyAuth" label="尽职调查已完成" ></el-checkbox>
        </div>

        <el-button type="primary" class="btn" @click="dialogFormVisible = true">审核</el-button>

      </div>

    </div>


    <el-dialog :title="data.title"
               :visible.sync="dialogFormVisible"
              center>
      <el-form :model="dialogForms" ref="dialogForms"
               label-position="right"
               label-width="120px">

        <el-form-item label="" >
          <el-radio v-model="dialogForms.status" label="4">通过</el-radio>
          <el-radio v-model="dialogForms.status" label="3">驳回</el-radio>
        </el-form-item>
        <div v-if="dialogForms.status == 4">
          <el-form-item label="金融机构名称">
            <el-select v-model="dialogForms.financeOrgId">
              <el-option :label="list.companyName" :value="list.id" v-for="(list,index) in financeOrgList" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="监管机构名称">
            <el-select v-model="dialogForms.superviseOrgId">
              <el-option :label="list.companyName" :value="list.id" v-for="(list,index) in superviseOrgList" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-else-if="dialogForms.status == 3">
          <el-form-item label="驳回原因">
            <el-input v-model="dialogForms.description"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="reviewAjax" :loading="loadding">提 交</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
  import ajax from '@/utils/ajax'

  export default {
    beforeMount:function(){
      this.id = this.$route.params.id;

      this.getInit(this.id);
      this.getCompanies(3);
      this.getCompanies(4);
    },
    data(){

      return {
        api:'/corporate/financing-company-info/',
        id:'',
        type:"",
        activeNames: ['1','2','3','4','5','6','7'],
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[
          ],
          "total":0
        },
        data:{},
        dialogForms:{},
        dialogFormVisible:false,
        loadding:false,
        enterpriseBaseinfoAuth:'',
        materialAuth:'',
        surveyAuth:'',
        financeOrgList:[],
        superviseOrgList:[],
      }
    },
    methods:{
      handleChange(val) {
      },
      goBack(){
        this.$router.go(-1);
      },
      reviewAjax(){
        var _this = this;
        let data = this.review;

        if(_this.enterpriseBaseinfoAuth){
          _this.data.enterpriseBaseinfoAuth = 1;
        }else{
          _this.data.enterpriseBaseinfoAuth = 0;
        }
        if(_this.materialAuth){
          _this.data.materialAuth = 1;
        }else{
          _this.data.materialAuth = 0;
        }
        if(_this.surveyAuth){
          _this.data.surveyAuth = 1;
        }else{
          _this.data.surveyAuth = 0;
        }

        this.loadding = true;

        new Promise((resolve,reject) => {
          ajax({
            url:`/corporate/credit/approve`,
            method:'post',
            data:{
              id:_this.data.id,
              enterpriseBaseinfoAuth:_this.data.enterpriseBaseinfoAuth,
              materialAuth:_this.data.materialAuth,
              surveyAuth:_this.data.surveyAuth,
              status:_this.dialogForms.status,
              description:_this.dialogForms.description,
              financeOrgId:_this.dialogForms.financeOrgId,
              superviseOrgId:_this.dialogForms.superviseOrgId,
            }
          }).then(function (res) {
            let date = res.data;
            if(date.code == 1){
              _this.$message({
                message: date.msg
              });
              _this.$router.go(-1);
            }else{
              _this.$message({
                type:'error',
                message: date.msg
              });

            }

            _this.loadding = false;

          }).catch(error => {
            reject(error)
          })
        })
      },
      getCompanies(userType) {
        var _this = this;
         new Promise((resolve,reject) => {
          ajax({
            url:`/user/companies?userType=${userType}`,
            method:'get',
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){

              if(userType == 3){
                _this.financeOrgList = data.data;
              }
              if(userType == 4){
                _this.superviseOrgList = data.data;
              }

            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      getInit(id) {
        var _this = this;
         new Promise((resolve,reject) => {
          ajax({
            url:`${_this.api}${id}`,
            method:'get',
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){

              _this.data = data.data;

              if(_this.data.enterpriseBaseinfoAuth == 1){
                _this.enterpriseBaseinfoAuth = true;
              }else{
                _this.enterpriseBaseinfoAuth = false;
              }
              if(_this.data.materialAuth == 1){
                _this.materialAuth = true;
              }else{
                _this.materialAuth = false;
              }
              if(_this.data.surveyAuth == 1){
                _this.surveyAuth = true;
              }else{
                _this.surveyAuth = false;
              }

            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      getAjax(){
        var _this = this;
         new Promise((resolve,reject) => {
          ajax({
            url:`/quota/quota-approval-history/${this.id}`,
            method:'get'
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){

              _this.page = data.data;
              console.log(_this.page);
            }else{
              _this.$message.error(data.msg);
            }
          }).catch(error => {
            reject(error)
          })
         })
      }
    },
    filters:{
      dateFormat(time){
        if(time){
          return time.substring(0,10)
        }else{
          return ''
        }
      },
    }
  }
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
  $blue : #409EFF;
  .top-main{
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: right;
  }
  .table-header{
    height: 80px;
    line-height: 80px;
    padding: 0 10px;
    .header{
      color: rgb(48, 65, 86);
      font-size: 24px;
      font-weight: bold;
    }
    .fr{
      text-align: right;
    }
    .button-fr{
      margin-right: 15px;
    }
  }

  table{
    th{
      line-height: 23px;
      padding: 12px 0;
      border: 1px solid #ebeef5;
    }
    th:nth-child(odd){
      background: #dddee2;
    }
    th:nth-child(even){
      background: #fff;
    }
  }
  .width-8{
    th{
      width: 12.5%;
    }
  }

  .approval-box{
    margin-top: 20px;
    .btn{
      margin-top: 30px;
    }
  }
  .businessLicenseUrl{

  }

</style>
