<template>
  <v-content>
    <v-card width="90%" class="mx-auto mt-5">
      <v-card-title>
        <h4 class="item--center">
          <font color="#00A5BF">Mind View</font>を始めよう！
        </h4>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            prepend-icon="mdi-account-circle"
            id="name"
            label="ユーザー名"
            v-model="displayName"
            type="text"
          />
          <v-text-field
            prepend-icon="mdi-account-circle"
            id="email"
            label="メールアドレス"
            v-model="email"
            type="email"
          />
          <v-text-field
            prepend-icon="mdi-lock"
            append-icon="mdi-eye-off"
            id="password"
            label="パスワード"
            v-model="password"
            type="password"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn dark color="#17204d" class="item--center" @click="register">登録</v-btn>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      displayName: ""
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", {
        email: this.email,
        password: this.password,
        displayName: this.displayName
      });
      (this.email = ""), (this.password = ""), (this.displayName = "");
    }
  }
};
</script>

<style scoped>
.item--center {
  margin-left: auto;
  margin-right: auto;
}
</style>