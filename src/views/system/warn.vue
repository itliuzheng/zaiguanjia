<template>
  <div class="main">

    <div class="top-main">
        <el-form :inline="true" ref="management" :model="management" label-position="left">
          <el-form-item label="预警项:">
            <el-input v-model="management.name"></el-input>
          </el-form-item>
          <div class="inquire">
            <el-button class="el-button el-button--primary" @click="inquire">查询</el-button>
            <el-button class="el-button" @click="inquireClear">清空</el-button>
          </div>
        </el-form>


    </div>
    <div class="content">
      <div class="table-header clearfix">
        <div class="header fl">预警设置</div>
        <div class="fr">
          <el-button class="el-button el-button--primary button-fr"  @click="addDialog">新建</el-button>
        </div>
      </div>
      <el-table
        :data="page.records"
        style="width: 100%">
        <el-table-column
          label="序号"
          width="60px"
          type="index"
        ></el-table-column>
        <el-table-column
          label="预警项"
          prop="name">
        </el-table-column>
        <el-table-column
          label="预警参数"
          prop="idNumber">
        </el-table-column>
        <el-table-column
          label="预警单位"
          prop="idNumber">
        </el-table-column>
        <el-table-column
          label="预警值"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="创建人"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div class="blue">
              <p class="inlineBlock" @click="editDialog(scope.row)">停用</p>
              <p class="inlineBlock" @click="editDialog(scope.row)">修改</p>
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

    <add-dialog :data="dialogForm" :disabled="disabled"  :api="api" v-if="dialogFormVisible" @is_show="is_show"></add-dialog>

  </div>
</template>
<script>
  import ajax from '@/utils/ajax'
  import { AddDialog } from "./component";

  export default {
    components: {
      AddDialog
    },
    data(){
      return {
        api:'/auth/user-auth/',
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[
          ],
          "total":0
        },
        management:{
          name:'',
          status:'',
        },
        dialogFormVisible:false,
        dialogForm:null,
        disabled:false,
      }
    },
    beforeMount:function(){

      // this.ajaxPage(1);
    },
    methods:{
      inquire(){
        this.ajaxPage(1);
      },
      inquireClear(){
        this.management = {
          name:'',
          idNumber:'',
        };
        this.ajaxPage(1);
      },
      ajaxPage:function (page) {
        let url = `${this.api}page`;
        var _this = this;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              name:_this.management.name,
              idNumber:_this.management.idNumber,
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
      is_show(data){
        this.dialogFormVisible = false;
        if(!data){
          this.ajaxPage(1);
        }
      },
      addDialog(row){
        this.dialogForm = {};
        this.disabled = false;
        this.dialogFormVisible = true;
      },
      editDialog(row){
        this.dialogForm = row;
        this.disabled = false;
        this.dialogFormVisible = true;
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
</style>
