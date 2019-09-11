<template>
  <div class="info-main">
    <div class="tab">
      <h3>企业基本信息</h3>
      <table>
        <tr>
          <td>企业全称</td>
          <td>{{data.companyName}}</td>
          <td>认证状态</td>
          <td>{{data.statusType}}</td>
        </tr>
        <tr>
          <td>统一社会信用代码</td>
          <td>{{data.socialCreditCode}}</td>
          <td>公司员工数</td>
          <td>{{data.employeeNumber}}</td>
        </tr>
        <tr>
          <td>公司年销售额</td>
          <td>{{data.annualSales}}元</td>
          <td>经营地址</td>
          <td>{{data.companyAddress}}</td>
        </tr>
        <tr>
          <td>成立日期</td>
          <td>{{data.establishmentDate | dateFormat }}</td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="tab">
      <h3>申请人信息</h3>
      <table>
        <tr>
          <td>申请人姓名</td>
          <td>{{data.authorizedName}}</td>
          <td>申请人手机号</td>
          <td>{{data.authorizedContactNumber}}</td>
        </tr>
        <tr>
          <td>申请人身份证号</td>
          <td>{{data.authorizedIdCard}}</td>
          <td>申请人银行卡号</td>
          <td>{{data.authorizedBankAccount}}</td>
        </tr>
        <tr>
          <td>申请人银行卡预留手机号</td>
          <td>{{data.authorizedBankMobile}}</td>
          <td>法人姓名</td>
          <td>{{data.legalPerson}}</td>
        </tr>
        <tr>
          <td>法人手机号</td>
          <td>{{data.legalContactNumber}}</td>
          <td>法人身份证号</td>
          <td>{{data.legalIdCard}}</td>
        </tr>
      </table>
    </div>
    <div class="tab">
      <h3>申请人基本信息</h3>
      <table v-if="data.maritalStatus != 1">
        <tr>
          <td>婚姻状况</td>
          <td v-if="data.maritalStatus == 1">未婚</td>
          <td v-else-if="data.maritalStatus == 2">已婚</td>
          <td v-else>其他</td>
          <td>是否有子女</td>
          <td v-if="data.childrenNumber == 0">否</td>
          <td v-else>是</td>
        </tr>
        <tr>
          <td>子女个数</td>
          <td v-if="data.childrenNumber == 3">3个孩子及以上</td>
          <td v-else>{{data.childrenNumber}}个孩子</td>
          <td>配偶姓名</td>
          <td>{{data.spouseName}}</td>
        </tr>
        <tr>
          <td>配偶手机号</td>
          <td>{{data.spouseMobile}}</td>
          <td>配偶身份证号</td>
          <td>{{data.spouseIdCard}}</td>
        </tr>
        <tr>
          <td>学历</td>
          <td v-if="data.education == 1">初中及初中以下</td>
          <td v-else-if="data.education == 2">高中</td>
          <td v-else-if="data.education == 3">大专</td>
          <td v-else-if="data.education == 4">本科</td>
          <td v-else>硕士及以上</td>
          <td>当前从事年限</td>
          <td>{{data.industryYears}}</td>
        </tr>
        <tr>
          <td>住宅性质</td>
          <td v-if="data.residentialNature == 1">自购无贷款</td>
          <td v-else-if="data.residentialNature == 2">自购有贷款</td>
          <td v-else-if="data.residentialNature == 3">租赁</td>
          <td v-else>农村自建房</td>
          <td>住宅地址</td>
          <td>{{data.residentialAddress}}</td>
        </tr>
      </table>
      <table v-else>
        <tr>
          <td>婚姻状况</td>
          <td v-if="data.maritalStatus == 1">未婚</td>
          <td v-else-if="data.maritalStatus == 2">已婚</td>
          <td v-else>其他</td>
          <td>学历</td>
          <td v-if="data.education == 1">初中及初中以下</td>
          <td v-else-if="data.education == 2">高中</td>
          <td v-else-if="data.education == 3">大专</td>
          <td v-else-if="data.education == 4">本科</td>
          <td v-else>硕士及以上</td>
        </tr>
        <tr>
          <td>当前从事年限</td>
          <td>{{data.industryYears}}</td>
          <td>住宅性质</td>
          <td v-if="data.residentialNature == 1">自购无贷款</td>
          <td v-else-if="data.residentialNature == 2">自购有贷款</td>
          <td v-else-if="data.residentialNature == 3">租赁</td>
          <td v-else>农村自建房</td>
        </tr>
        <tr>
          <td>住宅地址</td>
          <td>{{data.residentialAddress}}</td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="tab">
      <h3>联系人信息</h3>
      <table>
        <template v-for="list in data.contactInfoList">
          <tr>
            <td>{{list.contactType == 1?"财务联系人职务":"TMS使用人职务"}}</td>
            <td>{{list.position}}</td>
            <td>姓名</td>
            <td>{{list.name}}</td>
            <td>联系电话</td>
            <td>{{list.mobile}}</td>
          </tr>
        </template>
      </table>
    </div>
    <div class="tab">
      <h3>增信信息</h3>
      <table>
        <tr>
          <template v-if="data.previousYearTotalSale">
            <td>上年销售总额</td>
            <td>{{data.previousYearTotalSale}}</td>
          </template>
          <template v-if="data.previousYearNetProfitSale">
            <td>上年销售净利润</td>
            <td>{{data.previousYearNetProfitSale}}</td>
          </template>
        </tr>
      </table>
    </div>

  </div>

</template>
<script>
  import ajax from '@/utils/ajax'

  export default {
    props:[],
    data(){
      return {
        data:{},
        productTypeList:[],
        api:'/corporate/financing-company-info/',
      }
    },
    beforeMount(){
      this.getInit();
    },
    methods: {
      getInit:function () {
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
                _this.data = data.data;
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
    },
    mounted(){
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

  .tab{
    .el-date-editor.el-input,.el-select{
      width: 100%;
    }
  }
</style>
<style scoped lang="scss">
  .info-main{
    padding: 30px 0;
  }
  .tab{
    margin-bottom: 20px;
    h3{
      line-height: 1;
      font-size: 14px;
      color: #333;
      position: relative;
      text-align: left;
      padding-left: 10px;
      margin-bottom: 20px;
      &:before{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 3px;
        height: 100%;
        background: #1986f6;
      }
    }
    table{
      tr{
        font-size: 14px;
        &:nth-child(odd) {
          background: #fbfbfb;
        }
        td{
          border:1px solid #ddd;
          height: 50px;
        }
        td:nth-child(odd) {
          width: 180px;
        }
      }
    }
  }
</style>
