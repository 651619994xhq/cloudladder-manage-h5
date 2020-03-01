<template>
  <!--       这是头部-->
  <el-row :gutter="20">
    <el-col :span="10">
      <div class="grid-content bg-purple row flex-item flex-justify-between">
        <div class="row flex-item flex-justify" :style="{marginLeft:'40px'}">
          <div>今日接单：</div>
          <div>2</div>
        </div>
        <div class="row flex-item flex-justify">
          <div>累计接单：</div>
          <div>2</div>
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
        <div>438</div>
      </div>
    </el-col>
    <el-col :span="9">
      <div class="grid-content bg-purple col flex-item flex-justify" :style="{paddingLeft:'20px'}">
        <div class="row flex-item flex-justify-start" :style="{width:'100%'}">
          <div>状态：</div>
          <div>离线</div>
        </div>
        <div class="row flex-item flex-justify-start" :style="{width:'100%',marginTop:'5px'}">
          <el-button
            type="primary"
            @click="handleSetOnlineEvent"
          >上线
          </el-button>
          <div :style="{marginLeft:'10px'}">最近在线：2020-2-18 20：20：28</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "takeOrderHeader",
        props:{

        },
        created() {
        },
        destroyed() {

        },
        methods:{
            handleSetOnlineEvent(){
                this.$emit('onSetOnlineEvent')
            },
            handleGetNewOrderEvent(){
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
