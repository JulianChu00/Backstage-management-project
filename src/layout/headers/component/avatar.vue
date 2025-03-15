<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="40" :src="circleUrl" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const logout = () => {
  store.dispatch('app/logout')
}
const state = ref({
  circleUrl:
    'https://lh3.googleusercontent.com/a/ACg8ocJLl8jXfSxbNf-9wtAztEF26NBVzK-T1TVaT9rIBmIJf7f6Z1A=s96-c'
})

const { circleUrl } = state.value
</script>

<style></style>
