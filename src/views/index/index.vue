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
        <p class="desc-chinese">债管家资产以快捷、简单、安全为己任，为客户提供正规、合法、可视化的催收资产服务、光哭的覆盖范围，让不良资产再无死角。</p>
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
      <h3 class="title">债管家-专业资产处置领导者</h3>
      <h4 class="title-english">DEBT MANAGER - LEADER OF PROFESSIONAL ASSET DISPOSAL</h4>
      <div class="desc">
        <p class="desc-chinese">债管家资产以快捷、简单、安全为己任，为客户提供正规、合法、可视化的催收资产服务、光哭的覆盖范围，让不良资产再无死角。</p>
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
    <div class="section section-03">
      <h3 class="title">债管家-专业资产处置领导者</h3>
      <h4 class="title-english">DEBT MANAGER - LEADER OF PROFESSIONAL ASSET DISPOSAL</h4>
      <div class="desc">
        <p class="desc-chinese">债管家资产以快捷、简单、安全为己任，为客户提供正规、合法、可视化的催收资产服务、光哭的覆盖范围，让不良资产再无死角。</p>
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
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'

  export default {
    data(){
      return {
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
      margin-bottom: 38px;
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

  }
  .section-01{
    background: #eff4f4;
    min-height: 432px;
  }
  .section-03{
    background: #eff4f4;
    min-height: 544px;
  }
</style>
