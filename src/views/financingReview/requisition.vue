<template>
  <div class="main">

    <div class="top-main">
        <el-form :inline="true" ref="management" :model="management" label-position="left">

          <el-form-item label="状态:" >
            <el-select v-model="management.status" placeholder="请选择" style="width: 180px;">
              <el-option label="待金融机构初审" :value="1"></el-option>
              <el-option label="待金融机构终审" :value="2"></el-option>
              <el-option label="待融资企业签约" :value="6"></el-option>
              <el-option label="待金融机构签约放款" :value="7"></el-option>
              <el-option label="融资完成" :value="8"></el-option>
              <el-option label="金融机构初审驳回" :value="3"></el-option>
              <el-option label="金融机构终审驳回" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请单编号:" >
            <el-input style="width: 150px;" v-model="management.orderNum"  placeholder="请输入编号"></el-input>
          </el-form-item>
          <el-form-item label="融资企业">
            <el-input style="width: 130px;" v-model="management.borrowOrgName"  placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item label="融资申请时间:" >
            <el-date-picker  style="width: 190px;" v-model="management.createDate"  placeholder="请输入申请时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
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
          label="融资申请时间"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="原因"
          prop="remark">
        </el-table-column>
        <el-table-column
          prop="statusName"
          label="状态">
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
      let title = this.$route.meta.title;
      let _this = this;
      return {
        title:title,
        api:'/financing/freight-borrow/',
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
          status:'',
          orderNum:'',
          borrowOrgName:'',
          createDate:'',
        },
        dialogFormVisible:false,
        dialogForm:null,
        loading:false,
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
        this.management.borrowOrgName = '';
        this.management.status = '';
        this.management.orderNum = '';
        this.management.createDate = '';

        this.ajaxPage(1);
      },
      ajaxPage:function (page) {
        let url = `${this.api}page`;
        var _this = this;
        let date = {};
        _this.loading = true;

        date = {
          borrowOrgName:_this.management.borrowOrgName,
          status:_this.management.status,
          orderNum:_this.management.orderNum,
          createDate:_this.management.createDate,
          financeOrgId:_this.userId,
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
    .width-3{
      max-width: 30%;
    }
    .width-31{
      max-width: 31%;
    }
    .inquire{
      display:block;
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
