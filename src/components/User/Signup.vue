<template>
  <v-container mt-15>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <v-alert
          border="left"
          color="red"
          dismissible
          @dismissed="onDismissed"
          type="error"
        >This user is already registered or you have entered wrong password or wrong email</v-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="signUp">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="E-mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="loading" :loading="loading" class="ma-2" color="secondary">
                      Sign up
                      </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      loader: null,
    };
  },

  methods: {
    signUp() {
      this.$store
        .dispatch("signUp", {
          email: this.email,
          password: this.password,
        })
        .then( () => {
        this.$router.push('/meetups');
      })
    
    },
    onDismissed () {
        this.$store.dispatch('clearError')
      }
  },
  watch:{
    loader(){
      const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
    },
    user(value){
      if(value !== null && value !== undefined){
        this.$router.push('/');
      }
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    loading(){
      return this.$store.getters.loading;
    },
    user(){
      return this.$store.getters.user;
    }
  },
};
</script>
