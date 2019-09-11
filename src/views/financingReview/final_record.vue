<template>
  <div class="main">

    <div class="top-main">
        <el-form :inline="true" ref="management" :model="management" label-position="left">

          <el-form-item label="审核结果" >
            <el-select v-model="management.status" placeholder="请选择"  style="width:100px;">
              <el-option label="通过" :value="1"></el-option>
              <el-option label="驳回" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" class="form-min-width">
            <el-select v-model="management.companyType" placeholder="请选择">
              <el-option label="融资企业" value="1"></el-option>
              <el-option label="所属企业" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="management.companyName"  placeholder="请输入名称"></el-input>
          </el-form-item>

          <div class="inquire">
            <el-button class="el-button el-button--primary" @click="inquire">查询</el-button>
            <el-button class="el-button " @click="inquireClear">清空</el-button>
          </div>
        </el-form>
    </div>
    <div class="content" >
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
          prop="applyDate">
        </el-table-column>
        <el-table-column
          label="终审时间"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="审核人"
          prop="createUserName">
        </el-table-column>
        <el-table-column
          prop="statusName"
          label="审核结果">
        </el-table-column>
        <el-table-column
          label="备注"
          prop="remark">
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


  </div>
</template>
<script>
  import store from '@/store'
  import ajax from '@/utils/ajax'

  export default {
    data(){
      let _this = this;
      let title = this.$route.meta.title;
      return {
        title:title,
        userType:_this.$store.getters.userType,
        userId:_this.$store.getters.userId,
        api:'/financing/review-history/',
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
          status:'',
          reviewType:2,
        },
        loading:false,
        dialogFormVisible:false,
        dialogForm:null,
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
              reviewType:_this.management.reviewType,
              financeOrgId:_this.userId,
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
      addDialog(row){
        this.dialogForm = row;
        this.dialogFormVisible = true;
      },
      editDialog(row){
        this.dialogForm = row;
        this.dialogFormVisible = true;
      },
      batchPush(row){
        this.$message.success('提醒成功');
      },
      goDetail(row){
        let id = row.id;
        this.$router.push({path:`/customer/detail/${id}?type=${this.type}`})
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
      /*margin-top: 50px;*/
    }
  }
  .svg-icon{
    font-size: 22px;
    cursor: pointer;
  }
  .blue{
    color: $blue;
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
