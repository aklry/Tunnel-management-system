<template>
    <div class="setting">
        <!-- 控制抽屉按钮 -->
        <el-button size="large" type="primary" @click="drawer = true">
            <el-icon class="setting-icon"><Setting /></el-icon>
        </el-button>
        <el-drawer v-model="drawer" title="系统设置" size="20%">
            <span class="logo-show">logo显示与隐藏</span>
            <el-switch v-model="systemStore.toggleStore"></el-switch>
        </el-drawer>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useSystemStore } from '@/stores/SystemStore.js';
const drawer = ref(false)
const systemStore = useSystemStore()
</script>
<style scoped>
.setting {
    position: fixed;
    right: 0;
    top: 300px;
    z-index: 100;
}
.setting-icon {
    font-size: 25px;
}
.logo-show {
    margin-right: 20px;
}
</style>