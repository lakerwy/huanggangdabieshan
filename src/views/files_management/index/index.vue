<template>
  <div class="files-management">
    <div class="page-content">
      <div class="left">
        <div class="tree-title">
          <span>档案资料库</span>
        </div>
        <div class="scrollbar" style="width:100%;overflow:auto;height: calc(100% - 112px);">
          <el-tree
              ref="tree"
              class="my-tree"
              :data="treeData"
              :accordion="true"
              :props="defaultProps"
              node-key="id"
              :indent="25"
              :default-expanded-keys="defaultExpandKeys"
              :default-expand-all="false"
              @node-click="handleNodeClick"
            >
              <template #default="{ node, data }">
                <span class="custom-tree-node" :class="{ circle: node.level > 1 && node.isLeaf }" @mouseenter="data.isShowDel = true;" @mouseleave="data.isShowDel = false;">
                  <div v-show="node.isLeaf" style="width:9px;height:9px;display:inline-block;border-radius:50%;border:1px solid #dddddd;position:absolute;left: -18px;top: 5px;"></div>
                  <img
                    style="margin-left:10px;"
                    :class="{mini: node.level > 1}"
                    src="imgs/folder.png"
                    alt=""
                  />
                  <span
                    style="margin-left: 10px;max-width:70%;display:inline-block;overflow:hidden;text-overflow:ellipsis;"
                    :title="node.label"
                    >{{ node.label }}</span>
                  <img v-show="data.isShowDel" style="float:right;margin-right:5px;vertical-align:middle;" src="imgs/icon_trash.png" alt="" @click.stop="deleteBanch('tree', data)">
                </span>
              </template>
          </el-tree>
        </div>
      </div>
      <div class="right">
        <div class="content-right-top">
          <el-button type="text" style="margin-left:20px;height:100%;" @click="handlePre">返回上一级</el-button>
          <span class="content-right-fgf">&nbsp;|&nbsp;</span>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              v-for="(item, index) in crumbListData"
              :key="index"
              >{{ item.znName }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
        <div class="top-operation">
          <div class="btns">
            <el-dropdown @command="handleCommand">
              <el-button plain class="upload-btn" title="上传"><img style="vertical-align:sub;margin-right:6px;" src="imgs/icon_upload.png" alt=""/>上传</el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="files">上传文件</el-dropdown-item>
                  <el-dropdown-item command="folder">上传文件夹</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button style="margin-left:10px;" plain @click="downloadBanch" title="下载"><img src="imgs/icon_download.png" alt=""></el-button>
            <el-button plain title="新建文件夹" @click="newFolder"><img src="imgs/icon_new.png" alt=""></el-button>
            <el-button plain title="删除" @click="deleteBanch"><img src="imgs/Trash.png" alt=""></el-button>
          </div>
          <div class="right-btns">
            <el-input v-model="queryValue" placeholder="搜索全部数据" @keyup.enter="handleSearch">
              <template #suffix>
                <img style="margin-top:8px;cursor:pointer;" src="imgs/query.png" alt="" @click="handleSearch">
              </template>
            </el-input>
            <!-- <div class="types">
              <img @click="isShowList = true;" :src="isShowList ? 'imgs/list-active.png' : 'imgs/list.png'" alt="">
              <img @click="isShowList = false;" :src="isShowList ? 'imgs/img.png' : 'imgs/img-active.png'" alt="">
            </div> -->
          </div>
        </div>
        <listView 
          v-if="isShowList"
          :tableData="filesData" 
          :currentFolder="currentFolder" 
          @refreshTableData="refreshTableData" 
          @getSelectData="getSelectData"
          @openFolder="openFolder" />
        <imagesView
          v-else
          v-model:tableData="filesData" 
          :currentFolder="currentFolder"
          @getSelectData="getSelectData"
          @openFolder="openFolder"  />

        <myFooter />
      </div>
    </div>

    <el-dialog 
      title="上传" 
      v-model="uploadDialogVisible" 
      :append-to-body="true"
      width="25%"
      top="26vh"
      @close="uploadCancle">
      <el-form class="uploadDialog" :model="form" label-width="100px" label-position="right">
        <el-form-item label="选择文件" v-if="uploadType == 'files'">
          <el-upload
            ref="upload"
            :action="uploadUrl"
            multiple
            name="files"
            :with-credentials="true"
            class="upload-demo"
            :show-file-list="true"
            :auto-upload="false"
            :on-change="handleChange"
            :http-request="handleUpload"
          >
            <el-button type="primary">选择文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="选择文件夹" v-else>
          <el-upload
            ref="upload"
            :action="uploadUrl"
            multiple
            name="files"
            :with-credentials="true"
            class="upload-demo"
            :show-file-list="true"
            :auto-upload="false"
            :on-change="handleChange"
            :http-request="handleUpload"
          >
            <el-button type="primary">选择文件夹</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="uploadCancle">取 消</el-button>
          <el-button type="primary" @click="submitUpload">上 传</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog 
      title="新建文件夹" 
      v-model="dialogNewVisible" 
      :append-to-body="true"
      width="25%"
      top="33vh">
      <el-form ref="newFolderForm" :model="form" :rules="formRule" label-width="80px" label-position="left">
        <el-form-item label="语种">
          <el-select style="width:100%;" v-model="form.docLanguage" placeholder="请选择文件夹语种">
            <el-option label="中文" value="0"></el-option>
            <el-option label="英文" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件名" prop="znName">
          <el-input v-model="form.znName" placeholder="请输入文件名"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogNewVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveFolder">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <transfer
      ref="fileTransfer"
      @fatherClose="fatherClose"
      @refreshTableData="refreshTableData"
      @failedSubmit="failedSubmit"
      v-if="isUpload"
      v-model:tableData="newTableData"
      :total="fileTotal"
      :currentFolder="currentFolder"
    />

    <el-dialog 
      title="信息提示" 
      v-model="errorDialogVisible" 
      :append-to-body="true"
      width="25%"
      top="26vh">
      <div class="errorDialog">
        <p>当前有 {{failedFiles.length}} 个文件上传失败，如下：</p>
        <div class="msg" v-for="(item) in failedFiles" :key="item.name">
          <p>文件地址：{{item.webkitRelativePath || item.name}}</p>
          <p>错误提示：{{item.errorMsg || '上传失败'}}</p>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="errorDialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, getCurrentInstance } from 'vue'
import myFooter from '_com/footer/index.vue'
import listView from '../component/listView/index'
import imagesView from '../component/imagesView/index'
import transfer from "../component/transfer/index2";
import uploadModule from './upload.js'
import tableModule from './table.js'
import treeModule from './tree.js'

export default {
  components: {
    myFooter,
    listView,
    imagesView,
    transfer
  },
  setup() {
    const vm = getCurrentInstance();
    
    // 文件树相关操作
    const {
      queryValue,
      treeData,
      isShowDel,
      defaultProps,
      defaultExpandKeys,
      currentFolder,
      currentNode,
      filesData,
      isShowList,
      crumbListData,
      handleSearch,
      getTreeData,
      handleNodeClick,
      handlePre
    } = treeModule(vm)

    // 头部功能按钮 表格相关操作
    const { 
      form,
      formRule,
      dialogNewVisible,
      selectedData,
      newFolder,
      saveFolder,
      refreshTableData,
      getSelectData,
      openFolder,
      downloadBanch,
      deleteBanch
    } = tableModule(vm, currentFolder, getTreeData, handleNodeClick)
    
    // 上传功能
    const {
      uploadDialogVisible,
      errorDialogVisible,
      uploadType,
      uploadUrl,
      failedFiles,
      newTableData,
      isUpload,
      fileTotal,
      handleCommand,
      handleChange,
      beforeUpload,
      handleUpload,
      uploadCancle,
      submitUpload,
      failedSubmit,
      fatherClose
    } = uploadModule(vm, currentFolder);
    
    onBeforeMount(
      getTreeData
    )

    return {
      queryValue,
      handleSearch,
      treeData,
      isShowDel,
      defaultProps,
      defaultExpandKeys,
      getTreeData,
      handleNodeClick,
      filesData,
      crumbListData,
      handlePre,
      currentFolder,
      refreshTableData,
      form,
      formRule,
      dialogNewVisible,
      isShowList,
      newFolder,
      saveFolder,
      handleCommand,
      downloadBanch,
      deleteBanch,
      uploadDialogVisible,
      uploadUrl,
      uploadType,
      handleChange,
      beforeUpload,
      handleUpload,
      uploadCancle,
      submitUpload,
      failedSubmit,
      getSelectData,
      openFolder,
      isUpload,
      newTableData,
      fileTotal,
      fatherClose,
      errorDialogVisible,
      failedFiles
    }
  },
}
</script>


<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
.files-management {
  height: calc(100% - 73px);
  text-align: left;
  .page-content {
    box-shadow: 2px 0px 10px 0px 
		rgba(0, 0, 0, 0.2);
    display: flex;
  }
  .left {
    padding: 0 31px 26px 23px;
    width: 276px;
    height: calc(100% - 52px);
    box-shadow: 1px 0px 6px 0px 
		rgba(0, 0, 0, 0.2);
    position: relative;
    // z-index: 2;
    
    .tree-title {
      border-bottom: solid 1px #e8e8e8;
      font-size: 18px;
      font-weight: bold;
      line-height: 50px;
      height: 50px;
      color: #454954;
      padding-top: 4px;
    }
    .my-tree {
      min-width: 100%;
      display: inline-block; // 横向滚动条
      // 给树最里层加竖线
      // height: calc(100% - 112px);
      height: 100px;
      // overflow-y: auto;
      color: #454954;
      text-align: left;
      margin-top: 18px;
      // margin-top: 20px;
      .custom-tree-node {
        display: inline-block;
        width: 100%;
        min-width: 220px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      /deep/ .el-tree-node__content {
        // min-width: 245px;
      }
      .mini {
        width: 18px;
	      height: 15px;
      }
      .mini::before {
        content: "o";
        width: 9px;
        height: 9px;
        border: 1px solid #dddddd;
      }
      .circle {
        position: relative;
        overflow: initial;
      }
      .circle:not(:last-child):before {
        content: "";
        height: 20px;
        position: absolute;
        top: 17px;
        left: -7px;
        border-left: 1px dashed #dddddd;
      }
    }
  }

  .el-input {
    line-height: 30px;
  }
  page-content/deep/ .el-input__inner {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 15px;
    background-color: #f1f2f4;
  }
  /deep/ .el-input__suffix {
    right: 18px;
  }

  .right {
    width: calc(100% - 330px);
    height: 100%;
    position: relative;
    z-index: 1;

    .content-right-top {
      width: calc(100% - 32px);
      margin: 0 12px 0 20px;
      height: 44px;
      border-bottom: 1px solid #e8e8e8;
    }
    .content-right-fgf {
      color: #cbcccf;
    }
    .el-breadcrumb {
      display: inline-block;
      vertical-align: middle;
    }

    .top-operation {
      margin: 19 / @vh 48 / @vw 0 34 / @vw;
      width: calc(100% - 82px);
      // width: 100%;
      display: flex;
      justify-content: space-between;
      .btns {
        width: 100%;
        .el-button {
          padding: 0 7px;
          width: 34px;
          height: 34px;
          min-height: 34px;
          vertical-align: middle;
          border-radius: 3px;
        }
        /deep/ .upload-btn {
          background-color: #1c9fce;
          border-color: #1c9fce;
          color: #efecf6;
          width: 86px;
          height: 34px;
          line-height: 34px;
          border-radius: 3px;
          font-size: 14px;
          display: inline-block;
          text-align: center;
        }
        
        .el-upload--picture-card:hover, .el-upload:focus {
          color: #fff;
        }
      }
      .right-btns {
        display: flex;
        .types {
          width: 70 / @vw;
          margin-left: 38 / @vw;
          flex-shrink: 0;
          img {
            cursor: pointer;
          }
        }
      }
    }
  }
}
.uploadDialog {
  /deep/ .el-form-item__content {
    width: calc(100% - 100px);
  }
  /deep/ .el-upload-list {
    max-height: 33vh;
    overflow: auto;
  }
  /deep/ .el-upload-list::-webkit-scrollbar {
    width: 8px;
    background: #fff;
  }
  /deep/ .el-upload-list::-webkit-scrollbar-thumb {
    width: 7px;
    border-radius: 4px;
    background: #ccc;
  }
  /deep/ .el-upload-list::-webkit-scrollbar-track {
    width: 8px;
    border-radius: 4px;
    background: #eee;
  }
}
.errorDialog {
  height: 300px;
  overflow-y: auto;
  .msg {
    margin: 8px 0;
    p {
      margin: 5px 0;
    }
  }
}
</style>

<style lang="less">
.files-management {
  .my-tree {
    .el-tree-node__content {
      height: 35px;
      padding-left: 25px !important;
      position: relative;
    }
    .el-tree-node__content:hover {
      background-color: #e6f1ff;
    }
    .el-tree-node__label {
      color: #454954;
      margin-left: 10px;
    }

    /*/ / 动画取消*/
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    .el-tree-node__content>.el-tree-node__expand-icon {
      position: absolute;
      left: 0;
    }
    /*/ / 收起*/
    .el-icon-caret-right:before {
      font-size: 18px;
      content: url("../../../assets/images/unfolded.png"); /*具体的图标*/
    }
    /*/ / 展开*/
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
      font-size: 18px;
      content: url("../../../assets/images/expand.png"); /*具体的图标*/
    }
    // 最后一个叶子节点不展示图标
    .el-tree-node__expand-icon.is-leaf.el-icon-caret-right:before {
      font-size: 18px;
      content: ""; /*具体的图标*/
    }

    // 给树加上竖线
    .el-tree-node__children {
      position: relative;
      padding-left: 31px; // 缩进量
    }
     .el-tree-node {
       position: relative;
     }
    // 竖线
    .el-tree-node:not(:last-child):before {
      content: "";
      height: calc(100% - 26px);
      margin: 26px 0 0;
      position: absolute;
      left: 11px;
      top: 5px;
      border-width: 1px;
      border-left: 1px dashed#dddddd;
    }  
  }
}
.el-input__suffix {
  top: 5px;
}
</style>