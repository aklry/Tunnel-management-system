<template>
    <nav class="nav">
        <div class="toggle-menu">
            <div class="toggle-menu-toggle">
                <el-icon class="icon">
                    <Expand />
                </el-icon>
            </div>
        </div>
        <div class="toggle-menu-breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>当前</el-breadcrumb-item>
                <el-breadcrumb-item>首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="user">
            <el-dropdown>
                <span class="el-dropdown-link">
                    admin
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </nav>
</template>
<script setup></script>
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
</style>