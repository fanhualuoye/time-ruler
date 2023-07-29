/*
 * @Author: '梁伟健' 'liangweijian@gosuncn.com'
 * @Date: 2022-08-17 09:23:46
 * @LastEditors: '梁伟健' 'liangweijian@gosuncn.com'
 * @LastEditTime: 2022-08-17 09:35:17
 * @FilePath: \gosuncn-ui\template.js
 * @Description: 组件模板脚本
 */

const fs = require('fs')
const path = require("path")
const execSync = require('child_process').execSync //同步子进程

const bastPath = './packages/'
const templatePath = './src/packageTemplate'

const nameMap = {
    name: 'myTest',
    barName: 'gxx_my_test',
    capitalName: 'GxxMyTest'
}


function capitalizedFirst(field) {
    const str = field.replace(/\b\w+\b/g, function(word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1)
    }
    )
    return str
}

function sortFieldMatch(field) {
    const stringArray = field.split('')
    let newField = field
    stringArray.forEach(t => {
        if (/[A-Z]/.test(t)) {
            newField = newField.replace(t, `_${t.toLowerCase()}`)
        }
    })
    return newField
}

function mkdir(dirPath) {
    return new Promise(resolve => {
        fs.mkdir(dirPath, (err) => {
            if (err) {
                console.error('文件夹创建失败！请检查文件夹是否重名')
                return
            }
            resolve()
        })
    })
}

function readFileIndex(writePath, readPath) {
    return new Promise(resolve => {
        const pathName = path.join(__dirname, templatePath, readPath)
        const rs = fs.createReadStream(pathName)
        let file = ''
        rs.setEncoding("utf8")
        rs.on("data", function(chunk) {
            file = setGitAndName(chunk)
        })
        rs.on("end", function() {
            fs.writeFile(writePath + readPath, file, function(err) {
                if (err) {
                    console.error(err)
                } else {
                    resolve()
                }
            })
        })
    })
}

function setGitAndName(file) {
    const name = execSync('git show -s --format=%cn').toString().trim() //姓名
    const email = execSync('git show -s --format=%ce').toString().trim() //邮箱
    const date = new Date()
    const time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    file = file.replace(/GxxMyTemplate/g, nameMap.capitalName)
    file = file.replace(/gxx_my_template/g, nameMap.barName)
    file = file.replace(/myName/g, name)
    file = file.replace(/myEmail/g, email)
    file = file.replace(/thisDate/g, time)
    return file
}

function setStyle() {
    return new Promise(resolve => {
        fs.writeFile('./src/style/' + nameMap.barName + '.less', '', function(err) {
            if (err) {
                console.error('新建样式失败')
            }
        })
        const pathName = path.join(__dirname, '/src/style/index.less')
        const rs = fs.createReadStream(pathName)
        let file = ''
        rs.setEncoding("utf8")
        rs.on("data", function(chunk) {
            file = chunk + '\n' + '@import \'./' + nameMap.barName + '.less\';'
        })
        rs.on("end", function() {
            fs.writeFile('./src/style/index.less', file, function(err) {
                if (err) {
                    console.error('新建样式失败')
                    return
                }
                resolve()
            })
        })
    })
}

function setDocs() {
    return new Promise(resolve => {
        fs.writeFile('./docs/component/' + nameMap.name + '.md', '', function(err) {
            if (err) {
                console.error('新建文档失败')
            }
            resolve()
        })
    })
}

async function init() {
    const name = process.argv[2]
    if (!name) {
        console.error('异常：缺少参数-文件名')
        return
    }
    if (name[0] === name[0].toUpperCase()) {
        console.error('异常：首字母不能为大写')
        return
    }
    nameMap.name = name
    nameMap.capitalName = 'Gxx' + capitalizedFirst(name)
    nameMap.barName = 'gxx_' + sortFieldMatch(name)
    const path = bastPath + nameMap.barName
    await mkdir(path)
    await readFileIndex(path, '/index.js')
    await mkdir(path + '/src')
    await readFileIndex(path, '/src/index.vue')
    await setStyle()
    await setDocs()
    console.log('新建成功')
}

init().then()
