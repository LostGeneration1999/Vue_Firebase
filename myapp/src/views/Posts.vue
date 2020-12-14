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
          <v-combobox
            multiple
            v-model="select"
            label="Tags"
            append-icon
            chips
            deletable-chips
            class="tag-input"
            :search-input.sync="search"
            @keyup.tab="updateTags"
            @paste="updateTags"
          ></v-combobox>
          <div align="center">
            <img v-if="uploadImageUrl" height="170px" :src="this.uploadImageUrl" />
          </div>
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
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>
  </v-content>
</template>

<script>
import { uploadImage, postData } from "@/plugins/auth";
import moment from "moment";
import router from "@/router";
import firebase from "firebase";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  data() {
    return {
      imageFile: null,
      uploadImageUrl: null,
      isLoading: false,
      select: ["就活", "性格", "関心"],
      search: "",
      data: {
        ID: null,
        displayName: null,
        userID: null,
        title: null,
        comment: null,
        createdAt: null,
        tags: []
      }
    };
  },
  components: {
    loading: Loading
  },
  computed: {
    getUser: function() {
      return this.$store.getters.user.displayName;
    },
    getUID: function() {
      return this.$store.getters.user.uid;
    }
  },
  methods: {
    createMap() {
      if (this.data.title != null && this.imageFile != null) {
        this.isLoading = true;
        this.data.userID = this.getUID;
        this.data.tags = this.select;
        this.data.displayName = this.getUser;
        this.data.ID =
          this.data.userID +
          Math.random()
            .toString(32)
            .substring(2);
        this.data.createdAt = firebase.firestore.Timestamp.fromDate(
          new Date(moment().format("YYYY-MM-DD HH:mm:ss"))
        );
        uploadImage(this.imageFile, this.data.ID)
          .then(() => {
            postData(this.data);
          })
          .then(() => {
            this.isLoading = false;
            router.push("/");
          })
          .catch(() => {
            this.isLoading = false;
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
    },
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(","));
        this.$nextTick(() => {
          this.search = "";
        });
      });
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