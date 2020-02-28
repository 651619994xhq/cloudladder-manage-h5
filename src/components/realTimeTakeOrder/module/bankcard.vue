<template>
  <div class="col flex-item flex-justify-start full-width">
    <div class="row flex-item flex-justify full-width">
      银行卡验证
    </div>
    <el-divider></el-divider>
    <div class="row flex-item flex-justify-start full-width bottom">
      <div class="title1">姓名：</div>
      <div class="title2">许剑波</div>
      <el-button type="primary">复制</el-button>
    </div>
    <div class="row flex-item flex-justify-start full-width bottom">
      <div class="title1">身份证号：</div>
      <div class="title2">4113122244322253535</div>
      <el-button type="primary">复制</el-button>
    </div>
    <div class="row flex-item flex-justify-start full-width bottom">
      <div class="title1">银行卡号：</div>
      <div class="title2">4113122244322253535</div>
      <el-button type="primary">复制</el-button>
    </div>
    <div class="row flex-item flex-justify-start full-width bottom">
      <div class="title1">开户银行：</div>
      <div class="title2">中国银行</div>
      <el-button type="primary">复制</el-button>
    </div>
    <div class="row flex-item flex-justify-start full-width bottom">
      <div class="title1">预留手机号：</div>
      <div class="title2">122312312434234</div>
      <el-button type="primary">复制</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "bankcard"
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
