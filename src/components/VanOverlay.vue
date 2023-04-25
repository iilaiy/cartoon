<template>
  <van-overlay class="loading" :show="$store.vshow" z-index="999">
    <van-loading class="loading" size="30px" vertical color="#000000">
      加载中...
    </van-loading>
  </van-overlay>
</template>

<script setup></script>

<style lang="scss" scoped>
.loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
</style>
