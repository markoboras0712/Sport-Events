<template>
  <v-container mt-15>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="mx-auto">
          <v-img
            :src="meetup.imageUrl"
            height="200px"
          ></v-img>

          <v-card-title> {{meetup.title}} {{meetup.id}}</v-card-title>

          <v-card-subtitle> {{meetup.address}} </v-card-subtitle>

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
                {{meetup.description}}
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
  props:['id'],
  data() {
    return {
      show: false,
      registerIcon: mdiAccountPlus
    };
  },
  computed:{
    meetup(){
      return this.$store.getters.meetup(this.id);
    }
  }
};
</script>
