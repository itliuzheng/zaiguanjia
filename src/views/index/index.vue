<template>
  <div class="index-main">
    <div class="banner">
      <img src="@/images/home/banner.jpg" alt="">
<!--      <div class="banner-text">-->
<!--        <p class="text-top">我们致力于</p>-->
<!--        <p class="text-title">做最优秀的智能资产处理平台</p>-->
<!--        <p class="text-desc">BECOME THE BEST INTELLIGENT ASSET PROCESSING PLATFORM</p>-->
<!--      </div>-->
    </div>
    <div class="section section-01">
      <h3 class="title">债管家能为你做什么？</h3>
      <h4 class="title-english">WHAT THE DEBTOR CAN DO FOR YOU?</h4>
      <div class="desc">
        <p class="desc-chinese">债管家为中小型不良资产管理机构提供资产估值、债权管理、处置清收、回报分析、辅助融资等全方位服务。债管家系统具有辅助定价、 风险动态监测、即插即用等特点，极大地提升不良资产处置效率，为AMC资产管理公司创造非凡价值。</p>
      </div>
    </div>
    <div class="section section-02">
      <h3 class="title">热标推荐</h3>
      <h4 class="title-english">HOT ASSET SOLUTIONS</h4>

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
    height: 431px;
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
      font-size: 32px;
      line-height: 1;
      margin-bottom: 10px;
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
        margin: 0 auto 10px;
        width: 800px;
        font-size: 14px;
        line-height: 20px;
      }
      .desc-english{
        width: 620px;
        margin: 0 auto;
        font-size: 7px;
        line-height: 12px;
        color: #b7bbbb;
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
    background: #fff;
    min-height: 246px;
  }
  .section-02{
    padding-top: 75px;
    background: #f3f3f3;
    min-height: 682px;
  }
  .section-03{
    background: #fff;
    min-height: 544px;
    padding-top: 120px;
    .title-english{
      margin-bottom: 60px;
    }
  }
</style>
