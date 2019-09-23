<template>
  <div class="main">
    <el-dialog title="新增商品信息"
               :visible.sync="dialogFormVisible"
                @open="open"
                @close="close"
               class="repeatArray"
              center>
      <el-form :model="dialogForm" ref="dialogForms"
               label-position="right"
               :disabled="disabled"
               label-width="160px">

        <el-form-item label="预警项:" >
          <el-input v-model="data.amount" ></el-input>
        </el-form-item>
        <el-form-item label="预警参数:" >
          <el-input v-model="data.amount" ></el-input>
        </el-form-item>
        <el-form-item label="预警单位:" >
          <el-input v-model="data.amount" ></el-input>
        </el-form-item>
        <el-form-item label="预警值:" >
          <el-input v-model="data.amount" ></el-input>
        </el-form-item>
        <el-form-item label="状态:" >
          <el-radio v-model="data.radio3" label="1">启用</el-radio>
          <el-radio v-model="data.radio3" label="2">停用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="postForm">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'

  export default {
    props:['api','data','disabled'],
    data(){
      let id = this.data.id;
      return {
        dialogFormVisible:true,
        dialogForm: {
          id:id,
        },
        options: [{
          value: '1',
          label: '中国建设银行广东省分行'
        }, {
          value: '2',
          label: '中国建设银行广东省分行1'
        }, {
          value: '3',
          label: '中国建设银行广东省分行2'
        }],
        formLabelWidth: '180px',
      }
    },
    beforeMount(){
    },
    methods: {
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

            let url = `${_this.api}modifyAccount`;

            new Promise((resolve,reject) => {
              ajax({
                url:url,
                method:'post',
                data:_this.dialogForm
              }).then(function (res) {
                let data = res.data;
                if(data.code == 1){
                  if(data.data){

                    _this.$message.success('修改成功');

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

</style>
<style scoped lang="scss">
  $blue : #409EFF;
  .blue{
    color: $blue;
  }
  .repeatArray{
  }
  .text-right{
    text-align: right;
    margin-bottom: 5px;
  }
</style>
