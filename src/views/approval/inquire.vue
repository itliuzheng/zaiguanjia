<template>
  <div class="main">

    <div class="top-main" v-if="userType == 3">
        <el-form :inline="true" ref="management" :model="management" label-position="left">
          <el-form-item label="状态:" class="width-3">
            <el-select v-model="management.status" placeholder="请选择"  style="width:100px">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="到期" :value="3"></el-option>
              <el-option label="终止" :value="2"></el-option>
            </el-select>
          </el-form-item>
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
          v-if="userType == 3"
          width="60px"
          type="index"
        ></el-table-column>
        <el-table-column
          label="金融机构"
          v-if="userType == 2"
          prop="financeOrgName">
        </el-table-column>
        <el-table-column
          label="融资企业"
          v-if="userType == 3"
          prop="companyName">
        </el-table-column>
        <el-table-column
          label="所属企业"
          v-if="userType == 3"
          prop="tmsOrgName">
        </el-table-column>
        <el-table-column
          label="授信产品"
          v-if="userType == 3"
          prop="creditTypeName">
        </el-table-column>
        <el-table-column
          label="起始日"
          prop="creditStartDate">
        </el-table-column>
        <el-table-column
          label="到期日"
          prop="creditEndDate">
        </el-table-column>
        <el-table-column
          label="总额度(元)"
          prop="creditAccount">
        </el-table-column>
        <el-table-column
          label="已使用额度(元)"
          prop="usedAccount">
        </el-table-column>
        <el-table-column
          label="在途冻结额度(元)"
          prop="frozeningAccount">
        </el-table-column>
        <el-table-column
          label="冻结额度(元)"
          prop="frozenAccount">
        </el-table-column>
        <el-table-column
          label="可用额度(元)"
          prop="availableAccount">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <p  v-if="scope.row.status == 1">正常</p>
            <p  v-else-if="scope.row.status == 2">终止</p>
            <p  v-else-if="scope.row.status == 3">到期</p>
          </template>
        </el-table-column>
        <el-table-column
          v-if="userType == 3"
          width="150px"
          label="操作">
          <template slot-scope="scope">
            <div class="blue inlineBlock" v-if="scope.row.status == 1">
              <p @click="freezeQuota(scope.row)">冻结额度</p>
              <p @click="ThawingQuota(scope.row)">解冻额度</p>
              <p @click="deleteClick(scope.row)">额度终止</p>
              <p @click="ChangeQuota(scope.row)">额度变更</p>
            </div>
            <div class="blue inlineBlock" v-else-if="scope.row.status == 2">
              <p @click="restoreClick(scope.row)">恢复</p>
            </div>
            <div class="inlineBlock" v-else-if="scope.row.status == 3">
              <p>---</p>
            </div>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--label="操作">-->
          <!--<template slot-scope="scope">-->
            <!--<div class="blue inlineBlock">-->
              <!--<p @click="viewRecord(scope.row)">查看记录</p>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
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

    <add-quota  :data="dialogForm"  :api="api" v-if="dialogFormVisible" @is_show="is_show"></add-quota>
    <add-blacklist :data="listForm"  :api="api" v-if="listFormVisible" @is_show="is_list_show"></add-blacklist>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'
  import { AddQuota } from "./component";
  import AddBlacklist from "./component/AddBlacklist";

  export default {
    components: {
      AddBlacklist,
      AddQuota,
    },
    data(){
      let userType = this.$store.getters.userType;
      let companyType = 3;
      if(userType == 3){
        companyType = '';
      }
      return {
        userType:userType,
        api:'/corporate/financing-company-credit-account/',
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[
          ],
          "total":0
        },
        management:{
          status:'',
          companyType:companyType,
          companyName:'',
        },
        loading:false,
        dialogFormVisible:false,
        dialogForm:null,
        listFormVisible:false,
        listForm:null,
      }
    },
    beforeMount:function(){

      this.ajaxPage(1);
    },
    methods:{
      freezeQuota(row){
      //1-变更额度, 2-解冻额度,3-冻结额度,4-终止额度,5-恢复额度",
        this.dialogForm = row;
        this.dialogForm.title = '冻结额度';
        this.dialogForm.itemTitle = '冻结量';
        this.dialogFormVisible = true;
      },
      ThawingQuota(row){
        this.dialogForm = row;
        this.dialogForm.title = '解冻额度';
        this.dialogForm.itemTitle = '解冻量';
        this.dialogFormVisible = true;
      },
      ChangeQuota(row){
        this.dialogForm = row;
        this.dialogForm.title = '额度变更';
        this.dialogForm.itemTitle = '变更额度';
        this.dialogFormVisible = true;
      },
      deleteClick(row){
        let _this = this;
        this.$confirm('确定终止额度?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {

          _this.modifyStatus(row.id,4);

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消终止操作'
          });
        });
      },
      restoreClick(row){
        let _this = this;
        this.$confirm('确定恢复额度?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          _this.modifyStatus(row.id,5);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消恢复'
          });
        });
      },
      modifyStatus(id,status){
        let _this = this;
        let url = `${_this.api}changeAccount`;

        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              id:id,
              status:status
            }
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(status == 5){
                _this.$message.success('已恢复');
              }else{
                _this.$message.success('已终止');
              }
              _this.ajaxPage(1);
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      viewRecord(row){
        this.listForm = row;
        this.listFormVisible = true;
      },
      inquire(){
        this.ajaxPage(1);
      },
      inquireClear(){
        this.management.companyType = '';
        this.management.companyName = '';
        this.management.status = '';
        this.ajaxPage(1);
      },
      ajaxPage:function (page) {
        let url = `${this.api}page`;
        var _this = this;
        _this.loading = true;

        let date = {
              companyType:_this.management.companyType,
              companyName:_this.management.companyName,
              status:_this.management.status,
              pageNum:page
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
      is_show(data){
        this.dialogFormVisible = false;
        if(!data){
          this.ajaxPage(1);
        }
      },
      is_list_show(data){
        this.listFormVisible = false;
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
    .inquire{
      display: inline-block;
    }
  }
  .svg-icon{
    font-size: 22px;
    cursor: pointer;
  }
  .blue{
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
