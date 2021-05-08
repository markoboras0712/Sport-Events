<template>
  <v-container>
    <v-layout row wrap mt-15>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="mx-auto">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Sport Meetup</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0"> <v-icon>{{badges.flag}}</v-icon>Country </v-card-subtitle>

          <v-card-text class="text--primary">
            <div class="text-left">
              <div><v-icon>{{badges.town}}</v-icon>City</div>
              <div><v-icon>{{badges.address}}</v-icon>Address</div>
              <div><v-icon>{{badges.date}}</v-icon>Date</div>
            </div>
            
          </v-card-text>

          <v-card-actions>
            <v-btn light rounded color="blue" text><v-icon>{{badges.explore}}</v-icon> Explore </v-btn>
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
  }
  
}
</script>