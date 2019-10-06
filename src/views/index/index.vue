<template>
  <div class="index-main">
    <div class="banner">
      <img src="@/images/home/banner.png" alt="">
      <div class="banner-text">
        <p class="text-top">我们致力于</p>
        <p class="text-title">做最优秀的智能资产处理平台</p>
        <p class="text-desc">BECOME THE BEST INTELLIGENT ASSET PROCESSING PLATFORM</p>
      </div>
    </div>
    <div class="section section-01">
      <h3 class="title">债管家-专业资产处置领导者</h3>
      <h4 class="title-english">DEBT MANAGER - LEADER OF PROFESSIONAL ASSET DISPOSAL</h4>
      <div class="desc">
        <p class="desc-chinese">债管家资产以快捷、简单、安全为己任，为客户提供正规、合法、可视化的催收资产服务、广阔的覆盖范围，让不良资产再无死角。</p>
        <p class="desc-english">Debt housekeeper assets take fast, simple and safe as their responsibility, providing customers with formal, legal and visual asset collection services, the coverage of crying, so that non-performing assets no longer have dead ends.</p>
      </div>
      <ul class="home-icon">
        <li>
          <img src="@/images/home/icon-01.png" alt="">
          <p>快捷</p>
        </li>
        <li><img src="@/images/home/icon-02.png" alt="">
          <p>方便</p>
        </li>
        <li><img src="@/images/home/icon-03.png" alt="">
          <p>安全</p>
        </li>
      </ul>
    </div>
    <div class="section section-02">
      <h3 class="title">资产类型</h3>
      <h4 class="title-english">OUR ASSET TYPES</h4>

      <div class="type-box">
        <div class="row">
          <div class="type fl" style="width: 225px;">融资租赁</div>
          <div class="type fl">P2P</div>
          <div class="type fl" style="width: 205px;">消费金融</div>
          <div class="type fl" style="width: 205px;">抵押贷款</div>
        </div>
        <div class="row">
          <div class="fl"  style="margin: 0 12px 0 0;">
            <div class="type" style="width: 227px;margin: 0 0 11px 0;">PAYDAY LOAN</div>
            <div class="type" style="width: 227px;">银行</div>
          </div>
          <div class="fl" style="margin-right: 12px;">
            <div class="type type-center">
              <p class="title">债管家</p>
              <p class="title-english">DEBT MANAGER</p>
            </div>
          </div>
          <div class="fl" >
            <div class="type" style="width: 238px;margin: 0 0 11px 0;">以租代购</div>
            <div class="type" style="width: 238px;">信用贷</div>
          </div>
        </div>
        <div class="row">
          <div class="type fl" style="width: 398px;margin-right: 25px;">车贷</div>
          <div class="type fl" style="width: 398px;">其他</div>
        </div>
      </div>
    </div>
    <div class="section section-03">
      <h3 class="title">合作伙伴</h3>
      <h4 class="title-english">COOPERATIVE PARTNER</h4>
      <div class="partners-box">
        <ul class="clearfix">
          <li class="fl" v-for="(list,index) in partnerList"><img :src="list.src" alt=""></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'

  export default {
    data(){
      return {
        partnerList:[
          {
            src:require('@/images/home/partner/logo-01.png')
          },
          {
            src:require('@/images/home/partner/logo-02.png')
          },
          {
            src:require('@/images/home/partner/logo-03.png')
          },
          {
            src:require('@/images/home/partner/logo-04.png')
          },
          {
            src:require('@/images/home/partner/logo-05.png')
          },
          {
            src:require('@/images/home/partner/logo-06.png')
          },
          {
            src:require('@/images/home/partner/logo-07.png')
          },
          {
            src:require('@/images/home/partner/logo-08.png')
          },
        ]
      }
    },
    beforeMount:function(){
    },
    methods: {
    },
  }
</script>
<style lang="scss">
  .index-main{
    min-height: 1000px;
  }
</style>
<style lang="scss" scoped>
  $blue : #409EFF;

  .banner{
    position: relative;
    width: 100%;
    height: 514px;
    text-align: center;
    z-index: 0;
    img{
      width: 1920px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -960px;
    }
    .banner-text{
      position: relative;
      z-index: 1;
      padding-top: 124px;
      .text-top{
        font-size: 30px;
        color: #e7ebed;
        line-height: 1;
        margin: 0 0 25px;
      }
      .text-title{
        font-size: 48px;
        line-height: 116px;
        color: #e7ebed;
        letter-spacing: 10px;
      }
      .text-desc{
        font-size: 14px;
        color: #e7ebed;
        line-height: 1;
        letter-spacing: 3px;
        margin-top: 13px;

      }
    }
  }
  .section{
    color: #333;
    padding-top: 64px;
    .title{
      font-size: 40px;
      line-height: 1;
      margin-bottom: 9px;
      font-weight: 700;
    }
    .title-english{
      font-size: 10px;
      margin-bottom: 40px;
      line-height: 1;
    }
    .desc{
      margin-bottom: 28px;
      .desc-chinese{
        font-size: 14px;
        line-height: 1;
        margin-bottom: 10px;
      }
      .desc-english{
        width: 620px;
        margin: 0 auto;
        font-size: 7px;
        line-height: 12px;
        color: #b7bbbb;
      }
    }

    .home-icon{
      li{
        width: 130px;
        display: inline-block;
        margin-right: 172px;
        font-size: 0;
        img{
          width: 130px;
        }
        p{
          font-size: 20px;
          color: #2fb6bb;
          line-height: 1;
          margin-top: 12px;
        }
        &:last-child{
          margin-right: 0;
        }
      }
    }

    .type-box{
      width: 822px;
      margin: 0 auto;
      .row{
        overflow: hidden;
        display: inline-block;
        margin-bottom: 13px;
        .type{
          width: 145px;
          height: 89px;
          border:1px solid #e5e5e5;
          color: #444;
          background: #f8f8f8;
          font-size: 23px;
          text-align: center;
          line-height: 89px;
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;
          margin-right: 14px;
          &:last-child{
            margin-right: 0;
          }
        }
        .type-center{
          width: 332px;
          height: 187px;
          background: #4fc4b9;
          .title{
            color: #fff;
            font-size: 48px;
            line-height: 1;
            padding-top: 55px;
          }
          .title-english{
            font-size: 13px;
            color: #fff;
            margin-top: 10px;
            line-height: 1;
          }
        }
      }
    }


    .partners-box{
      width: 980px;
      margin: 0 auto;
      ul{
        text-align: center;
        margin-right: -24px;
        li{
          margin-right: 23px;
          margin-bottom: 25px;
        }
      }
    }

  }
  .section-01{
    background: #eff4f4;
    min-height: 432px;
  }
  .section-02{
    padding-top: 75px;
    background: #fff;
    min-height: 682px;
  }
  .section-03{
    background: #eff4f4;
    min-height: 544px;
    padding-top: 78px;
    .title-english{
      margin-bottom: 60px;
    }
  }
</style>
