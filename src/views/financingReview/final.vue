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
            <el-button class="el-button el-button--primary" @click="inquire">查询</el-button>
            <el-button class="el-button" @click="inquireClear">清空</el-button>
          </div>
        </el-form>
    </div>

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
          label="申请单编号">
          <template slot-scope="scope">
            <router-link class="blue" tag="a" target="_blank" :to="{name:'financing_apply_detail',params:{id:scope.row.id},query:{orderNum:scope.row.orderNum}}">{{scope.row.orderNum}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="融资企业"
          prop="borrowOrgName">
        </el-table-column>
        <el-table-column
          label="所属企业"
          prop="tmsOrgName">
        </el-table-column>
        <el-table-column
          label="融资申请时间"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div class="blue">
              <el-button @click="openDialog(scope.row)" :disabled="dialogVisible">审核</el-button>
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

    <add-review :data="dialogForm"  :api="api" v-if="dialogVisible" @is_show="is_list_show"></add-review>

  </div>
</template>
<script>
  import ajax from '@/utils/ajax'
  import AddReview from "./component/AddReview";

  export default {
    components: {AddReview},
    data(){
      let _this = this;

      let userType = _this.$store.getters.userType;


      return {
        api:'/financing/freight-borrow/',
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
          companyType:'',
          companyName:'',
          pledgeStatus:2,
        },
        dialogVisible:false,
        dialogForm:{},
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
      is_list_show(data){
        this.dialogVisible = false;
        this.ajaxPage(1);
      },
      ajaxPage:function (page) {
        let url = `${this.api}page`;
        let _this = this;
        let date = {
              companyType:_this.management.companyType,
              companyName:_this.management.companyName,
              status:_this.management.pledgeStatus,
              financeOrgId:_this.userId,
              pageNum:page
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

          }).catch(error => {
            reject(error)
          })
         })
      },

      handleClose(){
      },
      openDialog(row){
        this.dialogForm = row;
        this.dialogForm.type = this.management.pledgeStatus;

        this.dialogVisible = true;
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
  .desc{
    text-align: center;
    textarea{
      width: 300px;
      height: 120px;

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
