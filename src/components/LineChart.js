import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    methods:{
        update:function(chartdata){
            this.renderChart(chartdata, {
                animation: { duration: 0 },
                legend: { display: false },
                responsive: true
            })
        }
    }
}
