<template>
  <div class="main">
    <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="菜单管理" name="first">
        <tab-menu v-if="activeName == 'first'"></tab-menu>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="second">
        <role-menu  v-if="activeName == 'second'"></role-menu>
      </el-tab-pane>
      <el-tab-pane label="后台用户管理" name="third">
        <user-menu  v-if="activeName == 'third'"></user-menu>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'
  import { TabMenu ,RoleMenu, UserMenu } from "./component";

  export default {
    components:{
      TabMenu,
      RoleMenu,
      UserMenu
    },
    data(){
      return {
        activeName: 'first'
      }
    },
    methods:{
      handleClick(tab, event) {

      },
    },
  }
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
  .tab{
    padding-left: 20px;
  }
</style>
