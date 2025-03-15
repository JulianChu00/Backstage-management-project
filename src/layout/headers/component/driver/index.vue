<template>
  <div id="guide" @click.prevent.stop="handleGuide">
    <i class="iconfont icon-driver"></i>
  </div>
</template>

<script setup>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { ref, onMounted } from 'vue'
import { steps } from './steps'
import i18n from '@/i18n'
import { watchLang } from '@/i18n/watching'
const t = i18n.global.t
const driverObj = ref(null)
onMounted(() => {
  initDriver()
})
const initDriver = () => {
  driverObj.value = driver({
    animate: false,
    opacity: 0.75,
    padding: 10,
    allowClose: true,
    overlayClickNext: false,
    //t在此时是个函数调用,所以ref监测不到,ref只能监测对象,数组等变量
    doneBtnText: t('driver.doneBtnText'),
    closeBtnText: t('driver.closeBtnText'),
    nextBtnText: t('driver.nextBtnText'),
    prevBtnText: t('driver.prevBtnText'),
    stageBackground: '#ffffff',
    steps: steps(t)
  })
}
watchLang(() => {
  initDriver()
})
const handleGuide = () => {
  driverObj.value.drive()
}
</script>

<style></style>
