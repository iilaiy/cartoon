<script setup>
import VanOverlay from '@/components/VanOverlay.vue'
window.onload = function () {
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  var lastTouchEnd = 0
  document.addEventListener(
    'touchend',
    function (event) {
      var now = new Date().getTime()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    },
    false
  )
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault()
  })
}
</script>

<template>
  <template v-if="!$route.meta.overlayHide">
    <VanOverlay></VanOverlay>
  </template>
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
