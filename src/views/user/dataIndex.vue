<template>
  <div class="main">
    <div class="user-box">
      <router-view :key="key"/>
    </div>
  </div>
</template>
<script>
  import ajax from '@/utils/ajax'

  export default {
    data(){
      return {
      }
    },
    computed: {
      key() {
        return this.$route.fullPath
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
  .user-box{
    width: 770px;
    margin: 0 auto;
  }
</style>
