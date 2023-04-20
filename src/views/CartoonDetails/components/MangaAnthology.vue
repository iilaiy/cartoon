<template>
  <div class="manga-anthology">
    <div class="anthology-top">
      <div class="title">漫画选集</div>
      <div class="purchase">整本购</div>
    </div>
    <div class="anthology-bot">
      <span>连载中</span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.manga-anthology {
  padding: 0.8rem 0.3rem;
}
.anthology-top {
  display: flex;
  align-items: center;
  .title {
    font-size: 0.45rem;
    margin-right: 0.2rem;
    color: #333333;
  }
  .purchase {
    background-color: #eed220;
    font-size: 0.3rem;
    border-radius: 0.3rem;
    padding: 0.08rem 0.2rem;
  }
}
.anthology-bot {
  display: flex;
  margin: 0.1rem 0;
  span {
    font-size: 0.34rem;
    margin-right: 0.2rem;
    color: #9d9d9d;
    &:after {
      content: '|';
      margin-left: 0.2rem;
    }
  }
  span:last-child {
    &:after {
      display: none;
    }
  }
}
</style>
