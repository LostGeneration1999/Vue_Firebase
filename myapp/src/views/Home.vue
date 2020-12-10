<template>
  <v-content id="container-full">
    <v-layout xs12 mt-3 px-10 py-3 wrap row justify-center class="text-xs-center" color="primary">
      <v-form color="primary">
        <v-text-field v-model="searchWord" placeholder="1ワードまで" label="検索ワード(タイトル名)" type="text" />
        <v-text-field v-model="searchUser" placeholder="1ユーザーまで" label="検索ユーザー" type="text" />
        <p>検索タイトル「{{searchWordInput}}」 検索ユーザー「{{searchUserInput}}」で検索します！！</p>
        <v-btn @click="search" color="primary">検索</v-btn>
      </v-form>
    </v-layout>
    <v-row class="text-center">
      <v-col
        v-for="map in maps_data"
        text-xs-center
        :key="map.id"
        cols="12"
        sm="10"
        md="6"
        lg="4"
        xl="3"
        class="border text-center"
      >
        <v-card class="ma-2" max-width="500px" center @click="expansion(map.downloadURL)">
          <v-img :src="map.downloadURL" height="300px"></v-img>
          <v-card-title aliign-center class="title headline">{{ map.title }}</v-card-title>
          <v-card-text>{{ map.comment }}</v-card-text>
          <v-divider class="mx-3"></v-divider>
          <v-card-subtitle>{{ map.createdAt }}</v-card-subtitle>
          <v-card-subtitle>{{ map.displayName }}さんの投稿</v-card-subtitle>
          <v-btn @click="deleteMap(map.ID)" v-if="map.userID==loginUser">削除</v-btn>
        </v-card>
        <v-dialog v-model="dialog" scrollable max-width="80%" max-height="100%">
          <img :src="expansion_file" height="60%" width="60%" />
        </v-dialog>
      </v-col>
      <v-btn wrap row justify-center v-if="pagingToken" @click="nextPaging();" color="primary">次のページ</v-btn>
    </v-row>
  </v-content>
</template>

<script>
import { getAllData, getSearchData, downloadImageToBox } from "@/plugins/auth";

export default {
  data() {
    return {
      pagingToken: "",
      searchWord: "",
      searchUser: "",
      loginUser: null,
      dialog: false,
      expansion_file: null,
      maps_data: null
    };
  },
  mounted: async function() {
    this.loginUser = this.$store.getters.userID;
    let data = await getAllData(3, this.pagingToken);
    const buffData = await downloadImageToBox(data.BuffData);
    this.maps_data = buffData;
    this.pagingToken = data.nextPageToken;
  },
  watch: {
    maps_data: async function() {}
  },
  computed: {
    searchWordInput: function() {
      return this.searchWord;
    },
    searchUserInput: function() {
      return this.searchUser;
    }
  },
  methods: {
    nextPaging: async function() {
      let data = [];
      if (this.searchWordInput != "" && this.searchUserInput != "") {
        data = await getAllData(3, this.pagingToken);
      } else {
        data = await getSearchData(
          3,
          this.searchWordInput,
          this.searchUserInput,
          this.pagingToken
        );
      }
      let buffData = await downloadImageToBox(data.BuffData);
      this.maps_data = this.maps_data.concat(buffData);
      this.pagingToken = data.nextPageToken;
    },
    expansion: function(imagefile) {
      if (this.dialog == false) {
        this.expansion_file = imagefile;
        this.dialog = true;
      } else {
        this.expansion_file = null;
        this.dialog = true;
      }
    },
    deleteMap: function(ID) {
      alert(ID + "の投稿を削除します");
    },
    search: async function() {
      this.pagingToken = "";
      if (this.searchWordInput != "" || this.searchUserInput != "") {
        alert(
          "ワード: 「" +
            this.searchWordInput +
            "」| ユーザー: 「" +
            this.searchUserInput +
            "」で検索します"
        );
        let data = await getSearchData(
          3,
          this.searchWordInput,
          this.searchUserInput,
          this.pagingToken
        );
        let buffData = await downloadImageToBox(data.BuffData);
        this.maps_data = buffData;
        this.pagingToken = data.nextPageToken;
      } else {
        this.pagingToken = "";
        this.loginUser = this.$store.getters.userID;
        let data = await getAllData(3, this.pagingToken);
        let buffData = await downloadImageToBox(data.BuffData);
        this.maps_data = buffData;
        this.pagingToken = data.nextPageToken;
      }
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}
.header-item {
  padding: 10px;
  cursor: pointer;
}
</style>