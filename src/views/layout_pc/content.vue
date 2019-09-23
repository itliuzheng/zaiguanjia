<template>
  <div>
    <back-main></back-main>
    <to-footer></to-footer>
  </div>
</template>
<script>
  import { BackMain,ToFooter } from './components'

  export default {
    name:'layoutContent',
    components:{
      BackMain,
      ToFooter,
    },
    computed:{
    },
    methods:{
    }
  }
</script>
<style scoped lang="scss">
</style>


