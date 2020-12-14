<template>
  <v-content>
    <v-card width="400px" class="mx-auto mt-5">
      <v-img :src="photo1" height="60%" width="100%"></v-img>
      <v-card-title>マインドマップとは</v-card-title>
      <v-card-subtitle class="box">マインドマップでは、物事の記憶能力や理解能力を向上させる効果があり、脳内の情報を整理することが可能です。</v-card-subtitle>
    </v-card>
    <v-card width="400px" class="mx-auto mt-5">
      <v-img :src="photo2" height="60%" width="100%"></v-img>
      <v-card-title>Mind Viewの有用性</v-card-title>
      <v-card-subtitle class="box">
        Mind Viewでは、マインドマップの共有を目的としたアプリケーションです。
        <br />マインドマップは脳内の可視化を実現でき、自分の将来設計を誰かと共有することで、ベストな選択に繋げることが出来ます。
      </v-card-subtitle>
    </v-card>
    <v-card width="400px" class="mx-auto mt-5">
      <v-img :src="photo3" height="60%" width="100%"></v-img>
      <v-card-title>さぁ！Mind Veiwを始めよう！</v-card-title>
      <v-card-subtitle class="box">
        マインドマップ作成ツールや紙とペンを用いて、作成したマインドマップを撮影して投稿します。
        <br />さぁ！Mind Veiwを始めよう！
      </v-card-subtitle>
    </v-card>
  </v-content>
</template>

<script>
import Brain from "@/assets/brain.jpg";
import Meeting from "@/assets/meeting.jpg";
import Mindmap from "@/assets/mindmap.jpg";

export default {
  data() {
    return {
      photo1: Brain,
      photo2: Meeting,
      photo3: Mindmap
    };
  }
};
</script>

<style scoped>
.item--center {
  margin-left: auto;
  margin-right: auto;
}
</style>