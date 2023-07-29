# gosuncn-ui

## Install
```shell
yarn add gosuncn-ui
or
npm install gosuncn-ui -S
```

### Quick Start
```javascript
import Vue from 'vue'
import Element from 'gosuncn-ui'
import 'gosuncn-ui/lib/style/index.css'

Vue.use(Element)
// or
import {
  GxxButton
  // ...
} from 'gosuncn-ui'

Vue.use(GxxButton)
```

## 本地开发

### 运行

```shell
#例子
npm run dev

#文档
npm run docs:dev

```

### 发布npm

```shell
#打包
npm run lib

#发布
npm publish
```
== 注意：发布新版本时，需更新 `package.json` 的 `version` ==

### 测试
```shell
npm run test
```

### 开发新组件时，应符合开发规范
1. 样式统一到 `src/style/` 文件夹内，`index.less` 为入口
2. 颜色类需要考虑主题切换 `src/style/color.less`



#### 全部脚本

```json
{
    "scripts": {
        "dev": "vue-cli-service serve", // 本地开发调试
        "docslib": "npm run lib & npm run docs:dev", // 打包组件并本地文档调试
        "docs:dev": "vuepress dev docs", // 本地文档调试
        "docs:build": "vuepress build docs",  // 打包文档
        "lib": "npm run libjs & npm run libcss", // 打包组件，包含css
        "libjs": "vue-cli-service build --target lib --name index --dest lib packages/index.js", // 打包组件，仅js
        "libcss": "npx lessc ./src/style/index.less ./lib/style/index.css --clean-css=\"advanced\"", // 打包组件，仅css
        "test": "vue-cli-service test:unit --coverage", // 单元测试
        "patch": "node ./setVersion.js patch & npm run lib", // 升级小版本
        "minor": "node ./setVersion.js minor & npm run lib", // 升级中版本
        "major": "node ./setVersion.js major & npm run lib", // 升级大版本
        "t": "node ./template.js" // 新建模板, 需要输入参数：[具体组件名]
    }
}
```