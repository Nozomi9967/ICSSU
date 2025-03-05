import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';
import Calendar from '@toast-ui/vue-calendar';
import 'tui-calendar/dist/tui-calendar.css';

Vue.use(ElementUI)
Vue.component('toast-ui-calendar', Calendar);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
