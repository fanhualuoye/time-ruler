/*
 * @Author: '梁伟健' 'liangweijian@gosuncn.com'
 * @Date: 2022-08-09 09:56:01
 * @LastEditors: '梁伟健' 'liangweijian@gosuncn.com'
 * @LastEditTime: 2022-08-09 09:58:41
 * @FilePath: \gosuncn-ui\setVersion.js
 * @Description: 自动化升级版本号
 */

const fs = require('fs')
const packages = require('./package.json')

const versionMap = {
    major: 0,
    minor: 1,
    patch: 2
}

//  major.minor.patch
const upDate = () => {
    const index = versionMap[process.argv[2]]
    const versionList = packages.version.split('.')
    versionList[index] = Number(versionList[index]) + 1
    if (index === 0) {
        versionList[1] = '0'
        versionList[2] = '0'
    }
    if (index === 1) {
        versionList[2] = '0'
    }
    packages.version = versionList.join('.')
    fs.writeFile('./package.json', JSON.stringify(packages, null, 4), function(err) {
        if (err) {
            console.error(err)
        } else {
            console.log('版本升级成功:' + packages.version)
        }
    })
}

upDate()
