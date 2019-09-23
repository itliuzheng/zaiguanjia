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



      return {
        api:'/corporate/financing-company-info/',
        permission_routers:Map,
      }
    },
    beforeMount(){
    },
    methods:{
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
</style>
