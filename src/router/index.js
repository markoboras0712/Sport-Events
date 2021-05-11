import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Meetups from '../components/Meetup/Meetups.vue';
import CreateMeetup from '../components/Meetup/CreateMeetup.vue';
import Profile from '../components/User/Profile.vue';
import Signup from '../components/User/Signup.vue';
import Signin from '../components/User/Signin.vue';
import Meetup from '../components/Meetup/Meetup.vue';
import AuthGuard from './auth-guard';
import EditMeetup from '../components/Meetup/EditMeetup.vue';
import EditMeetupDateTime from '../components/Meetup/EditMeetupDateTime.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: AuthGuard
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups,
    beforeEnter: AuthGuard
  },
  {
    path: '/meetup/new',
    name: 'CreateMeetup',
    component: CreateMeetup,
    beforeEnter: AuthGuard
  },
  {
    path:'/meetups/:id',
    name: 'Meetup',
    props:true,
    component: Meetup,
    beforeEnter: AuthGuard
  },
  {
    path:'/meetups/edit-meetup/:id',
    name:'Edit Meetup',
    props:true,
    component: EditMeetup,
    beforeEnter: AuthGuard
  },
  {
    path:'/meetups/edit-meetupdatetime/:id',
    name:'Edit Date Time',
    props:true,
    component: EditMeetupDateTime,
    
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: AuthGuard
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
