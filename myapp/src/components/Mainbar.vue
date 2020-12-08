<template>
  <header>
    <v-app-bar
      app
      color="#17204d"
      absolute
      dark
      shrink-on-scroll
      fade-img-on-scroll
      prominent
      scroll-target="#scrolling-techniques-5"
      scroll-threshold="500"
    >
      <v-toolbar-title v-if="isAuthenticated" class="title">ようこそ、{{showName}}さん</v-toolbar-title>
      <v-toolbar-title v-if="!isAuthenticated" class="title">ようこそ、ゲストさん</v-toolbar-title>
      <template v-if="!isAuthenticated" v-slot:extension>
        <v-tabs align-with-title>
          <v-tab to="/" class="header-item">HOME</v-tab>
          <v-tab to="/login" class="header-item">SignIN</v-tab>
          <v-tab to="/register" class="header-item">SignUP</v-tab>
        </v-tabs>
      </template>
      <template v-else v-slot:extension>
        <v-tabs align-with-title>
          <v-tab to="/" class="header-item">HOME</v-tab>
          <v-tab to="/" class="header-item" @click="logout()">SignOUT</v-tab>
          <v-tab to="/posts" class="header-item">投稿</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </header>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.idToken !== null;
    },
    showName() {
      return this.$store.getters.displayName;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
.title {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  color: yellow;
}
</style>