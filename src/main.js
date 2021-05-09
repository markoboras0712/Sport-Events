import Vue from "vue";
import App from './App.vue';
import router from "./router";
import store from "./store";

import vuetify from './plugins/vuetify';
import "core-js";
import "regenerator-runtime/runtime";
import DateFilter from './filters/filter';

Vue.config.productionTip = false;

Vue.filter('date', DateFilter);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount("#app");
