import TimeRuler from './ruler/index'

const components = [TimeRuler]

const install = (Vue) => {
    /* istanbul ignore next */
    if (install.installed) { return }
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}
/* istanbul ignore next */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    TimeRuler
}

export {
    TimeRuler
}

