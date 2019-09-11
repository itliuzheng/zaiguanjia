<template>
  <div class="main">
    <el-dialog
      title="提示"
      :visible.sync="dialogFormVisible"
      width="30%"
      @close="close"
      center
    >
      <el-form class="desc" :model="dialogForm" center>
        <el-form-item  label-width="0">
          <el-input style="width: 300px;height:120px;" type="textarea"  v-model="dialogForm.remark" placeholder="请输入通过或驳回的原因:"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="width-110" type="primary" @click="postForm(1)" :loading="loadding">通 过</el-button>
        <el-button class="width-110" @click="postForm(2)" :loading="loadding">驳 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'

  export default {
    props:['api','data'],
    data(){
      let id = this.data.id;
      return {
        dialogForm:{},
        dialogFormVisible:true,
        id:id,
        loadding:false,
      }
    },
    beforeMount(){
    },
    methods: {
      postForm(status){
        var _this = this;
        let url = `${this.api}review`;

        this.loadding = true;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'POST',
            data:{
              id:_this.data.id,
              type:_this.data.type,
              remark:_this.dialogForm.remark,
              status:status
            }
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.dialogFormVisible = false;
                _this.$message.success(data.msg);
              }
            }else{
              _this.$message.error(data.msg);
            }
            _this.loadding = false;

          }).catch(error => {
            _this.loadding = false;
            reject(error)
          })
         })
      },
      open(){

      },
      close(){
        this.$emit('is_show',false)
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

