<template>
  <div class="city-chart">
    <canvas ref="myCanvas" width="200" height="200"></canvas>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    dataset: function() {
      return this.$store.getters.dataset;
    }
  },
  data() {
    return {};
  },
  methods: {
    draw_points: function() {
      let canvas = this.$refs.myCanvas;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 200, 200);
      this.dataset.forEach(point => {
        ctx.fillRect(point[0]*2, point[1]*2, 4, 4)
      });
    },
    draw_route:function(){
      this.draw_points()
      let canvas = this.$refs.myCanvas;
      let ctx = canvas.getContext("2d");
      this.$store.state.tasks.forEach(task => {
        // window.console.log(task.calc.best_route)
        // window.console.log(task.calc.best_route_length)
        if(task.dataset_label != this.$store.getters.dataset_label){
          return;
        }
        let route = task.calc.best_route
        ctx.beginPath();
        ctx.moveTo(this.dataset[route[route.length-1]][0]*2, this.dataset[route[route.length-1]][1]*2)
        route.forEach(point => {
          ctx.lineTo(this.dataset[point][0]*2, this.dataset[point][1]*2)
        });
        ctx.lineWidth=2;
        ctx.strokeStyle = task.color
        ctx.stroke();
        ctx.closePath();
      });
      ctx.strokeStyle =  '#000000'
    }
  },
  watch: {
    dataset: {
      handler: function() {
        this.draw_points()
      }
    }
  },
  mounted() {
    this.draw_points();
  }
};
</script>
