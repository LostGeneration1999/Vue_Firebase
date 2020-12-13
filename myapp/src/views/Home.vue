<template>
  <v-content id="container-full">
    <v-layout wrap row justify-center class="text-xs-center" color="primary">
      <v-card width="90%" class="mx-auto mt-5">
        <v-card-text>
          <v-form color="primary">
            <v-text-field
              v-model="searchWord"
              placeholder="1ワードまで"
              label="検索ワード(タイトル名)"
              type="text"
            />
            <v-text-field v-model="searchUser" placeholder="1ユーザーまで" label="検索ユーザー" type="text" />
          </v-form>
          <v-card-actions>
            <v-btn @click="search" dark color="#17204d" class="item--center">検索</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
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
        <v-card class="ma-2">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title>{{ map.title }}</v-card-title>
              <v-card-subtitle>By {{ map.displayName }}</v-card-subtitle>
              <v-card-subtitle>{{ map.createdAt }}</v-card-subtitle>
            </div>
            <div>
              <v-avatar
                class="ma-3"
                size="125"
                tile
                @click="expansion(map.downloadURL, map.comment)"
              >
                <v-img :src="map.downloadURL" height="300px"></v-img>
              </v-avatar>
              <v-btn color="red" text @click="deleteMap(map)" v-if="map.userID==loginUser">削除</v-btn>
            </div>
          </div>
        </v-card>
        <v-dialog v-model="dialog" scrollable max-width="80%" max-height="100%">
          <v-card class="ma-2">
            <v-img :src="expansion_file" height="60%" width="100%"></v-img>
            <v-card-text>{{ expansion_text }}</v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
      <v-btn
        wrap
        row
        dark
        justify-center
        width="90%"
        class="mx-auto mt-5 text"
        height="50px"
        v-if="pagingToken"
        @click="nextPaging();"
        color="#17204d"
      >次のページ</v-btn>
    </v-row>
  </v-content>
</template>

<script>
import {
  getAllData,
  getSearchData,
  downloadImageToBox,
  deleteData
} from "@/plugins/auth";

export default {
  data() {
    return {
      pagingToken: "",
      searchWord: "",
      searchUser: "",
      loginUser: null,
      loginUserName: null,
      dialog: false,
      expansion_file: null,
      expansion_text: "",
      maps_data: null
    };
  },
  mounted: async function() {
    this.loginUser = this.$store.getters.userID;
    this.loginUserName = this.$store.getters.displayName;
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
      if (this.searchWordInput == "" && this.searchUserInput == "") {
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
    expansion: function(imagefile, text) {
      if (this.dialog == false) {
        this.expansion_file = imagefile;
        this.expansion_text = text;
        if (text == "") {
          this.expansion_text = "No Comment";
        }
        this.dialog = true;
      } else {
        this.expansion_file = null;
        this.expansion_text = "";
        this.dialog = false;
      }
    },
    deleteMap: function(data) {
      if (confirm(data.title + "の投稿を削除しますか？")) {
        deleteData(data.ID);
      }
    },
    search: async function() {
      this.pagingToken = "";
      if (this.searchWordInput != "" || this.searchUserInput != "") {
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

.text {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  color: yellow;
}
</style>