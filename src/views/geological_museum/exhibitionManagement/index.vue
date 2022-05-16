<template>
  <div class="exhibition-management">
    <div class="page-content">
      <div class="content">
        <div class="top">
          <div class="top_left">
            <span class="back" @click="goTo('geological_museum')"
              >返回上一级</span 
            >
            <span class="ztgl">展厅管理</span>
            <span
              class="add"
              @click="addExhibition"
              v-if="exhibitionManagement_add"
              ><i class="el-icon-plus"></i> 新增展厅</span
            >
          </div>
          <div class="top_right">
            <el-input
              placeholder="请输入搜索内容"
              v-model="searchName"
              @keyup.enter.native="filerName"
            ></el-input>
            <i class="el-icon-search" @click="filerName"></i>
          </div>
        </div>
        <div class="control">
          <div class="tabControl" v-if="tabArr.length > 0">
            <span @click="delExh()" class="del" v-if="exhibitionManagement_del"
              ><i class="el-icon-circle-close"></i> 删除展厅</span
            >
            <span @click="editExh()" v-if="exhibitionManagement_edit"
              ><i class="el-icon-edit"></i> 编辑展厅</span
            >
          </div>
          <div
            v-if="showBanch && collectionArr.length > 0"
            class="opt"
            style="justify-content: flex-end"
          >
            <el-button
              type="default"
              size="medium"
              v-if="exhibitionManagement_del"
              @click="handleTopBtnClick('banch')"
              ><img
                src="imgs/icon-banch.png"
                alt=""
                style="margin-right: 4px"
              />批量操作</el-button
            >
          </div>
          <div v-else class="opt">
            <el-checkbox v-model="checked" v-if="exhibitionManagement_del">全选</el-checkbox>
            <el-button
              type="default"
              size="medium"
              v-if="exhibitionManagement_del"
              @click="handleTopBtnClick('del')"
              >批量删除</el-button
            >
            <el-button
            v-if="exhibitionManagement_del"
              type="default"
              size="medium"
              @click="handleTopBtnClick('cancle')"
              >取消操作</el-button
            >
          </div>
        </div>
        <ul class="list">
          <li
            v-for="(item, index) in tabArr"
            :key="index"
            :class="index == activeTab ? 'active' : ''"
            @click="changeActive(item, index)"
          >
            {{ item.name }}
          </li>
        </ul>
        <ul class="collections">
          <li
            class="add"
            @click="dealCollection('add')"
            v-if="tabArr.length > 0 && exhibitionManagement_add"
          >
            <i class="el-icon-plus"></i>
            <p>新增展物</p>
          </li>
          <li v-for="(item, index) in collectionArr" :key="index">
            <dl>
              <dt>
                <img
                  @click="dealCollection('view', item)"
                  :src="
                    item.cover
                      ? imgUrl + item.cover
                      : require('@/assets/images/testimg1.png')
                  "
                  alt=""
                  srcset=""
                />
              </dt>
              <dd>
                <p class="name">{{ item.name }}</p>
                <span class="type">{{ item.showType }}</span>
                <span style="float: right">
                  <i
                    v-if="exhibitionManagement_edit"
                    class="el-icon-edit"
                    @click="dealCollection('edit', item)"
                    title="编辑"
                  ></i>
                  <i
                    v-if="exhibitionManagement_del"
                    class="el-icon-delete"
                    title="删除"
                    @click="delCol(item)"
                  ></i>
                </span>
              </dd>
            </dl>
            <div
              v-show="isshowMark"
              class="mark"
              :class="{ markActive: item.checked }"
            >
              <img
                v-show="!item.checked"
                src="imgs/checkBox.png"
                alt=""
                @click="item.checked = true"
              />
              <img
                v-show="item.checked"
                src="imgs/checkIn.png"
                alt=""
                @click="item.checked = false"
              />
            </div>
          </li>
        </ul>
        <el-pagination
          v-if="total > 0"
          @current-change="handleCurrentChange"
          :current-page="params.page"
          :page-size="params.pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <myFooter />
      </div>
    </div>
    <addCollections
      v-if="showEditAdd"
      :dataType="abouttype"
      :dataInfo="currentObj"
      ref="addedit"
      @close="closeAddEdit"
    />
    <viewCollections
      v-if="abouttype == 'view'"
      :dataInfo="currentObj"
      ref="viewCol"
      @close="abouttype = ''"
    />
    <addExhibitions
      v-if="showExhibition"
      :dataType="abouttype"
      ref="exhibition"
      @close="closeExhibition"
    />
  </div>
</template>

<script> 
import myFooter from "_com/footer/index.vue";
import { showLists, getCollectionInfo, getCollectionsArr, delCollection, delCollections, delExhibition } from "_api/museum";
import addCollections from "./addEditCollection";
import addExhibitions from "./addExhibition.vue";
import viewCollections from "./viewCollections.vue";
import { mapGetters } from 'vuex';

export default {
  components: {
    myFooter,
    addCollections,
    addExhibitions,
    viewCollections
  },
  computed: {
    ...mapGetters([
      'permissions'
    ])
  },
  data() {
    return {
      imgUrl: window.globalUrl.FTP_URL,
      searchName: '',
      showExhibition: false,
      showEditAdd: false,
      showBanch: true,
      isshowMark: false,
      abouttype: '',
      tabArr: [],
      total: 0,
      currentObj: {},
      activeTab: 0,
      showFlag: false,
      collectionArr: [],
      checked: false,
      currentTab: {},
      params: {
        id: "",
        page: 1,
        pageSize: 11
      },
      currentPage: 1,
      exhibitionManagement_add: false,
      exhibitionManagement_view: false,
      exhibitionManagement_edit: false,
      exhibitionManagement_del: false
    }
  },
  watch: {
    // activeTab(val) {
    //   this.activeTab = val
    //   this.params.page = 1;
    //   this.getCollections(this.params);
    // },
    checked(val) {
      if (val) {
        this.collectionArr.forEach(item => {
          item.checked = true
        })
      } else {
        this.collectionArr.forEach(item => {
          item.checked = false
        })
      }
    }
  },
  created() {
    this.init();
    this.exhibitionManagement_add = this.permissions['exhibitionManagement_add']
    this.exhibitionManagement_view = this.permissions['exhibitionManagement_view']
    this.exhibitionManagement_edit = this.permissions['exhibitionManagement_edit']
    this.exhibitionManagement_del = this.permissions['exhibitionManagement_del']
  },
  methods: {
    filerName() {
      this.params.name = this.searchName;
      this.params.page = 1;
      this.total = 0;
      this.getCollections(this.params);
    },
    addExhibition() {
      this.showExhibition = true;
    },
    handleTopBtnClick(type) {
      switch (type) {
        case 'banch':
          this.showBanch = false;
          this.isshowMark = true;
          break;
        case 'cancle':
          this.showBanch = true;
          this.isshowMark = false;
          break;
        case 'del':
          var checkrr = [];
          this.collectionArr.forEach(item => {
            if (item.checked) {
              checkrr.push(item.id)
            }
          })
          if (checkrr == 0) {
            this.$message({
              message: '请选择需要删除的展物',
              type: 'info'
            });
            return;
          }
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            this.batchDelRelicsCard(checkrr);
          }).catch(() => {
          })
          break
        default:
          break;
      }
    },
    async batchDelRelicsCard(arr) {
      let params = {
        ids: arr.toString()
      }
      let res = await delCollections(params);
      if (res.success) {
        this.showBanch = true;
        this.isshowMark = false;
        this.getCollections(this.params);
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        });
      }
    },
    delExh() {
      this.$confirm('确定删除展厅：' + this.currentTab.name + '？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        delExhibition({ id: this.currentTab.id }).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '展厅删除成功!'
            });
            this.init();
          }
        })
      }).catch(() => {
      });
    },
    delCol(item) {
      this.$confirm('确定删除展物：' + item.name + '？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        delCollection({ id: item.id }).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getCollections(this.params);
          }
        })
      }).catch(() => {
      });
    },
    dealCollection(type, item) {
      if (!this.exhibitionManagement_view && type == 'view') {
        this.$message({
          type: 'error',
          message: '暂无查看权限，请联系管理员!'
        });
        return;
      }
      this.abouttype = type;
      if (type !== 'view') {
        this.showEditAdd = true;
      }
      if (type !== 'add') {
        getCollectionInfo({ id: item.id }).then(res => {
          if (res.success) {
            this.currentObj = res.body;
          }
        });
      } else {
        this.currentObj = null;
      }
    },
    // closeAddEdit() {
    //   this.showEditAdd = false;
    // },
    // closeExhibition() {
    //   this.showExhibition = false;
    // },
    init() {
      showLists({}).then((response) => {
        if (response.body) {
          if (response.body.length > 0) {
            this.tabArr = response.body;
            this.currentTab = response.body[0];
            this.params.id = response.body[0].id
            this.getCollections(this.params);
          } else {
            this.currentTab = null;
            this.tabArr = [];
            this.collectionArr = [];
          }
        }

      });
    },
    goTo(name) {
      this.$router.push({ name: name });
    },
    getCollections(params) {
      this.collectionArr = [];
      getCollectionsArr(params).then((response) => {
        if (response.success) {
          if (response.body.total > 0) {
            this.collectionArr = response.body.list;
            this.total = response.body.total;
          }
        } else {
          this.collectionArr = [];
          this.total = 0;
        }
      });
    },
    changeActive(item, index) {
      this.total = 0;
      this.params.name = '';
      this.currentTab = item;
      this.searchName = '';
      this.activeTab = index;
      this.params.id = item.id;
      this.params.page = 1;
      this.getCollections(this.params);
    },
    handleCurrentChange(index) {
      this.params.page = index;
      this.getCollections(this.params);
    }
  },
};
</script>

<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
.exhibition-management {
  height: calc(100% - 73px);
  text-align: left;
  .control {
    position: absolute;
    display: flex;
    right: 34px;
    top: 84px;
    .tabControl {
      span {
        width: 96px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        color: #fff;
        border-radius: 3px;
        display: inline-block;
        cursor: pointer;
        margin-left: 12px;
        font-size: 14px;
        background-color: #109b5d;
      }
      .del {
        background-color: #f56c6c;
      }
    }
    .opt {
      .el-checkbox {
        margin-left: 20px;
      }
      button {
        margin-left: 15px;
      }
    }
  }
  .top {
    height: 68px;
    border-bottom: 1px solid #eeeeee;
    width: 100%;
    padding: 16px 30px;
    box-sizing: border-box;
    .top_left {
      float: left;
      font-size: 14px;
      line-height: 36px;
      .back {
        color: #0b7b8f;
        padding-right: 10px;
        border-right: 1px solid #cbcccf;
        cursor: pointer;
      }
      .ztgl {
        padding: 0 20px 0 10px;
      }
      .add {
        width: 96px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        color: #fff;
        background-color: #118270;
        border-radius: 3px;
        display: inline-block;
        cursor: pointer;
      }
    }
    .top_right {
      float: right;
      position: relative;
      /deep/.el-input__inner {
        width: 320px;
        height: 36px;
        background-color: #f1f2f4;
        border-radius: 18px;
      }
      /deep/.el-input {
        width: 315px;
      }
      .el-icon-search {
        position: absolute;
        right: 14px;
        top: 11px;
        color: #0b7a8f;
        cursor: pointer;
      }
    }
  }
  .list {
    height: 36px;
    padding: 0 30px;
    li {
      float: left;
      list-style: none;
      padding: 6px 10px;
      color: #888;
      margin-right: 20px;
      cursor: pointer;
      position: relative;
    }
    i {
      position: absolute;
      right: 2px;
      top: -2px;
      display: none;
      font-size: 17px;
    }
    .el-icon-circle-close:hover {
      color: red;
    }
    li:hover {
      color: #424e67;
      font-weight: bold;
      .el-icon-circle-close {
        display: block;
      }
    }
    .active {
      color: #424e67;
      border-bottom: 3px solid #0b7a8f;
      font-weight: bold;
    }
  }
  .collections {
    width: 1798px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 30px;
    margin: 0;
    li:nth-child(6n) {
      margin-right: 0;
    }
    li {
      margin-right: 22px;
      list-style: none;
      width: 15.5%;
      height: 242px;
      border: solid 1px #d9d9d9;
      margin-bottom: 22px;
      position: relative;
      .mark {
        width: 100%;
        height: 100%;
        padding: 0;
        background-color: rgba(0, 0, 0, 0.4);
        position: absolute;
        top: 0;
        left: 0;
        img {
          cursor: pointer;
          margin: 6px;
        }
      }
      .markActive {
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        background: transparent;
        border: solid 2px #1cb9ca;
      }
      > div {
        height: 49px;
        line-height: 49px;
        padding: 0 17px;
        button {
          width: 74px;
          height: 30px;
          background-color: #f2f6ff;
          border-radius: 3px;
          border: solid 1px #abc3ef;
          color: #4a74c2;
          cursor: pointer;
        }
        span {
          float: right;
          i {
            margin-left: 10px;
            font-size: 20px;
            cursor: pointer;
          }
          i:hover {
          }
        }
      }
      dl {
        margin: 0;
        margin-top: 16px;
        dt {
          text-align: center;
          img {
            width: 240px;
            height: 144px;
            border: 1px solid #f3f3f3;
          }
        }
        dd {
          margin: 0;
          padding: 0 17px 10px 17px;
          .name {
            color: #424e67;
            font-size: 16px;
            height: 38px;
            line-height: 38px;
            margin: 0;
          }
          .type {
            background-color: #2da7c2;
            border-radius: 11px;
            color: #ffffff;
            font-size: 12px;
            display: inline-block;
            padding: 3px 10px;
          }
          i {
            font-size: 18px;
            margin-right: 8px;
          }
        }
      }
    }
    .add {
      border: dashed 1px #d9d9d9;
      background-color: #f8faf9;
      cursor: pointer;
      i {
        font-size: 27px;
        background: #13a36e;
        color: #fff;
        width: 52px;
        height: 52px;
        line-height: 52px;
        text-align: center;
        border-radius: 50%;
        margin: 0 auto;
        margin-top: 74px;
        display: block;
        cursor: pointer;
      }
      p {
        text-align: center;
        color: #424e67;
      }
    }
  }
  /deep/ .el-pagination {
    text-align: right;
    margin-right: 30px;
    margin-top: -4px;
  }
  .page-content {
    box-shadow: 2px 0px 10px 0px rgba(0, 0, 0, 0.2);
    display: flex;
    .content {
      width: 100%;
      position: relative;
    }
  }
}
</style>
