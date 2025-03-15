<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#304156"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    router
    unique-opened
    :collapse="!$store.getters.siderType"
  >
    <el-sub-menu
      v-for="(item, index) in menuList"
      :key="item.id"
      :index="String(item.id)"
    >
      <template #title>
        <el-icon>
          <component :is="iconList[index]"></component>
        </el-icon>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        v-for="it in item.children"
        :key="it.id"
        :index="'/' + it.path"
        @click="savePath(it.path)"
      >
        <template #title>
          <el-icon>
            <component :is="icon"></component>
          </el-icon>
          <span>{{ $t(`menus.${it.path}`) }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting
} from '@element-plus/icons-vue'
import { menuList as menuListApi } from '@/api/menu'
import { ref } from 'vue'
const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const menuList = ref([])
const initMenuList = async () => {
  menuList.value = await menuListApi()
}
initMenuList()
const savePath = (path) => {
  sessionStorage.setItem('path', '/' + path)
}
const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')
</script>

<style lang="scss"></style>
