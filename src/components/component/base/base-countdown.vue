<template>
  <p>{{text}}</p>
</template>
<script>
  export default {
    props:{
      count:{
        type:Number,
        default:3
      },
      endtext:{
        type:String,
        default:'跳转'
      },
      url_name:{
        type:String,
        default:''
      }
    },
    data(){
      let number = this.count;
      return {
        mount:number,
        text:null,
      }
    },
    beforeMount(){
      this.countdown();
    },
    methods:{
      countdown(){
        let _this = this;
        let clear = null;
        _this.text = _this.mount + '秒';
        clear = setInterval(function () {
          _this.mount--;
          _this.text = _this.mount + '秒';
          if(_this.mount <= 0){
            clearInterval(clear);
            if(_this.url_name){
              _this.$router.push({name:_this.url_name});
            }else{
              _this.text = _this.endtext;
            }
          }
        },1000)
      }
    }
  }
</script>
