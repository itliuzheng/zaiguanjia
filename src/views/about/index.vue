<template>
  <div class="about-main">
    <div class="about-content">
      <div class="table">
        <span :class="list.value == activeName?'active':''"
              v-for="(list,index) in activeList"
              @click="clickTable(list)"
        >{{list.name}}</span>
      </div>

      <div class="company" v-if="activeName == 'company'">

        <div class="about-header">
          <!--<img src="@/images/about/header1.png" alt="">-->
        </div>
        <div class="company-content">
          <h3 class="company-title">
            <!--<img src="@/images/about/title.png" alt="">-->
            债管家不良资产处置平台
          </h3>
          <p class="english-desc">DEBT STEWARD'S NON-PERFORMING ASSETS DISPOSAL PLATFORM</p>
          <img class="company-banner" src="@/images/about/banner.jpg" alt="">
          <div class="company-desc">

            <p>以下为测试文字 </p>
            <p>依托于互联网的信息交互，充分的整合市场上丰富的资产资源与处置服务机构，优化资产处置业务流程，有效降低资产处置过程中的沟通成本与处置成本，从而显著提高处置回收率与时效性。  </p>
            <p>We've been crafting beautiful websites, launching stunning brands and making clients happy for years.
Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et. Quisque euismod lobortis aliquam. Aliquam in tortor enim.
orci ut et lobortis aliquam. Aliquam in tortor enim.</p>
            <p>资产处置的主要方式有：调拨、变卖、报损、报废以及将非经营性资产转为经营性资产（以下简称“非转经”）等。资产处置应逐级申报，分级审批：（一）一次性处置价值原值20万元以下的资产，由各部门审批，报国管局备案。（二）一次性处置价值原值20万元（含）以上的资产，需经资产使用单位提出申请，报国管局审批。（三）国有土地、房屋及建筑物、汽车的处置，均报国管局审批。</p>
            <p>资产处置的主要方式有：调拨、变卖、报损、报废以及将非经营性资产转为经营性资产（以下简称“非转经”）等。资产处置应逐级申报，分级20万元（含）以上的资产，需经资产使用单位提出申请，报国管局审批。（三）国有土地、房屋及建筑物、汽车的处置，均报国管局审批。</p>
            <p>资产处置的主要方式有：调拨、变卖、报损、报废以及将非经营性资产转为经营性资产（以下简称“非转经”）等。资产处置应逐级申报，分</p>
            <p>资产处置的主要方式有：调拨、变卖、报损、报废以及将非经营性资产转为经营性资产（以下简称“非转经”）等。资产处置应逐级申报，分级审批：（一）一次性处置价值原值20万元以下的资产，由各部门审批，报国管局备案。（二）一次性处置价值原值20万元（含）以上的资产，需经资产使用单位提出申请，报国管局审批。（三）国有土地、房屋及建筑物、汽车的处置，均报国管局审批。</p>
          </div>
        </div>

      </div>
      <div class="company" v-if="activeName == 'business'">

        <div class="about-header">
        </div>
        <div class="company-content">
          <h3 class="company-title">
            商务合作
          </h3>
          <p class="english-desc">DEBT STEWARD'S NON-PERFORMING ASSETS DISPOSAL PLATFORM</p>
          <img class="company-banner" src="@/images/about/banner.jpg" alt="">
          <div class="company-desc">
            <p>以下为测试文字 </p>
          </div>
        </div>

      </div>
      <div class="company" v-if="activeName == 'contact'">

        <div class="about-header">
        </div>
        <div class="company-content">
          <h3 class="company-title">
            联系我们
          </h3>
          <p class="english-desc">CONTACT US</p>
          <img class="company-banner" src="@/images/about/banner.jpg" alt="">
          <div class="company-desc">

            <p>以下为测试文字 </p>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        activeName: 'company',
        activeList:[
          {
            value:'company',
            name:'公司简介'
          },
          {
            value:'business',
            name:'商务合作'
          },
          {
            value:'contact',
            name:'联系我们'
          },
        ]
      }
    },
    beforeMount:function () {
      let name = this.$route.query.name;
      if(name == 'contact'){
        this.activeName = 'contact';
      }else if(name == 'business'){
        this.activeName = 'business';
      }else{
        this.activeName = 'company';
      }
    },
    methods: {
      clickTable(list){
        this.activeName = list.value;

      }
    },
  }
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
  $green : #2fc0b2;
  $red : #fe3c5c;
  .about-main{
    background: #fff;
    .about-content{
      width: 1200px;
      min-height: 500px;
      margin: 0 auto;
      position: relative;
      /*padding-top: 280px;*/
    }
    .table{
      position: absolute;
      top: 18px;
      left: 0;
      width: 428px;
      height: 48px;
      line-height: 48px;
      background: #fff;
      color: #333;
      z-index: 10;
      span{
        font-size: 16px;
        margin-right: 56px;
        cursor: pointer;
        &:last-child{
          margin-right: 0;
        }
        &.active{
          color: #14b4a5;
        }
      }
    }
  }

  .company{
    .about-header{
      background: url("~@/images/about/header.jpg") no-repeat center;
      width: 1980px;
      height: 684px;
      position: relative;
      left: 50%;
      top: 0;
      -webkit-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);
      -o-transform: translate(-50%, 0);
      transform: translate(-50%, 0);
      -webkit-background-size: auto 100%;
      background-size: auto 100%;
      img{
        width: 1980px;
        position: absolute;
        left: 50%;
        top: 0;
        margin-left: -990px;
      }
    }
    .company-content{
      width: 1200px;
      background: #ffffff;
      position: relative;
      top: -404px;
      .company-title{
        color: #333;
        font-size: 32px;
        line-height: 1;
        margin-bottom: 15px;
        padding-top: 100px;
        font-weight: 500;
        letter-spacing: 2px;
      }
      .english-desc{
        font-size: 8px;
        color: #7a7a7a;
        line-height: 1;
        margin-bottom: 35px;
      }
    }
    .company-banner{
      width: 1096px;
    }
    .company-desc{
      width: 1096px;
      margin: 17px auto 0;
      font-size: 16px;
      color: #414242;
      text-align: justify;
      line-height: 19px;
      p{
        margin-bottom: 19px;
      }
    }
  }

</style>
