<template>
  <div class="main">
    <el-dialog title="产品信息"
               :visible.sync="dialogFormVisible"
                @open="open"
                @close="close"
               class="add-form-box"
              center>
      <el-form :model="dialogForm" ref="dialogForms"
               label-position="right"
               label-width="160px">
        <el-form-item label="合作商名称:"
            prop="loginName"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'blur'
            }">
          <el-input  maxlength="50" v-model="dialogForm.loginName" ></el-input>
        </el-form-item>
        <el-form-item label="合作商密码"
            prop="password"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'change'
            }">
          <el-input maxlength="50" v-model="dialogForm.password" ></el-input>
        </el-form-item>
        <el-form-item label="合作商类别:"
            prop="category"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'change'
            }">

          <el-select v-model="dialogForm.category"  placeholder="请选择">
            <el-option :label="list.label" :value="list.value" v-for="(list,index) in category" :key="index"></el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="合作类型:"
            prop="type"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'change'
            }">
          <el-select v-model="dialogForm.type"  placeholder="请选择">
            <el-option :label="list.label" :value="list.value" v-for="(list,index) in typeList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户状态:"
            prop="status"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'change'
            }" >
          <el-radio v-model="dialogForm.status" :label="1">启用</el-radio>
          <el-radio v-model="dialogForm.status" :label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item label="备注:" class="input-textarea">
            <el-input type="textarea"
                      maxlength="200"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      v-model="dialogForm.remark" ></el-input>
            <p>你还可以输入<span>{{200 - dialogForm.remark.length}}</span>字</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="postForm">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import store from '@/store'
  import ajax from '@/utils/ajax'
  import {unique} from '@/utils/index'


  export default {
    props:['api','data'],
    data(){
      let id = this.data.id;
      return {
        dialogFormVisible:true,
        dialogForm: {
          id:id,
          remark:''
        },
        formLabelWidth: '180px',
        financeOrgList:[],
        productList:[],
        typeList:[
              {
                label:'后台用户',
                value:0
              },
              {
                label:'委单方',
                value:1
              },
              {
                label:'催收方',
                value:2
              },
              {
                label:'其他',
                value:3
              },
        ],
        category:[
              {
                label:'企业',
                value:1
              },
              {
                label:'个人',
                value:2
              },
              {
                label:'其他',
                value:3
              },
        ],
      }
    },
    beforeMount(){
      let id = this.data.id;
      if(id){
        this.dialogForm = this.data;
      }

    },
    methods: {
      open(){

      },
      close(){
        this.$refs.dialogForms.resetFields();
        this.$emit('is_show',false)
      },
      postForm(){
        var _this = this;

        this.$refs.dialogForms.validate((value)=>{
          if(value){

            let url = `${_this.api}${_this.data.types}`;

            new Promise((resolve,reject) => {
              ajax({
                url:url,
                method:'post',
                data:_this.dialogForm
              }).then(function (res) {
                let data = res.data;
                if(data.code == 1){
                  if(data.data){

                    if(_this.data.types == 'add'){
                      _this.$message.success('添加成功');
                    }else{
                      _this.$message.success('修改成功');
                    }

                    _this.dialogFormVisible = false;

                  }
                }else{
                  _this.$message.error(data.msg);
                }

              }).catch(error => {
                reject(error)
              })
             })


          }
        })
      },
    },
    mounted(){
    }
  }
</script>
<style lang="scss">

  .add-form-box{
    .el-dialog__body{
      padding-right: 100px;
    }
    .el-select{
      width: 100%;
    }

    .input-textarea{
      p{
        height: 0;
        line-height: 2;
        text-align: right;
        font-size: 12px;
        span{
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }


</style>
<style scoped lang="scss">
  $blue : #409EFF;
  .blue{
    color: $blue;
  }

</style>
