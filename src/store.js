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
        task_id: 0
    },
    getters: {
        dataset: state => {
            return state.datasets[state.dataset_name]
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
            state.tasks.push({
                key: state.task_id++,
                dataset_label: state.dataset_names.find(x => x.value == state.dataset_name).label,
                ...task
            })
            let calc = state.tasks[state.tasks.length - 1].calc
            calc.step()
            window.console.log(calc.best_route_length)
        },
        remove_task(state, key) {
            var index = state.tasks.findIndex(x=>x.key == key)
            if (index > -1) {
                state.tasks.splice(index, 1);
            }
        }
    }
})