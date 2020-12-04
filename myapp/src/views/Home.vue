<template>
  <v-content id="container-full">
    <v-row class="text-center">
      <v-col
        v-for="map in maps"
        text-xs-center
        :key="map.id"
        cols="12"
        sm="10"
        md="6"
        lg="4"
        xl="3"
        class="border text-center"
      >
        <v-card class="ma-2" max-width="500px" center @click="getData(map);">
          <v-img :src="map.downloadURL" height="300px"></v-img>
          <v-card-title aliign-center class="title headline">{{ map.name }}</v-card-title>
          <v-card-text>{{ map.comment }}</v-card-text>
          <v-divider class="mx-3"></v-divider>
          <v-card-subtitle>{{ map.moment }}</v-card-subtitle>
        </v-card>
        <v-dialog v-model="dialog" scrollable max-width="80%" max-height="100%">
          <img :src="map.downloadURL" height="100%" width="100%" />
        </v-dialog>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import firebase from "firebase";
import { getAllData } from "@/plugins/auth";

export default {
  data() {
    return {
      dialog: false,
      maps: null
    };
  },
  mounted: async function() {
    this.maps = await getAllData().then(res => {
      return res;
    });
  },
  methods: {
    getData: function(map) {
      (this.image = null), (this.name = map.name);
      this.theme = map.theme;
      this.number = map.number;
      this.comment = map.comment;
      this.moment = map.moment;
      const spaceRef = firebase
        .storage()
        .ref()
        .child(map.imageURl);
      spaceRef.getDownloadURL().then(url => {
        this.image = url;
        this.dialog = true;
      });
    },
    toUsers() {
      this.$router.push({
        name: "users-id-profile",
        params: { id: this.$store.userUID }
      });
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