<template>
  <v-container mt-5>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Edit your event</h4>
      </v-flex>
    </v-layout>
    <v-layout row mt-10>
      <v-flex xs12>
        <form @submit.prevent="saveMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="loadedMeetup.title"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="country"
                label="Country"
                id="country"
                v-model="loadedMeetup.country"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="city"
                label="City"
                v-model="loadedMeetup.city"
                id="city"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="address"
                label="Address"
                id="address"
                v-model="loadedMeetup.address"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="loadedMeetup.description"
                multi-line
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row mt-10>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" type="submit" 
                >Save Meetup 
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      loadedMeetup : {
          title: '',
          description: '',
          city: '',
          country : '',
          address : '',
          date : '',
          creatorId : '',
          imageUrl : ''
      },
    };
  },
  beforeMount() {
    return axios
      .get(
        "https://ivica-events-default-rtdb.firebaseio.com/meetups/" +
          this.id +
          ".json"
      )
      .then((res) => {
          console.log('res',res);
        this.loadedMeetup = {
            title : res.data.title,
            description : res.data.description,
            city : res.data.city,
            country : res.data.country,
            address : res.data.address,
            date : res.data.date,
            creatorId : res.data.creatorId,
            imageUrl : res.data.imageUrl
        }
        console.log(this.loadedMeetup);
      });
  },
  methods:{
      saveMeetup(){
          this.$store.dispatch('editMeetup', {
              ...this.loadedMeetup, id: this.id
          })
          this.$router.push('/');
          
          
      }
  }
};
</script>
