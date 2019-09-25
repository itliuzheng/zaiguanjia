<template>
  <div class="main">

    <div class="top-main">
        <el-form :inline="true" ref="management" :model="management" label-position="left">
          <el-form-item label="合作商" >
            <el-input  style="width: 130px;" v-model="management.loginName"></el-input>
          </el-form-item>

          <el-form-item label="合作类型" class="width-3">

            <el-select v-model="management.type" placeholder="请选择" style="width: 100px;">
              <el-option label="全部"   :value="-1"></el-option>
              <el-option v-for="list in cooperateTypeList" :label="list.val" :value="list.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合作商类别:" class="width-3">
            <el-select v-model="management.category" placeholder="请选择"  style="width:100px">
              <el-option label="全部" :value="-1"></el-option>
              <el-option v-for="list in cooperateCategoryList" :label="list.val" :value="list.key"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="创建时间:" >
            <el-date-picker
              format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
              v-model="management.createDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <div class="inquire">
            <el-button class="el-button el-button--primary" @click="inquireList">查询</el-button>
            <el-button class="el-button " @click="inquireClear">清空</el-button>
          </div>
        </el-form>
    </div>
    <div class="t-r">
      <el-button class="el-button el-button--primary" @click="addEdit">添加合作商</el-button>
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
          label="创建时间"
          width="140px"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="合作商名称"
          prop="loginName">
        </el-table-column>
        <el-table-column
          label="合作商类别">
          <template slot-scope="scope">
            <p  v-if="scope.row.type == 0">后台用户</p>
            <p  v-else-if="scope.row.type == 1">委单方</p>
            <p  v-else-if="scope.row.type == 2">催收方</p>
            <p  v-else-if="scope.row.type == 3">其他</p>
          </template>
        </el-table-column>
        <el-table-column
          label="合作类型">
          <template slot-scope="scope">
            <p  v-if="scope.row.category == 1">企业</p>
            <p  v-else-if="scope.row.category == 2">个人</p>
            <p  v-else-if="scope.row.category == 3">其他</p>
          </template>
        </el-table-column>
        <el-table-column
          label="备注信息"
          prop="remark">
        </el-table-column>
        <el-table-column
          label="账号状态">
          <template slot-scope="scope">
            <p  v-if="scope.row.status == 0">禁用</p>
            <p  v-else-if="scope.row.status == 1">启用</p>
          </template>
        </el-table-column>
        <el-table-column
          label="来源渠道"
          prop="sources">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div class="blue inlineBlock">
              <p @click="showEdit(scope.row)">编辑</p>
              <p @click="deleteClick(scope.row)">删除</p>
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

    <add-edit  :data="dialogForm" :api="api" v-if="dialogFormVisible" @is_show="is_show"></add-edit>
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
        api:'/cooperate/',
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[
          ],
          "total":0
        },
        management:{
          type:'',
          loginName:'',
          category:'',
          createDate:'',
          beginDate:'',
          endDate:'',
        },
        loading:false,
        dialogFormVisible:false,
        dialogForm:null,
        cooperateTypeList:[],
        cooperateCategoryList:[],
      }
    },
    beforeMount:function(){

      this.getCooperateType();
      this.getCooperateCategory();
      this.ajaxPage(1);
    },
    methods:{
      getCooperateType:function(){
        var _this = this;

        let url = `/sys/sys-dict/getDictList`;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              name:'cooperateType',
            }
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.cooperateTypeList = data.data.records;
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      getCooperateCategory:function(){
        var _this = this;

        let url = `/sys/sys-dict/getDictList`;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              name:'cooperateCategory',
            }
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.cooperateCategoryList = data.data.records;
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      addEdit(){
        this.dialogForm = {};
        this.dialogForm.types = 'add';
        this.dialogFormVisible = true;
      },
      showEdit(row){
        this.dialogForm = row;
        this.dialogForm.types = 'update';
        this.dialogFormVisible = true;
      },
      deleteClick(row){
        let _this = this;
        let text = 1?'该合作商已关在关联委单数据，是否确认删除？':'是否删除';
        this.$confirm(text, '提示', {
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
      modifyStatus(id,status){
        let _this = this;
        let url = `${_this.api}changeAccount`;

        // new Promise((resolve,reject) => {
        //   ajax({
        //     url:url,
        //     method:'post',
        //     data:{
        //       id:id,
        //       status:status
        //     }
        //   }).then(function (res) {
        //     let data = res.data;
        //     if(data.code == 1){
        //       if(status == 5){
        //         _this.$message.success('已恢复');
        //       }else{
        //         _this.$message.success('已终止');
        //       }
        //       _this.ajaxPage(1);
        //     }else{
        //       _this.$message.error(data.msg);
        //     }
        //
        //   }).catch(error => {
        //     reject(error)
        //   })
        //  })
      },
      inquireList(){
        this.ajaxPage(1);
      },
      inquireClear(){
        this.management.loginName = '';
        this.management.type = '';
        this.management.category = '';
        this.management.createDate = '';
        this.management.beginDate = '';
        this.management.endDate = '';
        this.ajaxPage(1);
      },
      ajaxPage:function (page) {
        let url = `${this.api}page`;
        var _this = this;
        _this.loading = true;

        if(_this.management.createDate != 0){
          _this.management.beginDate = _this.management.createDate[0];
          _this.management.endDate = _this.management.createDate[1];
        }


        let date = {
              loginName:_this.management.loginName,
              type:_this.management.type,
              category:_this.management.category,
              beginDate:_this.management.beginDate,
              endDate:_this.management.endDate,
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
  .t-r{
    text-align: left;
    margin-bottom: 20px;
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
