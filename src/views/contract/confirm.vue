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
            <el-button class="el-button el-button--primary" @click="inquire" :loading="loadding">查询</el-button>
            <el-button class="el-button " @click="inquireClear" :loading="loadding">清空</el-button>
          </div>
        </el-form>
    </div>

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
          label="发起时间"
          prop="startDate">
        </el-table-column>
        <el-table-column
          label="融资企业签署时间"
          prop="borrowOrgDate">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div class="blue">
              <p @click="openDialog(scope.row,3)">确认合同</p>
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
      <p class="text-center">合同已确认！</p>
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
      let companyType = 3;
      if(userType == 3){
        companyType = '';
      }

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
          companyType:companyType,
          companyName:'',
          type:4,
        },
        dialogVisible:false,
        dialogForm:null,
        loadding:false,
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
        let _this = this;
        _this.loadding = true;
        let date = {
              companyType:_this.management.companyType,
              companyName:_this.management.companyName,
              type:_this.management.type,
              pageNum:page,
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
            _this.loadding = false;

          }).catch(error => {
            reject(error)
          })
         })
      },

      handleClose(){
      },
      goProgress(){
        this.dialogVisible = false;
        this.$router.push({path:'/contract/record'})
      },
      openDialog(row,status){
        this.dialogForm = row;
        this.dialogVisible = true;

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
