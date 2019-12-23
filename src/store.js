import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        dataset_name: 'circle',
        dataset_names: [
            {
                label: "圆形造形术",
                value: "circle"
            },
            {
                label: "方形造形术",
                value: "square"
            }
        ],
        datasets: {
            circle: [[90, 50], [82, 73], [62, 88], [38, 88], [18, 73], [10, 50], [18, 27], [38, 12], [62, 12], [82, 27]],
            square: [[90, 50], [50, 90], [10, 50], [50, 10], [90, 90], [10, 10], [10, 90], [90, 10]]
        },
        tasks: [],
        task_id: 0,
        chart_data: {
            datasets: [],
            labels: []
        },
        buffer: {
            cnt: 0,
            chart_data: {
                datasets: [],
                labels: []
            }
        },
        start_beat: false
    },
    getters: {
        dataset: state => {
            return state.datasets[state.dataset_name]
        },
        dataset_label:state=>{
            return state.dataset_names.find(x=>x.value == state.dataset_name).label
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        add_dataset(state, payload) {
            state.datasets[payload.name] = payload.dataset
            state.dataset_names.push({ label: payload.label, value: payload.name })
        },
        update_dataset(state, name) {
            state.dataset_name = name
        },
        add_task(state, task) {
            let colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#800040", "#8533ff", "#ff8c1a","#006600"]
            let color = colors.find(x => state.tasks.length==0 || state.tasks.findIndex(y => y.color == x) == -1)
            state.tasks.push({
                key: state.task_id++,
                dataset_label: state.dataset_names.find(x => x.value == state.dataset_name).label,
                color: color,
                ...task
            })
            state.chart_data.datasets.push({
                data: Array.from({ length: 0 }),
                backgroundColor: color,
                borderColor: color,
                fill: false,
                pointRadius: 1,
                pointHoverRadius: 2,
                hitRadius: 2,
                borderWidth: 2
            });
            if (!state.start_beat) {
                state.start_beat = true
                this.commit('beat')
            }
        },
        remove_task(state, key) {
            for (let key in state.buffer.chart_data.datasets) {
                state.buffer.chart_data.datasets[key].data.forEach(x => state.chart_data.datasets[key].data.push(x))
            }
            state.buffer.chart_data.datasets = []
            state.buffer.cnt = 0
            var index = state.tasks.findIndex(x => x.key == key)
            let task = state.tasks[index]
            state.chart_data.datasets = state.chart_data.datasets.filter(x => x.backgroundColor != task.color)
            if (index > -1) {
                state.tasks.splice(index, 1);
            }
        },
        beat(state) {
            state.tasks.forEach(task => {
                let finished = false

                finished = task.calc.step()
                let gen = task.calc.generation
                let seg = gen < 10 ? 1 : gen < 100 ? 10 : gen < 2000 ? 100 : 1000
                if (gen % seg == 0) {
                    let lastIndex = state.chart_data.datasets.map(dataset =>
                        dataset.backgroundColor === task.color).lastIndexOf(true);
                    if (state.buffer.chart_data.datasets[lastIndex] == undefined) {
                        state.buffer.chart_data.datasets[lastIndex] = { data: [] }
                    }
                    state.buffer.chart_data.datasets[lastIndex].data.push({
                        x: gen,
                        y: task.calc.best_route_length
                    });
                    if (state.chart_data.labels.length ==0 || state.chart_data.labels[state.chart_data.labels.length-1] < gen) {
                        state.chart_data.labels.push(gen.toString());
                    }
                    state.buffer.cnt += seg;
                }
                if (state.buffer.cnt > 10) {
                    for (let key in state.buffer.chart_data.datasets) {
                        state.buffer.chart_data.datasets[key].data.forEach(x => state.chart_data.datasets[key].data.push(x))
                    }
                    state.buffer.chart_data.datasets = []
                    state.buffer.cnt = 0
                }
                if (finished) {
                    state.chart_data.datasets.push({
                        data: Array.from({ length: 0 }),
                        backgroundColor: task.color,
                        borderColor: task.color,
                        fill: false,
                        pointRadius: 1,
                        pointHoverRadius: 2,
                        hitRadius: 2,
                        borderWidth: 2
                    });
                }
            });
            setTimeout(() => this.commit("beat"), 0)
        }
    }
})