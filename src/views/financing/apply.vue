<template>
  <div class="main">

    <div v-if="DATA">
      <div v-if=" DATA.data.status == GET_VERIFY.VERIFY_SUCCESS">
        <div class="top-main">
            <el-form :inline="true" ref="management" :model="management" label-position="left">
              <el-form-item label="发货人:" >
                <el-input style="width: 150px;" v-model="management.shipper"  placeholder="请输入发货人姓名"></el-input>
              </el-form-item>
              <el-form-item label="运单完成时间:" >
                <el-date-picker  style="width: 190px;" v-model="management.completeDate"  placeholder="请输入运单完成时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-button class="el-button el-button--primary" @click="inquire">查询</el-button>
              <el-button class="el-button " @click="inquireClear">清空</el-button>
            </el-form>
        </div>
        <div>
          <el-table
            v-loading="loading"
            :data="page.records"
            @selection-change="handleSelectionChange"
            height="400"
            style="width: 100%">
            <el-table-column
              type="selection"
              label="全选"
              width="55">
            </el-table-column>
            <el-table-column
              label="批次号">
              <template slot-scope="scope">
                <router-link class="blue" tag="a" target="_blank" :to="{name:'financing_apply_detail_sub',params:{id:scope.row.batchNum}}">{{scope.row.batchNum}}</router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="发货人"
              prop="shipper">
            </el-table-column>
            <el-table-column
              label="发货人手机号"
              prop="shipperPhone">
            </el-table-column>
            <el-table-column
              label="运单完成时间"
              prop="completeDate">
            </el-table-column>
            <el-table-column
              label="运单结算时间"
              prop="settlementDate">
            </el-table-column>
            <el-table-column
              label="未结算金额（元）"
              prop="freight">
            </el-table-column>
            <el-table-column
              label="结算周期（天）"
              prop="settlementInterval">
            </el-table-column>
          </el-table>
        </div>

        <el-table
          class="flex-table"
          v-loading="loading"
          :data="data"
          style="width: 100%">
          <el-table-column
            label="融资率（%）"
            prop="financingRate">
          </el-table-column>
          <el-table-column
            label="金融机构"
            prop="financeOrgName">
          </el-table-column>
          <el-table-column
            label="融资金额（元）"
            prop="financingAmount">
          </el-table-column>
          <el-table-column
            label="日利率（%）"
            prop="dailyRate">
          </el-table-column>
          <el-table-column
            label="预计还款利息（元）"
            prop="daily">
          </el-table-column>
          <el-table-column
            label="展期天数（天）"
            prop="deferDays">
          </el-table-column>
          <el-table-column
            label="预计还款总额（元）"
            prop="total">
          </el-table-column>
          <el-table-column
            label="运输合同"
            prop="contractUrl">
              <template slot-scope="scope">
                <a :href="scope.row.contractUrl" class="blue" target="_blank">查看合同</a>
              </template>
          </el-table-column>
        </el-table>

        <el-button class="el-button zd-btn" @click="showTips">提交</el-button>

        <el-dialog
          title="温馨提示"
          :visible.sync="tipsVisible"
          width="30%"
          center
        >
          <p class="text-center">{{tips.msg}}</p>
          <span slot="footer" class="dialog-footer">
            <el-button class="width-110" type="primary" @click="button"  :loading="loadding">提交</el-button>
            <el-button class="width-110" @click="Refresh">停止申请</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          center
        >
          <p class="text-center">{{dialogForm.msg}}</p>
          <span slot="footer" class="dialog-footer">
            <a href="#/financing_review/requisition_record" v-if="dialogForm.code == 1">
              <el-button class="width-110" type="primary" >
                <base-countdown :count="3" endtext="查看进度" url_name="financing_requisition"></base-countdown>
              </el-button>
            </a>
            <el-button class="width-110" @click="Refresh">继续申请融资</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="error-box" v-else>
        <img src="@/images/icon/date_end.png" alt="">
        <!--<p class="desc" v-if="DATA.data.status == 0">企业信息未认证</p>-->
        <!--<p class="desc" v-else-if="DATA.data.status == GET_VERIFY.PENDING">企业信息认证中</p>-->
        <!--<p class="desc" v-else-if="DATA.data.status == GET_VERIFY.REGULATOR_CREDIT_END">-->
          <!--授信额度已终止,无法申请融资</p>-->
        <!--<p class="desc" v-else>{{DATA.data.msg}}</p>-->
        <p class="desc">{{DATA.data.msg}}</p>
        <router-link :to="{name:'certification_index'}" v-if="DATA.data.status == GET_VERIFY.CORPORATE_INFORMATION_IS_NOT_CERTIFIED">
          <el-button
            class="el-button zd-btn" >去认证</el-button>
        </router-link>
        <router-link :to="{name:'certification_index'}" v-if="DATA.data.status == GET_VERIFY.CREDIT_EXPIRED">
          <el-button
            class="el-button zd-btn" >申请融资</el-button>
        </router-link>
        <!--<router-link :to="{name:'contract_pending'}" v-if="DATA.data.status == GET_VERIFY.CONTRACT_NO_COMPLETE">-->
          <!--<el-button-->
            <!--class="el-button zd-btn" >去签约</el-button>-->
        <!--</router-link>-->
      </div>
    </div>
  </div>
</template>
<script>
  import store from '@/store'
  import GET_VERIFY from '@/utils/getVerify'
  import ajax from '@/utils/ajax'

  let math = require('mathjs');

  function DateMinus(date1,date2){//date1:小日期   date2:大日期
  　　var sdate = new Date(date1); 
  　　var now = new Date(date2); 

  　　var days = now.getTime() - sdate.getTime(); 
  　　var day = Math.ceil(days / (1000 * 60 * 60 * 24)); 
  　　return day; 
  }

  export default {
    data(){
      let title = this.$route.meta.title;
      let _this = this;
      return {
        title:title,
        GET_VERIFY:GET_VERIFY,
        api:'/waybill/tms-transport-slip/',
        userType:_this.$store.getters.userType,
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
          shipper:'',
          completeDate:'',
        },
        data:[],
        get_rate:null,
        transportSlipIds:null,
        loading:false,
        multipleSelection:null,
        loadding:false,
        tipsVisible:false,
        tips:{},
        dialogVisible:false,
        dialogForm:{},
        DATA:null,
      }
    },
    beforeMount:function(){

      this.getStatus();

    },
    methods:{
      Refresh(){
        this.$router.go(0);
      },
      inquire(){
        this.ajaxPage(1);
      },
      inquireClear(){
        this.management = {
          shipper:'',
          completeDate:'',
        };
        this.ajaxPage(1);
      },
      getStatus() {
        //运单申请前的 校验接口
        let url = `/financing/freight-borrow/verify`;
        var _this = this;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'get',
          }).then(function (res) {
            let data = res.data;

            _this.DATA = data;

            if(data.data.status == GET_VERIFY.VERIFY_SUCCESS){
              _this.getInit();
              _this.ajaxPage(1);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      handleSelectionChange(val) {
        let num = 0;
        let interest = 0;
        let transportSlipIds = [];

        val.forEach((value)=>{
          //融资率
          let financingRate = math.format(math.chain(math.bignumber(this.data[0].financingRate)).divide(math.bignumber(100)).done());

          //日利率
          let dayRate = math.format(math.chain(math.bignumber(this.data[0].dailyRate)).divide(math.bignumber(100)).done());

          //结算周期
          // let settle_date = DateMinus(value.completeDate,value.settlementDate);

          //融资周期
          let date = DateMinus(this.data[0].currentDay,value.settlementDate);

          // if(settle_date == 0){
          //   date = 1;
          // }

          //融资金额
          let this_num = Number(math.format(math.chain(math.bignumber(value.freight)).multiply(math.bignumber(financingRate)).done())).toFixed(2);
          num = math.format(math.chain(math.bignumber(num)).add(math.bignumber(this_num)).done());

          //还款利息金额
          let this_interest = Number(math.format(math.chain(math.bignumber(this_num)).multiply(math.bignumber(dayRate)).multiply(math.bignumber(date)).done())).toFixed(2);
          interest = math.format(math.chain(math.bignumber(interest)).add(math.bignumber(this_interest)).done());

          transportSlipIds.push(value.id);

        });

        // 融资金额
        this.$set(this.data[0],'financingAmount',num);
        // this.data[0].financingAmount = num;
        //预计还款利息
        // this.data[0].daily = interest;
        this.$set(this.data[0],'daily',interest);
        //预计还款总额
        let total =  math.format(math.chain(math.bignumber(num)).add(math.bignumber(interest)).done());
        // this.data[0].total = total
        this.$set(this.data[0],'total',total);

        this.transportSlipIds = transportSlipIds.join(',');

      },

      ajaxPage:function (page) {
        let url = `${this.api}page`;
        var _this = this;
        let date = {
          shipper:this.management.shipper,
          completeDate:this.management.completeDate,
          borrowOrgId:this.userId
        };
        _this.loading = true;

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
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      getInit:function () {
        let url = `${this.api}get-rate`;
        var _this = this;

        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'get',
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.data.push(data.data);
                _this.get_rate = data.data;
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      button:function () {
        let url = `/financing/freight-borrow/apply`;
        var _this = this;

        this.loadding = true;

        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              productType:1,   //目前写死的类型为1
              amount: _this.data[0].financingAmount,
              transportSlipIds: _this.transportSlipIds
            }
          }).then(function (res) {
            _this.loadding = false;
            let data = res.data;

            if(data.code == 1){
              if(data.data){
                _this.dialogForm.msg = '融资申请成功!';
              }
            }else{
              _this.dialogForm.msg = data.msg;
            }

            _this.dialogForm.code = data.code;

            _this.tipsVisible = false;
            _this.dialogVisible = true;

          }).catch(error => {
            reject(error)
          })
         })
      },
      handleCurrentChange(val) {
        this.ajaxPage(val);
      },
      showTips(){

        if(this.transportSlipIds){
          this.tips.msg = `您本次贷款的利率（日利率%）为：${this.get_rate.dailyRate} ，预计利息 ${this.data[0].daily} 元，到期预计总还款金额 ${this.data[0].total} 元。`;
          this.tipsVisible = true;
        }else{
          this.$message.error('参数无效，请重新勾选');
        }
      },
    }
  }
</script>
<style lang="scss">
  .zd-btn{
    width: 300px;
    margin-top: 20px;
    color: #fff !important;
    background: linear-gradient(120deg,#7ab5f4,#4b81f2);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }
  .flex-table.el-table{
    th{
      background: #f1f7fd;
    }
  }
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
  $red : #ff4c4c;
  .red{
    color: $red;
  }
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

  .error-box{
    padding-top: 120px;
    img{
      height: 130px;
    }
    .desc{
      font-size: 14px;
      color: #333;
      line-height: 23px;
      padding: 30px 0 0;
    }
  }
</style>
