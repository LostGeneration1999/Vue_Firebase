<template>
  <v-app id="app">
    <Mainbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Mainbar from "./components/Mainbar";

export default {
  components: { Mainbar },
  data() {
    return {
      displayName: null,
      userUID: null
    };
  },
  computed: {
    showName() {
      return this.$store.getters.displayName;
    },
    isAuthenticated() {
      return this.$store.getters.idToken !== null;
    }
  },
  methods: {
    showAuth() {
      return this.$store.getters.idToken;
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>