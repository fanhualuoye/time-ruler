<template>
    <div class="horizontal-container" ref="RulerBody">
        <div class="scroll-wrapper" ref="rulePage">
            <div class="scroll-content" ref="scrollRule">
                <date-item v-for="(item) in ruler.list" :key="item" :day="item" :type="ruler.type" :item-width="ruler.itemWidth"></date-item>
            </div>
            <div class="ruler-center-line"></div>
            <div class="ruler-center-line-time">{{ ruler.day }} {{ ruler.nowTime }}</div>
        </div>
    </div>
</template>

<script>
import DateItem from './dateItem'
import Ruler from "./manage"

export default {
    name: 'InfinityRuler',
    components: { DateItem },
    props: {
        date: {
            type: String | Date,
            default: () => new Date()
        }
    },
    data() {
        return {
            ruler: {
                list: [],
                itemWidth: 100,
                nowTime: '',
                day: '',
                type: 0
            }
        }
    },
    watch: {
        date(val) {
            console.log('val', val)
        }
    },
    mounted() {
        this.ruler = new Ruler(this.$refs.RulerBody, this.$refs.rulePage, this.$refs.scrollRule, this.date, (time) => {
            console.log('aaa', time)
        })
        console.log('ruler', this.ruler)
        this.$nextTick(() => {
            this.ruler.createScroll()
        })
        setInterval(() => {
            this.ruler.setTime(new Date())
        }, 1000)
    },
    beforeDestroy() {
        this.ruler.destroy()
    },
    methods: {
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
