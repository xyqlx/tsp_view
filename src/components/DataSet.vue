<template>
  <div class="dataset">
    <Card>
      <p slot="title">数据</p>
      <Select v-model="data_selector" @on-change="update_dataset">
        <Option v-for="item in dataset_names" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Input v-model="city_number" @on-enter="generate_dataset" placeholder="使用随机生成的数据集" />
      <!-- <p>当前数据集{{this.$store.state.dataset_name}}</p> -->
    </Card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DataSet",
  data() {
    return {
      data_selector: "circle",
      city_number: ""
    };
  },
  computed: {
    ...mapState(["dataset_names"])
  },
  methods: {
    generate_dataset: function() {
      let cnt = this.dataset_names.length + 1;
      let city_number = parseInt(this.city_number);
      if (isNaN(city_number)) city_number = 10;
      let label = "数据" + cnt.toString() + "(" + city_number.toString() + ")";
      let name = "data" + cnt.toString();
      this.$store.commit("add_dataset", {
        label: label,
        name: name,
        dataset: this.random_dataset(city_number)
      });
      this.data_selector = name;
      this.city_number = "";
      this.update_dataset();
    },
    update_dataset: function() {
      this.$store.commit("update_dataset", this.data_selector);
    },
    random_dataset(city_number) {
      let points = [];
      for (let i = 0; i < city_number; ++i) {
        let x = 0,
          y = 0;
        do {
          x = Math.floor(Math.random() * 100);
          y = Math.floor(Math.random() * 100);
          points.push([x, y]);
        } while (points.findIndex(p => p[0] == x && p[1] == y) == -1);
      }
      return points;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
