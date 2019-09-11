<template>
  <div class="main">
    <el-dialog title="还款明细"
               :visible.sync="dialogFormVisible"
                @open="open"
                @close="close"
               class="repeatArray"
              center>

      <div>
        <el-table
          class="history-table"
          :data="page"
          width="100%">
          <el-table-column type="index" label="序号">
          </el-table-column>
          <el-table-column prop="createDate" label="还款日期">
          </el-table-column>
          <el-table-column prop="principal" label="还款本金（元）">
          </el-table-column>
          <el-table-column prop="interest" label="利息（元）">
          </el-table-column>
          <el-table-column prop="deferDay" label="展息时间（天）">
          </el-table-column>
          <el-table-column prop="deferInterest" label="展息（元）">
          </el-table-column>
          <el-table-column prop="overInterest" label="罚息（元）">
          </el-table-column>
          <el-table-column prop="totalAmount" label="还款总金额（元）">
          </el-table-column>
        </el-table>
      </div>

      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关 闭</el-button>
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
      return {
        dialogFormVisible:true,
        id:id,
        page:[],
        multipleSelection:null,
        date:{}
      }
    },
    beforeMount(){
      this.getInit(this.data.id);
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
                _this.page.push(data.data);
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
        this.$emit('is_show',this.date)
      },
      handleCurrentChange(val) {
        this.getInit(this.id,val);
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

