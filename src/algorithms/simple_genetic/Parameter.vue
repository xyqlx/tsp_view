<template>
  <div class="parameter-bar">
    <label>种群数量</label>
    <InputNumber v-model.number="group_population" />
    <br />
    <label>遗传代数</label>
    <InputNumber v-model.number="max_generation" />
    <br />
    <label>交叉概率</label>
    <Slider
      v-model="cross_probability"
      :min="0"
      :max="1"
      :step="0.01"
      show-input
      input-size="small"
    ></Slider>
    <label>变异概率</label>
    <Slider
      v-model="mutation_probability"
      :min="0"
      :max="1"
      :step="0.01"
      show-input
      input-size="small"
    ></Slider>
    <button @click="add_task">开始计算</button>
  </div>
</template>

<script>
import Solve from "./solve";
export default {
  name: "GeneticParameter",
  data() {
    return {
      group_population: 200,
      max_generation: 2000,
      cross_probability: 0.5,
      mutation_probability: 0.05
    };
  },
  computed: {},
  methods: {
    add_task: function() {
      this.$store.commit("add_task", {
        calc: new Solve({
          dataset: this.$store.getters.dataset,
          group_population: this.group_population,
          max_generation: this.max_generation,
          cross_probability: this.cross_probability,
          mutation_probability: this.mutation_probability
        }),
        algorithm_label: "遗传算法"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  text-align: left;
  width: 30%;
  display: inline-block;
  margin-right: 10px;
}
</style>
