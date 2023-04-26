<template>
  <div class="empty">
    <img class="icon" src="@/assets/images/icon/empty_img.ac73835.png" alt="" />
    <img class="text" :src="emptyUrl" alt="" />
  </div>
</template>

<script>
export default {
  props: ['emptyUrl'],
}
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 8rem;
  .icon {
    width: 3rem;
  }
  .text {
    width: 4rem;
  }
}
</style>
