<template>
  <v-container mt-15>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel
          cycle
          height="500"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <template v-slot:prev="{ on, attrs }">
            <v-btn color="success" v-bind="attrs" v-on="on"
              >Previous event</v-btn
            >
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn color="info" v-bind="attrs" v-on="on">Next event</v-btn>
          </template>
          <v-carousel-item v-for="meetup in meetups" :src="meetup.imageUrl" :key="meetup.id" @click="onLoadMeetup(meetup.id)" >
            
              <v-row class="fill-height" align="center" justify="center">
                <div class="title">{{ meetup.title }} </div>
              </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-10">
      <v-flex xs12 sm6>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/7stqLIRLBBg" allowfullscreen></iframe>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/LTHoS9d-EaI"  allowfullscreen></iframe>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>


export default {
  name: "Home",
  computed: {
    meetups(){
      return this.$store.getters.featuredMeetups;
    }
  },
  methods: {
      onLoadMeetup (id) {
        this.$router.push('/meetups/' + id)
      }
    }
  
};
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
