<template>
  <div>
    <v-app-bar
      dark
      prominent
      src="https://myredmouse.com/wp-content/uploads/2019/04/Background-Header-1.jpg"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <v-btn light rounded to="/"
          ><v-icon>{{ basketballIcon }}</v-icon> SportEvent</v-btn
        >
        <v-btn v-if="userIsAuthenticated" @click="logout" class="primary">Logout</v-btn>
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-for="item in menuItems"
          :key="item.title"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {
  mdiViewListOutline,
  mdiMapMarkerPlus,
  mdiAccount,
  mdiAccountPlus,
  mdiLoginVariant,
  mdiBasketball,
} from "@mdi/js";
export default {
  name: "AppNavigation",
  data() {
    return {
      drawer: false,
      group: null,
      basketballIcon: mdiBasketball,
    };
  },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    menuItems() {
      let menuItems = [
        { icon: mdiAccountPlus, title: "Sign up", link: "/signup" },
        { icon: mdiLoginVariant, title: "Sign in", link: "/signin" },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: mdiViewListOutline, title: "View Meetups", link: "/meetups" },
          {
            icon: mdiMapMarkerPlus,
            title: "Organize Meetup",
            link: "/meetup/new",
          },
          { icon: mdiAccount, title: "Profile", link: "/profile" },
        ];
      }
      return menuItems;
    },
  },
  methods:{
    logout(){
      this.$store.dispatch('logout');
      this.$router.push('/signin');
      
      
    }
  }
};
</script>

<style scoped></style>
