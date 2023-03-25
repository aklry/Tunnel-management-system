<template>
    <div class="slider-nav">
        <div class="logo">隧道工程项目</div>
        <el-menu
            background-color="#304156"
            text-color="#fff"
            active-text-color="#ffd04b"
            :default-active="active"
            router
            class="el-menu-vertical-demo"
        >
            <el-menu-item index="/">
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/project">
                <span>项目基础信息</span>
            </el-menu-item>
            <el-menu-item index="/tunnel">
                <span>隧道设计信息</span>
            </el-menu-item>
            <el-menu-item index="/work">
                <span>工作监督管理</span>
            </el-menu-item>
            <el-menu-item index="/build">
                <span>施工监控检测</span>
            </el-menu-item>
            <el-menu-item index="/geological">
                <span>超前地质预报</span>
            </el-menu-item>
            <el-menu-item index="/system">
                <span>系统信息管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const active = ref('/')
</script>
<style scoped>
.slider-nav {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 210px;
    background-color: #304156;
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