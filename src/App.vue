<template>
  <div id="app">
    <Row>
      <i-Col span="6">
        <parameter-container />
      </i-Col>
      <i-Col span="12">
        <data-view />
      </i-Col>
      <i-Col span="6">
        <div style="padding: 30px">
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
      </i-Col>
    </Row>
  </div>
</template>

<script>
import ParameterContainer from "./components/ParameterContainer.vue";
import DataView from "./components/DataView.vue";
import GreedyParameter from "./algorithms/greedy/Parameter.vue";
import GeneticParameter from "./algorithms/simple_genetic/Parameter.vue";
import AGAParameter from "./algorithms/simple_aga/Parameter.vue"

export default {
  name: "app",
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
        },
        {
          value: "aga",
          label: "自适应遗传"
        }
      ],
      algorithm_selector: "aga"
    };
  },
  components: {
    greedy: GreedyParameter,
    genetic: GeneticParameter,
    aga: AGAParameter,
    ParameterContainer,
    DataView
  }
};
</script>

<style>
</style>

