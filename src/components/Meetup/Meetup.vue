<template>
  <v-container mt-15>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="mx-auto">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          ></v-img>

          <v-card-title> Sport Meetup </v-card-title>

          <v-card-subtitle> Address </v-card-subtitle>

          <v-card-actions>
            <v-btn class="primary" text> Description </v-btn>
            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="primary"><v-icon>{{registerIcon}}</v-icon>Register</v-btn>
            
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than
                he could deliver. You won't have time for sleeping, soldier, not
                with all the bed making you'll be doing. Then we'll go with that
                data file! Hey, you add a one and two zeros to that or we walk!
                You're going to do his laundry? I've got to find a way to
                escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mdiAccountPlus } from '@mdi/js';
export default {
  data() {
    return {
      show: false,
      registerIcon: mdiAccountPlus
    };
  },
};
</script>
