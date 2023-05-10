<template>
    <div class="add-user">
        <span>用户状态:</span>
        <el-input @keyup.enter="searchUser" class="input" v-model="searchInfo" size="large" placeholder="请输入用户信息" />
        <el-button type="primary" size="large" class="button" plain @click="searchUser">搜索</el-button>
        <el-button type="primary" size="large" class="button" plain @click="addHandler">添加</el-button>
    </div>
    <el-table :data="userList.list" style="width:100%">
        <el-table-column label="id" prop="id" width="180" />
        <el-table-column label="用户名" prop="username" width="200" />
        <el-table-column label="权限" width="150">
            <template #default="scope">
                <div>{{ scope.row.permission === 'admin' ? '管理员' : '普通用户' }}</div>
            </template>
        </el-table-column>
        <el-table-column label="电话号码" prop="phone" width="150" />
        <el-table-column label="操作" width="200">
            <template #default="scope">
                <el-button size="small" type="primary" @click="editPermission(scope.$index, scope.row)">编辑权限</el-button>
                <el-button size="small" type="danger" @click="deleteUserHandler(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 添加对话框 -->
    <el-dialog v-model="dialogAddVisible" title="添加用户" width="35%" center destroy-on-close>
        <el-form :model="userInfo" status-icon label-width="120px">
            <el-form-item label="用户名" prop="username">
                <el-input placeholder="请输入用户名" v-model="userInfo.username" type="text" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input show-password placeholder="请输入密码" v-model="userInfo.password" type="text" />
            </el-form-item>
            <el-form-item label="权限" prop="permission">
                <el-radio-group v-model="userInfo.permission">
                    <el-radio label="普通用户" @click="permissionHandler('vip')" size="large" />
                    <el-radio label="管理员" @click="permissionHandler('admin')" size="large" />
                </el-radio-group>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
                <el-input placeholder="请输入电话号码" v-model="userInfo.phone" type="text" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogAddVisible = false">取消</el-button>
            <el-button type="primary" @click="sureAddUserHandler">确认</el-button>
        </template>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog v-model="dialogEditVisible" title="修改用户" width="35%" center destroy-on-close>
        <el-form :model="userUpdateInfo" status-icon label-width="120px">
            <el-form-item label="用户名" prop="username">
                <h3>{{ userUpdateInfo.username }}</h3>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input show-password placeholder="请输入密码" v-model="userUpdateInfo.password" type="text" />
            </el-form-item>
            <el-form-item label="权限" prop="permission">
                <el-radio-group v-model="userUpdateInfo.permission">
                    <el-radio label="普通用户" @click="permissionEditHandler('vip')" size="large" />
                    <el-radio label="管理员" @click="permissionEditHandler('admin')" size="large" />
                </el-radio-group>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
                <el-input placeholder="请输入电话号码" v-model="userUpdateInfo.phone" type="text" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogEditVisible = false">取消</el-button>
            <el-button type="primary" @click="sureEditUserHandler">确认</el-button>
        </template>
    </el-dialog>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import api from '../../api/index.js';
const userList = reactive({
    list: []
})
const searchInfo = ref('')
//添加对话框控制器
const dialogAddVisible = ref(false)
//修改对话框控制器
const dialogEditVisible = ref(false)
const userInfo = reactive({
    username: '',
    password: '',
    permission: '',
    phone: ''
})
//存储ID
const editorID = ref(0)
const userUpdateInfo = reactive({
    username: '',
    password: '',
    permission: '',
    phone: ''
})
const http = () => {
    api.getUserList()
        .then(res => {
            if (res.data.status === 200) {
                userList.list = res.data.result
            } else {
                userList.list = []
            }
        }).catch(error => console.log(error))
}
onMounted(() => {
    http()
})
/**
 * 编辑权限
 */
const editPermission = (index, row) => {
    dialogEditVisible.value = true
    editorID.value = row.id
    api.getUserPreview({
        id: row.id
    }).then(res => {
        if (res.data.status === 200) {
            const result = res.data.result[0]
            Object.keys(result).filter(value => {
                userUpdateInfo[value] = result[value]
            })
        }
    }).catch(error => console.log(error))
}
/**
 * 删除用户
 */
const deleteUserHandler = (index, row) => {
    ElMessageBox.confirm(
        '确认要删除该条数据吗?',
        'Warning',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            api.getDeleteUser({
                id: row.id
            }).then(res => {
                if (res.data.status === 200) {
                    ElMessage({
                        type: 'success',
                        message: res.data.msg
                    })
                    http()
                } else {
                    ElMessage({
                        type: 'error',
                        message: res.data.msg
                    })
                }
            }).catch(error => console.log(error))
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}
/**
 * 查找用户
 */
const searchUser = () => {
    api.getUserSearch({
        searchContent: searchInfo.value
    }).then(res => {
        if (res.data.status === 200) {
            userList.list = res.data.result
        } else {
            userList.list = []
        }
    }).catch(error => console.log(error))
}
/**
 * 确认添加用户事件
 */
const sureAddUserHandler = () => {
    api.getAddUser({
        username: userInfo.username,
        password: userInfo.password,
        permission: userInfo.permission,
        phone: userInfo.phone,
    }).then(res => {
        if (res.data.status === 200) {
            http()
            dialogAddVisible.value = false
        } else {
            ElMessage.error(res.data.msg)
        }
    }).catch(error => console.log(error))
}
/**
 * 确认修改用户事件
 */
const sureEditUserHandler = () => {
    userUpdateInfo.permission === '管理员' ? userUpdateInfo.permission = 'admin' : userUpdateInfo.permission = 'vip'
    api.getUserUpdate({
        id: editorID.value,
        password: userUpdateInfo.password,
        permission: userUpdateInfo.permission,
        phone: userUpdateInfo.phone,
    }).then(res => {
        if (res.data.status === 200) {
            http()
            dialogEditVisible.value = false
        } else {
            ElMessage.error(res.data.msg)
        }
    }).catch(error => console.log(error))
}
const addHandler = () => {
    dialogAddVisible.value = true
}
/**
 * 用户权限选择
 */
const permissionHandler = (permission) => {
    userInfo.permission = permission
}
/**
 * 用户权限修改
 */
const permissionEditHandler = (permission) => {
   userUpdateInfo.permission = permission
}
</script>
<style scoped>
.add-user {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
}

.add-user span {
    font-weight: 700;
}

.add-user .input {
    width: 300px;
}
</style>