<template>
<!-- 暂未用 -->
  <el-dialog 
    title="新建文件夹" 
    v-model="dialogNewVisible" 
    :append-to-body="true"
    width="25%"
    top="33vh">
    <el-form :model="form" label-width="80px" label-position="left">
      <el-form-item label="语种">
        <el-select style="width:100%;" v-model="form.docLanguage" placeholder="请选择文件夹语种">
          <el-option label="中文" value="0"></el-option>
          <el-option label="英文" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件名">
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
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    dialogNewVisible: {
      type: Boolean
    }
  },
  setup() {
    
  },
})
</script>
