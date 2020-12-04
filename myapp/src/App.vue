<template>
  <v-app id="app">
    <MainBar />
    <router-view />
  </v-app>
</template>

<script>
import MainBar from "@/components/Mainbar";

export default {
  components: { MainBar },
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