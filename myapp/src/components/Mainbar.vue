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
      <v-toolbar-title class="title">Your Map</v-toolbar-title>
      <template v-if="isAuthenticated==null" v-slot:extension>
        <v-tabs align-with-title>
          <v-tab to="/login" class="header-item">ログイン</v-tab>
          <v-tab to="/register" class="header-item">登録</v-tab>
        </v-tabs>
      </template>
      <!-- 
      <template v-if="isAuthenticated" v-slot:extension>
        <v-tabs align-with-title>
          <v-tab to="/" class="header-item" @click="logout()">ログアウト</v-tab>
          <v-tab to="/posts" class="header-item">投稿</v-tab>
        </v-tabs>
      </template>-->
    </v-app-bar>
  </header>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.idToken !== null;
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