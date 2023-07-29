const fs = require('fs')

function mkdir(dirPath) {
    return new Promise(resolve => {
        fs.mkdir(dirPath, () => {
            resolve()
        })
    })
}

async function copyFile(form, to) {
    return new Promise(resolve => {
        fs.copyFile(form, to, fs.constants.COPYFILE_EXCL, () => {
            resolve()
        })
    })
}

async function init() {
    // 创建文件夹
    await mkdir('./lib/style/fonts')
    await copyFile('./src/style/fonts/element-icons.woff', './lib/style/fonts/element-icons.woff')
    await copyFile('./src/style/fonts/element-icons.ttf', './lib/style/fonts/element-icons.ttf')
    await copyFile('./src/style/fonts/gxx-icons.ttf', './lib/style/fonts/gxx-icons.ttf')
    await copyFile('./src/style/fonts/gxx-icons.woff', './lib/style/fonts/gxx-icons.woff')
    await copyFile('./src/style/fonts/gxx-icons.woff2', './lib/style/fonts/gxx-icons.woff2')
}

init().then()
