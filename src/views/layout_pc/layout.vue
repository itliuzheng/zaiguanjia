<template>
  <div>
    <sidebar></sidebar>
    <back-main></back-main>
    <to-footer></to-footer>
  </div>
</template>
<script>
  import { BackMain,ToFooter,Sidebar } from './components'

  export default {
    name:'layout',
    components:{
      Sidebar,
      BackMain,
      ToFooter,
    },
    mizins:[],
    computed:{
    },
    methods:{
    }
  }
</script>
<style lang="scss">
  /*.header{*/
  /*  position: absolute;*/
  /*  top: 0;*/
  /*  left: 0;*/
  /*  z-index: 999;*/
  /*}*/
</style>
<style scoped lang="scss">

</style>


