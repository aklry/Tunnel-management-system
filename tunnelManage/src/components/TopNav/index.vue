<template>
    <nav class="nav">
        <div class="toggle-menu">
            <div class="toggle-menu-toggle">
                <el-icon v-if="menuStore.isCollapse" class="icon" @click="openMenu(false)">
                    <Expand />
                </el-icon>
                <el-icon v-else class="icon" @click="closeMenu(true)">
                    <Fold />
                </el-icon>
            </div>
        </div>
        <div class="toggle-menu-breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{ $t('message.navs') }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ menuStore.breadcrumb }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="lang">
            <el-dropdown>
                <span class="el-dropdown-link">
                    语言切换
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="changeLang('zh')">中文</el-dropdown-item>
                        <el-dropdown-item @click="changeLang('en')">英文</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="user">
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ loginStore.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <router-link to="/userCenter">个人中心</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item @click="logoutHandler">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </nav>
</template>
<script setup>
import { useLoginStore } from '@/stores/loginStore.js'
import { useMenuStore } from '@/stores/menuStore.js'
import { useRouter } from 'vue-router'
const loginStore = useLoginStore()
const menuStore = useMenuStore()
const router = useRouter()
//退出登录按钮
const logoutHandler = () => {
    //存储信息清空，回到登录页
    loginStore.token = ''
    loginStore.permission = ''
    loginStore.username = ''
    router.push({ name:'Login' })
}
//关闭左侧导航栏
const closeMenu = (flag) => {
    menuStore.isCollapse = flag
}
//打开左侧导航栏
const openMenu = (flag) => {
    menuStore.isCollapse = flag
}
/**
 * 切换语言
 */
const changeLang = (lang) => {
    localStorage.setItem('lang', lang)
    //语言切换刷新UI
    location.reload()
}
</script>
<style scoped>
.nav {
    width: 100%;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 /12%), 0 0 3px 0 rgb(0 0 0 /4%);
}

.toggle-menu {
    padding-top: 17.5px;
}
.icon {
    font-size: 25px;
}
.toggle-menu-toggle {
    float: left;
}

.toggle-menu-breadcrumb {
    float: left;
    line-height: 60px;
    margin-top: 6px;
    margin-left: 20px;
}

.user {
    font-size: 15px;
    position: absolute;
    right: 20px;
    top: 20px;
}

.lang {
    float: right;
    margin-right: 120px;
    margin-top: 2px;
}
</style>