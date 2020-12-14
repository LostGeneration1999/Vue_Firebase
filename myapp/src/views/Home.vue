<template>
  <v-content id="container-full">
    <v-layout wrap row justify-center class="text-xs-center" color="primary">
      <v-card width="90%" class="mx-auto mt-5">
        <v-card-text>
          <v-form color="primary">
            <v-combobox
              multiple
              v-model="searchWord"
              placeholder="複数-OR検索"
              label="検索タグ"
              append-icon
              chips
              deletable-chips
              class="tag-input"
            ></v-combobox>
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
              <div class="boxContainer">
                <v-avatar class="box" color="primary" size="20">
                  <v-img :src="loginUser.photoURL"></v-img>
                </v-avatar>
                <v-card-subtitle class="box">{{ map.displayName }}</v-card-subtitle>
              </div>
              <v-card-subtitle>{{ map.createdAt }}</v-card-subtitle>
            </div>
            <div>
              <v-avatar
                class="ma-3"
                size="125"
                tile
                @click="expansionData(map.downloadURL, map.comment, map.tags)"
              >
                <v-img :src="map.downloadURL" height="300px"></v-img>
              </v-avatar>
              <v-btn color="red" text @click="deleteMap(map)" v-if="map.userID==loginUser.uid">削除</v-btn>
            </div>
          </div>
        </v-card>
        <v-dialog v-model="dialog" scrollable max-width="80%" max-height="100%">
          <v-card class="ma-2">
            <v-img :src="expansion.file" height="60%" width="100%"></v-img>
            <v-spacer />
            <v-card-text>{{ expansion.comment }}</v-card-text>
            <div>
              <v-chip v-for="tag in expansion.tags" :key="tag" color="#17204d" text-color="yellow">
                <v-icon left>label</v-icon>
                {{tag}}
              </v-chip>
            </div>
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
      searchWord: [],
      searchUser: "",
      loginUser: null,
      dialog: false,
      expansion: {
        file: null,
        comment: "",
        tags: null
      },
      maps_data: null
    };
  },
  created: async function() {
    this.loginUser = this.$store.getters.user;
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
    expansionData: function(downloadURL, comment, tags) {
      if (this.dialog == false) {
        this.expansion.file = downloadURL;
        this.expansion.comment = comment;
        this.expansion.tags = tags;
        if (comment == "") {
          this.expansion.comment = "No Comment";
        }
        this.dialog = true;
      }
    },
    deleteMap: function(data) {
      if (confirm(data.title + "の投稿を削除しますか？")) {
        deleteData(data.ID);
      }
    },
    search: async function() {
      this.pagingToken = "";
      if (this.searchWordInput.length > 0 || this.searchUserInput != "") {
        console.log(this.searchWordInput);
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
        this.loginUser = this.$store.getters.user;
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

.box {
  display: inline-block;
  font-size: 16px;
}

.boxContainer {
  font-size: 0;
}
</style>