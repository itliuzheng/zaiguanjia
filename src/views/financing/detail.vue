<template>
  <div class="main">

    <div>
      <el-table
        v-loading="loading"
        :data="page.records"
        height="400"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="55">
        </el-table-column>
        <el-table-column
          label="批次号">
          <template slot-scope="scope">
            <router-link class="blue" tag="a" target="_blank" :to="{name:'financing_apply_detail_sub',params:{id:scope.row.batchNum}}">{{scope.row.batchNum}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="发货人"
          prop="shipper">
        </el-table-column>
        <el-table-column
          label="发货人手机号"
          prop="shipperPhone">
        </el-table-column>
        <el-table-column
          label="运单完成时间"
          prop="completeDate">
        </el-table-column>
        <el-table-column
          label="运单结算时间"
          prop="settlementDate">
        </el-table-column>
        <el-table-column
          label="未结算金额（元）"
          prop="freight">
        </el-table-column>
        <el-table-column
          label="结算周期（天）"
          prop="settlementInterval">
        </el-table-column>
      </el-table>
    </div>

    <el-table
      class="flex-table"
      v-loading="loading"
      :data="data"
      style="width: 100%">
      <el-table-column
        label="融资率（%）"
        prop="financingRate">
      </el-table-column>
      <el-table-column
        label="金融机构"
        prop="financeOrgName">
      </el-table-column>
      <el-table-column
        label="融资金额（元）"
        prop="financingAmount">
      </el-table-column>
      <el-table-column
        label="日利率（%）"
        prop="dailyRate">
      </el-table-column>
      <el-table-column
        label="预计还款利息（元）"
        prop="originInterest">
      </el-table-column>
      <el-table-column
        label="展期天数（天）"
        prop="deferDays">
      </el-table-column>
      <el-table-column
        label="预计还款总额（元）"
        prop="totalAmount">
      </el-table-column>
      <el-table-column
        label="运输合同"
        prop="contractUrl">
          <template slot-scope="scope">
            <a :href="scope.row.contractUrl" class="blue" target="_blank">查看合同</a>
          </template>
      </el-table-column>
    </el-table>


  </div>
</template>
<script>
  import store from '@/store'
  import ajax from '@/utils/ajax'


  export default {
    data(){
      let title = this.$route.meta.title;
      let _this = this;
      return {
        title:title,
        api:'/financing/freight-borrow-sub/',
        api_detail:'/financing/freight-borrow/',
        userType:_this.$store.getters.userType,
        userId:_this.$store.getters.userId,
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[
          ],
          "total":0
        },
        management:{
          shipper:'',
          completeDate:'',
        },
        data:[],
        get_rate:null,
        transportSlipIds:null,
        loading:false,
        multipleSelection:null,
        loadding:false,
        tipsVisible:false,
        tips:{},
        dialogVisible:false,
        dialogForm:{},
      }
    },
    beforeMount:function(){
      let id = this.$route.params.id;
      let orderNum = this.$route.query.orderNum;
      this.ajaxPage(orderNum);
      this.getInit(orderNum);
    },
    methods:{
      ajaxPage:function (id) {
        let url = `${this.api}page`;
        var _this = this;

        let date = {
          freightBorrowOrderNum:id,
        };

        _this.loading = true;

        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:date
          }).then(function (res) {
            _this.loading = false;
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
      getInit:function (id) {
        let url = `${this.api_detail}${id}`;
        var _this = this;

        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'get',
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.data.push(data.data);
                _this.get_rate = data.data;

              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
    }
  }
</script>
<style lang="scss">
  .zd-btn{
    width: 300px;
    margin-top: 20px;
    color: #fff !important;
    background: linear-gradient(120deg,#7ab5f4,#4b81f2);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }
  .flex-table.el-table{
    th{
      background: #f1f7fd;
    }
  }
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
  $red : #ff4c4c;
  .main{
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px;
  }
  .red{
    color: $red;
  }
  .table-header{
    background: rgb(48, 65, 86);
    height: 80px;
    line-height: 80px;
    padding: 0 10px;
    .header{
      color: #fff;
      font-size: 24px;
      font-weight: bold;
    }
    .fr{
      text-align: right;
    }
    .button-fr{
      margin-right: 15px;
    }
  }
  .top-main{
    text-align: right;
    margin-bottom: 20px;
  }
  .svg-icon{
    font-size: 22px;
    cursor: pointer;
  }
  .blue{
    color: $blue;
    p{
      cursor: pointer;
      color: $blue;
    }
  }
  .inlineBlock{
    p{
      display: inline-block;
    }
  }
</style>
