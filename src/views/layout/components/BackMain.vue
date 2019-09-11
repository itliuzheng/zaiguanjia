<template>
  <div class="back-main">
    <breadcrumb class="breadcrumb-container"/>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"/>
      <!--<keep-alive>-->
      <!--</keep-alive>-->
    </transition>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  export default {

    components:{
      Breadcrumb,
    },
    name: 'BackMain',
    computed: {
      key() {
        return this.$route.fullPath
      }
    }
  }
</script>

<style scoped>
.back-main {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  margin: 0;
  background: #ffffff;
}
</style>

