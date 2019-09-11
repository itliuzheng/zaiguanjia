<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        :unique-opened="true"
        mode="vertical"
        background-color="#4b4e5c"
        text-color="#fff"
        active-text-color="#fff"
      >
        <sidebar-item  v-for="(route,index) in permission_routers" :key="route.name" :item="route" :item_index="index" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
    <div class="black_bj" v-if="beginner_guide == 0">
      <!--  60+  56* index -->
      <div class="position" :style="{top:(index * 56 + 56)+'px'}" v-for="(item,index) in guide_arr"  v-if="step.title == item">
        <div class="topic">{{step.title}}</div>
        <div class="container-box" >
          <div class="name"><i></i><span>{{step.desc}}</span></div>
          <div>
            <div class="button-step" @click="nextStep" v-if="step.active != 5">下一步 （{{step.active}}/5）</div>
            <div class="button-step" @click="guideEnd" v-else><a href="#/certification">开始体验</a></div>
          </div>
          <div class="close" @click="guideEnd"></div>
          <div class="hand"></div>
        </div>
      </div>
    </div>
    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="30%">
      <span>{{desc}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
        <a href="#/certification"><el-button type="primary" @click="guidePrompt">{{desc_btn}}</el-button></a>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'
  import GET_STATUS from '@/utils/getStatus'
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  import {constantRouterMap} from "@/router";

  export default {
    components: {
      SidebarItem,
    },
    data:function(){
      let Map = this.$store.getters.permission_routers;
      let userType = this.$store.getters.userType;
      let title = '';
      if(userType == 3){
        title = "金融机构端";
      }else{
        title = '融资企业端';
      }

      let arr = [];
      Map.forEach((value,index)=>{
        if(!value.hidden){
          arr.push(value.meta.title);
        }
      })

      console.log(arr);

      return {
        api:'/corporate/financing-company-info/',
        permission_routers:Map,
        title:title,
        GET_STATUS:GET_STATUS,
        status:null,
        titleClass:null,
        beginner_guide:1,
        guide_arr:arr,
        step:{
          title:'企业认证信息',
          desc:'录入信息进行企业认证',
          active:1
        },
        dialogVisible: false,
        desc: '您还未进行企业认证，请前往认证',
        desc_btn: '认 证',
      }
    },
    beforeMount(){
      let userType = this.$store.getters.userType;
      if(userType == 2){
        this.getStatus();
      }
    },
    methods:{
      getStatus() {
        let url = `${this.api}get-status`;
        var _this = this;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'get',
          }).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              if(data.data) {

                let guideDevice = JSON.parse(data.data.guideDevice);

                _this.beginner_guide = guideDevice.pc;

                // _this.beginner_guide = 0;  //测试
                _this.status = data.data.status;

                if(_this.beginner_guide == 1){

                  if(_this.status == GET_STATUS.MACHINE_APPLICATION_REJECTION || _this.status == GET_STATUS.MACHINE_AUDIT_REJECTION ||_this.status == GET_STATUS.APPROVAL_REJECTION ){
                    _this.desc = '您的企业信息认证有了新的进展，快去查看吧';
                    _this.desc_btn = '查看详情';
                    _this.dialogVisible = true;
                  }else if(_this.status == GET_STATUS.APPROVAL_SUCCESS){
                    _this.desc = '您的企业信息认证有了新的进展，快去查看吧';
                    _this.desc_btn = '查看详情';
                    if(guideDevice.authenticate == 0){
                      _this.dialogVisible = true;
                    }
                  }else if(_this.status == GET_STATUS.CREDIT_EXPIRED){
                    _this.desc = data.data.statusName;
                    _this.desc_btn = '查看详情';
                    _this.dialogVisible = true;
                  }else if(_this.status == GET_STATUS.REGULATOR_CREDIT_END){
                    _this.desc = '授信额度已终止';
                    _this.desc_btn = '查看详情';
                    _this.dialogVisible = true;
                  }
                }

              }

            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      guidePrompt(){
        let url = `/corporate/financing-company-info/alert-auth-success`;
        let _this = this;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'get',
          }).then(function (res) {
            let data = res.data;
             _this.dialogVisible = false;
          }).catch(error => {
            reject(error)
          })
         })

      },
      guideEnd(){
        this.beginner_guide = 1;
      },
      nextStep(){
        this.step.active++;

        this.warehouseEnterpise();


      },
      warehouseEnterpise(){
        switch (this.step.active){
          case 1:
            break;
          case 2:
            this.step.title = '合同管理';
            this.step.desc = '签订授信合同';
            break;
          case 3:
            this.step.title = '融资管理';
            this.step.desc = '融资申请、签约';
            break;
          case 4:
            this.step.title = '还款管理';
            this.step.desc = '还款查询';
            break;
          case 5:
            this.step.title = '工作台';
            this.step.desc = '待办业务提醒，融资统计信息查看';
            break;
          default:
            break;
        }

      }
    },
    computed: {
      ...mapGetters([
        // 'permission_routers',
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      },
    },
  }
</script>
<style scoped lang="scss">
  $red : #ff4c4c;
  .title{
    height: 56px;
    line-height: 56px;
    color: #3e8ae5;
    background: #f3f9ff;
    font-size: 18px;
    font-weight: bold;
  }
  .red{
    color: $red;
  }
  .black_bj{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    z-index: 9999999;
    top: 0;
    left: 0;
    .position{
      position: absolute;
      left: 0;
    }
    .topic{
      width: 200px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      background: #fff;
      color: rgb(51, 51, 51);
      font-size: 14px;
      float: left;
    }
    .container-box{
      float: left;
      /*margin-left:200px;*/
      width: 420px;
      height: 220px;
      background:url("~@/images/guide/background.png") no-repeat;
      .close{
        width: 52px;
        height: 52px;
        background:url("~@/images/guide/close.png") no-repeat;
        cursor: pointer;
        position: absolute;
        top: -26px;
        right: -26px;
      }
      .hand{
        width: 67px;
        height: 82px;
        background:url("~@/images/guide/hand.png") no-repeat;
        cursor: pointer;
        position: absolute;
        bottom: -112px;
        right: 20px;
      }
      .name{
        line-height: 38px;
        margin-bottom: 45px;
        padding: 0 50px 0 100px;
        text-align: left;
        height: 38px;
        margin-top: 60px;
        i{
          display: inline-block;
          width: 33px;
          height: 38px;
          background:url("~@/images/guide/sign.png") no-repeat;
          vertical-align: top;
          margin-right: 10px;
        }
        span{
          color: #fff;
          font-size: 22px;
        }
      }
      .button-step{
        cursor: pointer;
        float:right;
        margin-right: 50px;
        width: 130px;
        height: 34px;
        background: #fff;
        color: #459aff;
        font-size: 18px;
        line-height: 34px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
      }
    }
  }
</style>
