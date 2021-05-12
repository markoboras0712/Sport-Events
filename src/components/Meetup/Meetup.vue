<template>
  <v-container mt-15>
    <v-layout row wrap>
      <v-flex xs12 class="text-center">
        <v-progress-circular
          indeterminate
          color="purple"
          :width="7"
          :size="100"
          v-if="loading"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="mx-auto">
          <v-img :src="meetup.imageUrl" height="200px"></v-img>

          <v-card-title> {{ meetup.title }} </v-card-title>

          <v-card-title>{{ meetup.date | date }}</v-card-title>

          <v-card-subtitle> {{ meetup.address }} </v-card-subtitle>

          <v-card-actions>
            <v-btn class="primary" text> Description </v-btn>
            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
            <v-btn class="primary" @click="registerUser">
              <v-icon>{{ registerIcon }}</v-icon>
              {{ userIsRegistered ? "Unregister" : "Register" }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="userIsCreator"
              class="primary"
              :to="'/meetups/edit-meetup/' + id"
            >
              Edit Meetup
            </v-btn>
            <v-btn
              v-if="userIsCreator"
              class="primary"
              :to="'/meetups/edit-meetupdatetime/' + id"
            >
              Edit Date and Time</v-btn
            >
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                {{ meetup.description }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mdiAccountPlus } from "@mdi/js";

export default {
  props: ["id"],
  data() {
    return {
      show: false,
      registerIcon: mdiAccountPlus,
    };
  },
  computed: {
    meetup() {
      return this.$store.getters.meetup(this.id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex((meetupId) => {
          return meetupId === this.$route.params.id;
        }) >= 0
      );
    },
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetups/edit-meetup/" + id);
    },
    registerUser() {
      if (this.userIsRegistered) {
        this.$store.dispatch("unRegisterUser", this.id).then(() => {
          console.log("Current user", this.$store.getters.user);
         
        });
      } else {
        this.$store.dispatch("registerUser", this.id).then(() => {
          console.log("Current user", this.$store.getters.user);
        });
      }
    },
    
  },
  
  created(){
      console.log('Trenutni user:', this.$store.getters.user);
    }
};
</script>
