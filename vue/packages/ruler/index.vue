<template>
    <div class="horizontal-container" ref="RulerBody" @wheel="handleWheel">
        <div class="scroll-wrapper" ref="rulePage">
            <div class="scroll-content" ref="scrollrule">
                <date-item v-for="(item) in list" :key="item" :day="item" :type="type" :value="valueList" :item-width="itemWidth"></date-item>
            </div>
            <div class="ruler-center-line"></div>
            <div class="ruler-center-line-time">{{ day }} {{ getNowTime }}</div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import moment from "moment"
import Decimal from "decimal.js"
import DateItem from './dateItem'

function debounce(fn, wait) {
    let timer = null
    return function() {
        if (timer !== null) {
            clearTimeout(timer)
        }
        timer = setTimeout(fn, wait)
    }
}

export default {
    name: 'InfinityRuler',
    components: { DateItem },
    props: {
        value: {
            type: Array,
            default: () => []
        },
        date: {
            type: String | Date,
            default: () => new Date()
        }
    },
    data() {
        return {
            list: [],
            day: '',
            scrollRule: null,
            typeMap: {
                // 一个小时
                '0': {
                    multiple: 1,
                    unit: 'h',
                    minutes: 60
                },
                // 三十分钟
                '1': {
                    multiple: 2,
                    unit: 'm',
                    minutes: 30
                },
                // 十分钟
                '2': {
                    multiple: 6,
                    unit: 'm',
                    minutes: 10
                }
            },
            type: 0,
            posX: 0,
            bodyWidthHalf: 0,
            scrollStart: false,
            wheel: false,
            itemWidth: 108, // 600 1800 3600 的公约数
            setWidthDebounce: () => {},
            isStop: false,
            valueList: []
        }
    },
    computed: {
        getNowTime() {
            const num = new Decimal(24)
            const x = num.mul(this.typeMap[this.type].multiple).mul(this.itemWidth).sub(this.bodyWidthHalf)
            const posX = new Decimal(this.posX).sub(x).div(this.itemWidth).mul(this.typeMap[this.type].minutes).mul(60)
            let sec = Number(posX.valueOf())
            if (sec < 0) {
                const x = new Decimal(86400).add(sec)
                sec = Number(x.valueOf())
            }
            return this.convertSec(sec)
        }
    },
    watch: {
        date(val) {
            this.changeDate(val)
        },
        value: {
            handler(val) {
                if (val.length) {
                    this.isStop = false
                }
                this.setValueList(val)
            },
            immediate: true
        }
    },
    mounted() {
        this.changeDate(this.date)
        this.setWidthDebounce = debounce(this.getRulerBody, 300)
    },
    beforeDestroy() {
        this.destroyScroll()
    },
    methods: {
        setValueList(list) {
            const array = []
            list.forEach(item => {
                // 是否分割
                const startDay = moment(moment(item.rcdStartTime).format('YYYY-MM-DD'))
                const endDay = moment(moment(item.rcdEndTime).format('YYYY-MM-DD'))
                const num = endDay.diff(startDay, 'days')
                if (num < 0) {
                    return
                }
                if (num) {
                    for (let i = 0; i <= num; i++) {
                        let rcdStartTime = ''
                        let rcdEndTime = ''
                        if (i === 0) {
                            rcdStartTime = item.rcdStartTime
                            rcdEndTime = startDay.format('YYYY-MM-DD') + ' 23:59:59'
                        } else if (i === num) {
                            rcdStartTime = endDay.format('YYYY-MM-DD') + ' 00:00:00'
                            rcdEndTime = item.rcdEndTime
                        } else {
                            const day = startDay.clone().add(i, 'days').format('YYYY-MM-DD')
                            rcdStartTime = day + ' 00:00:00'
                            rcdEndTime = day + ' 23:59:59'
                        }
                        array.push({
                            rcdStartTime,
                            rcdEndTime
                        })
                    }
                }
                else {
                    array.push(item)
                }
            })
            this.valueList = array
        },
        changeDate(val) {
            if (!val) {
                return
            }
            this.day = moment(val).format('YYYY-MM-DD')
            const d1 = moment(this.day).add(-1, 'days').format('YYYY-MM-DD')
            const d2 = moment(this.day).add(1, 'days').format('YYYY-MM-DD')
            this.list = [d1, this.day, d2]
            this.getRulerBody()
        },
        getRulerBody() {
            this.bodyWidthHalf = this.$refs.RulerBody.clientWidth / 2
            this.$nextTick(() => {
                this.init()
            })
        },
        init() {
            this.destroyScroll()
            this.initScroll()
            this.currentSignPlace()
        },
        setWidth() {
            this.setWidthDebounce()
        },
        initScroll() {
            this.scrollRule = new BScroll(this.$refs.rulePage, {
                // 实时监听滚动的位置并返回
                probeType: 2,
                scrollX: true
            })
            this.scrollRule.on('scrollStart', this.onScrollStart)
            this.scrollRule.on('scroll', this.onScroll)
            this.scrollRule.on('scrollEnd', this.onScrollEnd)
        },
        destroyScroll() {
            if (this.scrollRule) {
                this.scrollRule.off('scrollStart', this.onScrollStart)
                this.scrollRule.off('scroll', this.onScroll)
                this.scrollRule.off('scrollEnd', this.onScrollEnd)
                this.scrollRule.destroy()
                this.scrollRule = null
            }
        },
        // 重置刻度
        currentSignPlace() {
            const left = (24 * this.typeMap[this.type].multiple) * this.itemWidth - this.bodyWidthHalf
            this.scrollRule?.scrollTo(-left, 0, 0)
        },
        onScrollStart() {
            this.scrollStart = true
            this.$emit('onScrollStart')
        },
        onScroll(pos) {
            const posX = (-pos.x)
            this.posX = posX <= 0 ? 0 : posX
        },
        onScrollEnd(pos) {
            if (!this.list.length) {
                return
            }
            const posX = (-pos.x)
            this.posX = posX <= 0 ? 0 : posX
            if (!this.wheel) {
                this.setList(pos)
            }
            if (this.scrollStart && !this.wheel) {
                this.replay()
            }
            this.wheel = false
            this.scrollStart = false
        },
        replay() {
            const time = moment(this.day + ' ' + this.getNowTime).format('YYYY-MM-DD HH:mm:ss')
            if (this.isInValue(time)) {
                this.$emit("replay", time)
            }
            else {
                this.scrollStart = false
                // this.isStop = true
                this.$emit("replay", '')
            }
        },
        isInValue(time) {
            if (this.isStop) {
                return false
            }
            let flag = false
            const nowTime = moment(time).unix()
            this.value.forEach(item => {
                const rcdStartTime = moment(item.rcdStartTime).unix()
                const rcdEndTime = moment(item.rcdEndTime).unix()
                if (nowTime >= rcdStartTime && nowTime <= rcdEndTime) {
                    flag = true
                }
            })
            return flag
        },
        setList(pos) {
            const left = (24 * this.typeMap[this.type].multiple) * this.itemWidth - this.bodyWidthHalf
            if (-pos.x < left) {
                this.setLeftList(pos)
            }
            const rightX = left + (24 * this.typeMap[this.type].multiple) * this.itemWidth
            if (-pos.x > rightX) {
                this.setRightList(pos)
            }
        },
        setLeftList(pos) {
            this.scrollRule?.disable()
            this.destroyScroll()
            this.initScroll()
            this.day = moment(this.day).add(-1, 'days').format('YYYY-MM-DD')
            this.list.pop()
            this.list.unshift(moment(this.day).add(-1, 'days').format('YYYY-MM-DD'))
            const left = (24 * this.typeMap[this.type].multiple) * this.itemWidth - this.bodyWidthHalf
            const x = left + pos.x
            const n = (24 * this.typeMap[this.type].multiple) * this.itemWidth - x + left
            this.scrollRule?.scrollTo(-n, 0, 0, false)
            this.scrollRule?.enable()
        },
        setRightList(pos) {
            this.scrollRule?.disable()
            this.destroyScroll()
            this.initScroll()
            this.day = moment(this.day).add(1, 'days').format('YYYY-MM-DD')
            this.list.shift()
            this.list.push(moment(this.day).add(1, 'days').format('YYYY-MM-DD'))
            const n = -pos.x - (24 * this.typeMap[this.type].multiple) * this.itemWidth
            this.scrollRule?.scrollTo(-n, 0, 0, false)
            this.scrollRule?.enable()
        },
        convertSec(sec) {
            const currentTime = moment.duration(sec, "seconds")
            return moment({
                h: currentTime.hours(),
                m: currentTime.minutes(),
                s: currentTime.seconds()
            }).format("HH:mm:ss")
        },
        handleWheel(e) {
            // 滚动时
            if (this.scrollStart || this.wheel) {
                return
            }
            // 缩小
            const copyTime = this.getNowTime
            const day = this.day
            if (e.wheelDelta > 0) {
                if (this.type >= 2) {
                    this.type = 2
                }
                else {
                    this.wheel = true
                    this.type = this.type + 1
                    this.$nextTick(() => {
                        this.refresh(day + ' ' + copyTime)
                    })
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
                    this.$nextTick(() => {
                        this.refresh(day + ' ' + copyTime)
                    })
                }
            }
        },
        refresh(time) {
            this.scrollRule?.disable()
            this.destroyScroll()
            this.initScroll()
            this.$nextTick(() => {
                this.setLeft(time)
            })
        },
        setLeft(time) {
            // 鼠标滚动时
            if (this.scrollStart) {
                return
            }
            if (moment(time).format('YYYY-MM-DD') !== moment(this.day).format('YYYY-MM-DD')) {
                return
            }
            const startTime = moment(time).format('YYYY-MM-DD 00:00:00')
            const startDiff = moment(time).diff(startTime, "second")
            const secondItem = new Decimal(this.typeMap[this.type].minutes).mul(60)
            const secondWidth = new Decimal(this.itemWidth).div(secondItem).mul(startDiff)
            const left = new Decimal(24).mul(this.typeMap[this.type].multiple).mul(this.itemWidth).add(secondWidth).sub(this.bodyWidthHalf)
            this.scrollRule?.scrollTo(-Number(left.valueOf()), 0, 0)
        }
    }
}
</script>

<style scoped lang="less">
.horizontal-container {
    width: 100%;
    position: relative;
    cursor: pointer;
    background: #202731;
    padding-top: 6px;
    user-select: none;

    .scroll-wrapper {
        position: relative;
        width: 100%;
        white-space: nowrap;
        padding-top: 30px;
        overflow: hidden;
        z-index: 99;
        padding-bottom: 4px;
    }

    .scroll-content {
        display: inline-block;
        cursor: pointer;
        padding-bottom: 4px;
        position: relative;
    }

    .ruler-center-line {
        position: absolute;
        border-left: 1px solid #2b5fd9;
        left: 50%;
        bottom: 0px;
        height: 38px;
        width: 1px;
        text-align: center;
    }

    .ruler-center-line-time {
        position: absolute;
        left: calc(50% - 108px);
        top: 0;
        font-size: 12px;
        font-family: Segoe UI;
        font-weight: 400;
        color: #B8BECC;
        width: 200px;
        text-align: center;
    }
}
</style>
