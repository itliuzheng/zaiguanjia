<template>
  <div v-cloak>

    <div class="header-contact clearfix">
      <div class="contact-main">
        <p class="fl">债管家 您身边的智能化资产处置平台</p>
        <p class="fr header-btn">联系我们</p>
      </div>
    </div>
    <div class="header clearfix" >
      <div class="header-content clearfix">
        <h2 class="logo">
          <router-link to="/">
            <img src="@/images/logo.png" alt="泛鹏logo">
          </router-link>
        </h2>
        <ul class="fp-menu" ref="FpMenu">
          <li v-for="list in router_list" v-if="!list.hidden"
              :class="{'active':menuActive == list.redirect}">
            <span @click="routeClick(list)">{{list.meta.title}}</span>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'
  import { mapGetters } from 'vuex'

  export default {
    data(){
      return {
        router_list:[
          {
            redirect:'/',
            meta:{
              title:'首页'
            }
          },
          {
            redirect:'/',
            meta:{
              title:'业务介绍'
            }
          },
          {
            redirect:'/',
            meta:{
              title:'交易大厅'
            }
          },
          {
            redirect:'/',
            meta:{
              title:'关于我们'
            }
          },
        ]
      }
    },
    computed: {
      menuActive:function () {
        let active = this.$route.path;
        if(this.$route.meta.active){
          active = this.$route.meta.active;
        }
        return active;
      }
    },
    beforeMount(){
      // this.getInit();
    },
    methods:{
      getInit(){
        let _this = this;

        new Promise((resolve, reject) => {
          ajax.get('header/')
              .then(response => {
                let data = response.data.data;

                _this.productList = data.products;

                resolve(response)
              }, err => {
                  reject(err)
              })
              .catch((error) => {
                  reject(error)
              })
        })

      },
      routeClick(dom){
        this.$router.push({path:dom.redirect})
      },
    }

  }
</script>
<style lang="scss">
  $nav_height:60px;

  .logo{
    float: left;
    line-height:1;
    padding-top: 15px;
    img{
      display: inline-block;
      vertical-align: top;
      width: 170px;
      height: 56px;
    }
  }

  .header-contact{
    width: 100%;
    background: #eef3f8;
    border-bottom: 1px solid #e7ebed;
    .contact-main{
      width: 1200px;
      height: 45px;
      margin: 0 auto;
      .fl{
        color: #c1c1c1;
        font-size: 12px;
        line-height: 46px;
      }
      .header-btn{
        width: 90px;
        height: 30px;
        margin-top: 9px;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        background: #52c5ba;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
      }
    }
  }
  .header-content{
    width: 1200px;
    margin: 0 auto;
  }

  .header{
    background:#fff;
    width: 100%;
    height: 90px;
    border-bottom: 1px solid #e7ebed;
  }
</style>
<style lang="scss" scoped>
  $green:#82d7cf;
  $sub-default:#3d3e40;
  $sub-active:#1d1e22;

  .fp-menu{
    float: right;
    color: #333;
    >li{
      min-width: 80px;
      float: left;
      margin: 0 0 0 86px;
      font-size: 18px;
      font-weight: 500;
      line-height: 90px;
      text-align:center;
      cursor: pointer;
      position: relative;
      span{
        display: block;
      }
      &.active{
        >span:after{
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 80px;
          height: 6px;
          background: $green;
        }
      }
      &:hover{
        >span:after{
          content: '';
          position: absolute;
          bottom: 0;
          left:0;
          width: 80px;
          height: 6px;
          background: $green;
        }
      }
    }
  }
  ul{
    -webkit-transition: 0.5s all ease-in-out;
    -moz-transition: 0.5s all ease-in-out;
    -ms-transition: 0.5s all ease-in-out;
    -o-transition: 0.5s all ease-in-out;
    transition: 0.5s all ease-in-out;
  }

  .fp-sub-menu{
    display: none;
    position: absolute;
    left: 0;
    top:60px;
    background: $sub-active;
    width: 100%;
    line-height: 45px;
    font-size: 16px;
    /*overflow: hidden;*/
    /*height: 0;*/
    li{
      span{
        display: block;
      }
      &:hover{
        background: $sub-default;
      }
    }
  }

  .fp-right-menu{
    display: none;
    position: absolute;
    left: 100%;
    top:0;
    background: rgba(35,38,73,0.8);
    width: 100%;
    line-height: 45px;

    li{
      &:hover{
        background: rgba(255,255,255,0.8);
        color: #222649;
      }
    }
  }
  .fp-row-menu{
    width: 290px;
    li{
      width: 145px;
      float: left;
    }
  }

</style>

