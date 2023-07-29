/*
 * @Author: '梁伟健' 'liangweijian@gosuncn.com'
 * @Date: 2022-07-22 09:08:25
 * @LastEditors: hanjinxiang && hanjinxiang@gosuncn.com
 * @LastEditTime: 2022-09-08 14:45:35
 * @FilePath: \gosuncn-ui\examples\main.js
 * @Description: 例子入口
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false
// Vue.use(ElementUi)
const router = new VueRouter({
    mode: "hash"
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
