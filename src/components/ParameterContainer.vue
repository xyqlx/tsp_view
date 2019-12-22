<template>
  <div class="parameter-container">
    <data-set/>
    <div class="parameter">
      <Card>
        <p slot="title">参数配置</p>
        <Select v-model="algorithm_selector">
          <Option
            v-for="item in algorithm_list"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
        <component v-bind:is="algorithm_selector"></component>
      </Card>
    </div>
    <task-bar/>
  </div>
</template>

<script>
import GreedyParameter from "../algorithms/greedy/Parameter.vue";
import GeneticParameter from "../algorithms/simple_genetic/Parameter.vue";
import DataSet from "./DataSet.vue"
import TaskBar from "./TaskBar.vue"
export default {
  name: "ParameterContainer",
  components: {
    greedy: GreedyParameter,
    genetic: GeneticParameter,
    DataSet, TaskBar
  },
  data() {
    return {
      algorithm_list: [
        {
          value: "greedy",
          label: "贪心算法"
        },
        {
          value: "genetic",
          label: "遗传算法"
        }
      ],
      algorithm_selector: "genetic"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parameter-container{
  padding: 20px
}
.parameter-container > div{
  margin-top: 10px
}
</style>

