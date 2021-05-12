<template>
  <v-container>
    <v-layout row wrap mt-15 v-for="meetup in meetups" :key="meetup.id" :id="meetup.id">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="mx-auto">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="meetup.imageUrl"
          >
            <v-card-title>{{meetup.title}}</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0"> <v-icon>{{badges.flag}}</v-icon>{{meetup.country}} </v-card-subtitle>

          <v-card-text class="text--primary">
            <div class="text-left">
              <div><v-icon>{{badges.town}}</v-icon>{{meetup.city}}</div>
              <div><v-icon>{{badges.address}}</v-icon>{{meetup.address}}</div>
              <div><v-icon>{{badges.date}}</v-icon>{{meetup.date | date}}</div>
            </div>
            
          </v-card-text>

          <v-card-actions>
            <v-btn light rounded color="blue" :to="'/meetups/' + meetup.id"><v-icon>{{badges.explore}}</v-icon> Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mdiFlag,mdiCity,mdiMapMarker, mdiCalendarRange ,mdiFileFind} from '@mdi/js';
export default {
  data(){
    return {
      badges: {
        flag: mdiFlag,
        town: mdiCity,
        address: mdiMapMarker,
        date: mdiCalendarRange,
        explore: mdiFileFind
      }
    }
  },
  computed:{
    meetups(){
      return this.$store.getters.meetups;
    }
  },
  created(){
      this.$store.dispatch('loadMeetups');
      
    }
  
}
</script>