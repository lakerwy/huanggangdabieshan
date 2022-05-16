<template>
  <div :id="id"></div>
</template>

<script>
import WasmPlayer from "@easydarwin/easywasmplayer";

export default {
  name: "player",
  data() {
    return {
      easyPlayer: null,
    };
  },
  props: ["videoUrl", "id"],
  watch: {
    videoUrl(newData) {
      this.play(newData);
    }
  },
  mounted() {
    if (this.videoUrl) {
      this.play(this.videoUrl);
    }
  },
  methods: {
    play: function (url) {
      if (this.easyPlayer != null) {
        this.easyPlayer.destroy();
      }
      this.easyPlayer = new WasmPlayer(null, this.id, null, {
        Height: true
      });
      this.easyPlayer.play(url, 1);
    },
    pause: function () {
      if (this.easyPlayer) {
        this.easyPlayer.pause();
        this.easyPlayer = null;
      }
    }
  },
  beforeUnmount() {
    if (this.easyPlayer) {
      this.easyPlayer.stop();
      this.easyPlayer = null;
    }
  }
};
</script>
