<template>
    <div class="login-container">
        <el-form class="user" size="large" :model="user">
            <div class="title-container">
                <h3 class="title">隧道管理系统登录</h3>
            </div>
            <el-form-item prop="username">
                <el-input v-model="user.username" placeholder="请输入用户名" type="text" name="username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="user.password" placeholder="请输入密码" type="password" name="password" show-password></el-input>
            </el-form-item>
            <el-button style="width: 100%; margin-bottom: 30px;" type="primary" @click.native.prevent="handleLogin">登录</el-button>
        </el-form>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
const user = reactive({
    username: '',
    password: ''
})

const handleLogin = () => {

}
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
    background-color: #2d3a4b;
}

.user {
    position: relative;
    width: 400px;
    padding: 160px 35px 0;
    margin: 0 auto;
}

.title-container .title {
    font-size: 30px;
    color: #fff;
    text-align: center;
    margin: 20px;
}
</style>