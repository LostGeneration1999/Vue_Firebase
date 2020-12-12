<template>
  <v-content>
    <v-card width="90%" class="mx-auto mt-5">
      <v-card-title>
        <h4 class="item--center">
          <font color="#00A5BF">Mind Map</font>を投稿しよう！
        </h4>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="タイトル" v-model="data.title" type="text" />
          <v-textarea label="投稿の詳細" v-model="data.comment" />
          <img v-if="uploadImageUrl" height="300px" :src="this.uploadImageUrl" />
          <v-file-input
            v-model="imageFile"
            accept="image/*"
            show-size
            label="画像ファイルをアップロードしてください"
            prepend-icon="mdi-image"
            @change="onImagePicked"
          ></v-file-input>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn dark color="#17204d" class="item--center" @click="createMap">投稿</v-btn>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script>
import { uploadImage, postData } from "@/plugins/auth";
import moment from "moment";
import router from "@/router";
import firebase from "firebase";

export default {
  data() {
    return {
      imageFile: null,
      uploadImageUrl: null,
      data: {
        ID: null,
        displayName: null,
        userID: null,
        title: null,
        comment: null,
        createdAt: null
      }
    };
  },
  computed: {
    idToken: function() {
      return this.$store.getters.idToken;
    },
    getUser: function() {
      return this.$store.getters.displayName;
    },
    getUID: function() {
      return this.$store.getters.userID;
    }
  },
  methods: {
    createMap() {
      if (this.data.title != null && this.imageFile != null) {
        this.data.userID = this.getUID;
        this.data.displayName = this.getUser;
        this.data.ID =
          this.data.userID +
          Math.random()
            .toString(32)
            .substring(2);
        this.data.createdAt = firebase.firestore.Timestamp.fromDate(
          new Date(moment().format("YYYY-MM-DD HH:mm:ss"))
        );
        // Blobファイルでない例外処理
        uploadImage(this.imageFile, this.data.ID)
          .then(() => {
            postData(this.data);
          })
          .then(() => {
            router.push("/");
          })
          .catch(() => {
            alert("投稿に失敗しました");
          });
      } else {
        alert("画像・タイトルを含んで送信してください");
      }
    },
    onImagePicked(file) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.uploadImageUrl = fr.result;
        });
      } else {
        this.uploadImageUrl = "";
      }
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