<template>
  <div class="main">

    <div class="top-main" >
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
            <el-form-item label="状态:" v-if="userType == 3">
              <el-select v-model="management.status">
                <el-option label="已完成" :value="2"></el-option>
                <el-option label="未完成" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="金融机构">
              <el-input v-model="management.companyName"></el-input>
            </el-form-item>

          </template>

          <div class="inquire">
            <el-button class="el-button el-button--primary" @click="inquire" :loading="loadding">查询</el-button>
            <el-button class="el-button " @click="inquireClear" :loading="loadding">清空</el-button>
          </div>
        </el-form>
    </div>

    <!--融资企业-->
    <div v-if="userType == 2" class="content line-border">
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
          label="合同编号">
          <template slot-scope="scope">
            <div class="row-line" v-for="(list,index) in scope.row.contractTextList">
              <a :href="list.contractUrl" target="_blank" class="blue">{{list.contractNum}}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="合同名称">
          <template slot-scope="scope">
            <div class="row-line" v-for="(list,index) in scope.row.contractTextList" :key="index">{{list.contractName}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="金融机构"
          prop="financeOrgName">
        </el-table-column>
        <el-table-column
          label="发起时间"
          prop="startDate">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <div class="row-line" v-for="(list,index) in scope.row.contractTextList" :key="index">
               <p>{{list.desc}}</p>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--金融机构-->
    <div v-else class="content line-border">
      <el-table
        v-loading="loading"
        :data="page.records"
        border
        style="width: 100%">
        <el-table-column
          label="序号"
          width="60px"
          type="index"
        ></el-table-column>
        <el-table-column
          label="合同编号">
          <template slot-scope="scope">
            <div class="row-line" v-for="(list,index) in scope.row.contractTextList">
              <a :href="list.contractUrl" target="_blank" class="blue">{{list.contractNum}}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="合同名称">
          <template slot-scope="scope">
            <div class="row-line" v-for="(list,index) in scope.row.contractTextList" :key="index">{{list.contractName}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="发起时间"
          prop="startDate">
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
          label="状态">
          <template slot-scope="scope">
            <div class="row-line" v-for="(list,index) in scope.row.contractTextList" :key="index">
              <p>{{list.desc}}</p>
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
    data(){

      let userType = this.$store.getters.userType;
      let companyType = 3;
      if(userType == 3){
        companyType = '';
      }
      return {
        userType:userType,
        api:'/contract/contract-manage/',
        type:'mechanism',
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[
          ],
          "total":0
        },
        management:{
          companyType:companyType,
          companyName:'',
          status:'',
          type:2,
        },
        loading:false,
        dialogFormVisible:false,
        dialogForm:null,
        loadding:false,
      }
    },
    beforeMount:function(){

      this.ajaxPage(1);
    },
    methods:{
      sortMethod(a,b){
      },
      sortChange(column, prop, order){

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
        _this.loadding = true;
        _this.loading = true;

        let date ={
              companyType:_this.management.companyType,
              companyName:_this.management.companyName,
              status:_this.management.status,
              type:_this.management.type,
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
            _this.loadding = false;
            _this.loading = false;

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
  .tesu-p{
    line-height: 1.5;
    span{
      display: inline-block;
    }
  }
</style>
