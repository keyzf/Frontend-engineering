const path = require('path')
/* webpack 配置 */
module.exports={
    mode:'none',
    //指定打包入口文件路径
    entry: './src/main.js',
    //指定输出文件的路径-就是编译后的js
    output: {
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    //添加loader配置 处理其他类型资源文件
    module:{
        rules:[
            {
                test:/.css$/,//匹配文件
                use:[//配置多个loader是从后往前执行 一定要先执行css-loader
                    'style-loader', // 把css-loader编译后的结果 通过style标签的形式追加到界面上
                    'css-loader' //
                ],//该文件使用的加载器  yarn add style-loader --dev  
            }
        ]
    }
}