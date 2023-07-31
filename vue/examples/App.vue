<template>
    <div>
        <time-ruler></time-ruler>
    </div>
</template>
<script>
import { TimeRuler } from '../packages'

export default {
    components: { TimeRuler },
    data() {
        return {
            treeData: [
                {
                    label: 'test1',
                    id: '1',
                    children: [
                        {
                            label: 'child2',
                            id: '1',
                            children: [
                                {
                                    label: 'child-3',
                                    id: '1'
                                },
                                {
                                    label: 'child-3',
                                    id: '2'
                                }
                            ]
                        },
                        {
                            label: 'child1-5',
                            id: '22'
                        }
                    ]
                },
                {
                    label: 'test1',
                    id: '22',
                    children: [
                        {
                            label: 'child-5',
                            id: '1'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        clickNode(done) {
            console.log('done', done)
        }
    }
}
</script>

