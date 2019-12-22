<template>
  <div class="taskbar">
    <Card>
      <p slot="title">当前运行</p>
      <CellGroup>
        <Cell v-for="task in tasks" :key="task.key">
          {{task.algorithm_label}}
          <p slot="label">{{task.dataset_label}}</p>
          <Divider slot="extra" type="vertical" />
          <Button shape="circle" @click="cancel_task(task.key)" slot="extra" type="text">
            <Icon type="md-close"></Icon>
          </Button>
        </Cell>
      </CellGroup>
    </Card>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "TaskBar",
  data() {
    return {
      
    }
  },
  computed:{
      ...mapState([
        'tasks'
      ])
  },
  methods:{
    cancel_task:function(target){
      this.$store.commit('remove_task', target)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
