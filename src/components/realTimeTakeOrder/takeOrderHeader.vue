<template>
  <!--       这是头部-->
  <el-row :gutter="20">
    <el-col :span="10">
      <div class="grid-content bg-purple row flex-item flex-justify-between">
        <div class="row flex-item flex-justify" :style="{marginLeft:'40px'}">
          <div>今日接单：</div>
          <div>{{dayCount}}</div>
        </div>
        <div class="row flex-item flex-justify">
          <div>累计接单：</div>
          <div>{{totalCount}}</div>
        </div>
        <el-button
          type="primary"
          @click="handleGetNewOrderEvent"
          :style="{marginRight:'40px'}"
        >获取新订单
        </el-button>
      </div>
    </el-col>
    <el-col :span="5">
      <div class="grid-content bg-purple row flex-justify flex-item">
        <div>实时排队中订单：</div>
        <div>{{waitNum}}</div>
      </div>
    </el-col>
    <el-col :span="9">
      <div class="grid-content bg-purple col flex-item flex-justify" :style="{paddingLeft:'20px'}">
        <div class="row flex-item flex-justify-start" :style="{width:'100%'}">
          <div>状态：</div>
          <div>{{onlineState==1?'在线':'离线'}}</div>
        </div>
        <div class="row flex-item flex-justify-start" :style="{width:'100%',marginTop:'5px'}">
          <el-button
            type="primary"
            @click="handleSetOnlineEvent"
          >{{onlineState==1?'下线':'上线'}}
          </el-button>
          <div :style="{marginLeft:'10px'}">最近在线：{{onlineTime}}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {getOrderNum,getWaitNum,getStaffInfo,setOnlineState} from '@/common/service/index';
    export default {
        name: "takeOrderHeader",
        props:{

        },
        data(){
          return {
            dayCount:0,
            totalCount:0,
            waitNum:0,
            onlineState: 0,     //0 离线状态  1 在线状态
            onlineTime:'2020-2-18 20：20：28'
          }
        },
        async created() {
          this.init();
        },
        destroyed() {

        },
        methods:{
             init(){
               this.$getOrderNum();
               this.$getWaitNum();
               this.$getStaffInfo();
            },
            async $getOrderNum(){
              let [err,data]=await getOrderNum();
              if(err!==null){this.$message({type:'error',message:err||'系统错误'});return ;};
              this.dayCount=data.dayCount || '0';
              this.totalCount=data.totalCount || '0';
            },
            async $getWaitNum(){
              let [err,data]=await getWaitNum();
              if(err!==null){this.$message({type:'error',message:err||'系统错误'});return ;};
              this.waitNum=data.waitNum||'0';
            },
            async $getStaffInfo(){
              let [err,data]=await getStaffInfo();
              if(err!==null){this.$message({type:'error',message:err||'系统错误'});return };
              this.onlineState=data.onlineState;

            },
            async handleSetOnlineEvent(){
              if(this.onlineState==0){
                let [err,data]=await setOnlineState({onlineState: 1});
                if(err!==null){this.$message({type:'error',message:err||'系统错误'});return };
                await this.$getStaffInfo();
                return;
              };
              if(this.onlineState==1){
                let [err,data]=await setOnlineState({onlineState: 0});
                if(err!==null){this.$message({type:'error',message:err||'系统错误'});return };
                await this.$getStaffInfo();
                return;
              };

            },
            handleGetNewOrderEvent(){
               if(this.onlineState==0){
                 this.$message({type:'info',message:'请先上线'});
                 return;
               };
                this.$emit('onGetNewOrderEvent')
            }
        }
    }
</script>

<style scoped lang="scss">

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 80px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
