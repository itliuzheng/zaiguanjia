<template>
  <div class="about-main">
    <div class="about-content">

      <div class="company">

        <div class="about-header"></div>
        <div class="company-content">
          <img class="company-liucheng" src="@/images/introduction/liucheng.png" alt="">
          <ul class="liucheng-desc">
            <li>债权审核</li>
            <li>司法诉讼&nbsp;&nbsp;</li>
            <li>&nbsp;&nbsp;&nbsp;法院立案</li>
            <li>执行回款</li>
          </ul>
          <img class="company-banner" src="@/images/introduction/banner.jpg" alt="">
          <ul class="company-ul">
            <li>
              <div class="icon">
                <img src="@/images/introduction/icon-01.png" alt="">
              </div>
              <div class="desc">
                <p class="desc-title">债权登记管理系统</p>
                <p class="text">债权登记系统实现个人或机构对自有债权进行登记，进行智能化管理，其中包括借贷合同的数字存证，用区块链技术实现不可篡改和隐私安全保护，充分便 捷安全地保障债权人实现安全高效私密地债权登记管理。</p>
              </div>
            </li>
<!--            <li class="li-right">-->
            <li>
              <div class="icon">
                <img src="@/images/introduction/icon-02.png" alt="">
              </div>
              <div class="desc">
                <p class="desc-title">大数据查询系统</p>
                <p class="text">大数据查询系统作为债管家的核心系统，能够帮助债权人在贷前贷中贷后对债务人进行风控决策参考，目前基础版核心反馈数据包括身份核实、负面信息查询(包括有前科、在逃、吸毒、涉毒)、个人信用验证 (命中、未命中、数据异常)、多重借贷查询(包含网 络平台借贷和民间借贷)、个人涉诉全类查询司法大数 据(失信公告、执行公告、裁判文书)。</p>
              </div>
            </li>
            <li>
              <div class="icon">
                <img src="@/images/introduction/icon-03.png" alt="">
              </div>
              <div class="desc">
                <p class="desc-title">贷后管理催收系统</p>
                <p class="text">贷后管理催收系统分为线上催收和线下催收。线上催收根据借贷合同或借条约定的付本息时间进行自动短信催收和电话催收。线下催收服务包括上门进行告知催收及进行司法程序全流程代理，方便高效地完成债权起诉、查封保全资产、执行回款的全流程委托代办。</p>
              </div>
            </li>
            <li>
              <div class="icon">
                <img src="@/images/introduction/icon-04.png" alt="">
              </div>
              <div class="desc">
                <p class="desc-title">债权委托转让交易系统</p>
                <p class="text">债权委托转让交易系统可以在平台上市场化转让交易自有债权，由债管家各地的直属及合作服务机构作为债权的受让方，债权方一次性收回全部或部分债权，受让方利用本地资源和人脉进行催收。</p>
              </div>
            </li>

          </ul>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
      }
    },
    beforeMount:function () {
    },
    methods: {
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
  }

  .company{
    position: relative;
    width: 100%;
    min-height: 1024px;
    .about-header{
      background: url("~@/images/introduction/introduction_bj.jpg") no-repeat center;
      width: 1920px;
      height: 1024px;
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
    .company-liucheng{
      width: 929px;
      margin: 80px 0 18px;
    }
    .liucheng-desc{
      width: 1120px;
      margin: 0 auto 66px;
      display: flex;
      li{
        display: inline-block;
        font-size: 20px;
        color: $green;
        line-height: 1;
        flex: 1;
      }
    }
    .company-banner{
      width: 1096px;
    }
    .company-ul{
      margin-top: 12px;
      padding: 0 52px;
      li{
        height: 265px;
        border-bottom: 1px solid #e2e2e2;
        padding-top: 60px;
        &:last-child{
          border-bottom: none 0;
        };
        .icon{
          float: left;
          margin-right: -100%;
          width: 128px;
          height: 128px;
          img{
            width: 100%;
          }
        }
        .desc{
          width: 100%;
          padding-left: 166px;
          float: left;
          text-align: left;
          .desc-title{
            color: #202020;
            font-size: 24px;
            line-height: 1;
            margin-bottom: 31px;
          }
          .text{
            color: #414242;
            font-size: 16px;
            line-height: 22px;
          }
        }
      }
      .li-right{
        .icon{
          float: right;
          margin-right:0;
          margin-left: -100%;
        }
        .desc{
          float: right;
          text-align: right;
          padding:0 166px 0 0;
        }
      }

    }
  }

</style>
