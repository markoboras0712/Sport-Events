import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Meetups from '../components/Meetup/Meetups.vue';
import CreateMeetup from '../components/Meetup/CreateMeetup.vue';
import Profile from '../components/User/Profile.vue';
import Signup from '../components/User/Signup.vue';
import Signin from '../components/User/Signin.vue';
import Meetup from '../components/Meetup/Meetup.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups
  },
  {
    path: '/meetup/new',
    name: 'CreateMeetup',
    component: CreateMeetup
  },
  {
    path:'/meetups/:id',
    name: 'Meetup',
    props:true,
    component: Meetup
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  }
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
