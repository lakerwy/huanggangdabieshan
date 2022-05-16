// 模块化处理
/**
 * 有关表格的处理内容
 * 头部操作按钮的操作
 */
import { ref, unref,reactive, toRefs } from 'vue'
import { addNewFolder, deleteFoldersOrFiles } from '@/api/files.js'
import { ElMessage, ElMessageBox  } from 'element-plus'
import qs from 'qs'
import { download } from '@/utils/util.js'

export default function tableModule(vm, currentFolder, getTreeData, handleNodeClick) {
  const data = reactive({
    form: {docLanguage: '0', znName: '', enName: ''},
    formRule: {
      znName: [
        {required: true, message: '请输入文件夹名字', trigger: 'blur'},
        {min: 1, max: 12, message: '文件名长度大于1小于12', trigger: 'blur'}
      ]
    },
    dialogNewVisible: false,
    selectedData: []
  })

  // 更新数据
  const refreshTableData = () => {
    getTreeData(unref(currentFolder));
  }
  
  // 新建文件夹
  const newFolder = () => {
    // form = {docLanguage: '0',znName: '', enName: ''};
    data.dialogNewVisible = true;
  }
  // 保存新增
  const saveFolder = () => {
    vm.refs.newFolderForm.validate(async valid => {
      if(valid) {
        let params = {
          znName: data.form.znName,
          docLanguage: data.form.docLanguage,
          pid: currentFolder.value.id || 0
        }
        let res = await addNewFolder(params);
        let { success, message } = res;
        if(success) {
          ElMessage({
            message: '新建文件夹保存成功！',
            type: 'success'
          });
          data.dialogNewVisible = false;
          data.form = {docLanguage: '0'};
          refreshTableData();
        } else {
          ElMessage({
            message: message,
            type: 'error'
          });
        }
      }
    })
  }

  // 表格选择事件的数据
  const getSelectData = (val) => {
    data.selectedData = unref(val);
  }
  const openFolder = (val) => {
    let node = vm.refs.tree.getNode(val);
    handleNodeClick(val, node)
  }
  // 下载
  const downloadBanch = () => {
    if(data.selectedData.length <= 0) {
      ElMessage({
        message: '请选择要下载的数据',
        type: 'warning'
      });
      return;
    }
    // let hasFolder = unref(selectedData).some(item => { return item.isFolder == 1 }); // 必须为文件0，非文件夹
    // if(hasFolder) {
    //   ElMessage({
    //     message: '下载不能包含文件夹数据，请重新选择！',
    //     type: 'warning'
    //   });
    //   return;
    // }
    let ids = [];
    data.selectedData.map(item => {
      ids.push(item.id)
    })
    let params = qs.stringify({ ids: ids }, { arrayFormat: 'repeat' })
    let url = `${window.globalUrl.HOME_API}/datamanager/park-file/downloadBatch?${params}`;
    download(url);
  }

  // 批量删除
  const deleteBanch = (type, val) => {
    if(type != 'tree' && data.selectedData.length <= 0) {
      ElMessage({
        message: '请选择要删除的数据',
        type: 'warning'
      });
      return;
    }
    if(type == 'tree') {
      data.selectedData = [val];
      currentFolder.value = {};
    }
    ElMessageBox.confirm('此操作将永久删除选中的数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      let ids = data.selectedData.map(item => {
        return item.id
      })
      let formData = new FormData();
      ids.map(item => {
        formData.append('ids', item)
      })
      let res = await deleteFoldersOrFiles(formData);
      let { success, message } = res;
      if(success) {
        ElMessage({
          message: '删除成功！',
          type: 'success'
        });
        refreshTableData();
      } else {
        ElMessage({
          message: message,
          type: 'error'
        });
      }
    }).catch(() => {
      ElMessage({
        message: '已取消',
        type: 'info'
      });
    })
  }

  return {
    ...toRefs(data),
    newFolder,
    saveFolder,
    refreshTableData,
    getSelectData,
    openFolder,
    downloadBanch,
    deleteBanch
  }
}