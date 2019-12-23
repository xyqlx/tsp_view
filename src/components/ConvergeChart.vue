<template>
  <div class="converge-chart">
    <i-Col span="12">
      <Card class="chart-card">
        <line-chart ref="line_chart"></line-chart>
      </Card>
    </i-Col>
    <i-Col span="12">
      <Card class="chart-card">
        <city-chart ref='cityChart'/>
      </Card>
    </i-Col>
  </div>
</template>

<script>
import LineChart from "./LineChart";
import { mapState } from "vuex";
import CityChart from "./CityChart.vue";
export default {
  components: {
    LineChart,
    CityChart
  },
  computed: {
    ...mapState(["chart_data"])
  },
  data() {
    return {
      last_count: 0
    };
  },
  methods: {
    changed: function(data) {
      let cnt = 0;
      data.datasets.forEach(element => {
        element.data.forEach(() => cnt++);
      });
      if (cnt != this.last_count) {
        this.last_count = cnt;
        return true;
      }
      return false;
    }
  },
  watch: {
    chart_data: {
      handler: function(new_val) {
        if (this.changed(new_val)) {
          // window.console.log(this.last_count)
          this.$refs.line_chart.update(Object.assign({}, this.chart_data));
          this.$refs.cityChart.draw_route()
        }
      },
      deep: true
    }
  }
};
</script>
<style scoped>
</style>