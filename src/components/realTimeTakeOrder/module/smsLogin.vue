<template>
    <div class="col flex-item flex-justify-start full-width">
      <div class="row flex-item flex-justify full-width">
        短信登录模块
      </div>
      <el-divider></el-divider>
      <div class="row flex-item flex-justify-start full-width">
        <div class="title1">手机号：</div>
        <div class="title2">{{mobile}}</div>
        <el-button type="primary">复制</el-button>
      </div>
      <el-divider></el-divider>
      <div class="row flex-item flex-justify-start full-width">
        <div class="title1">验证码：</div>
        <div class="title2">{{code}}</div>
        <el-button type="primary">复制</el-button>
      </div>

    </div>
</template>

<script>
    import {getSmsLogin} from "@/common/service";
    export default {
        name: "smsLogin",
        props:{
          orderNo:{
              type:String,
              default:''
          }
        },
        data(){
          return {
            mobile:'',
            code:'',
          }
        },
        created() {
            this.$getSmsLogin();
        },
        methods:{
          async $getSmsLogin(){
            let [err,data]=await getSmsLogin({orderNo:this.orderNo});

          }

        }
    }
</script>

<style scoped lang="scss">
  .title1{
    width: 100px;
  }
  .title2{
    width: 200px;
  }

</style>
