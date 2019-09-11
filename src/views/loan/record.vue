<template>
  <div class="main">

    <div class="top-main">
        <el-form :inline="true" ref="management" :model="management" label-position="left">
          <el-form-item label="">
            <el-select v-model="management.companyType" placeholder="请选择" style="width:120px">
              <el-option label="融资企业" value="1"></el-option>
              <el-option label="所属企业" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="management.companyName"></el-input>
          </el-form-item>
          <div class="inquire">
            <el-button class="el-button el-button--primary" @click="inquire">查询</el-button>
            <el-button class="el-button " @click="inquireClear">清空</el-button>
          </div>
        </el-form>
    </div>

    <div class="content">
      <el-table
        v-loading="loading"
        :data="page.records"
        style="width: 100%">
        <el-table-column
          label="序号"
          width="60px"
          type="index"
        ></el-table-column>
        <el-table-column
          label="融资企业"
          prop="borrowOrgName">
        </el-table-column>
        <el-table-column
          label="所属企业"
          prop="tmsOrgName">
        </el-table-column>
        <el-table-column
          label="产品类型"
          prop="productTypeName">
        </el-table-column>
        <el-table-column
          prop="loanName"
          label="合同名称">
        </el-table-column>
        <el-table-column
          prop="loanCode"
          label="放款合同编号">
          <template slot-scope="scope">
            <a class="blue" target="_blank" :href="scope.row.contractUrl" >{{scope.row.loanCode}}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="申请单编号"
          prop="pledgeCode">
          <template slot-scope="scope">
            <router-link class="blue" tag="a" target="_blank"
                         :to="{name:'financing_apply_detail',params:{id:scope.row.id},query:{orderNum:scope.row.freightBorrowOrderNum}}">
              {{scope.row.freightBorrowOrderNum}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="放款金额（元）"
          prop="amount">
        </el-table-column>
        <el-table-column
          label="发起时间"
          prop="startDate">
        </el-table-column>
        <el-table-column
          label="融资企业签署时间"
          prop="borrowOrgDate">
        </el-table-column>
        <el-table-column
          label="完成时间"
          prop="completeDate">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div class="blue">
              <a :href="scope.row.contractUrl" target="_blank">查看</a>
              <a :href="scope.row.contractUrl" target="_blank" :download="scope.row.loanName">下载</a>
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

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      @close="handleClose"
      center
    >
      <p class="text-center">合同已经下载成功！</p>
      <span slot="footer" class="dialog-footer">
        <el-button class="width-110" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import store from '@/store'
  import ajax from '@/utils/ajax'

  export default {
    data(){
      let _this = this;
      let userType = this.$store.getters.userType;
      let companyType = 3;
      if(userType == 3){
        companyType = '';
      }
      return {
        userType:userType,
        userId:_this.$store.getters.userId,
        api:'/financing/loan-contract-manage/',
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[],
          "total":0
        },
        management:{
          financeOrgStatus:2,
          companyType:companyType,
          companyName:'',
        },
        loading:false,
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

        this.management.companyType = '';
        this.management.companyName = '';

        this.ajaxPage(1);
      },
      ajaxPage:function (page) {
        let url = `${this.api}page`;
        var _this = this;
        let date = {
              companyType:_this.management.companyType,
              companyName:_this.management.companyName,
              financeOrgId:_this.userId,
              financeOrgStatus:_this.management.financeOrgStatus,
              pageNum:page
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

      handleClose(){
      },
      promptDown(){
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
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
  .top-main{
    text-align: right;
    margin-bottom: 20px;
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
