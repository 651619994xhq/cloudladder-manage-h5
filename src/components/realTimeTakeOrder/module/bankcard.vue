<template>
  <div class="col flex-item flex-justify-start full-width">
    <div class="row flex-item flex-justify full-width">
      银行卡验证
    </div>
    <el-divider></el-divider>
    <div class="row flex-item flex-justify-start full-width bottom">
      <div class="title1">姓名：</div>
      <div class="title2">{{userName}}</div>
      <el-button type="primary">复制</el-button>
    </div>
    <div class="row flex-item flex-justify-start full-width bottom">
      <div class="title1">身份证号：</div>
      <div class="title2">{{idCardNo}}</div>
      <el-button type="primary">复制</el-button>
    </div>
    <div class="row flex-item flex-justify-start full-width bottom">
      <div class="title1">银行卡号：</div>
      <div class="title2">{{bankcardNo}}</div>
      <el-button type="primary">复制</el-button>
    </div>
    <div class="row flex-item flex-justify-start full-width bottom">
      <div class="title1">开户银行：</div>
      <div class="title2">{{bankName}}</div>
      <el-button type="primary">复制</el-button>
    </div>
    <div class="row flex-item flex-justify-start full-width bottom">
      <div class="title1">预留手机号：</div>
      <div class="title2">{{mobile}}</div>
      <el-button type="primary">复制</el-button>
    </div>
  </div>
</template>

<script>
    import {getBankInfo} from "@/common/service";

    export default {
        name: "bankcard",
        props:{
            orderNo:{
                type:String,
                default:''
            }
        },
        data(){
            return {
              userName:'',
              bankName:'',
              idCardNo:'',
              bankcardNo:'',
              mobile:''
            }
        },
        methods:{
            async $getBankInfo(){
                let [err,data]=await getBankInfo({orderNo:this.orderNo});
                if(err!==null){this.$message({type:'error',message:err});return ;};
                this.userName=data.userName;
                this.bankName=data.bankName;
                this.idCardNo=data.idCardNo;
                this.bankcardNo=data.bankcardNo;
                this.mobile=data.mobile;
            },
            init(){
              this.$getBankInfo();
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
  .bottom{
    margin-bottom: 10px;
  }

</style>
