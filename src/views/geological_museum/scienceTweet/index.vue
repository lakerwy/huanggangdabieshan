<template>
  <div class="files-management">
    <div class="page-content">
      <div class="content">
        <div class="top">
          <div class="top_left">
            <span class="back" @click="goTo('geological_museum')"
              >返回上一级</span
            >
            <span class="ztgl">科普推文</span>
            <span
              class="add"
              @click="addArticle('add')"
              v-if="samples_add"
              ><i class="el-icon-plus"></i> 新增推文</span
            >
          </div>
          <div class="top_right">
            <el-input
              placeholder="请输入搜索内容"
              v-model="params.name"
              @keyup.enter.native="searchName"
            >
            </el-input>
            <i class="el-icon-search" @click="searchName"></i>
          </div>
        </div>
        <div class="list">
          <el-table
            :data="tweetArr"
            stripe
            style="width: 100%"
            :header-cell-style="{ background: '#f2f6f7', color: '#71809a' }"
          >
            <el-table-column
              type="index"
              label="序号"
              width="120"
            ></el-table-column>
            <el-table-column label="展物图片">
              <template #default="scope">
                <img
                  :src="
                    scope.row.cover
                      ? imgUrl + scope.row.cover
                      : require('@/assets/images/testimg1.png')
                  "
                  alt=""
                  srcset=""
                />
              </template>
            </el-table-column>
            <el-table-column prop="title" label="标题名称"> </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="createUser" label="创建者 ">
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间 ">
            </el-table-column>
            <el-table-column prop="createUser" label="更新者 ">
            </el-table-column>

            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  v-if="samples_view"
                  size="mini"
                  @click="addArticle('view', scope.row)"
                  type="primary"
                  >详情</el-button
                >
                <el-button
                  v-if="samples_edit"
                  size="mini"
                  @click="addArticle('edit', scope.row)"
                  >编辑</el-button
                >
                <el-button
                  v-if="samples_del"
                  size="mini"
                  type="danger"
                  @click="delArt(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-size="params.pageSize"
            layout="prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>

        <myFooter />
      </div>
    </div>
    <addEdit
      v-if="showTweetAdd"
      :dataType="abouttype"
      :dataInfo="currentObj"
      ref="addTweet"
      @close="closeAddEdit"
    />
  </div>
</template>

<script> 
import myFooter from "_com/footer/index.vue";
import { getTweetList, addTweet, getTweetDetail, delTweet, editTweet } from "_api/museum";
import addEdit from "./addEdit";
import { mapGetters } from 'vuex';

export default {
  components: {
    myFooter,
    addEdit
  },
  computed: {
    ...mapGetters([
      'permissions'
    ])
  },
  data() {
    return {
      imgUrl: window.globalUrl.FTP_URL,
      showTweetAdd: false,
      abouttype: '',
      tabArr: [],
      total: 0,
      currentObj: {},
      activeTab: 0,
      showFlag: false,
      tweetArr: [],
      params: {
        name: "",
        page: 1,
        pageSize: 10
      },
      currentPage: 1
    }
  },
  mounted() {
    this.getList(this.params);
  },
  created() {
    this.samples_add = this.permissions['samples_add'];
    this.samples_view = this.permissions['samples_view'];
    this.samples_edit = this.permissions['samples_edit'];
    this.samples_del = this.permissions['samples_del'];
  },
  methods: {
    searchName() {
      this.params.page = 1;
      this.getList(this.params);
    },
    addArticle(type, item) {
      this.abouttype = type;
      this.showTweetAdd = true;
      if (type !== 'add') {
        getTweetDetail({ id: item.id }).then(res => {
          if (res.success) {
            this.currentObj = res.body;
          }
        });
      } else {
        this.currentObj = {};
      }
    },
    delArt(item) {
      this.$confirm('确定删除推文：' + item.title + '？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        delTweet({ id: item.id }).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList(this.params);
          } else {
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        })
      }).catch(() => {
      });
    },
    goTo(name) {
      this.$router.push({ name: name });
    },
    editCollection() {
      this.showTweetAdd = true;
      this.abouttype = 'edit';
    },
    addCollection() {
      this.showTweetAdd = true;
      this.abouttype = 'add';
    },
    closeAddEdit() {
      this.showTweetAdd = false;
    },
    getList(params) {
      getTweetList(params).then((response) => {
        this.tweetArr = []
        if (response.success) {
          if (response.body.total > 0) {
            this.tweetArr = response.body.list;
            this.total = response.body.total;
          } else {
            this.tweetArr = [];
            this.total = 0;
          }
        }

      });
    },
    handleCurrentChange(index) {
      this.params.page = index;
      this.getList(this.params);
    }
  },
};
</script>

<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
.files-management {
  height: calc(100% - 73px);
  text-align: left;
  .top {
    height: 68px;
    width: 100%;
    padding: 16px 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
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
    padding: 10px 30px;
  }
  .el-table::before {
    display: none;
  }
  /deep/.el-table {
    thead tr {
      background-color: #f2f6f7;
    }
    td,
    th.is-leaf {
      border-bottom: none;
    }
    th,
    td {
      padding: 0;
    }
    .cell {
      font-weight: normal;
    }
    thead {
      td,
      th {
        padding: 12px 0;
        text-align: center;
      }
    }
    tbody {
      td,
      th {
        text-align: center;
      }
      img {
        height: 54px;
        width: auto;
        margin-top: 2px;
      }
    }
  }
  /deep/ .el-pagination {
    text-align: right;
    margin-right: 10px;
    margin-top: 6px;
  }
  .page-content {
    margin: 0 33px 0 29px;
    box-shadow: 2px 0px 10px 0px rgba(0, 0, 0, 0.2);
    display: flex;
    .content {
      width: 100%;
      position: relative;
      box-sizing: border-box;
    }
  }
}
</style>
