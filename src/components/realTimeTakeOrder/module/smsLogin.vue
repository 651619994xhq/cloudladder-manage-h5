<template>
    <div class="col flex-item flex-justify-start full-width">
      <div class="row flex-item flex-justify full-width">
        短信登录模块
      </div>
      <el-divider></el-divider>
      <div class="row flex-item flex-justify-start full-width">
        <div class="title1">手机号：</div>
        <div class="title2">18614084016</div>
        <el-button type="primary">复制</el-button>
      </div>
      <el-divider></el-divider>
      <div class="row flex-item flex-justify-start full-width">
        <div class="title1">验证码：</div>
        <div class="title2">4016</div>
        <el-button type="primary">复制</el-button>
      </div>

    </div>
</template>

<script>
    export default {
        name: "smsLogin"
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
