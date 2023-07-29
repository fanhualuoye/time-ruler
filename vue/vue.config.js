const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
const devConfig = {
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    filenameHashing: true,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
    productionSourceMap: true,
    chainWebpack: (config) => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('eslint-loader')
            .loader('vue-loader')
            .tap((options) => {
                options = {
                    include: resolve('src'),
                    exclude: resolve('node_modules')
                }
                return options
            })
            .end()
        config.module
            .rule('js')
            .use('eslint-loader')
            .loader('eslint-loader')
            .tap((options) => {
                options = {
                    include: resolve('src'),
                    exclude: resolve('node_modules')
                }
                return options
            })
            .end()
    },
    configureWebpack: (config) => {
        config.resolve.alias['@'] = resolve('/src')
        config.resolve.alias['@p'] = resolve('/packages')

        config.mode = 'development'
        config.devtool = 'source-map'
    },
    devServer: {
        host: '0.0.0.0',
        port: 8820,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/isp-upload': {
                target: 'http://192.168.180.19:8880',
                changeOrigin: true,
                pathRewrite: {
                    '^/isp-upload': '/isp-upload'
                }
            }
        }
    // before: () => {}
    }
}
const join = path.join//拼接路径
const fs = require('fs')
function getEntries(path) {
    const files = fs.readdirSync(resolve(path))
    const entries = files.reduce((ret, item) => {
        const itemPath = join(path, item)
        const isDir = fs.statSync(itemPath).isDirectory()
        if (isDir) {
            ret[item] = resolve(join(itemPath, 'index.js'))
        }
        else {
            const [name] = item.split('.')
            ret[name] = resolve(`${itemPath}`)
        }
        return ret
    }, {})
    return entries
}
const buildConfig = {
    chainWebpack: config => {
        config.optimization.delete('splitChunks')
        config.plugins.delete('copy')
        config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        config.plugins.delete('hmr')
        config.entryPoints.delete('app')

        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('eslint-loader')
            .loader('vue-loader')
            .tap((options) => {
                options = {
                    include: resolve('src'),
                    exclude: resolve('node_modules')
                }
                return options
            })
            .end()
        config.module
            .rule('js')
            .use('eslint-loader')
            .loader('eslint-loader')
            .tap((options) => {
                options = {
                    include: resolve('src'),
                    exclude: resolve('node_modules')
                }
                return options
            })
            .end()
    },
    outputDir: 'lib',
    configureWebpack: {
        externals: {
            'element-ui': 'ELEMENT'
        },
        resolve: {
            alias: {
                '@': resolve('src'),
                '@p': resolve('packages')
            }
        },
        entry: {
            ...getEntries('packages')
        },
        output: {
            filename: '[name]/index.js',
            libraryTarget: 'commonjs2'
        }
    },
    productionSourceMap: false

}
module.exports = process.env.NODE_ENV === 'development' ? devConfig : buildConfig
