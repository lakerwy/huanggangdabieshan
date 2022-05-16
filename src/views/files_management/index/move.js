// 模块化处理
/**
 * 上传部分的逻辑功能实现
 */
import { ref, watch, onMounted, nextTick, unref, reactive, toRefs } from "vue";
import { getFilesById, removeFiles } from '@/api/files.js'
import { ElMessage } from 'element-plus'

export default function moveModule(vm, treeData, handleNodeClick) {
  const data = reactive({
    moveDialogVisible: false,
    moveData: [],
    obj: {},
    node: {},
    params: {
      id: '',
      pid: '',
      pidStr: ''
    },
  })

  watch(
    () => data.moveDialogVisible,
    (newV) => {
      if (!newV) {
        data.moveDialogVisible = false;
      }
    },
    { deep: true, immediate: true }
  )

  const moveTreeClick = (obj, node) => {
    data.obj = obj;
    data.node = node;
    data.params.pid = obj.id;
    data.params.pidStr = obj.pidStr;
  }

  const doMove = async () => {
    let res = await removeFiles(data.params);
    if (res.success) {
      ElMessage({
        message: '移动成功！',
        type: 'success'
      });
      data.moveDialogVisible = false;
      handleNodeClick(data.obj, data.node)
    } else {
      ElMessage({
        message: res.message,
        type: 'error'
      });
    }
  }

  const cancelMove = async () => {
    data.moveDialogVisible = false;
    data.params = {
      id: '',
      pid: '',
      pidStr: ''
    }
  }

  const moveFiles = (id) => {
    data.moveData = JSON.parse(JSON.stringify(treeData.value));
    data.params.id = id;
    data.moveDialogVisible = true;
  }

  const handletreeClick = async (obj, node) => {
    let params = {
      pid: obj.id
    }
    let res = await getFilesById(params);
    let { success, body } = res;
    if (success) {
      data.filesData = [];
      body.map(item => {
        item.fileKzm = item.fileKzm ? item.fileKzm.toLowerCase() : '';
        data.filesData.push(item)
      });
    }
  }

  return {
    ...toRefs(data),
    moveFiles,
    handletreeClick,
    moveTreeClick,
    cancelMove,
    doMove
  }
}