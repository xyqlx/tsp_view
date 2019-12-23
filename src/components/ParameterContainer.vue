<template>
  <div class="parameter-container">
    <data-set/>
    <div class="parameter">
      <task-bar></task-bar>
    </div>
    
  </div>
</template>

<script>

import DataSet from "./DataSet.vue"
import TaskBar from "./TaskBar.vue"

export default {
  name: "ParameterContainer",
  components: {
    DataSet,TaskBar
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

