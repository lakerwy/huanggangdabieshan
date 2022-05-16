<template>
  <div class="app-container calendar-list-container">
      <div class="filter-container">
          <el-button
            v-if="deptManager_btn_add"
            type="primary"
            icon="el-icon-plus"
            @click="handlerAdd">添加
          </el-button>
          <el-button
            v-if="deptManager_btn_edit"
            type="success"
            icon="el-icon-edit"
            @click="handlerEdit">编辑
          </el-button>
          <el-button
            v-if="deptManager_btn_del"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete">删除
          </el-button>
      </div>

      <el-row>
        <el-col
          :span="5"
          style="margin-top:10px;">
          <el-tree
            :data="treeData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            class="filter-tree"
            node-key="id"
            highlight-current
            @node-click="getNodeData"/>
        </el-col>
        <el-col
          :span="16"
          style="margin-top:15px;">
          <el-card class="box-card">
            <el-form
              ref="form"
              :label-position="labelPosition"
              :rules="rules"
              :model="form"
              label-width="80px">
              <el-form-item
                label="父级节点"
                prop="parentId">
                <el-input
                  v-model="form.parentId"
                  disabled
                  placeholder="请输入父级节点"/>
              </el-form-item>
              <el-form-item
                v-if="formEdit"
                label="节点编号"
                prop="deptId">
                <el-input
                  v-model="form.deptId"
                  :disabled="formEdit"
                  placeholder="节点编号"/>
              </el-form-item>
              <el-form-item
                label="部门名称"
                prop="name">
                <el-input
                  v-model="form.name"
                  :disabled="formEdit"
                  placeholder="请输入名称"/>
              </el-form-item>
              <el-form-item
                label="排序"
                prop="sort">
                <el-input
                  v-model="form.sort"
                  :disabled="formEdit"
                  type="number"
                  placeholder="请输入排序"/>
              </el-form-item>
              <el-form-item v-if="formStatus == 'update'">
                <el-button
                  type="primary"
                  @click="update">更新
                </el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
              <el-form-item v-if="formStatus == 'create'">
                <el-button
                  type="primary"
                  @click="create">保存
                </el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import { addObj, delObj, fetchTree, getObj, putObj } from '@/api/admin/dept'
import { mapGetters } from 'vuex'
import { getProType,getRegionToCity } from '@/api/property/exchangeIssues'
import { split } from '@/util/util.js'

export default {
  name: 'Dept',
  data() {
    return {
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      typeOptions: ['0', '1'],
      methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
      listQuery: {
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      rules: {
        parentId: [
          { required: true, message: '请输入父级节点', trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: '请输入节点编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur'}
        ],
        sort: [
          { required: true, message: '请输入排序值', trigger: 'blur' }
        ]
      },
      labelPosition: 'right',
      form: {
        name: undefined,
        sort: undefined,
        parentId: undefined,
        deptId: undefined,
      },
      currentId: 0,
      deptManager_btn_add: false,
      deptManager_btn_edit: false,
      deptManager_btn_del: false,
      props: {
        label: 'xzqmc',
        children: 'list',
        value: 'xzqbh',
        checkStrictly: true,
        emitPath: false
      },
      regionData:[],
    }
  },
  created() {
    this.getList()
    this.deptManager_btn_add = this.permissions['sys_dept_add']
    this.deptManager_btn_edit = this.permissions['sys_dept_edit']
    this.deptManager_btn_del = this.permissions['sys_dept_del']
  },
  computed: {
    ...mapGetters([
      'elements',
      'permissions'
    ])
  },
  methods: {
    async initRegion() {
      let res = await getRegionToCity();
      let {status,data} = res.data;
      if(status) {
        let temp = data;
        this.regionData = split(temp);
      }
    },
    getList() {
      fetchTree(this.listQuery).then(response => {
        this.treeData = response.data
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getNodeData(data) {
      if (!this.formEdit) {
        this.formStatus = 'update'
      }
      getObj(data.id).then(response => {
        this.form = response.data
      })
      this.currentId = data.id
    },
    handlerEdit() {
      if (this.form.deptId) {
        this.formEdit = false
        this.formStatus = 'update'
      }
    },
    handlerAdd() {
      this.resetForm()
      this.formEdit = false
      this.formStatus = 'create'
    },
    handleDelete() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(this.currentId).then(() => {
          this.getList()
          this.resetForm()
          this.onCancel()
          this.$message.success('删除成功')
        })
      })
    },
    update() {
      this.$refs.form.validate((valid) => {
        if (!valid) return
        putObj(this.form).then(() => {
          this.getList()
          this.onCancel()
          this.$message.success('更新成功')
        })
      })
    },
    create() {
      this.$refs.form.validate((valid) => {
        if (!valid) return
        addObj(this.form).then(() => {
          this.getList()
          this.onCancel()
          this.$message.success('创建成功')
        })
      })
    },
    onCancel() {
      this.formEdit = true
      this.$refs['form'].resetFields();
      getObj(this.currentId).then(response => {
        this.form = response.data
      })
      this.formStatus = ''
    },
    resetForm() {
      this.form = {
        parentId: this.currentId
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-tree{
  border:1px solid #e4e6ea;
  height: 660px;
  overflow-y: auto ;
  padding:12px;
  /deep/.el-tree-node__content{
    height: 30px;
  }
}
</style>

