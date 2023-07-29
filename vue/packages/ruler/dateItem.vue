<template>
    <div class="scroll-date-list">
        <div class="scroll-date-item" v-for="(item) in list" :key="item">
            <div class="scroll-date-number">{{ getText(item - 1) }}</div>
            <div class="child-item-box">
                <span class="child-item" v-for="childItem in 10" :key="childItem"></span>
            </div>
        </div>
        <div class="scroll-date-has" :style="item.style" v-for="item in valueList" :key="item.key"></div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'DateItem',
    props: {
        day: {
            type: String,
            default: ''
        },
        itemWidth: {
            type: Number,
            default: 0
        },
        type: {
            type: String | Number,
            default: 1
        },
        value: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            hourNum: 24,
            typeMap: {
                // 一个小时
                '0': {
                    multiple: 1,
                    unit: 'h',
                    minutes: 60,
                    getText: this.getHour
                },
                // 三十分钟
                '1': {
                    multiple: 2,
                    unit: 'm',
                    minutes: 30,
                    getText: this.getMinutes
                },
                // 十分钟
                '2': {
                    multiple: 6,
                    unit: 'm',
                    minutes: 10,
                    getText: this.getMinutes
                }
            }
        }
    },
    computed: {
        list() {
            return this.hourNum * this.typeMap[this.type].multiple
        },
        valueList() {
            const list = []
            // 一格的秒数
            const secondItem = this.typeMap[this.type].minutes * 60
            // const time = moment(this.timeList[0].data)
            this.value.forEach(item => {
                const startTime = moment(item.rcdStartTime)
                const endTime = moment(item.rcdEndTime)
                if (startTime.format('YYYY-MM-DD') === this.day) {
                    const widthDiff = moment(endTime).diff(moment(startTime), "second")
                    const startDiff = moment(startTime).diff(moment(this.day + ' 00:00:00'), "second")
                    const width = (widthDiff / secondItem) * this.itemWidth
                    const left = (startDiff / secondItem) * this.itemWidth
                    list.push({
                        style: {
                            width: width + 'px',
                            left: left + 'px'
                        },
                        key: left
                    })
                }
            })
            return list
        }
    },
    methods: {
        getMinutes(i, flag) {
            if (flag) {
                i = -i
            }
            const m = moment(this.day, 'YYYY-MM-DD 00:00:00')
            const minutes = this.typeMap[this.type].minutes
            return m.add(i * minutes, 'm').format('HH:mm')
        },
        getHour(i, flag) {
            if (flag) {
                i = -i
            }
            const m = moment(this.day, 'YYYY-MM-DD 00:00:00')
            return m.add(i, 'h').format('HH:mm')
        },
        getText(i) {
            return this.typeMap[this.type].getText(i)
        }
    }
}
</script>

<style scoped lang="less">
.scroll-date-list {
    display: inline-flex;
    flex-wrap: nowrap;
    color: #B8BECC;
    position: relative;

    .scroll-date-has {
        height: 6px;
        background: #2b5fd9;
        position: absolute;
        bottom: -8px;
    }

    .scroll-date-item {
        width: 108px;
        position: relative;
        height: 5px;
        .scroll-date-number {
            position: absolute;
            left: -14px;
            top: -20px;
            font-size: 12px;
            font-family: Segoe UI;
            font-weight: 400;
            color: #b8becc;
        }

        .scroll-date-day {
            position: absolute;
            left: -14px;
            top: -30px;
            font-size: 12px;
            font-family: Segoe UI;
            font-weight: 400;
            color: #b8becc;
        }

        &:after {
            content: " ";
            position: absolute;
            left: 0;
            bottom: 0;
            height: 100%;
            border-left: 1px solid #5d718d;
        }
    }
}
.child-item-box {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .child-item {
        flex: 1;
        height: 4px;
        border-right: 1px solid #3E4F68;

        &:last-child {
            border-right: none;
        }

        &:nth-child(5) {
            height: 5px;
            border-right: 1px solid #5D718D;
        }
    }
}
</style>
