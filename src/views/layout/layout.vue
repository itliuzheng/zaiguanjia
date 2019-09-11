<template>
  <div :class="classObj" class="app-wrapper">
    <div class="main-container">
      <navbar></navbar>
      <div class="clearfix">
        <sidebar  class="sidebar-container"/>
        <div class="body-main">
          <back-main></back-main>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Navbar,Sidebar,BackMain } from './components'

  export default {
    name:'layout',
    components:{
      Navbar,
      Sidebar,
      BackMain,
    },
    mizins:[],
    data(){
      return {

      }
    },
    computed:{
      sidebar() {
        return this.$store.state.app.sidebar
      },
      device() {
        return this.$store.state.app.device
      },
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    methods:{
      handleClickOutside(){
      }
    }
  }
</script>
<style lang="scss">
</style>
<style scoped lang="scss">

  .el-container{
    height: 100%;
  }

  .el-aside{
    background: #b3c0d1;
  }
  .body-main{
    margin:0 40px 0 240px;
  }

</style>


