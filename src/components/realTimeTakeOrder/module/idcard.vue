<template>
  <div class="col flex-item flex-justify-start full-width">
    <div class="row flex-item flex-justify full-width">
      身份证验证
    </div>
    <el-divider></el-divider>
    <div class="row flex-item flex-justify">
      <div class="front-img commmon-img">
        <img :src="frontUrl" alt="">
      </div>
      <div class="back-img commmon-img" :style="{marginLeft:'20px'}">
        <img :src="backUrl" alt="">
      </div>

    </div>

  </div>
</template>

<script>
    import {getIdCard} from "@/common/service";
    export default {
        name: "idcard",
        props:{
            orderNo:{
                type:String,
                default:''
            }
        },
        data(){
            return {
              frontUrl:'',
              backUrl:'',
            }
        },
        methods:{
            async $getIdCard(){
                let [err,data]=await getIdCard({orderNo:this.orderNo});
                if(err!==null){this.$message({type:'error',message:err});return ;};
                this.frontUrl=data.frontUrl;
                this.backUrl=data.backUrl;
            },
            init(){
              this.$getIdCard();
            }

        }
    }
</script>

<style scoped lang="scss">
  .commmon-img{
    width: 200px;
    height: 160px;
    background: #666666;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
  }

</style>
