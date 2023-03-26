import { defineStore } from "pinia";

export const useMenuStore = defineStore('menu', {
    state: () => {
        return {
            isCollapse: false,
            breadcrumb: '首页',
            menus: [] //动态导航数据
        }
    },
    //本地持久化
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'menus',//自定义的key值，存储到本地时候的key
                storage: localStorage,//选择存储方式
            }
        ]
    }
})