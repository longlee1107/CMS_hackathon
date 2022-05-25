import Vue from 'vue'
import App from './App.vue'
import './index.css'
import { router } from "@/routes";
import VCalendar from 'v-calendar';
import moment from 'moment';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
    componentPrefix: 'v', // Use <vc-calendar /> instead of <v-calendar />
});
Vue.use(Antd);




Vue.filter('formatDate', (value) => {
    if (value) {
        return moment(value).format('YYYY/MM/DD hh:mm')
    }
});
Vue.filter('formatMiliseconds', (value) => {
    if (value) {
        return moment(value).format('x')
    }
});

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')