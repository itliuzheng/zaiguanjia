<template>
  <div class="main">
    <div class="top-main">
        <el-form :inline="true" ref="management" :model="management" label-position="left">

          <el-form-item label="状态:"  >
            <el-select v-model="management.status" placeholder="请选择" style="width:120px">
              <el-option label="未融资申请" value="2"></el-option>
              <el-option label="融资审核中" value="1"></el-option>
              <el-option label="融资完成" value="8"></el-option>
              <el-option label="已逾期" value="9"></el-option>
              <el-option label="回购完成" value="10"></el-option>
              <el-option label="逾期处置完成" value="11"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请单编号:">
            <el-input v-model="management.freightBorrowOrderNum"></el-input>
          </el-form-item>
          <template v-if="userType == 2">
            <el-form-item label="金融机构">
              <el-input v-model="management.companyName"></el-input>
            </el-form-item>
          </template>
          <template v-else>
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
          label="金融机构"
          v-if="userType == 2"
          prop="mobile">
        </el-table-column>
        <el-table-column
          label="融资企业"
          v-if="userType == 3"
          prop="mobile">
        </el-table-column>
        <el-table-column
          label="所属企业"
          v-if="userType == 3"
          prop="companyId">
        </el-table-column>
        <el-table-column
          label="批次号">
          <template slot-scope="scope">
            <a class="blue" target="_blank" href="http://www.baidu.com">B165465464646</a>
          </template>
        </el-table-column>
        <el-table-column
          label="申请单号">
          <template slot-scope="scope">
            <a class="blue" target="_blank" href="http://www.baidu.com">B165465464646</a>
          </template>
        </el-table-column>
        <el-table-column
          label="发货人"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="发货人手机号"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="融资率（%）"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="未结算运费（元）"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="融资金额（元）"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="已结算运费（元）"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="运单状态">
          <template slot-scope="scope">
            <div class="blue">
              <p >未融资申请</p>
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
      let userId = this.$store.getters.userId;

      let companyType = 3;
      if(userType == 3){
        companyType = '';
      }

      return {
        title:title,
        api:'/waybill/tms-transport-slip/',
        userId:userId,
        userType:userType,

        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[
            {}
          ],
          "total":0
        },
        management:{
          status:'',
          freightBorrowOrderNum:'',
          companyType:companyType,
          companyName:'',
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
        this.management.status = '';
        this.management.freightBorrowOrderNum = '';
        this.management.companyType = '';
        this.management.companyName = '';
        this.ajaxPage(1);
      },
      ajaxPage:function (page) {
        let url = `${this.api}page`;
        var _this = this;
        let date = {
              companyType:_this.management.companyType,
              companyName:_this.management.companyName,
              freightBorrowOrderNum:_this.management.freightBorrowOrderNum,
              status:_this.management.status,
              borrowOrgId:_this.userId,
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
      deleteBack:function (id) {
        let url = `${this.api}remove-black/${id}`;
        var _this = this;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'get',
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){

              _this.$message({
                type: 'success',
                message: '移除成功!'
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
      deleteBlacklist(row){

        this.$confirm('移除黑名单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteBack(row.id);

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消移除'
          });
        });
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
    p{
      cursor: pointer;
      color: $blue;
    }
  }
</style>
