import Vue from "vue";
import App from './App.vue';
import router from "./router";
import store from "./store";
import firebase from 'firebase'
import vuetify from './plugins/vuetify';
import "core-js";
import "regenerator-runtime/runtime";
import DateFilter from './filters/filter';
import EditMeetup from './components/Meetup/EditMeetup.vue';

Vue.config.productionTip = false;

Vue.filter('date', DateFilter);
Vue.component('edit-meetup', EditMeetup);

firebase.initializeApp({
  apiKey: "AIzaSyARrWz81xZH_I9urxA6MSdin5_wysYwOk4",
    authDomain: "ivica-events.firebaseapp.com",
    databaseURL: "https://ivica-events-default-rtdb.firebaseio.com",
    projectId: "ivica-events",
    storageBucket: "ivica-events.appspot.com",
    messagingSenderId: "380222076772",
    appId: "1:380222076772:web:4b2052d252acc65e822c71",
    measurementId: "G-ZER1Q04C4R"
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount("#app");
