<template>
    <!-- 搜索与添加 -->
    <div class="search">
        <span>项目状态: </span>
        <el-input class="input" @keyup.enter="searchHandler" v-model="searchInfo" placeholder="请输入搜索内容" size="large" />
        <el-button class="button" @click="searchHandler" size="large" type="primary" plain>搜索</el-button>
        <el-button @click="addHandler" class="button" size="large" type="primary" plain>添加</el-button>
    </div>
    <!-- 表格展示数据 -->
    <el-table :header-cell-style="headerClass" :data="projectInfo.list" style="width: 100%;">
        <el-table-column prop="name" label="项目名称" width="180" />
        <el-table-column prop="number" label="项目编码" width="120" />
        <el-table-column prop="money" label="项目金额" width="120" />
        <el-table-column prop="address" label="项目地址" width="150" />
        <el-table-column prop="duration" label="项目工期(月)" width="120" />
        <el-table-column prop="startTime" :formatter="value => dateFormatter(Number(value.startTime))" label="开工时间"
            width="150" />
        <el-table-column prop="endTime" :formatter="value => dateFormatter(Number(value.endTime))" label="终止时间"
            width="150" />
        <el-table-column prop="quantity" label="隧道质量" width="120" />
        <el-table-column prop="status" label="项目状态" width="120">
            <template #default="scope">
                <el-tag :type="scope.row.status === '1' ? '' : 'success'">{{ statusHandle(scope.row.status) }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="remark" show-overflow-tooltip label="备注">
            <template #default="scope">
                <div v-html="scope.row.remark"></div>
            </template>
        </el-table-column>
        <el-table-column width="135" label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 表格展示数据end -->
    <!-- 分页 -->
    <div class="page">
        <el-pagination @current-change="currentChangeHandler" layout="prev, pager, next" :total="total"
            :default-page-size="defaultPageSize" />
    </div>
    <!-- 添加对话框 -->
    <el-dialog center v-model="dialogAddVisible" title="添加隧道信息" width="35%">
        <el-form :model="addFormInfo" :inline="true">
            <el-form-item label="项目名称">
                <el-input v-model="addFormInfo.name" placeholder="请输入项目名称" />
            </el-form-item>
            <el-form-item label="项目编码">
                <el-input v-model="addFormInfo.number" placeholder="请输入项目编码" />
            </el-form-item>
            <el-form-item label="项目金额">
                <el-input v-model="addFormInfo.money" placeholder="请输入项目金额" />
            </el-form-item>
            <el-form-item label="项目地址">
                <el-input v-model="addFormInfo.address" placeholder="请输入项目地址" />
            </el-form-item>
            <el-form-item label="项目工期">
                <el-input v-model="addFormInfo.duration" placeholder="请输入项目工期" />
            </el-form-item>
            <el-form-item label="开工时间">
                <!-- <el-input v-model="addFormInfo.startTime" placeholder="请输入开工时间" /> -->
                <el-date-picker value-format="x" type="date" v-model="addFormInfo.startTime" placeholder="请输入开工时间" />
            </el-form-item>
            <el-form-item label="终止时间">
                <!-- <el-input v-model="addFormInfo.endTime" placeholder="请输入终止时间" /> -->
                <el-date-picker value-format="x" type="date" v-model="addFormInfo.endTime" placeholder="请输入终止时间" />
            </el-form-item>
            <el-form-item label="隧道数量">
                <el-input v-model="addFormInfo.quantity" placeholder="请输入隧道数量" />
            </el-form-item>
            <el-form-item label="项目状态">
                <el-input v-model="addFormInfo.status" placeholder="'1' 施工中  -  '0' 已完工" />
            </el-form-item>
            <el-form-item label="项目备注">
                <!-- <el-input v-model="addFormInfo.remark" placeholder="请输入备注" /> -->
                <!-- 富文本编辑器 -->
                <TinymceEditor :options="options" @onDataEvent="getInfoEditorHandler" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取消</el-button>
                <el-button type="primary" @click="sureHandler">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import api from '@/api/index.js';
import { dateFormatter } from '@/utils/utils.js'
import { onMounted, reactive, ref } from 'vue';
import TinymceEditor from '@/components/TinymceEditor/index.vue'
const projectInfo = reactive({
    list: []
})
const total = ref(0)
const defaultPageSize = ref(15)
//添加对话框控制器
const dialogAddVisible = ref(false)
//初始化添加对话框状态
const addFormInfo = reactive({
    name: '',
    number: '',
    money: '',
    address: '',
    duration: '',
    startTime: '',
    endTime: '',
    quantity: '',
    status: '',
    remark: ''
})
//初始获取页面数据
onMounted(() => {
    http(1)
})
//初始获取数据总数
onMounted(() => {
    api.getTotal().then(res => {
        if (res.data.status === 200) {
            total.value = res.data.result[0]['count(*)']
        } else {
            total.value = 0
        }
    }).catch(error => console.log(error))
})
//搜索初始化状态
const searchInfo = ref('')
const http = (page) => {
    api.getProject({ page }).then(res => {
        if (res.data.status === 200) {
            projectInfo.list = res.data.result
        }
    }).catch(error => console.log(error))
}
/**
 * 隧道状态文本
 * @param {状态} status 
 */
const statusHandle = (status) => {
    return status === '1' ? '施工中' : '已完结'
}
/**
 * 设置表格头部样式
 */
const headerClass = () => {
    return {
        backgroundColor: '#dcdcdc',
        color: '#999',
        fontWeight: 700
    }
}
/**
 * 富文本编辑器获取数据事件
 */
const getInfoEditorHandler = (data) => {
    addFormInfo.remark = data
}

const options = {
    width: '500px',
    height: '200px'
}

/**
 * 编辑
 */
const handleEdit = (index, row) => {
    console.log(index, row)
}
/**
 * 删除
 */
const handleDelete = (index, row) => {
    ElMessageBox.confirm(
        '确定要删除当前数据吗',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            api.getDeleteProject({
                id: row.id
            }).then(res => {
                if (res.data.status === 200) {
                    ElMessage({
                        type: 'success',
                        message: res.data.msg,
                    })
                    http(1)
                } else {
                    ElMessage({
                        type: 'error',
                        message: res.data.msg,
                    })
                }
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

/**
 * 搜索
 */
const searchHandler = () => {
    api.getSearch({
        search: searchInfo.value
    }).then(res => {
        if (res.data.status === 200) {
            projectInfo.list = res.data.result
        } else {
            projectInfo.list = []
        }
    }).catch(error => console.log(error))
}
/**
 * 分页事件
 */
const currentChangeHandler = (val) => {
    http(val)
}
/**
 * 呈现对话框
 */
const addHandler = () => {
    dialogAddVisible.value = true
}
/**
 * 添加隧道信息事件
 */
const sureHandler = () => {
    api.getAddProject({
        name: addFormInfo.name,
        number: addFormInfo.number,
        money: addFormInfo.money,
        address: addFormInfo.address,
        duration: addFormInfo.duration,
        startTime: addFormInfo.startTime,
        endTime: addFormInfo.endTime,
        quantity: addFormInfo.quantity,
        status: addFormInfo.status,
        remark: addFormInfo.remark
    }).then(res => {
        if (res.data.status === 200) {
            dialogAddVisible.value = false
            //刷新页面
            http(1)
            ELMessage.success(res.data.msg)
        } else {
            ELMessage.error(res.data.msg)
        }
    }).catch(error => console.log(error))
}
</script>
<style scoped>
.search {
    margin-top: 10px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    background-color: #fff;
}

.search span {
    font-weight: 700;
}

.search .input {
    width: 300px;
}

.page {
    position: fixed;
    right: 10px;
    bottom: 100px;
}
</style>