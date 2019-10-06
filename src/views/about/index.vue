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

            <p>公司简介：</p>
            <p>北京债管家科技有限公司旗下的一站式债权管 理服务平台——债管家，是基于大数据及区块链技术， 通过债权登记、证据链保全、智能催收、债权委托催收及转让交易，提供一站式贷后管理服务专业平台。 平台同时通过精准的债务人大数据查询及信用分析系 统，提供贷前风控决策分析服务。</p>
            <p>债管家团队由线上大数据及区块链行业专家和 线下法律及专业催收队伍组成，拥有完整的线上线下 结合的团队结构和行业能力。</p>
<p>债管家自身的大数据体系已经在旅游贷、消费贷、 中小企业金融服务领域进行了多年的实践，有比较大的数据资源和被实践检验的风控模型。同时债管家在全国重要省份都有专业的本地合作团队，可以实现本 地化服务。</p>
<p>债管家旨在帮助民间借贷中，债权人及相关机构 轻松管理债权，并在合法合规情况下，实现对债权的 有效催收，构建良性的民间借贷生态体系，实现民间借贷信用大数据化、管理催收智能化、债权交易生态化。</p>

          </div>
        </div>

      </div>
      <div class="company" v-if="activeName == 'business'">

        <div class="about-header about-header-business">
        </div>
        <div class="company-content">
          <h3 class="company-title">
            商务合作
          </h3>
          <p class="english-desc">CONTACT US</p>
          <div class="contact-info clearfix">
            <div class="icon fl"><img src="@/images/about/contact/hezuo.jpg" alt=""></div>
            <div class="info-desc fl">
              <ul class="info-ul">
                <li>商务合作共创未来，欢迎拨打合作电话</li>
                <li>联系电话：+86 10 69887650</li>
                <li>电子邮箱：website@webs.com</li>
                <li>公司地址：北京市 朝阳区 建外三百六十二号4层</li>
                <li>邮政编码：100024</li>
              </ul>
            </div>
          </div>
          <div class="company-contact-desc">
            <p class="chinese">债管家秉承共同发展的理念，鼓励客户一起共谋互联网民间借贷的未来，共同努力，共享发展成功————这是我们共同的债管家</p>
            <p class="english"></p>
          </div>
        </div>

      </div>
      <div class="company" v-if="activeName == 'contact'">

        <div class="about-header about-header-contact">
        </div>
        <div class="company-content">
          <h3 class="company-title">
            联系我们
          </h3>
          <p class="english-desc">CONTACT US</p>
          <div class="contact-info clearfix">
            <div class="icon fl"><img src="@/images/about/contact/lian.jpg" alt=""></div>
            <div class="info-desc fl">
              <p class="info-title">北京总部</p>
              <p class="info-title-english">BEIJING HEADQUARTERS</p>
              <ul class="info-ul">
                <li>北京总部：北京市 朝阳区 建外三百六十二号大街世贸商务楼2688室</li>
                <li>联系电话：+86 10 69887650</li>
                <li>总部电话：+86 10 69887650</li>
                <li>电子邮箱：website@webs.com</li>
                <li>邮政编码：100024</li>
              </ul>
            </div>
          </div>
          <div class="company-contact-desc">
            <p class="chinese">债管家秉承共同发展的理念，鼓励客户一起共谋互联网民间借贷的未来，共同努力，共享发展成功————这是我们共同的债管家</p>
            <p class="english"></p>
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
    position: relative;
    width: 100%;
    min-height: 684px;
    .about-header{
      background: url("~@/images/about/header.jpg") no-repeat center;
      width: 1920px;
      height: 684px;
      position: absolute;
      z-index: 1;
      left: 50%;
      top: 0;
      -webkit-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);
      -o-transform: translate(-50%, 0);
      transform: translate(-50%, 0);
      -webkit-background-size: auto 100%;
      background-size: auto 100%;
    }
    .about-header-business{
      background: url("~@/images/about/contact/beijing.jpg") no-repeat center;
      height: 786px;
    }
    .about-header-contact{
      background: url("~@/images/about/contact/bg.jpg") no-repeat center;
      height: 600px;
    }
    .company-content{
      width: 1200px;
      background: #ffffff;
      position: relative;
      z-index: 2;
      top: 280px;
      padding-bottom: 320px;
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
    .contact-info{
      padding: 0 52px;
      .icon{
        margin-right: -100%;
      }
      .info-desc{
        padding-left: 602px;
        padding-top:57px;
        text-align: left;
        .info-title{
          color: #333;
          font-size: 22px;

        }
        .info-title-english{
          color: #adadad;
          font-size: 7px;
          line-height: 1;
          margin-bottom: 38px;
        }
        .info-ul{
          text-align: left;
          li{
            color: #333;
            font-size: 16px;
            margin-bottom: 16px;
            line-height: 1;
          }
        }
      }
    }
    .company-contact-desc{
      margin-top: 71px;
      text-align: left;
      padding: 0 52px;
      .chinese{
        color: #333;
        font-size: 16px;
        line-height: 26px;
      }
      .english{
        color: #c4c4c4;
        font-size: 8px;
      }

    }
  }

</style>
