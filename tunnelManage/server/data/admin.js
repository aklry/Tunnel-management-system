module.exports = {
    menus: [
        {
            path: "/",
            name: "首页",
            icon: "Document"
        },
        {
            path: "/project",
            name: "项目基础信息",
            icon: "Discount"
        },
        {
            path: "/tunnel",
            name: "隧道设计信息",
            icon: "Picture"
        },
        {
            path: "/work",
            name: "工作监督管理",
            icon: "IceCreamRound"
        },
        {
            path: "/build",
            name: "施工监控检测",
            icon: "Filter",
            children: [
                {
                    path: "/plan",
                    name: "检测计划",
                },
                {
                    path: "/section",
                    name: "切面检测",
                }
            ]
        },
        {
            path: "/geological",
            name: "超前地质预报",
            icon: "ShoppingTrolley"
        },
        {
            path: "/system",
            name: "系统信息管理",
            icon: "Wallet"
        }
    ]
}