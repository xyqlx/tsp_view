import Vue from 'vue';
import App from './App.vue';
import store from './store'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI)

Vue.config.productionTip = true;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
