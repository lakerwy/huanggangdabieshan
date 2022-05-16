<template>
  <div v-if="newData">
    <component
      :is="component"
      :data="newData"
      :oldData="infodata"
      :type="infodata.type"
      @closePop="closePage"
    ></component>
  </div>
</template>

<script>
import monitor from "./monitor";
import Video from "./video";
import Sights from "./sights";
import Relic from "./relic";
import Other from "./Other";
import { getPointInfo } from "@/api/remain";
export default {
  props: ['infodata'],
  components: {
    monitor,
    Video,
    Relic,
    Sights,
    Other
  },
  watch: {
    infodata: function (val) {
      if (val) {
        this.selectComponent();
      }
    },
    immediate: true,
    deep: true,
  },
  mounted() {
    this.selectComponent();
  },
  data() {
    return {
      newData: null,
      type: null,
      contentArr: [
        {
          value: "监测点",
          component: "monitor",
          type: 4,
        },
        {
          value: "视频点",
          component: "Video",
          type: 3,
        },
        {
          value: "景点",
          component: "Sights",
          type: 1,
        },
        {
          value: "遗迹",
          component: "Relic",
          type: 2,
        },
        {
          value: "其它",
          component: "Other",
          type: null
        },
      ],
      component: null,
    };
  },
  methods: {
    async selectComponent() {
      this.component = null;
      if (this.infodata) {
        if ([1, 2, 3, 4].indexOf(this.infodata.type) > -1) {
          let params = {
            id: this.infodata.id,
            type: this.infodata.type
          };
          let newData = {};
          await getPointInfo(params).then(res => {
            if (res.success && res.body) {
              newData = res.body;
            }
          })
          for (let i = 0; i < this.contentArr.length; i++) {
            const item = this.contentArr[i];
            if (item.type == this.infodata.type) {
              this.component = item.component;
              this.newData = newData;
              break;
            }
          }
        } else {
          this.component = 'other';
          this.newData = this.infodata;
        }
      }
    },
    closePage() {
      this.$emit("close");
    },
  },
};
</script>
