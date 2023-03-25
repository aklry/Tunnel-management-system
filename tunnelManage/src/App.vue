<template>
  <RouterView />
</template>
<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
/* 公共样式 */
body,html,#app {
  height: 100%;
}
/* 去掉element menu的默认右边框 */
.el-menu {
    border-right: 0 !important;
}
</style>

