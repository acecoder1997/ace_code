/**
 * webpack.config.js 是webpack的配置文件
 * 作用： 指示webpack 做什么 和 webpack运行时的一些配置。
 * 所有构建工具都是基于node.js环境运行的 所有模块化默认为 commonjs
 */
const { resolve } = require('path');
const HtmlWenpackPlugin = require('html-webpack-plugin');

module.exports = {
    //入口
    entry: './src/main.js',
    // 出口
    output: {
        // 输出路径
        path: resolve(__dirname, 'dist'),
        // 文件名
        filename: 'js/index.js'
    },
    // 模块 下载 - 使用
    module: {
        rules: [{
                // 匹配指定文件
                test: /\.css$/,
                // 使用哪些loader 执行顺序为：由后到前 
                use: [
                    // 创建style标签，将js中的样式资源插入，添加到head中
                    'style-loader',
                    // 将css文件变成commonjs模块加载到js中，内容类型是字符串
                    'css-loader'
                ]
            }, {
                test: /\.less$/,
                use: [
                    // 创建style标签，将js中的样式资源插入，添加到head中
                    'style-loader',
                    // 将css文件变成commonjs模块加载到js中，内容类型是字符串
                    'css-loader',
                    // 将less文件翻译成css文件
                    'less-loader'
                ]
            }, {
                // 无法处理html里的图片资源
                test: /\.(jpe?g|png|gif|svg)$/,
                // 只有一个loader可以直接这样子写
                // 下载 url-loader file-loader
                loader: 'url-loader',
                options: {
                    // 图片小于8kb,就会被base64处理
                    // 优点： 减少请求数量 （减轻服务器压力）
                    // 缺点： 图片体积变大 （文件请求速度变慢）
                    limit: 200 * 1024,
                    // 问题：url-loader 默认使用es6模块化解析，而html-loader引入图片是commonjs
                    // 解析完后html的图片资源会变成： [Object Module]
                    // 解决：关闭url-loader的es6模块化，使用commonjs
                    esModule: false,
                    name: '[name].[hash:7].[ext]',
                    outputPath: 'images'
                }
            }, {
                test: /\.html$/,
                // 处理html文件的img图片 （负责引入img,从而能被url-loader处理）
                loader: 'html-loader',
                // use: ['file-loader', 'html-loader']
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]',
                    outputPath: 'font'
                }
            }
        ]
    },
    // 插件 下载 - 引入 - 使用
    plugins: [
        // 默认创建一个空的HTML文件，自动引入打包输出的所有资源(js/css ： main.js)
        // 需要有结构的html文件
        // 安装 npm i html-webpack-plugin -D
        new HtmlWenpackPlugin({
            template: './public/index.html'
        })
    ],
    // 环境模式
    mode: "development",
    // 开发服务器 devServer : 用来自动化（编译、自动打开/刷新浏览器）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 安装 npm i webpack-dev-server -D
    devServer: {
        // 启动的目录
        contentBase: resolve(__dirname, 'dist'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 8088,
        // 浏览器自动打开
        open: true
    }
}