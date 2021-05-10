<template>
  <v-container mt-5>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create new Sport Event</h4>
      </v-flex>
    </v-layout>
    <v-layout row mt-10>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
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
                v-model="country"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="city"
                label="City"
                id="city"
                v-model="city"
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
                v-model="address"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <input type="file" @change="previewImage" accept="image/*" />
              <v-btn raised class="primary" @click="onUpload"
                >Upload Image</v-btn
              >
              <p></p>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150" />
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="description"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify="center">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date">{{ date }}</v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row justify="center">
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker format="ampm" v-model="time">{{
                time
              }}</v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row mt-10>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit"
                >Create Meetup</v-btn
              >
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      title: "",
      country: "",
      city: "",
      address: "",
      imageUrl: "",
      description: "",
      date: new Date().toISOString().substr(0, 10),
      time: new Date(),
      image: null,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.country !== "" &&
        this.city !== "" &&
        this.address !== "" &&
        this.description !== ""
      );
    },
    dateTime() {
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        let hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.setHours());
      }
      return date;
    },
  },
  methods: {
    onUpload() {},
    previewImage(event) {
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }

      const storage = firebase.storage();
      const uploadTask = storage
        .ref(`${this.imageData.name}`)
        .put(this.imageData);

      uploadTask.then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          
          const meetupData = {
            title: this.title,
            country: this.country,
            city: this.city,
            address: this.address,
            imageUrl: url,
            description: this.description,
            date: this.dateTime,
          };
          this.$store.dispatch("createMeetup", meetupData);
          this.$router.push("/meetups");
          console.log("link", url);
        });
      });

    },
  },
};
</script>
