<template>
  <div class="set-main">
    <el-table
      :data="page.records"
      border
      style="width: 100%">
      <el-table-column
        prop="loginName"
        label="登录名">
      </el-table-column>
      <el-table-column
        label="用户类型">
        <template slot-scope="scope">
          <p  v-if="scope.row.type == 0">后台用户</p>
          <p  v-else-if="scope.row.type == 1">委单方</p>
          <p  v-else-if="scope.row.type == 2">催收方</p>
          <p  v-else-if="scope.row.type == 3">其他</p>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button class="color-red" type="text" size="small" @click="openDialog(scope.row)">更改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page" v-if="page.pages">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-size="page.pageSize"
        layout="total, prev,pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>

    <div class="add-btn">
      <!--<el-button class="el-button&#45;&#45;primary el-button" @click="dialogFormVisible = true">添加</el-button>-->
    </div>

    <el-dialog title="权限设置" :visible.sync="dialogFormVisible" @close="clear">
      <el-transfer
        v-model="rules"
        :data="form"
        @change="handleChange"
        :titles="transTitle"
      ></el-transfer>
    </el-dialog>


  </div>
</template>
<script>
  import ajax from '@/utils/ajax'
  import {reconstruction} from "@/utils/tree";

  export default {
    data(){
      return {
        page:{
          current:1,
          pageSize:10,
          pages:1,
          total:100,
          records:[
            {
              "bankCardCode":"",
              "bankCardName":"",
              "bankCardNo":"",
              "companyCode":"",
              "companyName":"",
              "createDate":null,
              "delFlag":0,
              "email":"",
              "id":1,
              "idCard":"",
              "loginName":"admin",
              "mobile":"",
              "password":"123456",
              "realName":"admin-r",
              "remark":"",
              "updateDate":null
            },
          ],
        },

        dialogFormVisible: false,
        current_id:'',
        form: [],
        rules: [],
        transTitle:['全部角色','拥有角色'],
      }
    },
    beforeMount:function(){
      this.getUser(1);
    },
    methods:{
      getUser(page){
        var _this = this;
        new Promise((resolve,reject) => {
            ajax({
              url:'/user/page',
              method:'post',
              data:{
                pageNum:page,
                pageSize:10
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
      handleCurrentChange(val) {
        this.getUser(val);
      },
      openDialog(row){
        let _this = this;
        this.current_id = row.id;
        this.getRolesAll();
        this.getRoles(this.current_id);
        _this.dialogFormVisible = true ;
      },
      handleChange(value, direction, movedKeys){
        this.sysuserAuthorize(value);
      },
      sysuserAuthorize(value){
        let _this = this;
        let rids = value.join(',');

        new Promise((resolve,reject)=>{
          ajax({
            url:`/user/authorize?uid=${_this.current_id}&rids=${rids}`,
            method:'post',
          })
            .then(function(res){
            var data = res.data;
            if(data.code == 1){
              _this.$message({
                type: 'success',
                message: '修改成功'
              });
              resolve()
            }else{
              _this.$message({
                type: 'error',
                message: '修改失败'
              });
              _this.dialogFormVisible = false;
            }
          }).catch(error => {
              reject();
          })
        })
      },
      clear(){
        this.form = [];
        this.rules = [];
      },
      getRolesAll(){
        let _this = this;
        new Promise((resolve,reject)=>{
          ajax({
            url:`/role/all`,
            method:'get'
          }).then(function(res){
            var data = res.data;
            if(data.code == 1){
              data.data.forEach((json,index)=>{
                _this.form.push({
                  label: json.description,
                  key: json.id,
                  disabled: json.state?true:false
                })
              })

              resolve()
            }else{
              _this.$message.error(data.msg);

              reject();
            }
          }).catch(error => {
              reject();
          })
        })
      },
      getRoles(id){
        let _this = this;
        new Promise((resolve,reject)=>{
          ajax({
            url:`/user/roles?uid=${id}`,
            method:'get',
          }).then(function(res){
            var data = res.data;
            if(data.code == 1){
              data.data.forEach((json,index)=>{
                _this.rules.push(json.id);
              })

            }else{
              _this.$message.error(data.msg);
            }
          }).catch(error => {
              reject(error);
          })
        })
      },
    },
  }
</script>
<style lang="scss">
  .set-main{
    .el-checkbox{
      display: block;
      margin-right: 0;
    }
  }
  .page{
    padding-bottom: 30px;
    .el-pagination{
      margin-top: 30px;
      text-align: center;
    }
  }
  .el-transfer-panel__item.el-checkbox .el-checkbox__label{
    width: auto;
    display: inline-block;
  }
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
  .color-red{
    color: #f95353;
  }
  .add-btn{
    margin-top: 30px;
  }

</style>
