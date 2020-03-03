<template>
  <el-dialog :visible.sync="isShow" :close-on-click-modal="false" :before-close="handleBeforeCloseEvent" width="80%">
    <div class="row flex-item flex-justify-start">
      <div class="carousel-container">
        <el-carousel arrow="always" :autoplay="false" :loop="false" indicator-position="none" height="500px">
          <el-carousel-item v-for="(item,index) in data" :key="index">
            <SmsLogin v-if="ComponentCode.SMS_LOGIN==item.componentCode" :order-no="orderNo"></SmsLogin>
            <Bankcard v-if="ComponentCode.BANKCARD==item.componentCode" :order-no="orderNo"></Bankcard>
            <IdCard v-if="ComponentCode.ID_CARD==item.componentCode" :order-no="orderNo"></IdCard>
            <SmsVerify v-if="ComponentCode.sms_verify==item.componentCode" :order-no="orderNo"></SmsVerify>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="flex-grow control-btn col flex-item flex-justify-start">
        <div class="row flex-item flex-justify">全局操作</div>
        <el-divider></el-divider>
        <div class="row flex-item flex-justify">
          <el-button type="primary">失效重新登录</el-button>
          <el-button type="primary">结束推荐</el-button>
          <el-button type="primary">标记提交完成</el-button>
        </div>
        <el-divider></el-divider>
        <div class="row flex-item flex-justify">
          <div :style="{marginRight:'20px'}">审核结果</div>
          <div>完成代客下单后请按真实情况进行录入</div>
        </div>
        <div class="row flex-item flex-justify" :style="{marginTop:'20px'}">
          <el-input v-model="money" placeholder="请输入授信金额" :style="{width:'120px'}"></el-input>
          <el-button type="primary">标记为成功</el-button>
          <el-button type="primary">标记为失败</el-button>

        </div>

      </div>
    </div>


  </el-dialog>
</template>
<script>
    import SmsLogin from './module/smsLogin'
    import IdCard from "./module/idcard";
    import SmsVerify from "./module/smsVerify";
    import Bankcard from "./module/bankcard";
    import {ComponentCode} from 'utils/enum'

    export default {
        name: "takeOrderCarousel",
        props: {
            data: {
                type: Array,
                default: []
            },
            isShow: {
                type: Boolean,
                default: false
            },
            orderNo:{
                type:String,
                default:'',
            }
        },
        data() {
            return {
                ComponentCode,
                money: ''
            }
        },
        components: {
            SmsLogin,
            Bankcard,
            IdCard,
            SmsVerify

        },
        methods:{
            handleBeforeCloseEvent(e){
                this.$emit('onClose')
            }
        }
    }
</script>

<style scoped lang="scss">
  .carousel-container {
    width: 60%;
    height: 500px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .control-btn {
    height: 500px;
  }
</style>
