<template>
    <div class="parameter-bar">
        <button @click="add_task">开始计算</button>
    </div>
</template>

<script>
    import Solve from './solve'
    export default {
        name: 'GreedyParameter',
        computed:{
        },
        methods:{
            add_task:function(){
                this.$store.commit('add_task', {calc:new Solve({dataset:this.$store.getters.dataset}), algorithm_label:"贪心算法"})
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
