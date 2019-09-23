<template>
  <div class="main-404" :style="{height:height}">
    <p class="bj-box">
      <img  class="bj" src="/static/img/404/404.png" alt="">
      <img class="bj-center" src="/static/img/404/404-c.png" alt="">
    </p>
    <div class="box-404">
      <h2>404</h2>
      <img  src="/static/img/404/404_center.png" alt="">
      <p>对不起</p>
      <p class="desc">您要的页面被外星人挟持了</p>
      <a href="/" class="btn-404">返回首页</a>
    </div>
  </div>
</template>
<script>

  export default {
    name:'notfound',
    data(){
      let height = document.documentElement.clientHeight + 'px';
      return {
        height:height
      }
    },
    beforeMount(){
      let _this = this;
      // setTimeout(function () {
      //   _this.$router.push({path:'/'});
      // },5000)
    },
    methods:{
      resize(){
        let _this = this;
        window.onresize = () =>{
          let height = document.documentElement.clientHeight;
          _this.height = height+'px';
        }
      }
    },
    mounted() {
      this.resize();
    },
  }
</script>
<style lang="scss">
  .main-404{
    background: #141725;
    width: 100%;
    position: relative;
    overflow: hidden;
    .bj-box{
      display: inline-block;
      .bj{
        width: 100%;
        position: absolute;
        bottom: -50px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
      }
      .bj-center{
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50% -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        mix-blend-mode: luminosity;
        z-index: 2;

      }
    }
    .box-404{
      position: absolute;
      z-index: 3;
      width: 100%;
      top: 50%;
      left: 0;
      -webkit-transform: translate(0, -50%);
      -moz-transform: translate(0, -50%);
      -ms-transform: translate(0, -50%);
      -o-transform: translate(0, -50%);
      transform: translate(0, -50%);
      text-align: center;
      h2{
        font-size: 62.5px;
        color: #fff;
        font-weight: 900;
      }
      p{
        font-size: 18px;
        color: #fff;
        line-height: 31px;
        font-weight: 700;
      }
      .desc{
        color: #e5e5e5;
        font-size: 14px;
        font-weight: 500;
      }
      .btn-404{
        background: #cc1838;
        width: 100px;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        border-radius: 10px;
        color: #f7f7f7;
        display: block;
        margin: 30px auto 0;
      }
    }
  }

</style>

