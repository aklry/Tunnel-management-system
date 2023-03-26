<template>
    <div class="slider-nav" :style="{ width:menuStore.isCollapse ? '64px' : '210px' }">
        <div class="logo">{{ menuStore.isCollapse ? '隧道' : '隧道工程项目' }}</div>
        <el-menu
            background-color="#304156"
            text-color="#fff"
            active-text-color="#ffd04b"
            :default-active="active"
            :collapse="menuStore.isCollapse"
            router
            class="el-menu-vertical-demo"
        >
            <el-menu-item index="/">
                <el-icon><House /></el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/project">
                <el-icon><Connection /></el-icon>
                <span>项目基础信息</span>
            </el-menu-item>
            <el-menu-item index="/tunnel">
                <el-icon><MessageBox /></el-icon>
                <span>隧道设计信息</span>
            </el-menu-item>
            <el-menu-item index="/work">
                <el-icon><ChatSquare /></el-icon>
                <span>工作监督管理</span>
            </el-menu-item>
            <el-menu-item index="/build">
                <el-icon><Discount /></el-icon>
                <span>施工监控检测</span>
            </el-menu-item>
            <el-menu-item index="/geological">
                <el-icon><Pointer /></el-icon>
                <span>超前地质预报</span>
            </el-menu-item>
            <el-menu-item index="/system">
                <el-icon><Setting /></el-icon>
                <span>系统信息管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useMenuStore } from '@/stores/menuStore.js'
const active = ref('/')
const menuStore = useMenuStore()
/**
 * 修复刷新页面的高亮设置
 */
if (localStorage.getItem('active')) {
    active.value = localStorage.getItem('active')
}
</script>
<style scoped>
.slider-nav {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 210px;
    background-color: #304156;
    transition: .3s ease-in;
}

.logo {
    width: 100%;
    height: 60px;
    background-color: #364e6d;
    text-align: center;
    font-size: 25px;
    color: #fff;
    line-height: 60px;
}
</style>