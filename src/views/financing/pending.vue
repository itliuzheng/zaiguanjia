<template>
  <div class="main">

    <div class="content">
      <el-table
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
          label="合同编号">
          <template slot-scope="scope">
            <a class="blue" target="_blank" :href="scope.row.contractUrl" >{{scope.row.loanCode}}</a>
          </template>
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
          label="金融机构"
          prop="financeOrgName">
        </el-table-column>
        <el-table-column
          label="发起时间"
          prop="startDate">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div class="blue">
              <el-button @click="openDialog(scope.row)"  :disabled="btnDisabled" type="text" size="small">签约</el-button>
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
      <p class="text-center" >签约已提交成功！</p>
      <span slot="footer" class="dialog-footer" center>
        <el-button class="width-110" type="primary" @click="goProgress">前往查看进度</el-button>
        <el-button class="width-110" @click="dialogVisible = false">返 回</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
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
          borrowOrgStatus:1
        },
        dialogVisible:false,
        btnDisabled:false,
      }
    },
    beforeMount:function(){

      this.ajaxPage(1);
    },
    methods:{
      ajaxPage:function (page) {
        let url = `${this.api}page`;
        var _this = this;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              borrowOrgId:_this.userId,
              borrowOrgStatus:_this.management.borrowOrgStatus,
              pageNum:page,
            }
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

      handleClose(){
      },
      goProgress(){
        this.dialogVisible = false;

        this.$router.push({name:'financing_inquire'})

      },
      openDialog(row){

        this.btnDisabled = true;
        var _this = this;
        let url = `/financing/freight-borrow/review`;

        let date = {
          freightBorrowOrderNum:row.freightBorrowOrderNum,
          type:6,
        };


        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:date
          }).then(function (res) {
            _this.btnDisabled = false;
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.dialogVisible = true;

                _this.ajaxPage(1);


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
