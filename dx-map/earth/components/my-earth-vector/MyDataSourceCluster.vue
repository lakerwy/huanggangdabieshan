<!--
 * @ Author: Qi Zhiwu
 * @ Create Time: 2021-09-01 14:12:19
 * @ Modified by: Qi Zhiwu
 * @ Modified time: 2021-09-02 16:40:25
 * @ Description: dataSource 聚合图层
 -->

<script>
import MyDataSourceBase from "./MyDataSourceBase.vue";

export default {
  name: "MyDataSourceCluster",
  mixins: [MyDataSourceBase],
  props: {
    /**
     * @property {Boolean} [isCluster] = false - 是否聚合 主要针对点图层
     */
    isCluster: {
      type: Boolean,
      default: false,
    },
    /**
     * @property {Number} [distance] = 20 - 聚合距离，单位是px,需要求isCluster = true时有效
     */
    distance: {
      type: Number,
      default: 20,
    },
    numOffsetX: {
      type: Number,
      default: 10,
    },
    numOffsetY: {
      type: Number,
      default: 10,
    },
    scales: {
      // 与distances搭配使用,小于160000，距离为0，大于160000 ，距离为80，大于600000，距离为160
      type: Array,
      default: () => {
        return [160000, 600000, 1200000];
      },
    },
    distances: {
      type: Array,
      default: () => {
        return [80, 160, 320];
      },
    },
  },
  methods: {
    init() {
      this.initSource();
      this.initLayerFinish();
      this.clusterHandler();
    },
    clusterHandler() {
      if (this.isCluster && this.source) {
        this.source.clustering.enabled = true;
        this.source.clustering.pixelRange = this.distance;
        this.source.clustering.minimumClusterSize = 2;
      }
    },
  },
};
</script>