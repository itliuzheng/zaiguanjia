<template>
  <div class="bill-main">

      <el-form :model="dialogForm" ref="dialogForms"
               label-position="right"
               label-width="160px">
        <el-form-item label="资产编号:"
            prop="code"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'blur'
            }">
          <el-input  maxlength="50" v-model="dialogForm.code" ></el-input>
        </el-form-item>
        <el-form-item label="资产归属委单方:">
          <el-select v-model="dialogForm.entrustUserId"  placeholder="请选择">
            <el-option :label="list.loginName" :value="list.id" v-for="(list,index) in unilateralList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产归属催收方:">
          <el-select v-model="dialogForm.collectionUserId"  placeholder="请选择">
            <el-option :label="list.loginName" :value="list.id" v-for="(list,index) in collectionList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产类型:"
            prop="type"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'change'
            }">
          <el-select v-model="dialogForm.type"  placeholder="请选择">
            <el-option :label="list.label" :value="list.value" v-for="(list,index) in typeList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="债务人所属区域:"
            prop="areas"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'blur'
            }">
          <el-select multiple  v-model="dialogForm.areas"  placeholder="请选择">
            <el-option :label="list.name" :value="list.name" v-for="(list,index) in areaList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产来源:"
            prop="source"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'blur'
            }">
          <el-input  maxlength="50" v-model="dialogForm.source" ></el-input>
        </el-form-item>
        <el-form-item label="标的金额:"
            prop="amount"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'blur'
            }">
          <el-input  maxlength="50" v-model="dialogForm.amount" ></el-input>
        </el-form-item>
        <el-form-item label="状态修改:"
            prop="status"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'change'
            }">
          <el-select v-model="dialogForm.status"  placeholder="请选择">
            <el-option label="可交易" :value="1" ></el-option>
            <el-option label="已成交" :value="2" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可见状态:"
            prop="isShow"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'change'
            }">
          <el-select v-model="dialogForm.isShow"  placeholder="请选择">
            <el-option label="可见" :value="1" ></el-option>
            <el-option label="不可见" :value="2" ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

    <el-button type="primary" @click="postForm">暂 存</el-button>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'
  import {reconstructionCode} from "@/utils/tree"
  import china_json from "@/utils/city"

  export default {
    data(){
      return {
        api:'/loan/loan/',
        dialogForm: {
          "code": "",
          "entrustName": "",
          "collectionName": "",
          "type": "",
          "area": "",
          "source": "",
          "status": "",
        },
        formLabelWidth: '180px',
        financeOrgList:[],
        productList:[],
        typeList:[
              {
                label:'消费分期',
                value:1
              },
              {
                label:'信用贷款',
                value:2
              },
              {
                label:'车辆质押',
                value:3
              },
              {
                label:'房产抵押',
                value:4
              },
        ],
        collectionList:[
        ],
        unilateralList:[
        ],
        areaList:[],
      }
    },
    beforeMount:function(){
      this.getCity();
      this.getUnilateral();
      this.getCollection();
      let id = this.$route.params.id;
      if(id){
        this.getInit(id);
      }
    },
    methods: {
      getCity:function(){
        this.areaList = reconstructionCode(china_json);
      },
      getInit(id){
        var _this = this;

        let url = `${_this.api}${id}`;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'get',
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                data.data.areas = data.data.area.split(',');
                data.data.entrustUserId = data.data.entrustUserId == null?'':data.data.entrustUserId;
                data.data.collectionUserId = data.data.collectionUserId == null?'':data.data.collectionUserId;


                _this.dialogForm = data.data;
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      getUnilateral(){
        var _this = this;

        let url = `/user/page`;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              type:1,
              pageSize:100
            }
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                data.data.records.unshift({loginName:'暂无',id:''});
                _this.unilateralList = data.data.records;
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      getCollection(){
        var _this = this;

        let url = `/user/page`;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:{
              type:2,
              pageSize:100
            }
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                data.data.records.unshift({loginName:'暂无',id:''});
                _this.collectionList = data.data.records;

              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      postForm(){
        var _this = this;

        this.$refs.dialogForms.validate((value)=>{
          if(value){
            let url = `${_this.api}${_this.$route.params.id?'update':'add'}`;
            _this.unilateralList.forEach((value)=>{
              if(value.id == _this.dialogForm.entrustUserId){
                _this.dialogForm.entrustName = _this.dialogForm.entrustUserId?value.loginName:'';
              }
            })
            _this.collectionList.forEach((value)=>{
              if(value.id == _this.dialogForm.collectionUserId){
                _this.dialogForm.collectionName = _this.dialogForm.collectionUserId?value.loginName:'';
              }
            });

            _this.dialogForm.area = _this.dialogForm.areas.join(',');
            new Promise((resolve,reject) => {
              ajax({
                url:url,
                method:'post',
                data:_this.dialogForm
              }).then(function (res) {
                let data = res.data;
                if(data.code == 1){
                  if(data.data){
                    if(_this.$route.params.id){
                      _this.$message.success('修改成功');
                    }else{
                      _this.$message.success('暂存成功');
                    }
                    _this.$router.push({name:"bill-list"})
                  }
                }else{
                  _this.$message.error(data.msg);
                }

              }).catch(error => {
                reject(error)
              })
             })


          }else{
            _this.$message.error('您有必填项未填写，请填写后保存');

          }
        })
      },
    },
  }
</script>
<style lang="scss">
  .bill-main{
    padding-right: 100px;
    padding-bottom: 50px;
    .el-select{
      width: 100%;
    }

  }
</style>
<style lang="scss" scoped>
  $blue : #409EFF;

</style>
