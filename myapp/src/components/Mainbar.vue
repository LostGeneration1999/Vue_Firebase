<template>
  <header>
    <v-app-bar color="gray accent-4" dark app>
      <v-btn to="/" class="header-item">HOME</v-btn>
      <template v-if="isAuthenticated">
        <v-btn to="/" class="header-item" @click="logout()">ログアウト</v-btn>
        <v-btn to="/posts">投稿画面</v-btn>
      </template>
      <template v-if="!isAuthenticated">
        <v-btn to="/login" class="header-item">ログイン</v-btn>
        <v-btn to="/register" class="header-item">登録</v-btn>
      </template>
    </v-app-bar>
  </header>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.idToken !== null;
    }
  }
};
</script>