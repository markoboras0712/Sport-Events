<template>
  <v-container mt-10>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="signIn">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="email" label="E-mail" id="email" v-model="email" type="email" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="password" label="Password" id="password" v-model="password" type="password" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" class="primary">Sign in</v-btn>
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
  data(){
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn(){
      this.$store.dispatch('signIn', {
        email : this.email,
        password: this.password
      })
      .then(()=> {
        this.$router.push('/meetups')
      })
    }
  }
}
</script>