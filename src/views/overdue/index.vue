<template>
  <div class="main">
    <div class="top-main">
        <el-form :inline="true" ref="management" :model="management" label-position="left">

          <template v-if="userType == 3">
            <el-form-item label="">
              <el-select v-model="management.companyType" placeholder="请选择" style="width:120px">
                <el-option label="融资企业" value="1"></el-option>
                <el-option label="所属企业" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="management.companyName"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="金融机构">
              <el-input v-model="management.companyName"></el-input>
            </el-form-item>
          </template>

          <el-form-item label="申请单编号:">
            <el-input v-model="management.applyNumber"></el-input>
          </el-form-item>
          <div class="inquire">
            <el-button class="el-button el-button--primary" @click="inquire">查询</el-button>
            <el-button class="el-button " @click="inquireClear">清空</el-button>
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
            <router-link class="blue" tag="a" target="_blank"
                         :to="{name:'financing_apply_detail',params:{id:scope.row.id},
                         query:{orderNum:scope.row.freightBorrowOrderNum}}">{{scope.row.freightBorrowOrderNum}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="批次号">
          <template slot-scope="scope">
            <router-link class="blue" tag="a" target="_blank" :to="{name:'financing_apply_detail_sub',params:{id:scope.row.batchNum}}">{{scope.row.batchNum}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="金融机构"
          v-if="userType == 2"
          prop="financeOrgName">
        </el-table-column>
        <el-table-column
          label="融资企业"
          v-if="userType == 3"
          prop="borrowOrgName">
        </el-table-column>
        <el-table-column
          label="所属企业"
          v-if="userType == 3"
          prop="tmsOrgName">
        </el-table-column>
        <el-table-column
          label="融资起始日"
          prop="applyDate">
        </el-table-column>
        <el-table-column
          label="融资到期日"
          prop="expireDate">
        </el-table-column>
        <el-table-column
          label="融资申请时间"
          prop="applyDate">
        </el-table-column>
        <el-table-column
          label="逾期天数"
          prop="overdueDay">
        </el-table-column>
        <el-table-column
          label="金额（元）"
          v-if="userType == 2"
          prop="disposalAmount">
        </el-table-column>
        <el-table-column
          label="操作日期"
          prop="disposalDate">
        </el-table-column>
        <el-table-column
          label="操作人"
          prop="operateUser">
        </el-table-column>
        <el-table-column
          label="处置金额（元）"
          v-if="userType == 3"
          prop="disposalAmount">
        </el-table-column>
        <el-table-column
          label="状态"
          v-if="userType == 3">
          <template slot-scope="scope">
            <p v-if="scope.row.status == 1">正常</p>
            <p v-else-if="scope.row.status == 2">展期</p>
            <p v-else-if="scope.row.status == 3">逾期</p>
            <p v-else-if="scope.row.status == 4">回购完成</p>
            <p v-else-if="scope.row.status == 5">逾期处置完成</p>
            <p v-else>已还</p>
          </template>
        </el-table-column>
        <el-table-column
          v-if="userType == 2"
          label="操作">
          <template slot-scope="scope">
            <p v-if="scope.row.status == 1">正常</p>
            <p v-else-if="scope.row.status == 2">展期</p>
            <p v-else-if="scope.row.status == 3">
              <el-button size="mini" style="padding: 5px;"
                         class="el-button el-button--primary"
                         type="danger"
                         @click="repo(scope.row)">回购</el-button>
            </p>
            <p v-else-if="scope.row.status == 4">回购完成</p>
            <p v-else-if="scope.row.status == 5">逾期处置完成</p>
            <p v-else-if="scope.row.status == 6">已还</p>
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


  </div>
</template>
<script>
  import ajax from '@/utils/ajax'

  export default {
    components: {
    },
    data(){
      let title = this.$route.meta.title;
      let userType = this.$store.getters.userType;
      let companyName = userType == 3?'':'3';
      return {
        userType:userType,
        title:title,
        api:'/repayment/repayment/',
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[
          ],
          "total":0
        },
        management:{
          companyType:companyName,
          companyName:'',
          applyNumber:'',
          status:'3,4,5',
        },
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
        this.management.companyName = '';
        this.management.applyNumber = '';
        if(this.userType == 3){
          this.management.companyType = '';
        }
        this.ajaxPage(1);
      },
      ajaxPage:function (page) {
        let url = `${this.api}page`;
        var _this = this;

        let date = {
          companyType:_this.management.companyType,
          companyName:_this.management.companyName,
          applyNumber:_this.management.applyNumber,
          status:_this.management.status,
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

          }).catch(error => {
            reject(error)
          })
         })
      },
      overdue(row){
        var _this = this;

        this.$confirm('您确认要违约处置吗？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {

          _this.overdueApi(row.id)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消处置'
          });
        });
      },
      overdueApi:function (id) {
        let url = `${this.api}overdueDisposal`;
        var _this = this;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              id:`${id}`
            }
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){

              _this.$message({
                type: 'success',
                message: '已处置!'
              });

              _this.ajaxPage();
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      repo(row){
        var _this = this;

        this.$confirm('您确认要回购吗？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {

          _this.repoApi(row.id)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消回购'
          });
        });
      },
      repoApi:function (id) {
        let url = `${this.api}buyback?id=${id}`;
        var _this = this;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){

              _this.$message({
                type: 'success',
                message: '已回购!'
              });

              _this.ajaxPage();
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
      /*margin-top: 50px;*/
    }
  }
  .svg-icon{
    font-size: 22px;
    cursor: pointer;
  }
  .blue{
    color: $blue;
  }
</style>
