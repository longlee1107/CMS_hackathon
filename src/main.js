import Vue from 'vue'
import App from './App.vue'
import './index.css'
import {router} from "@/routes";
import VCalendar from 'v-calendar';

Vue.config.productionTip = false

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'v',  // Use <vc-calendar /> instead of <v-calendar />
});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
