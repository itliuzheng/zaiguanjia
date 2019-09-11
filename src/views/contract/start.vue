<template>
  <div class="main">

    <!--监管方-->
    <div v-if="userType == 4" class="content line-border">
      <el-table
        :data="page.records"
        style="width: 100%">
        <el-table-column
          label="序号"
          width="60px"
          type="index"
        ></el-table-column>
        <el-table-column
          label="企业名称"
          prop="companyName">
        </el-table-column>
        <el-table-column
          label="合同编号">
          <template slot-scope="scope">
            <a v-if="list.contractType == 3" v-for="(list,index) in scope.row.contractTextList" :href="list.contractUrl" target="_blank" class="blue">{{list.contractNum}}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="合同名称">
          <template slot-scope="scope">
            <div v-if="list.contractType == 3" v-for="(list,index) in scope.row.contractTextList" :key="index">{{list.contractName}}</div>
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
              <p @click="openDialog(scope.row,2)">签约并提交</p>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--融资企业-->
    <div v-else-if="userType == 2" class="content line-border">
      <el-table
        :data="page.records"
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
              <p @click="openDialog(scope.row,2)">签约并提交</p>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--金融机构-->
    <div v-else-if="userType == 3" class="content line-border">
      <el-table
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
          label="合同名称">
          <template slot-scope="scope">
            <div class="row-line" v-for="(list,index) in scope.row.contractTextList" :key="index">{{list.contractName}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="合同编号">
          <template slot-scope="scope">
            <div class="row-line" v-for="(list,index) in scope.row.contractTextList">
              <a :href="list.contractUrl" target="_blank" class="blue">{{list.contractNum}}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div class="blue">
              <p @click="openDialog(scope.row,1)">发起签约</p>
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
        management:{
          type:0,
        },
        dialogVisible:false,
        dialogForm:null,
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
              type:_this.management.type,
              userType:_this.userType,
              pageNum:page,
            }
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.page = data.data;
              }
            }else{
              _this.$message.error(data.msg)
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
        this.$router.push({path:'/contract/progress'})
      },
      openDialog(row,status){

        var _this = this;
        let url = `${this.api}update`;

        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              id:row.id,
              type:_this.management.type,
              status:status,
            }
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.ajaxPage(1);
              }
              _this.dialogVisible = true;
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
