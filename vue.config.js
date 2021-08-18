module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',

        },
    },
    lintOnSave: false, //关闭语法检查
    //开启代理服务器（方式一）
    // devServer: {
    //     proxy: 'http://localhost:5000'
    // },
    //开启代理服务器（方式二）
    devServer: {
        proxy: {
            // /atguigu ，/demo 叫前缀
            '/atguigu': {
                target: 'http://localhost:5000',
                // 路径到5000就不往后写了
                pathRewrite: { '^/atguigu': '' },
                // 取消发送请求的前缀名
                // ws: true, //用于支持websocket，不写默认为true
                // changeOrigin: true //用于控制请求头中的host值，不写默认为true
            },
            '/demo': {
                target: 'http://localhost:5001',
                pathRewrite: { '^/demo': '' },
                // ws: true, //用于支持websocket
                // changeOrigin: true //用于控制请求头中的host值
            }
        }
    }
}