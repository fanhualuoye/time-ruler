import moment from 'moment'
import Decimal from 'decimal.js'
import BScroll from 'better-scroll'
import ResizeObserver from 'resize-observer-polyfill'

export const typeMap = {
    '0': {
        multiple: 1,
        unit: 'h',
        minutes: 60
    },
    '1': {
        multiple: 2,
        unit: 'm',
        minutes: 30
    },
    '2': {
        multiple: 6,
        unit: 'm',
        minutes: 10
    }
}

const convertSec = (sec) => {
    const currentTime = moment.duration(sec, 'seconds')
    return moment({
        h: currentTime.hours(),
        m: currentTime.minutes(),
        s: currentTime.seconds()
    }).format('HH:mm:ss')
}

export default class Ruler {
    constructor(bodyEl, el, scrollRuleEl, date, changeFun, changRuler) {
        this.itemWidth = 108
        this.bodyWidthHalf = 0
        this.posX = 0
        this.type = 0

        this.wheel = false
        this.scrollStart = false
        this.scrollRule = null
        this.resize = null

        this.scrollRuleEl = scrollRuleEl
        this.bodyEl = bodyEl
        this.el = el
        this.changeFun = changeFun
        this.changRuler = changRuler

        this.list = []
        this.day = moment(date).format('YYYY-MM-DD')
        this.nowTime = ''
        this.init()
    }
    init() {
        this.listenWheel()
        this.watchResize()
        this.getBodyWidth()
        this.initList()
    }
    listenWheel() {
        this.bodyEl.addEventListener('wheel', this.handleWheel.bind(this))
    }
    watchResize() {
        this.resize = new ResizeObserver(() => {
            if (!this.scrollRule) {
                return
            }
            this.scrollRule.refresh()
            this.getBodyWidth()
            this.resetScale()
        })
        this.resize.observe(this.bodyEl)
    }
    createScroll() {
        this.scrollRule = new BScroll(this.el, {
            probeType: 2,
            scrollX: true
        })
        this.scrollRule.on('scrollStart', this.onScrollStart.bind(this))
        this.scrollRule.on('scroll', this.onScroll.bind(this))
        this.scrollRule.on('scrollEnd', this.onScrollEnd.bind(this))
        this.resetScale()
        this.setNowTime()
    }
    destroy() {
        this.bodyEl.removeEventListener('wheel', this.handleWheel)
        this.resize.unobserve(this.bodyEl)
        if (this.scrollRule) {
            this.scrollRule.off('scrollStart', this.onScrollStart)
            this.scrollRule.off('scroll', this.onScroll)
            this.scrollRule.off('scrollEnd', this.onScrollEnd)
            this.scrollRule.destroy()
            this.scrollRule = null
        }
    }
    getBodyWidth() {
        this.bodyWidthHalf = this.bodyEl.clientWidth / 2
    }
    resetScale() {
        const left = (24 * typeMap[this.type].multiple) * this.itemWidth - this.bodyWidthHalf
        this.scrollRule?.scrollTo(-left, 0, 0)
    }
    initList() {
        const d1 = moment(this.day).add(-1, 'days').format('YYYY-MM-DD')
        const d2 = moment(this.day).add(1, 'days').format('YYYY-MM-DD')
        this.list = [d1, this.day, d2]
    }
    setNowTime() {
        const num = new Decimal(24)
        const x = num.mul(typeMap[this.type].multiple).mul(this.itemWidth).sub(this.bodyWidthHalf)
        const posX = new Decimal(this.posX).sub(x).div(this.itemWidth).mul(typeMap[this.type].minutes).mul(60)
        let sec = Number(posX.valueOf())
        if (sec < 0) {
            const x = new Decimal(86400).add(sec)
            sec = Number(x.valueOf())
        }
        this.nowTime = convertSec(sec)
        if (this.changRuler) {
            this.changRuler(this)
        }
    }
    onScrollStart() {
        this.scrollStart = true
    }
    onScroll(pos) {
        const posX = (-pos.x)
        this.posX = posX <= 0 ? 0 : posX
        this.setNowTime()
    }
    onScrollEnd(pos) {
        if (!this.list.length) {
            return
        }
        const posX = (-pos.x)
        this.posX = posX <= 0 ? 0 : posX
        this.setNowTime()
        if (!this.wheel) {
            this.setList(pos)
        }
        if (this.scrollStart && !this.wheel) {
            this.change()
        }
        this.wheel = false
        this.scrollStart = false
    }
    setList(pos) {
        const left = (24 * typeMap[this.type].multiple) * this.itemWidth - this.bodyWidthHalf
        if (-pos.x < left) {
            this.setLeftList(pos)
        }
        const rightX = left + (24 * typeMap[this.type].multiple) * this.itemWidth
        if (-pos.x > rightX) {
            this.setRightList(pos)
        }
    }
    setLeftList(pos) {
        this.scrollRule.disable()
        this.day = moment(this.day).add(-1, 'days').format('YYYY-MM-DD')
        this.initList()
        const left = (24 * typeMap[this.type].multiple) * this.itemWidth - this.bodyWidthHalf
        const x = left + pos.x
        const n = (24 * typeMap[this.type].multiple) * this.itemWidth - x + left
        this.scrollRule.scrollTo(-n, 0, 0, false)
        this.scrollRule.enable()
    }
    setRightList(pos) {
        this.scrollRule.disable()
        this.day = moment(this.day).add(1, 'days').format('YYYY-MM-DD')
        this.initList()
        const n = -pos.x - (24 * typeMap[this.type].multiple) * this.itemWidth
        this.scrollRule.scrollTo(-n, 0, 0, false)
        this.scrollRule.enable()
    }
    handleWheel(e) {
        // 滚动时
        if (this.scrollStart || this.wheel) {
            return
        }
        // 缩小
        const copyTime = this.nowTime
        const day = this.day
        if (e.wheelDelta > 0) {
            if (this.type >= 2) {
                this.type = 2
            }
            else {
                this.wheel = true
                this.type = this.type + 1
                this.update(day + ' ' + copyTime)
            }
        }
        // 放大
        if (e.wheelDelta < 0) {
            if (this.type <= 0) {
                this.type = 0
            }
            else {
                this.wheel = true
                this.type = this.type - 1
                this.update(day + ' ' + copyTime)
            }
        }
    }
    update(time) {
        this.scrollRule.disable()
        const resize = new ResizeObserver(() => {
            resize.unobserve(this.scrollRuleEl)
            this.scrollRule.refresh()
            this.setTime(time)
            this.scrollRule.enable()
        })
        resize.observe(this.scrollRuleEl)
    }
    change() {
        if (this.changeFun) {
            this.changeFun(this.day + ' ' + this.nowTime)
        }
    }
    setTime(time) {
        if (this.scrollStart) {
            return
        }
        if (moment(time).format('YYYY-MM-DD') !== moment(this.day).format('YYYY-MM-DD')) {
            return
        }
        const startTime = moment(time).format('YYYY-MM-DD 00:00:00')
        const startDiff = moment(time).diff(startTime, 'second')
        const secondItem = new Decimal(typeMap[this.type].minutes).mul(60)
        const secondWidth = new Decimal(this.itemWidth).div(secondItem).mul(startDiff)
        const left = new Decimal(24).mul(typeMap[this.type].multiple).mul(this.itemWidth).add(secondWidth).sub(this.bodyWidthHalf)
        this.scrollRule?.scrollTo(-Number(left.valueOf()), 0, 0)
    }
}
