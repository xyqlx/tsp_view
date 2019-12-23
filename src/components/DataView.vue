<template>
    <div class="data-view">
        <h1>图表</h1>
        <converge-chart></converge-chart>
    </div>
</template>

<script>
    import ConvergeChart from './ConvergeChart'
    export default {
        name: 'DataView',
        components:{
            ConvergeChart
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.data-view{
  padding: 20px
}
.data-view > div{
  margin-top: 10px
}
</style>
