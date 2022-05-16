<template>
  <iframe ref="iframe" :src="urlPath" class="iframe" />
</template>

<script>
export default {
  name: 'AvueIframe',
  data() {
    return {
      urlPath: this.getUrlPath() // iframe src 路径
    }
  },
  watch: {
    $route: function () {
      this.urlPath = this.getUrlPath()
    },
  },
  mounted() {
    this.urlPath = this.getUrlPath()
  },
  methods: {
    getUrlPath: function () {
      // 获取 iframe src 路径
      let url = window.location.href.split('myiframe?')[1];
      return url
    }
  }
}
</script>

<style lang="scss">
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
