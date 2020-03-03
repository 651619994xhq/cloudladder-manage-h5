<template>
  <el-dialog :visible.sync="isShow" :close-on-click-modal="false" :before-close="handleBeforeCloseEvent" width="80%">
    <div class="row flex-item flex-justify-start">
      <div class="carousel-container">
        <el-carousel arrow="always" :autoplay="false" :loop="false" indicator-position="none" height="500px" v-on:change="handleChangeEvent" ref="carouselItem">
          <el-carousel-item v-for="(item,index) in data" :key="index">
            <SmsLogin v-if="ComponentCode.SMS_LOGIN==item.componentCode" :order-no="orderNo"  :ref="ComponentCode.SMS_LOGIN"></SmsLogin>
            <Bankcard v-if="ComponentCode.BANKCARD==item.componentCode" :order-no="orderNo" :ref="ComponentCode.BANKCARD"></Bankcard>
            <IdCard v-if="ComponentCode.ID_CARD==item.componentCode" :order-no="orderNo"  :ref="ComponentCode.ID_CARD"></IdCard>
            <SmsVerify v-if="ComponentCode.SMS_VERIFY==item.componentCode" :order-no="orderNo" :ref="ComponentCode.SMS_VERIFY"></SmsVerify>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="flex-grow control-btn col flex-item flex-justify-start">
        <div class="row flex-item flex-justify">全局操作</div>
        <el-divider></el-divider>
        <div class="row flex-item flex-justify">
          <el-button type="primary" @click="handleSetOrderStateEvent(6)">结束推荐</el-button>
          <el-button type="primary" @click="handleSetOrderStateEvent(2)">标记提交完成</el-button>
        </div>
        <el-divider></el-divider>
        <div class="row flex-item flex-justify">
          <div :style="{marginRight:'20px'}">审核结果</div>
          <div>完成代客下单后请按真实情况进行录入</div>
        </div>
        <div class="row flex-item flex-justify" :style="{marginTop:'20px'}">
          <el-input type="number" v-model="quota" placeholder="请输入授信金额" :style="{width:'120px'}"></el-input>
          <el-button type="primary" @click="handleSetOrderStateEvent(3)">标记为成功</el-button>
          <el-button type="primary" @click="handleSetOrderStateEvent(4)">标记为失败</el-button>

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
    import {setOrderState} from "@/common/service";

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
                quota: ''
            }
        },
        components: {
            SmsLogin,
            Bankcard,
            IdCard,
            SmsVerify

        },
        methods:{
          //TODO 还需完善 把后端数据 根据 当期现有的code 重构一套数据出来
          //设置init 事件
           handleInitEvent(){
               this.$nextTick(()=>{
                 this.$refs['carouselItem'].setActiveItem(0);
                 if(this.data[0]){
                   if(ComponentCode.isThisType(this.data[0].componentCode)){
                     this.$nextTick(()=>{
                       this.$refs[this.data[0].componentCode][0].init();
                     })
                   }
                 };
               })
           },
            handleChangeEvent(index){
               this.$nextTick(()=>{
                 if(this.data[index]){
                   if(ComponentCode.isThisType(this.data[index].componentCode)){
                       this.$nextTick(()=>{
                         this.$refs[this.data[index].componentCode][0].init();
                       })
                   }
                 };

               });
            },
            handleBeforeCloseEvent(e){
                this.$emit('onClose')
            },
            async handleSetOrderStateEvent(state){
                if(state==3){
                    if(!this.quota){
                       this.$message({type:'error',message:'请填授信额度'})
                        return ;
                    };
                    let [err,data]=await setOrderState({orderState:state,quota:this.quota,orderNo: this.orderNo});
                    if(err!==null){
                        this.$message({type:'error',message:err||'系统错误'});
                        return ;
                    }
                    this.$message({type:'success',message:'操作成功'});
                    return ;
                };

                let [err,data]=await setOrderState({orderState:state,orderNo: this.orderNo});
                if(err!==null){
                    this.$message({type:'error',message:err||'系统错误'});
                    return ;
                };
                this.$message({type:'success',message:'操作成功'})
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
