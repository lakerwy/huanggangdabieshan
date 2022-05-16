<template>
  <div>
    <el-dialog v-model="showVideoFlag" width="36%" :before-close="dialogClose" title="视频详情">
      {{Url}}
      <player
        class="player"
        ref="videoPlayer"
        v-if="Url"
        :videoUrl="Url"
        fluent
        autoplay
        live
      ></player>
    </el-dialog>
  </div>
</template>

<script>
import player from "./EasyPlayer";

export default {
  props:{
    Url:{
      type: String,
    }
  },
  components: {
    player,
  },
  data() {
    return {
      showVideoFlag: false,
      vUrl:null,
    };
  },
  created() {
    this.showVideoFlag = true;
  },


  methods: {
    // async initCamera(obj) {},
    dialogClose() {
      this.$parent.showVideoFlag = false;
    },
  },
};
</script>

<style scoped>
.player {
  width: 400px;
  height: 400px;
}
</style>
