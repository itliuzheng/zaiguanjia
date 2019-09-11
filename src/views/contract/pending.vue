<template>
  <div class="main">

    <div class="content line-border">
      <el-table
        :data="page.records"
        v-loading="loading"
        style="width: 100%">
        <el-table-column
          label="序号"
          width="60px"
          type="index"
        ></el-table-column>
        <el-table-column
          label="合同编号">
          <template slot-scope="scope">
            <div class="row-line" v-for="(list,index) in scope.row.contractTextList">
              <a :href="list.contractUrl" target="_blank" class="blue">{{list.contractNum}}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="合同名称">
          <template slot-scope="scope">
            <div class="row-line" v-for="(list,index) in scope.row.contractTextList" :key="index">{{list.contractName}}</div>
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
              <el-button @click="handlePlan(scope.row)" :disabled="btnDisabled" type="text" size="small">签约并提交</el-button>
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
      center
    >
      <p class="text-center">签约已提交成功！</p>
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
      let userType = this.$store.getters.userType;

      return {
        api:'/contract/contract-manage/',
        userType:userType,
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[
          ],
          "total":0
        },
        // {
        //     "pageNum": "int",
        //     "pageSize": "int",
        //     "type": "int //0-发起签约，1-待签约，2-签署进度，3-签署记录，4-确认合同",
        //     "companyType": "int //合同状态：1- 融资企业, 2-tms企业（所属企业）",
        //     "companyName": "string //企业名称"
        // },
        management:{
          pageNum:1,
          pageSize:10,
          type:1,
        },
        btnDisabled:false,
        dialogVisible:false,
        dialogForm:null,
        loading:false,
      }
    },
    beforeMount:function(){
      this.ajaxPage(1);
    },
    methods:{
      ajaxPage:function (page) {
        let url = `${this.api}page`;
        var _this = this;
        _this.management.pageNum = page;
        _this.loading = true;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:_this.management
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

      goProgress(){
        this.dialogVisible = false;
        this.$router.push({path:'/contract/progress'})
      },
      handlePlan(row) {
        this.$confirm('您确定签约？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          this.openDialog(row);
        }).catch(() => {
          this.ajaxPage(1);
        });
      },
      openDialog(row){

        this.btnDisabled = true;

        this.dialogForm = row;

        var _this = this;
        let url = `${this.api}update`;

        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              id:row.id,
              type:_this.management.type,
              status:2,
            }
          }).then(function (res) {
            _this.btnDisabled = false;
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.ajaxPage(1);
                _this.dialogVisible = true;
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
