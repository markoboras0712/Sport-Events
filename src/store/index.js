import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import 'core-js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    meetups: [
      {
        imageUrl:
          "",
        id: "",
        title: "",
        date: new Date(),
        country: '',
        city: '',
        address: ''
      },
    ],
    user: null,
    token: null
    
  },
  mutations: {
    CREATE_MEETUP(state,payload){
      state.meetups.push(payload);
    },
    ADD_USER(state,payload){
      state.user = payload;
    },
    LOAD_MEETUPS(state,payload){
      state.meetups = payload;
    },
    SET_TOKEN(state,token){
      state.token = token;
    },
    CLEAR_TOKEN(state){
      state.token = null;
    }
    
    
  },
  actions: {
    createMeetup(context,payload){
      const meetup = {
        title : payload.title,
        country : payload.country,
        city: payload.city,
        address: payload.address,
        imageUrl : payload.imageUrl,
        description: payload.description,
        date : payload.date,
        creatorId : context.getters.user.id

      }
      return axios.post('https://ivica-events-default-rtdb.firebaseio.com/meetups.json', meetup)
      .then(data => {
          
          context.commit('CREATE_MEETUP', {...meetup, id: data.data.name});
      })
      .catch(error=> {
        console.log(error);
      })
      
    },
    loadMeetups(context){
      return axios.get('https://ivica-events-default-rtdb.firebaseio.com/meetups.json')
      .then(data => {
        
          const fetchedMeetups = [];
          for(const key in data.data){
            fetchedMeetups.push({...data.data[key], id: key})
          }
          context.commit('LOAD_MEETUPS',fetchedMeetups);
      })
      .catch(error=> {
        console.log(error);
      })
    },
    signUp(context,payload){
      
      return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARrWz81xZH_I9urxA6MSdin5_wysYwOk4' , {
        email : payload.email,
        password: payload.password,
        returnSecureToken : true
      })
      .then(result => {
        console.log(result.data);
        context.commit('SET_TOKEN', result.data.idToken );
        localStorage.setItem("token", result.data.idToken);
        const newUser = {
          id: result.data.localId,
          registeredMeetups: []
        }
        context.commit('ADD_USER',newUser)
        
      })
      .catch(error=> {
        
        console.log(error);
      })
    },
    signIn(context,payload){
      ;
      return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARrWz81xZH_I9urxA6MSdin5_wysYwOk4' , {
        email : payload.email,
        password: payload.password,
        returnSecureToken : true
      })
      .then(result => {
        context.commit('SET_TOKEN', result.data.idToken );
        localStorage.setItem("token", result.data.idToken);
        const newUser = {
          id: result.data.localId,
          registeredMeetups: []
        }
        context.commit('ADD_USER',newUser)
        
      })
      .catch(error=> {
        
        console.log(error);
      })
    },
    logout(context){
      context.commit('CLEAR_TOKEN');
      localStorage.removeItem("token");
      context.commit('ADD_USER', null);
    }
    
    
    
  },
  getters: {
    meetups (state) {
      return state.meetups;
    },
    
    featuredMeetups(state,getters){
      return getters.meetups.slice(0,5);
    },
    
    
    meetup (state) {
      return (meetupId) => {
        return state.meetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user(state){
      return state.user;
    },
    
  },
});
