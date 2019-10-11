<template>
  <div class="about-main">
    <div class="about-content">

      <div class="company">

        <div class="about-header">
          <img src="@/images/introduction/banner_header.jpg" alt="">
        </div>
        <div class="company-content company-content-height">
          <h3 class="company-title">债管家-专业资产处置领导者</h3>
          <p class="english-desc">DEBTOR-PROFESSIONAL ASSET DISPOSAL LEADER</p>
          <p class="sub-desc">债管家资产以快捷、简单、安全为己任，为客户提供正规、合法、可视化的催收资产服务、广阔的覆盖范围，让不良资产再无死角。</p>
          <p class="english-sub-desc">Debt housekeeper assets take fast, simple and safe as their responsibility, providing customers with formal, legal and visual asset collection services, the coverage of crying, so that non-performing assets no longer have dead ends.</p>
        </div>

        <div class="company-content">
          <div class="company-liucheng">
            <img src="@/images/introduction/liucheng.jpg" alt="">
          </div>
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
      position: relative;
      height: 279px;
      img{
        position: absolute;
        width: 1920px;
        left: 50%;
        top: 0;
        -webkit-transform: translate(-50%, 0);
        -moz-transform: translate(-50%, 0);
        -ms-transform: translate(-50%, 0);
        -o-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
      }
    }
    .company-content{
      width: 1200px;
      background: #ffffff;
      .company-title{
        color: #333;
        font-size: 46px;
        line-height: 1;
        margin-bottom: 20px;
        padding-top: 86px;
        font-weight: 500;
        letter-spacing: 2px;
      }
      .english-desc{
        font-size: 12px;
        color: #333;
        line-height: 1;
        margin-bottom: 40px;
      }
      .sub-desc{
        font-size: 14px;
        color: #333;
      }
      .english-sub-desc{
        width: 600px;
        margin: 0 auto;
        font-size: 12px;
        color: #c3c3c3;
        line-height: 1;
      }
    }
    .company-content-height{
      height: 312px;
    }
    .company-liucheng{
      position: relative;
      height: 392px;
      img{
        position: absolute;
        width: 1920px;
        left: 50%;
        top: 0;
        -webkit-transform: translate(-50%, 0);
        -moz-transform: translate(-50%, 0);
        -ms-transform: translate(-50%, 0);
        -o-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
      }
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
