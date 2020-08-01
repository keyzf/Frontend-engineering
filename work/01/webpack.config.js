const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        index: "./src/index.js"
    },
    output: {
        // path 一定要是绝对路径
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: "./images",
                        publicPath: '../dist/images',
                        limit: 100
                    }
                },
            },

            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {}
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: true,
                            import: true,
                            sourceMap: false
                        }
                    }
                ]
            }

        ]

    }
}