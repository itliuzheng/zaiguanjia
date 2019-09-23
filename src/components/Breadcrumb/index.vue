<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right" v-if="levelList && levelList.length">
    <transition-group name="breadcrumb" >
      <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect" :class="item.meta.title == '融资统计'?'main-title':''">{{ generateTitle(item.meta.title) }}</span>
        <router-link v-else :to="item.redirect||item.path">{{ generateTitle(item.meta.title) }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from '@/utils/generateTitle'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];

      if (first && first.name.trim().toLocaleLowerCase() !== 'home'.toLocaleLowerCase()) {
        matched = [{ path: '/', meta: { title: '首页' }}].concat(matched)
      }else{
        matched = [{ path: '/', meta: { title: '合作商列表' }}]
        // matched = []
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb{
    margin: 0 20px 20px;
    border-bottom: 1px solid #dddddd;
  }
  .app-breadcrumb.el-breadcrumb {
    font-size: 16px;
    line-height:50px;
    font-weight: 700;
    color: #333333;
    .no-redirect {
      color: #999;
      cursor: text;
    }
    .main-title{
      color: #333;
      font-weight: 700;
    }
  }
</style>
