<template>
  <div class="main">

    <div class="top-main">
        <el-form :inline="true" ref="management" :model="management" label-position="left">
          <div class="inlineBlock">

            <el-form-item label="状态:">
              <el-select v-model="management.status" placeholder="请选择" style="width: 100px;">
                <el-option label="正常" value="1"></el-option>
                <el-option label="展期" value="2"></el-option>
                <el-option label="逾期" value="3"></el-option>
              </el-select>
            </el-form-item>

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
          </div>
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
          width="60px"
          type="index"
        ></el-table-column>
        <el-table-column
          label="产品类型"
          prop="productTypeName">
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
          label="申请单编号">
          <template slot-scope="scope">
            <router-link class="blue" tag="a" target="_blank"
                         :to="{name:'financing_apply_detail',params:{id:scope.row.id},
                         query:{orderNum:scope.row.freightBorrowOrderNum}}">
              {{scope.row.freightBorrowOrderNum}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="批次号">
          <template slot-scope="scope">
            <router-link class="blue" tag="a" target="_blank"
                         :to="{name:'financing_apply_detail_sub',params:{id:scope.row.batchNum}}">
              {{scope.row.batchNum}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="loanContractCode"
          label="放款合同编号">
        </el-table-column>
        <el-table-column
          label="放款金额（元）"
          prop="makeLoanMoney">
        </el-table-column>
        <el-table-column
          label="待还本金（元）"
          prop="repayMoney">
        </el-table-column>
        <el-table-column
          label="待还利息（元）"
          prop="interest">
        </el-table-column>
        <el-table-column
          label="待还展息（元）"
          prop="deferInterest">
        </el-table-column>
        <el-table-column
          label="待还罚息（元）"
          prop="interestPenalty">
        </el-table-column>
        <el-table-column
          prop="totalAmount"
          label="还款总金额(元)">
        </el-table-column>
        <el-table-column
          label="放款日期"
          prop="makeLoanDate">
        </el-table-column>
        <el-table-column
          label="到期日"
          prop="expireDate">
        </el-table-column>
        <el-table-column
          label="展期（天）"
          prop="deferDay">
        </el-table-column>
        <el-table-column
          label="展期到期日"
          prop="deferEndDate">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="statusName">
          <template slot-scope="scope">
            <p v-if="scope.row.status == 1">正常</p>
            <p v-else-if="scope.row.status == 2">展期</p>
            <p v-else-if="scope.row.status == 3">逾期</p>
            <p v-else-if="scope.row.status == 4">回购</p>
            <p v-else-if="scope.row.status == 5">逾期处置</p>
            <p v-else>已还</p>
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
    data(){

      let userType = this.$store.getters.userType;
      let companyName = userType == 3?'':'3';

      return {
        api:`/repayment/repayment/`,
        userType:userType,
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[
          ],
          "total":0
        },
        loading:false,
        management:{
          companyType:companyName,
          companyName:'',
          statuses:'1,2,3',
          status:'',
        },
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
        this.management.status = '';

        if(this.userType == 3){
          this.management.companyType = '';
        }

        this.ajaxPage(1);
      },
      ajaxPage:function (page) {
        this.loading = true;
        let url = `${this.api}page`;
        var _this = this;
        let date = {};

        let status = _this.management.statuses;

        if(_this.management.status){
          status = _this.management.status;
        }
        date  = {
          companyType:_this.management.companyType,
          companyName:_this.management.companyName,
          status:status,
          pageNum:page,
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
