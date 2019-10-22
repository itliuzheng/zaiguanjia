<template>
  <div class="footer">
    <div class="footer-content">
      <div class="fl fo-left">
        <div class="fo-about">
          <router-link tag="a" :to="{name:'about'}">关于我们</router-link>
          <span>|</span>
          <router-link tag="a" :to="{name:'about',query:{name:'contact'}}">联系我们</router-link>
        </div>
        <div class="fo-copyright">
          <p>Copyright 2019 北京债管家网络科技有限公司  |  京ICP备19047367号-1</p>
        </div>
      </div>
      <div class="fr contact">
        <div>
          <span class="contact-left">咨询电话：+86 10 69887650</span>
          <span >工作时间：9:30 - 18:00(工作日)</span>
        </div>
        <div>
          <span  class="contact-left">商务合作：website@webs.com</span>
          <span >公司地址：北京市 朝阳区 建外三百六十二号4层</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import ajax from '@/utils/ajax'
export default {
  components: {  },
  data() {
    return {
      data:null
    }
  },
  beforeMount(){
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

<style rel="stylesheet/scss" lang="scss" scoped>

  $red : #cc1838;

  .footer{
    min-width: 1200px;
    background: #272c36;
    .footer-content{
      min-height: 246px;
      width: 1200px;
      margin: 0 auto;
      padding-top: 95px;
      position: relative;
      .fo-left{
        margin-right: 74px;
        text-align: left;
      }
      .fo-about{
        color: #fff;
        margin-bottom: 22px;
        a{
          color: #fff;
          font-size: 18px;
          margin-right: 13px;
          display: inline-block;
          line-height: 1;
        }
        span{
          display: inline-block;
          font-size: 18px;
          margin-right: 13px;
          vertical-align: top;
          line-height: 1;
        }
      }
      .fo-copyright{
        color: #fff;
        font-size: 18px;
        line-height: 1;

      }
    }
    .contact{
      color: #fff;
      span{
        display: inline-block;
        text-align: left;
        margin-bottom: 22px;
        font-size: 18px;
        line-height: 1;

      }
      .contact-left{
        width: 226px;
        margin-right: 40px;
      }
    }
  }
</style>
