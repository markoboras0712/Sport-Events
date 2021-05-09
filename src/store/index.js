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
          "https://images.adsttc.com/media/images/5012/a894/28ba/0d14/7d00/0218/large_jpg/stringio.jpg?1414022708",
        id: "afajfjadfaadfa323",
        title: "Meetup in Arena Zagreb",
        date: new Date(),
        country: 'Croatia',
        city: 'Zagreb',
        address: 'Ulica Kralja Petra Svacica 1c'
      },
      {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/7/7b/Dvorana_Gradski_vrt_9.jpg",
        id: "aadsfhbkhlk1241",
        title: "Meetup in Gradski Vrt Osijek",
        date:  new Date(),
        country: 'Croatia',
        city: 'Osijek',
        address: 'Ulica Kralja Petra Svacica 1c'
      },
    ],
    user: null,
    
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
        
      }
      return axios.post('https://ivica-events-default-rtdb.firebaseio.com/meetups.json', meetup)
      .then(data => {
          console.log(data);
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
        console.log(result);
        
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
        
        console.log(result);
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
