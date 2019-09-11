<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    props: {
      className: {
        type: String,
        default: 'yourClassName'
      },
      id: {
        type: String,
        default: 'yourID'
      },
      height: {
        type: String,
        default: '400px'
      },
      width: {
        type: String,
        default: '100%'
      },
      option:{
        type:Object
      }
    },
    beforeDestroy(){
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null;
    },
    data(){
      return {
        chart: null
      }
    },
    mounted(){
      var _this = this;
      this.initChart();
      window.addEventListener('resize',_this.disposeResize);
    },
    methods:{
      disposeResize(){
        this.chart.resize();
      },
      initChart() {
        if(!this.chart){
          this.chart = echarts.init(this.$refs.myEchart);
        }

        this.chart.setOption(this.option,true)
      },
    }
  }
</script>
<style scoped lang="scss">
  $blue:#3e8ae5;
  .white{
    background: white;
  }
  ul{
    padding-left: 20px;
    padding-top: 40px;
    li{
      width: 30%;
      width: calc((100% / 3) - 20px);
      float: left;
      height: 440px;
      padding-bottom: 50px;
      border: 1px solid #3e8ae5;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      margin-right: 20px;
      margin-bottom: 20px;
      overflow: hidden;
      .header{
        width: 100%;
        height: 100px;
        background: #deedff;
        text-align: center;
        line-height: 100px;
        font-size: 22px;
        color: #333;
        font-weight: 600;
      }
      img{
        margin-top: 58px;
      }
      p{
        display: flex;
        justify-content: space-between;
        color: #333333;
        font-size: 16px;
        padding: 0 60px;
        margin-top: 30px;
        line-height: 40px;
        strong{
          font-size: 34px;
          color: #3e8ae5;
          margin-right: 10px;
        }
        .bold{
          font-weight: bold;
        }
      }
    }
  }
  .quarter{
    li{
      width: 23%;
      width: calc(25% - 20px);
    }
  }
  .flex-box{
    display: flex;
  }
  .list{
    flex: 1;
    margin-right: 20px;
    border: 1px solid #3e8ae5;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    overflow: hidden;
    height: 380px;
    margin-bottom: 20px;
    .header{
      width: 100%;
      height: 100px;
      background: #deedff;
      text-align: center;
      line-height: 100px;
      font-size: 22px;
      color: #333;
      font-weight: 600;
    }
    .center{
      display:flex;
      justify-content: center;
      align-items: center;
      height: 280px;
    }
    p{
      font-size: 20px;
      color: #333;
      font-weight: bold;
      span{
        font-size: 34px;
        color: #3e8ae5;
        margin-right: 10px;
      }
    }

  }
  .list-echart{
    height: 525px;
  }
  .overview{
    padding-left: 20px;
    border-top: 10px solid #f0f0f0;
    height: 100%;
    h2{
      font-size: 16px;
      color: #333;
      height: 50px;
      line-height: 50px;
      text-align: left;
      border-bottom: 1px solid #dddddd;
    }
    .sub-title{
      font-size: 16px;
      color: #333;
      text-align: left;
      padding: 20px 18px;
      line-height: 1;
    }
  }
</style>

