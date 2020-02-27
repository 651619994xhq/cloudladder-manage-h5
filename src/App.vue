<template>
  <div id="app">
      <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data(){
      return {
        isRouterAlive:true
      }
    },
    provide(){
      return {
        reload:this.reload
      }
    },
    methods:{
      reload(){
        this.isRouterAlive=false;
        this.$nextTick(()=>{
          this.isRouterAlive=true;
        });
      }
    }
  }
</script>
<style lang="scss" scoped="scoped">
  #app{
    width: 100%;
    height: 100%;
  }

</style>
