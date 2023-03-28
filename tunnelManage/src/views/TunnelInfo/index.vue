<template>
    <div class="tunnel-container">
        <div class="tunnel-list">
            <h3>选择断面</h3>
            <el-tree lazy :load="loadNode" :props="defaultProps" @node-click="handleNodeClick" />
        </div>
        <div class="tunnel-content">
            <el-table :data="content.data" style="100%">
                <el-table-column label="序号" prop="id" />
                <el-table-column label="隧道名称" prop="tunnelname" />
                <el-table-column label="图名" prop="imagename" />
                <el-table-column label="图号" prop="num" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" type="danger"
                            @click="preViewHandler(scope.$index, scope.row)">预览</el-button>
                        <el-button size="small" type="success"
                            @click="updateHandler(scope.$index, scope.row)">上传</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <!-- 上传对话框 -->
    <el-dialog destroy-on-close center v-model="dialogUploadVisible" title="上传文件" width="30%">
        <el-upload v-model:file-list="fileList" action="http://localhost:3000/api/upload" class="upload" :limit="1"
            :on-exceed="handleExceed"
            :on-success="handleFileSuccess"
            >
            <el-button type="primary">点击上传</el-button>
        </el-upload>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogUploadVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogUploadVisible = false">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { reactive, ref } from 'vue';
import api from '@/api/index.js'
import { useRouter } from 'vue-router';
const defaultProps = reactive({
    children: 'children',
    label: 'name',
})
const router = useRouter()
const content = reactive({
    data: []
})
const fileList = ref([])
const currentID = ref(0)
//上传对话框控制器
const dialogUploadVisible = ref(false)
/**
 * 点击在右边展示树型相关数据
 * @param {*} data 
 */
const handleNodeClick = (data) => {
    api.getTunnelContent({
        content: data.content
    }).then(res => {
        if (res.status === 200) {
            content.data = res.data.result
        } else {
            content.data = []
        }
    }).catch(error => console.log(error))
}
/**
 * 上传成功
 */
const handleFileSuccess = (response, uploadFile) => {
    console.log(response, uploadFile)
    api.getUploadTunnelContent({
        id: currentID.value,
        urlName: response.url.substr(7)
    }).then(res => {
        if (res.data.status === 200) {
            alert('上传成功')
        }
    }).catch(error => console.log(error))
}
const loadNode = (node, resolve) => {
    //一级结点
    if (node.level === 0) {
        api.getTunnelList().then(res => {
            if (res.data.status === 200) {
                resolve(res.data.result)
            } else {
                resolve([])
            }
        }).catch(error => console.log(error))
    }
    //二级结点
    if (node.level === 1) {
        api.getTunnelListChild({
            cid: node.data.cid
        }).then(res => {
            if (res.data.status === 200) {
                resolve(res.data.result)
            } else {
                resolve([])
            }
        }).catch(error => console.log(error))
    }
    //大于二级结点
    if (node.level > 1) {
        resolve([])
    }
}
/**
 * 预览事件
 */
const preViewHandler = (index, row) => {
    router.push({name:'pdf',params:{id: row.id}})
}
/**
 * 上传事件
 */
const updateHandler = (index, row) => {
    dialogUploadVisible.value = true
    currentID.value = row.id
}
/**
 * 当上传的文件个数超出限制时
 */
const handleExceed = () => {
    console.log('上传文件超出')
}
</script>
<style scoped>
.tunnel-container {
    display: flex;
}

.tunnel-list {
    width: 250px;
    background-color: #fff;
    padding: 10px;
    margin-right: 20px;
}

.tunnel-list h3 {
    font-size: 15px;
    font-weight: 700;
    margin: 10px 0;
}

.tunnel-content {
    flex: 1;
}

.upload {
    display: inline-block;
}
</style>