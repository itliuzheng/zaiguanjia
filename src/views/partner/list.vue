<template>
  <div class="main">

    <div class="top-main">
        <el-form :inline="true" ref="management" :model="management" label-position="left">
          <el-form-item label="合作商">
            <el-input v-model="management.companyName"></el-input>
          </el-form-item>

          <el-form-item label="合作类型" class="width-3">

            <el-select v-model="management.status" placeholder="请选择">
              <el-option label="全部"   :value="0"></el-option>
              <el-option label="委单方" :value="1"></el-option>
              <el-option label="催收方" :value="2"></el-option>
              <el-option label="其他"   :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合作商类别:" class="width-3">
            <el-select v-model="management.statuses" placeholder="请选择"  style="width:100px">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="个人" :value="3"></el-option>
              <el-option label="其他" :value="2"></el-option>
              <el-option label="企业" :value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="创建时间:" >
            <el-date-picker  style="width: 190px;"
                             v-model="management.createDate"
                             placeholder="请输入申请时间"
                             format="yyyy 年 MM 月 dd 日"
                             value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <div class="inquire">
            <el-button class="el-button el-button--primary" @click="list">查询</el-button>
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

    <add-edit  :data="dialogForm"  :api="api" v-if="dialogFormVisible" @is_show="is_show"></add-edit>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'
  import { AddEdit } from "./component";

  export default {
    components: {
      AddEdit,
    },
    data(){
      return {
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
          companyType:'',
          companyName:'',
          createDate:'',
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
