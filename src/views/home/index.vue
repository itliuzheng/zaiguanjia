<template>
  <div >
    <div v-if="loadding">
      <div v-if="userType == 2">

        <div class="workbench-box">
          <h3>我的待办</h3>
          <div class="to-do-box">
            <router-link class="to-do" :to="{name:'contract_pending'}">
              <div class="name"><i class="zd-icon zd-icon-todo"></i>待签合同</div>
              <div class="desc"><span>{{data.pendingContractCount}}</span>条</div>
              <p class="detail" >查看详情</p>
              <div class="arrow-right">
                <i class="el-icon-arrow-right"></i>
              </div>
            </router-link>
            <router-link class="to-do" :to="{name:'financing_pending'}">
              <div class="name"><i class="zd-icon zd-icon-requisition"></i>申请单签约</div>
              <div class="desc"><span>{{data.pendingPledgeManageCount}}</span>条</div>
              <p class="detail" >查看详情</p>
              <div class="arrow-right">
                <i class="el-icon-arrow-right"></i>
              </div>
            </router-link>
          </div>
        </div>
        <p class="line"></p>
        <div class="workbench-box">
          <h3>融资统计</h3>
          <div class="statistics-box">
            <div class="statistics">
              <div class="name">融资总计</div>
              <div class="content-desc clearfix">
                <p class="fl">融资笔数：</p>
                <p class="fr"><span>{{data.loan.count}}</span>笔</p>
              </div>
              <div class="content-desc clearfix">
                <p class="fl">融资金额：</p>
                <p class="fr"><span>{{data.loan.totalAmount | numberFilter}}</span>万</p>
              </div>
            </div>
            <div class="statistics">
              <div class="name">待还款</div>
              <div class="content-desc clearfix">
                <p class="fl">待还笔数：</p>
                <p class="fr"><span>{{data.await.count}}</span>笔</p>
              </div>
              <div class="content-desc clearfix">
                <p class="fl">待还金额：</p>
                <p class="fr"><span>{{data.await.totalAmount | numberFilter}}</span>万</p>
              </div>
            </div>
          </div>
          <div class="statistics-box" >
            <div class="statistics" style="height: 360px;">
              <div class="name">已还款</div>
              <div class="repayment-box">
                <div class="fl">
                  <div class="content-desc clearfix">
                    <p class="fl">本金：</p>
                    <p class="fr"><span>{{data.already | numberFilter}}</span>万</p>
                  </div>
                  <div class="content-desc clearfix">
                    <p class="fl">利息：</p>
                    <p class="fr"><span>{{data.interest | numberFilter}}</span>万</p>
                  </div>
                  <div class="content-desc clearfix">
                    <p class="fl">总计：</p>
                    <p class="fr"><span>{{data.amount | numberFilter}}</span>万</p>
                  </div>
                </div>
                <div class="fl">
                  <div class="content-desc clearfix">
                    <p class="fl">展息：</p>
                    <p class="fr"><span>{{data.showInterest | numberFilter}}</span>万</p>
                  </div>
                  <div class="content-desc clearfix">
                    <p class="fl">罚息：</p>
                    <p class="fr"><span>{{data.penalty | numberFilter}}</span>万</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="statistics-box">
            <div class="statistics">
              <div class="name">已结清</div>
              <div class="content-desc clearfix">
                <p class="fl">已结清笔数：</p>
                <p class="fr"><span>{{data.complete.count}}</span>笔</p>
              </div>
              <div class="content-desc clearfix">
                <p class="fl">已结清金额：</p>
                <p class="fr"><span>{{data.complete.totalAmount | numberFilter}}</span>万</p>
              </div>
            </div>
            <div class="statistics">
              <div class="name">逾期待还</div>
              <div class="content-desc clearfix">
                <p class="fl">逾期待还笔数：</p>
                <p class="fr"><span>{{data.overdue.count}}</span>笔</p>
              </div>
              <div class="content-desc clearfix">
                <p class="fl">逾期待还金额：</p>
                <p class="fr"><span>{{data.overdue.totalAmount | numberFilter}}</span>万</p>
              </div>
            </div>
          </div>
          <div class="statistics-box">
            <div class="statistics">
              <div class="name">回购处置</div>
              <div class="content-desc clearfix">
                <p class="fl">回购处置笔数：</p>
                <p class="fr"><span>{{data.back.count}}</span>笔</p>
              </div>
              <div class="content-desc clearfix">
                <p class="fl">回购处置金额：</p>
                <p class="fr"><span>{{data.back.totalAmount | numberFilter}}</span>万</p>
              </div>
            </div>
            <div class="statistics">
              <div class="name">违约处置</div>
              <div class="content-desc clearfix">
                <p class="fl">违约处置笔数：</p>
                <p class="fr"><span>{{data.dispose.count}}</span>笔</p>
              </div>
              <div class="content-desc clearfix">
                <p class="fl">违约处置金额：</p>
                <p class="fr"><span>{{data.dispose.totalAmount | numberFilter}}</span>万</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div v-else>

        <div class="workbench-box">
          <h3>我的待办</h3>
          <div class="to-do-box">
            <router-link class="to-do" :to="{name:'contract_start'}">
              <div class="name"><i class="zd-icon zd-icon-todo"></i>合同发起</div>
              <div class="desc"><span>{{data.financeInitialContractCount}}</span>条</div>
              <p class="detail" >查看详情</p>
              <div class="arrow-right">
                <i class="el-icon-arrow-right"></i>
              </div>
            </router-link>
            <router-link class="to-do" :to="{name:'contract_confirm'}">
              <div class="name"><i class="zd-icon zd-icon-requisition"></i>确认合同</div>
              <div class="desc"><span>{{data.financeConfirmedContractCount}}</span>条</div>
              <p class="detail" >查看详情</p>
              <div class="arrow-right">
                <i class="el-icon-arrow-right"></i>
              </div>
            </router-link>
          </div>
          <div class="to-do-box">
            <router-link class="to-do" :to="{name:'financingReview_first'}">
              <div class="name"><i class="zd-icon zd-icon-todo"></i>初审信息</div>
              <div class="desc"><span>{{data.financeInitialPledgeManageCount}}</span>条</div>
              <p class="detail" >查看详情</p>
              <div class="arrow-right">
                <i class="el-icon-arrow-right"></i>
              </div>
            </router-link>
            <router-link class="to-do" :to="{name:'financingReview_final'}">
              <div class="name"><i class="zd-icon zd-icon-requisition"></i>终审信息</div>
              <div class="desc"><span>{{data.financeFinalPledgeManageCount}}</span>条</div>
              <p class="detail" >查看详情</p>
              <div class="arrow-right">
                <i class="el-icon-arrow-right"></i>
              </div>
            </router-link>
          </div>
          <div class="to-do-box">
            <router-link class="to-do" :to="{name:'loan_start'}">
              <div class="name"><i class="zd-icon zd-icon-todo"></i>确认放款</div>
              <div class="desc"><span>{{data.financeConfirmLoanCount}}</span>条</div>
              <p class="detail" >查看详情</p>
              <div class="arrow-right">
                <i class="el-icon-arrow-right"></i>
              </div>
            </router-link>
            <div class="to-do no-to-do"></div>
          </div>
        </div>
        <p class="line"></p>
        <div class="workbench-box">
          <h3>融资统计</h3>
          <div class="statistics-box">
            <div class="statistics">
              <div class="name">放款总计</div>
              <div class="content-desc clearfix">
                <p class="fl">放款笔数：</p>
                <p class="fr"><span>{{data.loan.count}}</span>笔</p>
              </div>
              <div class="content-desc clearfix">
                <p class="fl">放款金额：</p>
                <p class="fr"><span>{{data.loan.totalAmount | numberFilter}}</span>万</p>
              </div>
            </div>
            <div class="statistics">
              <div class="name">待还总计</div>
              <div class="content-desc clearfix">
                <p class="fl">待还笔数：</p>
                <p class="fr"><span>{{data.await.count}}</span>笔</p>
              </div>
              <div class="content-desc clearfix">
                <p class="fl">待还金额：</p>
                <p class="fr"><span>{{data.await.totalAmount | numberFilter}}</span>万</p>
              </div>
            </div>
          </div>
          <div class="statistics-box" >
            <div class="statistics" style="height: 360px;">
              <div class="name">已还款</div>
              <div class="repayment-box">
                <div class="fl">
                  <div class="content-desc clearfix">
                    <p class="fl">本金：</p>
                    <p class="fr"><span>{{data.already | numberFilter}}</span>万</p>
                  </div>
                  <div class="content-desc clearfix">
                    <p class="fl">利息：</p>
                    <p class="fr"><span>{{data.interest | numberFilter}}</span>万</p>
                  </div>
                  <div class="content-desc clearfix">
                    <p class="fl">总计：</p>
                    <p class="fr"><span>{{data.amount | numberFilter}}</span>万</p>
                  </div>
                </div>
                <div class="fl">
                  <div class="content-desc clearfix">
                    <p class="fl">展息：</p>
                    <p class="fr"><span>{{data.showInterest | numberFilter}}</span>万</p>
                  </div>
                  <div class="content-desc clearfix">
                    <p class="fl">罚息：</p>
                    <p class="fr"><span>{{data.penalty | numberFilter}}</span>万</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="statistics-box">
            <div class="statistics">
              <div class="name">已结清</div>
              <div class="content-desc clearfix">
                <p class="fl">已结清笔数：</p>
                <p class="fr"><span>{{data.complete.count}}</span>笔</p>
              </div>
              <div class="content-desc clearfix">
                <p class="fl">已结清金额：</p>
                <p class="fr"><span>{{data.complete.totalAmount | numberFilter}}</span>万</p>
              </div>
            </div>
            <div class="statistics">
              <div class="name">逾期待还</div>
              <div class="content-desc clearfix">
                <p class="fl">逾期待还笔数：</p>
                <p class="fr"><span>{{data.overdue.count}}</span>笔</p>
              </div>
              <div class="content-desc clearfix">
                <p class="fl">逾期待还金额：</p>
                <p class="fr"><span>{{data.overdue.totalAmount | numberFilter}}</span>万</p>
              </div>
            </div>
          </div>
          <div class="statistics-box">
            <div class="statistics">
              <div class="name">回购</div>
              <div class="content-desc clearfix">
                <p class="fl">回购处置笔数：</p>
                <p class="fr"><span>{{data.back.count}}</span>笔</p>
              </div>
              <div class="content-desc clearfix">
                <p class="fl">回购处置金额：</p>
                <p class="fr"><span>{{data.back.totalAmount | numberFilter}}</span>万</p>
              </div>
            </div>
            <div class="statistics">
              <div class="name">违约处置</div>
              <div class="content-desc clearfix">
                <p class="fl">违约处置笔数：</p>
                <p class="fr"><span>{{data.dispose.count}}</span>笔</p>
              </div>
              <div class="content-desc clearfix">
                <p class="fl">违约处置金额：</p>
                <p class="fr"><span>{{data.dispose.totalAmount | numberFilter}}</span>万</p>
              </div>
            </div>
          </div>
          <div class="statistics-box" >
            <div class="statistics" style="height: 360px;">
              <div class="name">授信额度概览</div>
              <div class="repayment-box repayment-box-center ">
                <div class="fl">
                  <div class="content-desc clearfix">
                    <p class="fl">累计授信：</p>
                    <p class="fr fr-center"><span>{{data.total.count}}</span>笔</p>
                    <p class="fr"><span>{{data.total.totalAmount | numberFilter}}</span>万</p>
                  </div>
                  <div class="content-desc clearfix">
                    <p class="fl">正常授信：</p>
                    <p class="fr fr-center"><span>{{data.credit.count}}</span>笔</p>
                    <p class="fr"><span>{{data.credit.totalAmount | numberFilter}}</span>万</p>
                  </div>
                  <div class="content-desc clearfix">
                    <p class="fl">已使用：</p>
                    <p class="fr"><span>{{data.useTotal | numberFilter}}</span>万</p>
                  </div>
                </div>
                <div class="fl">
                  <div class="content-desc clearfix">
                    <p class="fl">冻结授信：</p>
                    <p class="fr fr-center"><span>{{data.freeze.count}}</span>笔</p>
                    <p class="fr"><span>{{data.freeze.totalAmount | numberFilter}}</span>万</p>
                  </div>
                  <div class="content-desc clearfix">
                    <p class="fl">在途冻结：</p>
                    <p class="fr fr-center"><span>{{data.beingTotal.count}}</span>笔</p>
                    <p class="fr"><span>{{data.beingTotal.totalAmount | numberFilter}}</span>万</p>
                  </div>
                  <div class="content-desc clearfix">
                    <p class="fl">可用额度：</p>
                    <p class="fr"><span>{{data.availableTotal | numberFilter}}</span>万</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="statistics-box">
            <div class="statistics">
              <div class="name">融资企业数量</div>
              <div class="content-desc clearfix">
                <p><span>{{data.financingCompanyCount2}}</span>家</p>
              </div>
            </div>
            <div class="statistics no-statistics">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'

  export default {
    data(){
      let _this = this;

      let userType = this.$store.getters.userType;
      let title = '';

      if(userType == 2){
        title = '融资企业端';
      }else if(userType == 3){
        title = "金融机构端"
      }

      return {
        workbench_api:'/workbench',
        userType:userType,
        userId:_this.$store.getters.userId,
        loadding:null,
        data:{
        },
      }
    },
    beforeMount:function(){
      this.getInit();
    },
    methods:{
      getInit(){

        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        let url = `${this.workbench_api}?userId=${this.userId}`;
        var _this = this;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'get',
          }).then(function (res) {
            loading.close();
            let data = res.data;

            if(data.code == 1){

              _this.data = data.data;

            }else if(data.code == 4){
              _this.$store.dispatch('LogOut').then(() => {
                _this.$router.go(0)
              })
            }

            _this.loadding = true;

          }).catch(error => {
            reject(error)
          })
         })

      },
    },
    filters:{
      numberFilter(value){
        value = Number(value);
        value = (value / 10000).toFixed(2);
        return value;
      }
    }
  }
</script>
<style scoped lang="scss">
  $blue:#3e8ae5;
  .line{
    height: 10px;
    background: #f1f5f6;
  }
  .workbench-box{
    color: #666;
    padding-bottom: 30px;
    h3{
      color: #666;
      line-height: 60px;
      border-bottom: 1px solid #ccc;
      font-size: 16px;
      margin-bottom: 30px;
      text-align: left;
      padding-left: 30px;
    }
  }
  .to-do-box{
    display: flex;
    padding-left: 30px;
    margin-bottom: 30px;
    .to-do{
      flex: 1;
      margin-right: 30px;
      background: #f1f7fd;
      height: 200px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      text-align: left;
      padding:30px 0 0 50px;
      position: relative;
      .name{
        color: #333;
        font-size: 18px;
        line-height: 24px;
      }
      .zd-icon{
        display: inline-block;
        width: 22px;
        height: 24px;
        background: url("~@/images/work/daiqian.png") no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        vertical-align: top;
        margin-right: 10px;
      }
      .zd-icon-requisition{
        width: 24px;
        height: 24px;
        background: url("~@/images/work/qianyue.png") no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
      }
      .desc{
        margin: 46px 0 20px;
        font-size: 14px;
        color: #333;
        span{
          font-size: 30px;
          font-weight: bold;
          color: #1986f6;
          margin-right: 12px;
        }
      }
      .detail{
        font-size: 14px;
        color: #1986f6;
      }
      .arrow-right{
        position: absolute;
        right: 50px;
        top: 50%;
        -webkit-transform: translate(0, -50%);
        -moz-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        -o-transform: translate(0, -50%);
        transform: translate(0, -50%);
        i{
          font-size: 20px;
        }
      }
      &:hover{
        .arrow-right i{
          color: #1986f6;
        }
      }
    }
    .no-to-do{
      background: transparent;
    }
  }
  .statistics-box{
    display: flex;
    padding-left: 30px;
    margin-bottom: 30px;
    min-width: 870px;
    .statistics{
      flex: 1;
      height: 300px;
      margin-right: 30px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      -webkit-box-shadow:-5px 5px 16px 0.8px rgba(74,74,74,0.17);
      -moz-box-shadow:-5px 5px 16px 0.8px rgba(74,74,74,0.17);
      box-shadow:-5px 5px 16px 0.8px rgba(74,74,74,0.17);
      .name{
        height: 80px;
        background: #f1f7fd;
        line-height: 80px;
        font-size: 20px;
        color: #333;
        margin-bottom: 44px;
      }
      .content-desc{
        padding: 0 80px;
        color: #333;
        font-size: 16px;
        line-height: 66px;
        position: relative;
        .fr{
          font-size: 20px;
          font-weight: bold;
        }
        .fr-center{
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
        }
        span{
          font-size: 30px;
          color: #1986f6;
          margin-right: 12px;
        }
      }

      .repayment-box{
        >div{
          width: 50%;
          &:first-child{
            border-right: 1px solid #cecece;
          }
        }
      }
      .repayment-box-center{
        .content-desc{
          padding: 0 30px;
        }
      }
    }
    .no-statistics{
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
    }
  }
</style>

