<template>
  <div>
    <el-dialog
      title="标本详情"
      v-model="dialogVisible"
      width="40%"
      :before-close="dialogClose"
      custom-class="bbxq"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="标本名称：">
          <span>{{ form.name }}</span>
        </el-form-item>
        <el-form-item label="标本排序：">
          <span>{{ form.order }}</span>
        </el-form-item>
        <el-form-item label="标本类别：">
          <span>{{ typeName }}</span>
        </el-form-item>
        <el-form-item label="标本详情：">
          <span>{{ form.info }}</span>
        </el-form-item>
        <el-form-item label="标签：">
          <el-tag :key="tag" v-for="tag in form.items">
            {{ tag }}
          </el-tag>
        </el-form-item>
        <el-form-item label="标本照片：">
          <div
            class="form-normal"
            style="
              height: 250px;
              width: 376px;
              margin: 10px 0;
              overflow: hidden;
            "
          >
            <el-image :src="largeImg" :preview-src-list="allImgs"> </el-image>
          </div>
          <div class="uploaded" v-if="allImgs.length > 0">
            <div class="img-list">
              <div class="con">
                <div class="list" v-for="(item, index) in imgs" :key="index">
                  <img :src="item" alt="" @click="largeImg = item" />
                </div>
              </div>
              <img
                class="prev"
                :class="{ disabled: uploadedPage <= 1 }"
                src="imgs/prev.png"
                alt=""
                @click="prevPage"
              />
              <img
                class="next"
                :class="{ disabled: imgs.length < uploadedSize * uploadedPage }"
                src="imgs/next.png"
                alt=""
                @click="nextPage"
              />
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script> 
export default {
  props: {
    dataType: {
      type: String
    },
    dataInfo: {
      type: Object
    }
  },
  data() {
    return {
      dynamicTags: [],
      tabArr: [],
      imgs: [],
      allImgs: [],
      form: {},
      largeImg: '',
      dialogVisible: false,
      disabled: false,
      dialogImageUrl: '',
      typeName: '',
      uploadedPage: 1,
      uploadedSize: 3
    }
  },
  watch: {
    dataInfo(val) {
      this.form = val;
      this.form.items = val.label ? val.label.split(',') : [];
      this.filterRoomName(val.parentId);
      let arr = [];
      if (val.pics.length > 0) {
        val.pics.forEach(obj => {
          arr.push(window.globalUrl.FTP_URL + obj.url);
        })
        this.largeImg = arr[0];
        this.allImgs = arr;
        this.changeUpload();
      } else {
        this.allImgs = [];
      }
    }
  },
  created() {
    this.dialogVisible = true;
    this.tabArr = this.$parent.tabArr;
  },
  methods: {
    changeUpload() {
      this.imgs = this.allImgs.slice((this.uploadedPage - 1) * this.uploadedSize, this.uploadedSize * this.uploadedPage)
    },
    prevPage() {
      if (this.uploadedPage > 1) {
        this.uploadedPage--;
        this.changeUpload();
      } else {
        return;
      }
    },
    nextPage() {
      if (this.allImgs.length > this.uploadedPage * this.uploadedSize) {
        this.uploadedPage++;
        this.changeUpload();
      } else {
        return;
      }
    },
    filterRoomName(id) {
      this.tabArr.forEach(item => {
        if (item.id == id) {
          this.typeName = item.label;
        }
      })
    },
    dialogClose() {
      this.$parent.abouttype = '';
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.bbxq .el-dialog__body {
  padding: 8px 30px 10px 70px;
}
/deep/.el-image {
  width: 100%;
  .el-image__error {
    display: none;
  }
}
.dialog-footer {
  display: none;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
/deep/.el-upload-list--picture-card .el-upload-list__item {
  width: 82px;
  height: 82px;
}
/deep/.el-upload--picture-card {
  width: 82px;
  height: 82px;
  line-height: 82px;
}
/deep/.el-form-item {
  width: 92%;
  margin-bottom: 4px;
}
</style>
<style lang="less" scoped>
.img-container {
  position: absolute;
  > ul {
    list-style: none;
    margin: 0;
    max-width: 30rem;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    > li {
      flex: 1;
      .img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.el-form {
  min-height: 400px;
}
.el-carousel__container {
  height: 276px;
  border: 1px solid #f1ebeb;
}
.el-form::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.el-form::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.el-form::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.uploaded {
  margin-left: -10px;
  .next-btn {
    margin-top: 44 px;
  }
  .img-list {
    width: 504px;
    height: 120px;
    margin: 0 auto;
    position: relative;
    margin-bottom:20px;
    .con {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
    }
    .list {
      height: 100%;
      position: relative;
      img {
        width: 160px;
        margin-right: 8px;
      }
      .img_del {
        position: absolute;
        width: 100%;
        bottom: 0;
        height: 24px;
        background: rgba(0, 0, 0, 0.4);
        img {
          position: absolute;
          right: 10px;
          width: 20px;
          cursor: pointer;
        }
      }
    }
    .list:last-child {
      margin-right: 0;
    }
    .prev {
      position: absolute;
      top: 34%;
      left: -35px;
      cursor: pointer;
    }
    .next {
      position: absolute;
      top: 34%;
      right: -35px;
      cursor: pointer;
    }
    .disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
}
</style>