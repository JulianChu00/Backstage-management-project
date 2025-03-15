<template>
  <div id="screenFull" @click="handleFullScreen">
    <i
      :class="
        icon ? 'iconfont icon-exit-fullscreen' : 'iconfont icon-fullscreen'
      "
    ></i>
  </div>
</template>

<script setup>
import screenfull from 'screenfull'
import { ref, onMounted, onBeforeMount } from 'vue'
//此处screenfull.isFullscreen是外部变量,从js库中引入,使用ref不能正常监听到变化,所以需要在onMounted中强制更新icon的值
const icon = ref(screenfull.isFullscreen)
const handleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}
onMounted(() => {
  //screenfull自带的change事件,监听全屏状态的变化
  screenfull.on('change', () => {
    //强制更新icon的值,更新了之后icon是响应式,重新渲染界面
    icon.value = screenfull.isFullscreen
  })
})
onBeforeMount(() => {
  screenfull.off('change')
})
</script>

<style></style>
