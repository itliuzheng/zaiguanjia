<template>
  <div class="footer">
    <div class="copyright">
      <p>版权所有：北京泛鹏天地科技股份有限公司&nbsp;&nbsp;&nbsp;&nbsp;京ICP备09005155号-1</p>
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
    background: rgba(60,65,70,1);
    .footer-content{
      min-height: 355px;
      width: 1200px;
      margin: 0 auto;
      padding-top: 44px;
      position: relative;
      padding-bottom: 20px;
    }
    .copyright{
      height: 100px;
      background: #1c2327;
      color: #6d6d6d;
      font-size: 12px;
      text-align: center;
      line-height: 113px;
      letter-spacing: 0.72px;
    }
  }
</style>
