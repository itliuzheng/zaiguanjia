<template>
  <div class="main">
    <el-dialog title="可质押物明细"
               :visible.sync="dialogFormVisible"
                @open="open"
                @close="close"
               class="repeatArray"
              center>

      <div>
        <el-table
          class="history-table"
        :data="page.records"
          height="180"
          @selection-change="handleSelectionChange"
        width="100%">
          <el-table-column prop="name" label="商品名称">
          </el-table-column>
          <el-table-column prop="varietySpecification" label="品种规格">
          </el-table-column>
          <el-table-column prop="warehouse" label="存货仓库">
          </el-table-column>
          <el-table-column prop="avaiable" label="可质押数量">
          </el-table-column>
          <el-table-column  label="是否质押">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column  label="输入质押量">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.number"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <div class="page" v-if="page.total != 0" style="text-align: center;">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-size="page.pageSize"
            layout="total, prev,pager, next, jumper"
            :total="page.total">
          </el-pagination>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
          <el-button @click="postForm" type="primary" :loading="loadding">提 交</el-button>
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
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[
          ],
          "total":0
        },
        multipleSelection:null,
        loadding:false,
        date:[]
      }
    },
    beforeMount(){
      this.getInit(this.id);
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getInit(id){
        var _this = this;
        let url = `/warehouse/simulation-cargo/page`;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'get',
          }).then(function (res) {
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
      postForm(id){
        var _this = this;
        let url = `${this.api}batch-add`;

        let array = [];

         _this.page.records.forEach((value)=>{
           if(value.checked){
             array.push({
               id:value.id,
               count:value.number
             });
           }
         })

        this.loadding = true;

        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'POST',
            data:array
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data){

                _this.date = data.data;
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

