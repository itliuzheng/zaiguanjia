<template>
  <div class="main">

    <div class="top-main">
        <el-form :inline="true" ref="management" :model="management" label-position="left">
          <el-form-item label="资产编号" >
            <el-input  style="width: 130px;" v-model="management.code"></el-input>
          </el-form-item>
          <el-form-item label="资产归属委单方" >
            <el-input  style="width: 130px;" v-model="management.entrustName"></el-input>
          </el-form-item>

          <el-form-item label="资产类型" class="width-3">

            <el-select v-model="management.type" placeholder="请选择" style="width: 100px;">
              <el-option label="全部"   :value="-1"></el-option>
              <el-option v-for="list in typeList" :label="list.val" :value="list.key" :key="list.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资产来源" >
            <el-input  style="width: 130px;" v-model="management.source"></el-input>
          </el-form-item>

          <el-form-item label="债务人所属区域"  class="width-3">

            <el-select v-model="management.area" multiple placeholder="请选择" style="width: 100px;">
              <el-option label="全部"   :value="-1"></el-option>
              <el-option v-for="list in areaList" :label="list.val" :value="list.key" :key="list.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间:" >
            <el-date-picker
              v-model="management.createDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="资产归属催收方" >
            <el-input  style="width: 130px;" v-model="management.collectionName"></el-input>
          </el-form-item>
          <el-form-item label="当前状态:" class="width-3">
            <el-select v-model="management.status" placeholder="请选择"  style="width:100px">
              <el-option label="暂存" :value="0"></el-option>
              <el-option label="可交易" :value="1"></el-option>
              <el-option label="已成交" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <div class="inquire">
            <el-button class="el-button el-button--primary" @click="inquireList">查询</el-button>
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
          label="资产编号"
          prop="code">
        </el-table-column>
        <el-table-column
          label="资产归属委单方"
          prop="entrustName">
        </el-table-column>
        <el-table-column
          label="资产类型">
          <template slot-scope="scope">
            <p v-for="list in typeList"  v-if="scope.row.type == list.key">{{list.val}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="资产来源"
          prop="source">
        </el-table-column>
        <el-table-column
          label="标的金额"
          prop="amount">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="发布时间"
          prop="publishDate">
        </el-table-column>
        <el-table-column
          label="当前状态">
          <template slot-scope="scope">
            <p  v-if="scope.row.status == 1">可交易</p>
            <p  v-else-if="scope.row.status == 2">已成交</p>
          </template>
        </el-table-column>
        <el-table-column
          label="可见状态">
          <template slot-scope="scope">
            <p  v-if="scope.row.isShow == 1">可见</p>
            <p  v-else>不可见</p>
          </template>
        </el-table-column>
        <el-table-column
          label="资产归属催收方"
          prop="collectionName">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div class="blue inlineBlock">
              <p @click="showEdit(scope.row)">修改</p>
              <p @click="publish(scope.row)" v-if="scope.row.publishStatus != 1">发布</p>
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
      return {
        api:'/loan/loan/',
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[
          ],
          "total":0
        },
        typeList:[],
        areaList:[],
        management:{
          "code": "",
          "entrustName": "",
          "collectionName": "",
          "type": "",
          "area": "",
          "source": "",
          "status": "",
          "beginDate": "",
          "endDate": "",
          createDate:'',
        },
        loading:false,
      }
    },
    beforeMount:function(){

      this.getType();
      this.getCity();
      this.ajaxPage(1);
    },
    methods:{
      getType:function(){
        var _this = this;

        let url = `/sys/sys-dict/getDictList`;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              name:'loanType',
            }
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.typeList = data.data.records;
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      getCity:function(){
        var _this = this;

        let url = `/sys/sys-dict/getDictList`;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              name:'loanArea',
            }
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.areaList = data.data.records;
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      showEdit(row){
        this.$router.push({name:'bill-info-id',params:{id:row.id}});
      },
      publish(row){
        let _this = this;
        let url = `${_this.api}publish`;

        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              id:row.id,
            }
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              _this.$message.success('发布成功');
              _this.ajaxPage(1);
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      inquireList(){
        this.ajaxPage(1);
      },
      inquireClear(){
        this.management.code = '';
        this.management.entrustName = '';
        this.management.collectionName = '';
        this.management.type = '';
        this.management.area = '';
        this.management.source = '';
        this.management.status = '';
        this.management.beginDate = '';
        this.management.endDate = '';
        this.ajaxPage(1);
      },
      ajaxPage:function (page) {
        let url = `${this.api}page`;
        var _this = this;
        _this.loading = true;

        if(_this.management.createDate != 0){
          _this.management.beginDate = _this.management.createDate[0];
          _this.management.endDate = _this.management.createDate[1];
        }

        let area = _this.management.area.length>0?_this.management.area.join(','):'';

        let date = {
          "code":_this.management.code,
          "entrustName":_this.management.entrustName,
          "collectionName":_this.management.collectionName,
          "types":_this.management.type,
          "areas":area,
          "source":_this.management.source,
          "status":_this.management.status,
          "beginDate":_this.management.beginDate,
          "endDate":_this.management.endDate,
          "pageNum":1
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
  .t-r{
    text-align: left;
    margin-bottom: 20px;
  }
  .blue{
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
