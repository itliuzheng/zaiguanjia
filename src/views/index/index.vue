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
      <ul class="hot-box">
        <li v-for="list in page.records">
          <p class="number">资产编号：{{list.code}}</p>
          <div class="type">
            <div class="type-inline">
              <p class="type-title">债权所在地</p>
              <p class="type-desc">{{list.area}}</p>
            </div>
            <div class="type-inline">
              <p class="type-title">资产类型</p>
              <p class="type-desc">
                <span v-for="(item,index) in loanType" :key="index" v-if="list.type == item.key">{{item.val}}</span>
              </p>
            </div>
            <div class="type-inline">
              <p class="type-title">资产来源</p>
              <p class="type-desc">{{list.source}}</p>
            </div>
          </div>
          <div class="bid">
            <p class="bid-title">标的金额</p>
            <p class="bid-number">{{list.amount | toThousands}}元</p>
          </div>

          <router-link class="link" :to="{name:'hall_list'}"><div class="btn btn-hover" ><span></span>了解详情</div></router-link>


        </li>
      </ul>
      <router-link class="link" :to="{name:'hall_list'}">更多热门标的欢迎前往交易大厅 > </router-link>
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
        api:'/loan/loan/',
        type_api:'/sys/sys-dict/getDictList',
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[
          ],
          "total":0
        },
        loanType:null,
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

      this.getInit();
      this.ajaxPage(1);
    },
    methods: {
      getInit:function () {
        let url = `${this.type_api}`;
        var _this = this;

        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              name:'loanType'
            }
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                let list = data.data.records;
                list.unshift({
                  key:-1,
                  val:'全部'
                });
                _this.loanType = data.data.records;
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      ajaxPage:function (page = 1 ) {
        let url = `${this.api}page`;
        var _this = this;

        let date = {
              pageNum:page,
              pageSize:3,
              status:1
        };

        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:date
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.page = data.data;
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
    },
    filters:{

      toThousands(row){
        row = row+'';
        let pointNum = row.split('.')[1]||'00',
            num = row.split('.')[0],
            result = '';
        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) { result = num + result; }

        return result + '.'+pointNum;

      },
    }
  }
</script>
<style lang="scss">
  .index-main{
    min-height: 1000px;
  }
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
  $green : #2fc0b2;

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

    .hot-box{
      text-align: center;
      margin-bottom: 68px;
      li{
        display: inline-block;
        width: 368px;
        height: 376px;
        background: #fff;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        margin-right: 48px;
        font-size: 0;
        vertical-align: top;
        text-align: left;
        padding: 28px 20px 0;
        &:last-child{
          margin-right: 0;
        }
        .number{
          font-size: 14px;
          color: #a5a5a5;
          line-height: 1;
          margin-bottom: 20px;
        }
        .type{
          width: 100%;
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;
          height: 68px;
          color: #404040;
          border: 1px solid #f3f3f3;
          padding-top: 14px;
          margin-bottom: 20px;
          .type-inline{
            width: 33%;
            border-right: 1px solid #f3f3f3;
            text-align: center;
            line-height: 1;
            display: inline-block;
            font-size: 0;
            vertical-align: top;
            &:last-child{
              border-right:none;
            }
            .type-title{
              font-size: 14px;
              margin-bottom: 8px;
            }
            .type-desc{
              font-size: 18px;
            }
          }
        }
        .bid{
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;
          background: #f3f3f3;
          height: 128px;
          text-align: center;
          .bid-title{
            font-size: 18px;
            color: #a9a9a9;
            line-height: 1;
            padding: 30px 0 13px;
          }
          .bid-number{
            color: #fe3c5c;
            font-size: 36px;
            font-weight: bold;
            line-height: 1;
          }
        }

        .btn{
          width: 100%;
          height: 56px;
          line-height: 56px;
          background: $green;
          color: #fff;
          text-align: center;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          margin:20px 30px 0 0;
          cursor: pointer;
          font-size: 22px;
          span{
            display: inline-block;
            background: url("~@/images/record/zixun.png") no-repeat;
            width: 32px;
            height: 32px;
            -webkit-background-size: 100%;
            background-size: 100%;
            vertical-align: middle;
            margin-right: 7px;
          }
          &.btn-hover:hover{
            background: #5fded2;
          }
          &.btn-hover:active{
            background: #31b2a6;
          }
        }
      }
    }

    .link{
      font-size: 20px;
      color: #b8b8b8;
      cursor: pointer;
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
