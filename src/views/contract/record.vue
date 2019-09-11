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
          <div class="inquire">
            <el-button class="el-button el-button--primary" @click="inquire">查询</el-button>
            <el-button class="el-button " @click="inquireClear">清空</el-button>
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
          label="合同名称">
          <template slot-scope="scope">
            <div class="row-line" v-for="(list,index) in scope.row.contractTextList" :key="index">{{list.contractName}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="合同编号">
          <template slot-scope="scope">
            <div class="row-line" v-for="(list,index) in scope.row.contractTextList">
              <a :href="list.contractUrl" target="_blank" class="blue">{{list.contractNum}}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="发起时间"
          prop="startDate">
        </el-table-column>
        <el-table-column
          label="融资企业签署时间"
          prop="startDate">
        </el-table-column>
        <el-table-column
          label="完成时间"
          prop="completeDate">
        </el-table-column>
        <el-table-column
          label="金融机构"
          prop="financeOrgName">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div class="row-line " v-for="(list,index) in scope.row.contractTextList" :key="index">
              <a class="inlineBlock blue" :href="list.contractUrl" target="_blank">查看合同</a>
              <p class="inlineBlock blue" @click="downloadContract(list)">下载合同</p>
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
        style="width: 100%">
        <el-table-column
          label="序号"
          width="60px"
          type="index"
        ></el-table-column>
        <el-table-column
          label="融资企业"
          prop="borrowOrgName">
        </el-table-column>
        <el-table-column
          label="所属企业"
          prop="tmsOrgName">
        </el-table-column>
        <el-table-column
          label="合同名称">
          <template slot-scope="scope">
            <div class="row-line" v-for="(list,index) in scope.row.contractTextList" :key="index">{{list.contractName}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="合同编号">
          <template slot-scope="scope">
            <div class="row-line" v-for="(list,index) in scope.row.contractTextList">
              <a :href="list.contractUrl" target="_blank" class="blue">{{list.contractNum}}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="发起时间"
          prop="startDate">
        </el-table-column>
        <el-table-column
          label="融资企业签署时间"
          prop="borrowOrgDate">
        </el-table-column>
        <el-table-column
          label="完成时间"
          prop="completeDate">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div class="row-line" v-for="(list,index) in scope.row.contractTextList" :key="index">
              <a class="inlineBlock" :href="list.contractUrl" target="_blank">查看合同</a>
              <p class="inlineBlock" @click="downloadContract(list)">下载合同</p>
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

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <p class="text-center">合同已经下载成功！</p>
      <span slot="footer" class="dialog-footer">
        <el-button class="width-110" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

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
          type:3,
        },
        loading:false,
        dialogVisible:false,
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
        this.ajaxPage(1);
      },
      ajaxPage:function (page) {
        let url = `${this.api}page`;
        var _this = this;
        _this.loading = true;

        let date ={
              companyType:_this.management.companyType,
              companyName:_this.management.companyName,
              type:_this.management.type,
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
      downloadContract(row){
        this.$alert('暂无下载功能');
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
    cursor: pointer;
  }
</style>
