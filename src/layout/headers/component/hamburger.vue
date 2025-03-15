<template>
  <div id="hamburger" class="hamburger-container" @click="toggleClick">
    <i :class="icon" style="margin-left: 3px"></i>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
// import { computed } from 'vue'
const store = useStore()
const toggleClick = () => {
  store.commit('app/changeSiderType')
}
const icon = computed(() => {
  return store.getters.siderType
    ? 'iconfont icon-hamburger-opened'
    : 'iconfont icon-hamburger-closed'
})
</script>

<style>
.hamburger-container {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
