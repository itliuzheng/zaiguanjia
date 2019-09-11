<template>
  <div class="main">
    <el-dialog :title="data.title"
               :visible.sync="dialogFormVisible"
                @open="open"
                @close="close"
               class="repeatArray"
              center>
      <el-form :model="dialogForm" ref="dialogForms"
               label-position="right"
               label-width="120px">

        <el-form-item label="" prop="operation" v-if="dialogForm.statusStr == 1"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'change'
          }">
          <el-radio v-model="dialogForm.operation" label="ADD">增加+</el-radio>
          <el-radio v-model="dialogForm.operation" label="SUB">减少-</el-radio>
        </el-form-item>
        <el-form-item :label="data.itemTitle+'(元):'" >
          <el-input v-model="data.account" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="postForm" :loading="loadding">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'

  export default {
    props:['api','data'],
    data(){
      let id = this.data.id;
      let data = this.data;

      //1-额度变更, 2-解冻额度,3-冻结额度,4-终止额度,5-恢复额度",
      if(data.title == '额度变更'){
        data.statusStr = 1;
      }else if(data.title == '解冻额度'){
        data.statusStr = 2;
      }else if(data.title == '冻结额度'){
        data.statusStr = 3;
      }
      return {
        dialogFormVisible:true,
        dialogForm: data,
        formLabelWidth: '180px',
        loadding:false,
      }
    },
    beforeMount(){
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

            let url = `${_this.api}changeAccount`;

            this.loadding = true;

            new Promise((resolve,reject) => {
              ajax({
                url:url,
                method:'post',
                data:{
                  id:_this.dialogForm.id,
                  status:_this.dialogForm.statusStr,
                  account:_this.dialogForm.account,
                  operation:_this.dialogForm.operation,
                }
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
                _this.loadding = false;

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

  .zd-icon{
    font-size: 24px;
    color: #f95353;
    cursor: pointer;
  }
  .zd-icon-blue{
    color: #57a3f3;
  }
  .svg-box{
    display: inline-block;
    vertical-align: sub;
  }
</style>
