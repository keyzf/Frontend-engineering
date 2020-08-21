const path = require('path');

//自动清理插件 自动清理输出目录的文件
const {CleanWebpackPlugin}=require('clean-webpack-plugin');

//自动帮助我们生成index.html 到dist目录下面 而不在用项目目录下的index.html 因为我们在每次上线打包前都要检查bundle.js的路径是否正确
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'none',
    entry: './src/main.js',
    // context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.png$/,
                use: {
                    loader: 'url-loader',
                    options:{
                        limit:10 * 1024,
                    }
                }
            },
            {
                test: /.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attribute: {
                            list: [
                                {
                                    tag: 'img',
                                    attribute: 'src',
                                    type: 'src'
                                },
                                {
                                    tag: 'a',
                                    attribute: 'href',
                                    type: 'src'
                                }
                            ]
                        }
                    }
                }
            },
            {
                test: /.js$/,
                //exclude 表示哪些目录的.js文件不要进行babel-loader
                //include 表示哪些目录的.js文件需要进行babel-loader
                exclude: /(node_modules|bower_components)/,//注意需要添加此配置 如果不添加该配置 使用html-webpack-plugin会报错
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets:["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'Webpack plugins sample',
            meta:{
                viewport: 'width=device-width'
            }
        }),
    ]
};
