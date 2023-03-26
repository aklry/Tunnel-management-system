import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', {
    state: () => {
        return {
            toggleStore: true
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