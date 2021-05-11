<template>
  <v-container mt-5>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Edit Date and Time</h4>
      </v-flex>
    </v-layout>
    <v-layout row mt-10>
      <v-flex xs12>
        <form @submit.prevent="saveMeetup">
          <v-layout row justify="center">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="loadedMeetup.date">{{
                loadedMeetup.date
              }}</v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row justify="center">
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker format="ampm" v-model="loadedMeetup.time">{{
                loadedMeetup.time
              }}</v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row mt-10>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" type="submit">Save Meetup </v-btn>
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
      loadedMeetup: {
        title: "",
        description: "",
        city: "",
        country: "",
        address: "",
        date: new Date().toISOString().substr(0, 10),
        time: new Date(),
        creatorId: "",
        imageUrl: "",
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
        console.log("res", res);
        this.loadedMeetup = {
          title: res.data.title,
          description: res.data.description,
          city: res.data.city,
          country: res.data.country,
          address: res.data.address,
          date: new Date(res.data.date).toISOString().substr(0, 10),
          creatorId: res.data.creatorId,
          imageUrl: res.data.imageUrl,
          time: new Date(),
        };
        console.log("Loaded Meetup", this.loadedMeetup);
      });
  },
  methods: {
    saveMeetup() {
      this.$store.dispatch("editMeetup", {
        ...this.loadedMeetup,
        id: this.id,
        date: this.dateTime
      });
      this.$router.push("/");
    },
  },
  computed: {
    dateTime() {
      const date = new Date(this.loadedMeetup.date);
      if (typeof this.loadedMeetup.time === "string") {
        let hours = this.loadedMeetup.time.match(/^(\d+)/)[1];
        const minutes = this.loadedMeetup.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.loadedMeetup.time.getHours());
        date.setMinutes(this.loadedMeetup.time.setHours());
      }
      return date;
    },
  },
};
</script>
