const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
    // const isProduction = argv.mode === 'production'

    return {
        mode: 'development',
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: "bundle-[name].js",
            // Если publicPath не задан то
            // при перезагрузки некоторых страниц приложения
            // теряются js скрипты (точнее определяется относительный путь к ним,
            // а он должен быть абсолютным)
            // всё это при использовании historyApiFallback: true
            publicPath: "/"
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                'node_modules': path.resolve(__dirname, 'node_modules')
            },
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                    },
                    type: 'javascript/auto'
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.svg$/,
                    use: [
                    {
                        loader: 'vue-svg-loader',
                    },
                    ],
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: 'public/index.html'
            })
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'build')
            },
            historyApiFallback: true,
            compress: true,
            port: 5000,
            hot: true,
        },
        optimization: {
            splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                }
            }
            }
        }
    }
}
