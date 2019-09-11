<template>
  <div class="main">

    <div class="top-main">
        <el-form :inline="true" ref="management" :model="management" label-position="left">

          <el-form-item label="申请单编号:">
            <el-input v-model="management.freightBorrowOrderNum" placeholder="请输入申请编号"></el-input>
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
          label="产品类型"
          prop="productTypeName">
        </el-table-column>
        <el-table-column
          prop="loanCode"
          label="合同编号">
        </el-table-column>
        <el-table-column
          prop="loanName"
          label="合同名称">
        </el-table-column>
        <el-table-column
          label="申请单编号">
          <template slot-scope="scope">
            <router-link class="blue" tag="a" target="_blank" :to="{name:'financing_apply_detail',params:{id:scope.row.id},query:{orderNum:scope.row.freightBorrowOrderNum}}">{{scope.row.freightBorrowOrderNum}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="financeOrgName"
          label="金融机构">
        </el-table-column>
        <el-table-column
          prop="startDate"
          label="发起时间">
        </el-table-column>
        <el-table-column
          prop="completeDate"
          label="完成时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div>
              <a class="blue inlineBlock" href="#/home" target="_blank">查看合同</a>
              <p class="blue inlineBlock" @click="downloadContract(scope.row)">下载合同</p>
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


  </div>
</template>
<script>
  import store from '@/store'
  import ajax from '@/utils/ajax'

  export default {
    data(){
      let _this = this;
      let userType = this.$store.getters.userType;

      return {
        api:'/financing/loan-contract-manage/',
        userType:userType,
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
          freightBorrowOrderNum:'',
          financeOrgStatus:2,
        },
        loading:false,
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
        this.management.freightBorrowOrderNum = '';
        this.ajaxPage(1);
      },
      downloadContract(row){
        this.$alert('暂无下载功能');
      },
      ajaxPage:function (page) {
        let url = `${this.api}page`;

        var _this = this;
        _this.loading = true;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              freightBorrowOrderNum:_this.management.freightBorrowOrderNum,
              borrowOrgId:_this.management.userId,
              financeOrgStatus:_this.management.financeOrgStatus,
              pageNum:page,
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
