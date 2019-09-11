<template>
  <div class="main">
    <h2>运单详情</h2>
    <div>
      <el-table
        v-loading="loading"
        :data="page.records"
        style="width: 100%">
        <el-table-column
          prop="batchNum"
          label="批次号">
        </el-table-column>
        <el-table-column
          label="订单号"
          prop="freightBorrowOrderNum">
        </el-table-column>
        <el-table-column
          label="总体积（m²）"
          width="60px"
          prop="totalVolume">
        </el-table-column>
        <el-table-column
          label="总重量（t）"
          width="60px"
          prop="totalWeight">
        </el-table-column>
        <el-table-column
          label="发货地址"
          prop="shipmentsAddr">
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
          label="收货地址"
          prop="consigneeAddr">
        </el-table-column>
        <el-table-column
          label="收货人名称"
          prop="consignee">
        </el-table-column>
        <el-table-column
          label="收货人电话"
          prop="consigneePhone">
        </el-table-column>
        <el-table-column
          label="订单完成时间"
          prop="completeDate">
        </el-table-column>
        <el-table-column
          label="发单时间"
          prop="startDate">
        </el-table-column>
        <el-table-column
          label="司机姓名"
          prop="driverName">
        </el-table-column>
        <el-table-column
          label="司机手机号"
          prop="driverPhone">
        </el-table-column>
        <el-table-column
          label="车牌号"
          prop="carNumber">
        </el-table-column>
        <el-table-column
          label="操作"
          prop="settlementInterval">
          <template slot-scope="scope">
            <a class="blue" target="_blank" href="http://minio.rongdaojingwei.com/public/u1740.png" >轨迹跟踪</a>
          </template>

        </el-table-column>
      </el-table>
    </div>



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
      this.ajaxPage(id);
    },
    methods:{
      ajaxPage:function (id) {
        let url = `${this.api}page-detail`;
        var _this = this;

        _this.loading = true;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              batchNum:id,
            }
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
    h2{
      margin-bottom: 30px;
    }
  }
  .red{
    color: $red;
  }
  .blue{
    color: $blue;
    p{
      cursor: pointer;
      color: $blue;
    }
  }
</style>
