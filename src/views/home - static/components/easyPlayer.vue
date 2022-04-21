<template>
  <div id="easyplayer"></div>
</template>

<script>
import WasmPlayer from "@easydarwin/easywasmplayer";

export default {
  name: "player",
  data() {
    return {
      easyPlayer: null
    };
  },
  props: ["videoUrl"],
  watch: {
    videoUrl(newData) {
      this.play(newData);
    },
    immediate: true
  },
  mounted(){
    if (this.videoUrl){
      this.play(this.videoUrl);
    }
  },
  methods: {
    play: function(url) {
      if (this.easyPlayer != null) {
        this.easyPlayer.destroy();
      }

      this.easyPlayer = new WasmPlayer(null, "easyplayer", null, {
        Height: true
      });
      this.easyPlayer.play(url, 1);
    },
    pause: function() {
      this.easyPlayer.destroy();
      this.easyPlayer = null;
    }
  },
  destroyed() {
    if (this.easyPlayer) {
      this.easyPlayer.destroy();
      this.easyPlayer = null;
    }
  }
};
</script>
