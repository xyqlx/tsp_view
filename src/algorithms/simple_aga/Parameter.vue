<template>
  <div class="parameter-bar">
    <label>种群数量</label>
    <InputNumber v-model.number="group_population" />
    <br />
    <label>遗传代数</label>
    <InputNumber v-model.number="max_generation" />
    <br />
    <label>低适交叉概率</label>
    <Slider
      v-model="cross_probability"
      :min="0"
      :max="1"
      :step="0.01"
      show-input
      input-size="small"
    ></Slider>
    <label>低适变异概率</label>
    <Slider
      v-model="mutation_probability"
      :min="0"
      :max="1"
      :step="0.01"
      show-input
      input-size="small"
    ></Slider>
    <label>适应交叉因子</label>
    <Slider
      v-model="cross_adaption"
      :min="0"
      :max="1"
      :step="0.01"
      show-input
      input-size="small"
    ></Slider>
    <label>适应变异因子</label>
    <Slider
      v-model="mutation_adaption"
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
  name: "AGAParameter",
  data() {
    return {
      group_population: 200,
      max_generation: 2000,
      cross_probability: 0.5,
      mutation_probability: 0.5,
      cross_adaption: 1,
      mutation_adaption: 1
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
          mutation_probability: this.mutation_probability,
          cross_adaption: this.cross_adaption,
          mutation_adaption: this.mutation_adaption
        }),
        algorithm_label: "自适应遗传"
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
