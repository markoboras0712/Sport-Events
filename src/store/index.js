import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import "core-js";
import Cookie from "js-cookie";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    meetups: [
      {
        imageUrl: "",
        id: "",
        title: "",
        date: new Date(),
        country: "",
        city: "",
        address: "",
      },
    ],
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  mutations: {
    CREATE_MEETUP(state, payload) {
      state.meetups.push(payload);
    },
    ADD_USER(state, payload) {
      state.user = payload;
    },
    LOAD_MEETUPS(state, payload) {
      state.meetups = payload;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    CLEAR_TOKEN(state) {
      state.token = null;
    },
    EDIT_MEETUP(state, payload) {
      const index = state.meetups.findIndex((meet) => meet.id === payload.id);
      state.meetups[index] = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
    REGISTER_USER(state,payload){
      const id = payload.id;
      if(state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0){
        return ;
      }
      state.user.registeredMeetups.push(id);
      state.user.fbKeys[id] = payload.fbKey;
    },
    UNREGISTER_USER(state,payload){
      const registeredMeetups = state.user.registeredMeetups;
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload),1)
      Reflect.deleteProperty(state.user.fbKeys,payload)
    }
  },
  actions: {
    createMeetup(context, payload) {
      const meetup = {
        title: payload.title,
        country: payload.country,
        city: payload.city,
        address: payload.address,
        description: payload.description,
        date: payload.date,
        creatorId: context.getters.user.id,
        imageUrl: payload.imageUrl,
      };

      return axios
        .post(
          "https://ivica-events-default-rtdb.firebaseio.com/meetups.json",
          meetup
        )
        .then((data) => {
          context.commit("CREATE_MEETUP", { ...meetup, id: data.data.name });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    registerUser(context,payload){
      context.commit('SET_LOADING',true);
      const user = context.getters.user;
      return axios.post( 'https://ivica-events-default-rtdb.firebaseio.com/users/' + user.id + '/registrations.json' , {
          id: payload
        } )
        .then((data) => {
          
          context.commit('SET_LOADING',false);
          context.commit('REGISTER_USER', {id: payload , fbKey : data.data.name})
        })
        .catch((error) => {
          console.log(error);
        })
    },
    unRegisterUser(context,payload){
      context.commit('SET_LOADING',true);
      const user = context.getters.user;
      if(!user.fbKeys){
        return ;
      }
      const fbKey = user.fbKeys[payload]
      return axios.delete('https://ivica-events-default-rtdb.firebaseio.com/users/' + user.id + `/registrations/${fbKey}.json`)
      .then((data) => {
        console.log(data);
        context.commit('SET_LOADING',false);
        context.commit('UNREGISTER_USER', payload);
      })
      .catch((error) => {
        console.log(error);
        context.commit('SET_LOADING',error);
      })
    },
    getUserRegistrations(context){
      context.commit('SET_LOADING');
      return axios.get('https://ivica-events-default-rtdb.firebaseio.com/users/'  + context.getters.user.id + '/registrations.json')
      .then((result)=> {
        const fetchedMeetups = [];
        const fbKeys = {};
        
          for (const key in result.data) {
            fetchedMeetups.push(result.data[key].id);
            
            fbKeys[result.data[key].id] =  key
            
          }
          const updatedUser = {
            id : context.getters.user.id,
            registeredMeetups : fetchedMeetups,
            fbKeys : fbKeys
          };
          
          context.commit('SET_LOADING',false);
          context.commit('ADD_USER', updatedUser);
          
       
      }).then((error) => {
        console.log(error);
      })
    },
    loadMeetups(context) {
      context.commit('SET_LOADING',true);
      return axios
        .get("https://ivica-events-default-rtdb.firebaseio.com/meetups.json")
        .then((data) => {
          const fetchedMeetups = [];
          for (const key in data.data) {
            fetchedMeetups.push({ ...data.data[key], id: key });
          }
          context.commit("LOAD_MEETUPS", fetchedMeetups);
          context.commit('SET_LOADING',false);
        })
        .catch((error) => {
          console.log(error);
          context.commit('SET_LOADING',false);
        });
    },
    editMeetup(context, payload) {
      context.commit("SET_LOADING", true);
      const editedMeetup = {
        title: payload.title,
        country: payload.country,
        city: payload.city,
        address: payload.address,
        date: payload.date,
        description: payload.description,
        creatorId: payload.creatorId,
        imageUrl: payload.imageUrl,
      };
      return axios
        .put(
          "https://ivica-events-default-rtdb.firebaseio.com/meetups/" +
            payload.id +
            ".json",
          editedMeetup
        )
        .then((data) => {
         
          console.log(data);
          context.commit('SET_LOADING',false);
          context.commit("EDIT_MEETUP", payload);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signUp(context, payload) {
      context.commit('SET_LOADING',true);
      context.commit('CLEAR_ERROR');
      return axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARrWz81xZH_I9urxA6MSdin5_wysYwOk4",
          {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }
        )
        .then((result) => {
          context.commit('SET_LOADING',false);
          context.commit("SET_TOKEN", result.data.idToken);
          localStorage.setItem("token", result.data.idToken);
          localStorage.setItem("tokenExpiration" , 
          new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000);
          Cookie.set("jwt", result.data.idToken);
          Cookie.set("expirationDate", new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000)
                        
          const newUser = {
            id: result.data.localId,
            registeredMeetups: [],
            fbKeys : {}
          };
          context.commit("ADD_USER", newUser);
        })
        .catch((error) => {
          console.log(error);
          context.commit('SET_LOADING',false);
          context.commit('SET_ERROR',error);
        });
    },
    signIn(context, payload) {
      context.commit('SET_LOADING',true);
      context.commit('CLEAR_ERROR');
      return axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARrWz81xZH_I9urxA6MSdin5_wysYwOk4",
          {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }
        )
        .then((result) => {
          console.log(result);
          context.commit('SET_LOADING',false);
          context.commit("SET_TOKEN", result.data.idToken);
          localStorage.setItem("token", result.data.idToken);
          localStorage.setItem("tokenExpiration" , 
          new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000);
          Cookie.set("jwt", result.data.idToken);
          Cookie.set("expirationDate", new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000)
                        
          const newUser = {
            id: result.data.localId,
            registeredMeetups: [],
            fbKeys : {}
          };
          
          context.commit("ADD_USER", newUser);
        })
        .catch((error) => {
          context.commit('SET_LOADING',false);
          context.commit('SET_ERROR',error);
          console.log(error);
        });
    },
    initAuth(vuexContext,req){
      let token;
      let expirationDate;
      console.log(vuexContext);
      if(req){
          if(!req.headers.cookie){
              return;
          }
          const jwtCookie = req.headers.cookie.split(';')
          .find(c=> c.trim().startsWith("jwt="));
          if(!jwtCookie){
              return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie.split(';')
          .find(c=> c.trim().startsWith("expirationDate=") ).split("=")[1];
      }else {
          token = localStorage.getItem("token");
       expirationDate = localStorage.getItem("tokenExpiration");
      }
       

      if(new Date().getTime() > +expirationDate || !token){
          console.log("No token or invalid token");
          vuexContext.dispatch("logout");
          return;
      }
      
      vuexContext.commit("SET_TOKEN", token);
  },
    logout(context) {
      context.commit("CLEAR_TOKEN");
      localStorage.removeItem("token");
      context.commit("ADD_USER", null);
    },
    clearError(context){
      context.commit('CLEAR_ERROR');
    }
  },
  getters: {
    meetups(state) {
      return state.meetups;
    },

  

    meetup(state) {
      return (meetupId) => {
        return state.meetups.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state){
      return state.error;
    }
  },
});
