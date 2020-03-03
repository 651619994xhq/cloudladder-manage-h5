<template>
  <div class="col flex-item flex-justify-start full-width">
    <div class="row flex-item flex-justify full-width">
      身份证验证
    </div>
    <el-divider></el-divider>

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
                mobile:'',
                code:'',
            }
        },
        created() {
            this.$getIdCard();
        },
        methods:{
            async $getIdCard(){
                let [err,data]=await getIdCard({orderNo:this.orderNo});

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
