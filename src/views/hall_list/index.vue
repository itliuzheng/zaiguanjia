<template>
  <div class="hall-list-main">
    <div class="search-box ">
      <div class="clearfix">
        <div class="label-title fl">债务人所属区域:</div>
        <div class="checkbox-box fl">
          <el-checkbox-group v-model="checkboxGroup1"
            fill="#2fc0b2" size="mini" @change="handleChange"
          >
            <el-checkbox-button v-for="city in cities" :label="city.key" :key="city.key">{{city.val}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div class="fl">
          <div class="search-input">
            <el-input
              placeholder="请输入区域城市"
              v-model="management.area">
              <i slot="suffix" class="data-icon"
                @click="handleIconClick"></i>
            </el-input>
          </div>
        </div>
      </div>
      <div class="clearfix">
        <div class="label-title fl">资产类型:</div>
        <div class="checkbox-box fl">
          <el-checkbox-group v-model="management.type"
            fill="#2fc0b2" size="mini" @change="handleChange2"
          >
            <el-checkbox-button v-for="city in loanType" :label="city.key" :key="city.key">{{city.val}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="list-box">
      <ul>
        <li v-for="(list,index) in page.records" :key="index">
          <div class="address fl" :class="list.status == 2?'address-disabled':''">
            <i class="active-address"></i>
            <span>{{list.area}}</span>
          </div>
          <div class="fl list-content">
            <p class="code">资产编号：123123123</p>
            <div class="clearfix">
              <div class="fl">
                <div class="list-type">
                  <p class="type-name">资产类型</p>
                  <p class="type-desc">
                    <span v-for="(item,index) in loanType" :key="index" v-if="list.type == item.key">{{item.val}}</span>
                  </p>
                </div>
                <div class="list-type bid-type">
                  <p class="type-name">标的金额</p>
                  <p class="type-desc red">{{list.amount | format}}元</p>
                </div>
                <div class="list-type souce-type">
                  <p class="type-name">资产来源</p>
                  <p class="type-desc">{{list.source}}</p>
                  <img  v-if="list.status == 2" src="@/images/record/compend.png" alt="">
                </div>
              </div>
              <div class="fr btn btn-hover" v-if="list.status == 1"><span></span>立即咨询</div>
              <div class="fr btn btn-disabled"  v-else-if="list.status == 2">已成交</div>
            </div>
          </div>
        </li>
      </ul>

      <div class="page-list" >
        <el-pagination
          v-if="page.total > 10"
          :background="true"
          :current-page="page.current"
          :page-size="10"
          :total="page.total"
          @current-change="handleCurrentChange"
          :pager-count="7"
          layout="prev, pager, next">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'
  const cityOptions = [{key:'-1', val:'全部'}, {key:'北京', val:'北京'}, {key:'天津', val:'天津'}, {key:'上海', val:'上海'}, {key:'广州', val:'广州'}, {key:'深圳', val:'深圳'},];

  export default {
    data(){
      return {
        api:'/loan/loan/',
        type_api:'/sys/sys-dict/getDictList',
        checkboxGroup1: ['-1'],
        cities: cityOptions,
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[
          ],
          "total":0
        },
        management:{
          area:'',
          type:[-1],
        },
        loanType:null,

      }
    },
    beforeMount:function(){
      this.ajaxPage(1);
      this.getInit();
    },
    methods: {
      handleIconClick(ev) {
        console.log(this.management.area);
        if(!this.management.area){
          this.checkboxGroup1 = ['-1']
        }else{
          this.checkboxGroup1 = [];
        }
        this.ajaxPage();
      },
      handleChange(val){
        this.management.area = '';

        if(val[val.length -1 ] == -1){
          this.checkboxGroup1 = ['-1'];
        }else{
          val.forEach((value,index)=>{
            if(value == -1){
              val.splice(index,1);
            }
          })
        }

        this.ajaxPage();
      },
      handleChange2(val){


        if(val[val.length -1 ] == -1){
          this.management.type = [-1];
        }else{
          val.forEach((value,index)=>{
            if(value == -1){
              val.splice(index,1);
            }
          })
        }
        this.ajaxPage();
      },
      handleCurrentChange(page){
        this.ajaxPage(page);
      },
      ajaxPage:function (page = 1 ) {
        let url = `${this.api}page`;
        var _this = this;

        let area = '';
        let type = '';

        if(!this.management.area){
          area = this.checkboxGroup1.join(',');
        }else{
          area = this.management.area;
        }

        type = this.management.type.join(',');

        let date = {
              areas:area,
              types:type,
              pageNum:page
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
    },
    filters:{
      format:function(num) {
        let amont = num.toFixed(2);
        let num1 = amont.split('.')[0];
        let num2 = amont.split('.')[1];
        var reg=/\d{1,3}(?=(\d{3})+$)/g;
        return (num1 + '').replace(reg, '$&,')+ '.'+num2;
      }
    }
  }
</script>
<style lang="scss">
  .hall-list-main{
    background: #f4f6f8;
    padding-top: 28px;
    min-height: 1000px;
    .checkbox-box{
      .el-checkbox-button:first-child .el-checkbox-button__inner{
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
      }
      .el-checkbox-button:last-child .el-checkbox-button__inner{
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
      }
      .el-checkbox-button{
        margin-right: 38px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        border:0 none;
        overflow: hidden;
        color: #333;
        &:focus{
          border:0 none;
        }
      }
      .el-checkbox-button--mini .el-checkbox-button__inner{
        padding: 8px 18px;
        color: #333;
        font-size: 16px;
      }
      .el-checkbox-button.is-checked .el-checkbox-button__inner{
        color: #fff;
      }
      .el-checkbox-button__inner{
        border:0 none;
        &:hover{
          
        }

      }
    }
    .search-input{
      display: inline-block;
      width: 216px;
      .el-input__inner{
        height: 28px;
        line-height: 28px;
        border: 0 none;
        /*background: #c6c6c6;*/
        background: #f4f6f8;
        font-size: 14px;
        padding-left: 13px;
      }
      .el-input__suffix{
        right: 0;
      }
      .data-icon{
        cursor: pointer;
        display: inline-block;
        width: 33px;
        height: 28px;
        background: url("~@/images/record/search.png") no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
      }
    }
  }
  .page-list{
    margin-top: 24px;
    padding-bottom: 24px;
    .el-pagination.is-background .el-pager li:not(.disabled):hover{
      color: #2fc0b2;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active{
      background-color:#2fc0b2;
    }

  }
</style>
<style lang="scss" scoped>
  $green : #2fc0b2;
  $red : #fe3c5c;

  .red{
    color: $red !important;
  }
  .search-box{
    width: 1200px;
    margin: 0 auto 0;
    height: 146px;
    padding-top: 40px;
    background: #fff;
    >div{
      margin-bottom: 13px;
    }
    .label-title{
      width: 160px;
      font-size: 16px;
      color: #333;
      line-height: 28px;
      text-align: right;
      margin-right: 69px;
    }
  }
  .list-box{
    margin-top: 28px;
    ul{
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      li{
        background: #fff;
        height: 186px;
        padding-top: 41px;
        border-bottom: 1px solid #dce5ef;
        position: relative;
        &:last-child{
          border: 0 none;
        }
        .address{
          position: absolute;
          left: 0;
          top: 41px;
          width: 103px;
          height: 103px;
          background: $green;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          text-align: center;
          padding-top: 15px;
          margin-left: 28px;
          .active-address{
            background: url("~@/images/record/icon.png") no-repeat;
            width: 44px;
            height: 52px;
            display: block;
            margin: 0 auto;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          span{
            display: inline-block;
            color: #f4f6f8;
            font-size: 16px;
            margin-top: 10px;
          }
          &.address-disabled{
            background: #dce0e0;
          }
        }
        .list-content{
          /*margin-left: 96px;*/
          padding-left: 227px;
          width: 100%;
          .code{
            font-size: 14px;
            color: #9e9e9e;
            line-height: 1;
            padding-top: 6px;
            text-align: left;
            margin-bottom: 22px;
          }
          .list-type{
            display: inline-block;
            .type-name{
              font-size: 14px;
              color: #9e9e9e;
              line-height: 1;
              margin-bottom: 11px;
            }
            .type-desc{
              color: #333;
              font-size: 22px;
              line-height: 1;
            }
          }
          .bid-type{
            width: 287px;
            margin-left: 92px;
          }
          .souce-type{
            width: 215px;
            position: relative;
            img{
              position: absolute;
              top: -20px;
              right: 0;
            }
          }
          .btn{
            width: 190px;
            height: 56px;
            line-height: 56px;
            background: $green;
            color: #fff;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            margin-right: 30px;
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
          .btn-disabled{
            background: #dce0e0;
            cursor: no-drop;
          }
        }
      }
    }
  }
</style>
