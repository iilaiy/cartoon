<script setup></script>

<template>
  <van-overlay :show="$store.vshow" z-index="999">
    <van-loading
      style="
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
      "
      size="30px"
      vertical
      color="#000000"
    >
      加载中...
    </van-loading>
  </van-overlay>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component
        :is="Component"
        :key="$route.name"
        v-if="$route.meta.keepAlive"
      />
    </keep-alive>
    <component
      :is="Component"
      :key="$route.name"
      v-if="!$route.meta.keepAlive"
    />
  </router-view>
</template>

<style scoped></style>
