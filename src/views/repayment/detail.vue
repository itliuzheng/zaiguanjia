<template>
  <div class="main">

    <div class="top-main">
        <el-form :inline="true" ref="management" :model="management" label-position="left">

          <el-form-item label="状态:">
            <el-select v-model="management.status" placeholder="请选择" style="width: 100px;">
              <el-option label="正常" value="1"></el-option>
              <el-option label="展期" value="2"></el-option>
              <el-option label="逾期" value="3"></el-option>
              <el-option label="已还" value="6"></el-option>
              <el-option label="回购完成" value="4"></el-option>
              <el-option label="逾期处置完成" value="5"></el-option>
            </el-select>
          </el-form-item>

          <template v-if="userType == 3">
            <el-form-item label="">
              <el-select v-model="management.companyType" placeholder="请选择" style="width:120px">
                <el-option label="融资企业" value="1"></el-option>
                <el-option label="所属企业" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="management.companyName"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="金融机构">
              <el-input v-model="management.companyName"></el-input>
            </el-form-item>
          </template>
          <el-form-item label="融资申请时间:" >
            <el-date-picker style="width: 190px;" v-model="management.applyData" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <div class="inquire">
            <el-button class="el-button el-button--primary" @click="inquire">查询</el-button>
            <el-button class="el-button " @click="inquireClear">清空</el-button>
          </div>
        </el-form>
    </div>

    <div class="content">
      <el-table
        :data="page.records"
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index">
        </el-table-column>
        <el-table-column
          label="产品类型"
          prop="productTypeName">
        </el-table-column>
        <el-table-column
          label="申请单编号">
          <template slot-scope="scope">
            <router-link class="blue" tag="a" target="_blank" :to="{name:'financing_apply_detail',params:{id:scope.row.id},query:{orderNum:scope.row.freightBorrowOrderNum}}">{{scope.row.freightBorrowOrderNum}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="批次号">
          <template slot-scope="scope">
            <router-link class="blue" tag="a" target="_blank" :to="{name:'financing_apply_detail_sub',params:{id:scope.row.batchNum}}">{{scope.row.batchNum}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="金融机构"
          v-if="userType == 2"
          prop="financeOrgName">
        </el-table-column>
        <el-table-column
          label="融资企业"
          v-if="userType == 3"
          prop="borrowOrgName">
        </el-table-column>
        <el-table-column
          label="所属企业"
          v-if="userType == 3"
          prop="tmsOrgName">
        </el-table-column>
        <el-table-column
          prop="applyDate"
          label="融资申请时间">
        </el-table-column>
        <el-table-column
          prop="applyDate"
          label="融资起始日">
        </el-table-column>
        <el-table-column
          prop="expireDate"
          label="融资到期日">
        </el-table-column>
        <el-table-column
          prop="deferDay"
          label="展期（天）">
        </el-table-column>
        <el-table-column
          prop="deferEndDate"
          label="展期到期日">
        </el-table-column>
        <el-table-column
          prop="repaymentWayName"
          label="还款方式">
        </el-table-column>
        <el-table-column
          prop="totalAmount"
          label="还款金额（元）">
        </el-table-column>
        <el-table-column
          label="业务状态">
          <template slot-scope="scope">
            <p v-if="scope.row.status == 1">正常</p>
            <p v-else-if="scope.row.status == 2">展期</p>
            <p v-else-if="scope.row.status == 3">逾期</p>
            <p v-else-if="scope.row.status == 4">回购完成</p>
            <p v-else-if="scope.row.status == 5">逾期处置完成</p>
            <p v-else>已还</p>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 4 || scope.row.status == 5 || scope.row.status == 6" class="blue">
              <p  @click="openShow(scope.row)">详情</p>
            </div>
            <div v-else>
              <p >----</p>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page" v-if="page.total != 0">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-size="page.pageSize"
        layout="total, prev,pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>


    <show-redeem-detail :data="dialogForm" api="/repayment/repayment-detail/getRepaymentDetail/"  v-if="dialogVisible" @is_show="is_show"></show-redeem-detail>
  </div>
</template>
<script>
  import store from '@/store'
  import ajax from '@/utils/ajax'
  import {ShowRedeemDetail} from "./component";

  export default {
    components: {
      ShowRedeemDetail,
    },
    data(){
      let userType = this.$store.getters.userType;
      let companyName = userType == 3?'':'3';
      return {
        userType:userType,
        api:`/repayment/repayment/`,
        type:'mechanism',
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[],
          "total":0
        },
        management:{
          companyType:companyName,
          companyName:'',
          applyData:'',
          status:'',
          statuses:'',
        },
        dialogVisible:false,
        dialogForm:null,

      }
    },
    beforeMount:function(){

      this.ajaxPage(1);
    },
    methods:{
      inquire(){
        this.ajaxPage(1);
      },
      inquireClear(){
        this.management.companyName = '';
        this.management.applyData = '';
        this.management.status = '';

        if(this.userType == 3){
          this.management.companyType = '';
        }

        this.ajaxPage(1);
      },
      ajaxPage:function (page = 1) {
        this.loading = true;
        let url = `${this.api}page`;
        var _this = this;
        let date = {};

        let status = _this.management.statuses;

        if(_this.management.status){
          status = _this.management.status;
        }

        date  = {
          companyType:_this.management.companyType,
          companyName:_this.management.companyName,
          status:status,
          applyData:_this.management.applyData,
          pageNum:page,
        };


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

      handleClose(){
      },
      is_show(data){
        this.dialogVisible = false;
      },
      openShow(row){
        this.dialogForm = row;
        this.dialogVisible = true;
      },
      handleCurrentChange(val) {
        this.ajaxPage(val);
      },
    }
  }
</script>
<style lang="scss">
  .page{
      padding-bottom: 30px;
      .el-pagination{
        margin-top: 30px;
        text-align: center;
      }
    }

  .width-3,.width-4{
    .el-date-editor.el-input,.el-select{
      width: 100%;
    }
  }
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
  .top-main{
    text-align: right;
    margin-bottom: 20px;
    .width-3{
      max-width: 30%;
    }
    .width-4{
      max-width: 25%;
    }
    .inquire{
      display: inline-block;
    }
  }
  .svg-icon{
    font-size: 22px;
    cursor: pointer;
  }
  .width-110{
    width: 110px;
    text-align: center;
    padding: 12px 0;
  }
  .blue{
    color: $blue;
    p{
      cursor: pointer;
      color: $blue;
    }
  }
</style>
