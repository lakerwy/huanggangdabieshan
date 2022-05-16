<template>
  <!-- 添加或修改菜单对话框 -->
  <el-dialog :title="!form.menuId ? '新增' : '修改'" v-model="visible" :before-close="dialogClose">
    <el-form ref="dataForm" :model="form" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单类型" prop="type">
            <el-radio-group v-model="form.type" size="small">
              <el-radio-button label="0">左菜单</el-radio-button>
              <el-radio-button label="1">按钮</el-radio-button>
              <el-radio-button label="2">顶菜单</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- <el-form-item label="上级菜单">
            <treeselect
              v-model="form.parentId"
              :options="menuOptions"
              :normalizer="normalizer"
              :show-count="true"
              placeholder="选择上级菜单"
            />
          </el-form-item> -->
        </el-col>
      </el-row>
      <el-form-item prop="parentId" label="选择上级菜单">
        <el-select v-model="treeName" placeholder="请选择...">
          <el-option style="height: auto" class="treeOption">
            <el-tree
              ref="tree"
              node-key="id"
              :data="menuOptions"
              :props="treeProps"
              @node-click="orgNodeClick"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="图标" prop="icon" v-if="form.type !== '1'">
        <avue-input-icon
          v-model="form.icon"
          :icon-list="iconList"
        ></avue-input-icon>
        <img v-for="(item, index) in iconList" :key="index" :src="item" alt="">
      </el-form-item> -->
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="路由地址" prop="path" v-if="form.type !== '1'">
        <el-input v-model="form.path" placeholder="请输入路由地址" />
      </el-form-item>
      <el-form-item label="权限标识" prop="permission" v-if="form.type === '1'">
        <el-input
          v-model="form.permission"
          placeholder="请权限标识"
          maxlength="50"
        />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="排序" prop="sort">
            <el-input-number
              v-model="form.sort"
              controls-position="right"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="路由缓冲"
            prop="keepAlive"
            v-if="form.type !== '1'"
          >
            <el-radio-group v-model="form.keepAlive">
              <el-radio-button label="0">否</el-radio-button>
              <el-radio-button label="1">是</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button type="primary" @click="dataFormSubmit">确 定</el-button>
      <el-button @click="dialogClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addObj, fetchMenuTree, getObj, putObj } from "@/api/admin/menu";
import Treeselect from "@riophae/vue-treeselect";
import iconList from "@/const/iconList";
import TableForm from "./";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { mapMutations } from "vuex";

export default {
  name: "Menu",
  components: { Treeselect, TableForm },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 菜单树选项
      menuOptions: [],
      treeArr: [],
      treeName: "",
      treeProps: {
        children: "children",
        label: "name",
      },
      // 是否显示弹出层
      visible: false,
      // 图标
      iconList: iconList,
      form: {
        menuId: undefined,
        name: undefined,
        path: undefined,
        icon: undefined,
        permission: undefined,
        type: "0",
        keepAlive: "0",
        sort: 999,
      },
      // 表单校验
      rules: {
        name: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" },
          { max: 20, message: "最多输入20个字符", trigger: "blur" },
        ],
        sort: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" },
        ],
        path: [
          { required: true, message: "路由地址不能为空", trigger: "blur" },
          { max: 50, message: "最多输入50个字符", trigger: "blur" },
        ],
        keepAlive: [
          { required: true, message: "路由缓冲不能为空", trigger: "blur" },
        ],
        permission: [
          { required: true, message: "权限标识不能为空", trigger: "blur" },
          { max: 50, message: "最多输入50个字符", trigger: "blur" },
        ],
        parentId: [ { required: true, message: ' ', trigger: 'change' }]
      },
    };
  },
  methods: {
    ...mapMutations(["SET_UPDATE_MENU"]),
    dialogClose(){
      this.form={};
      this.$parent.addOrUpdateVisible=false;
    },
    init(isEdit, id) {
      if (id != null) {
        this.form.parentId = id;
      }
      this.visible = true;
      this.getTreeselect();
      this.$nextTick(() => {
        if (isEdit) {
          getObj(id).then((response) => {
            this.form = response.data;
            if (response.data.parentId !== -1) {
              this.treeArr.forEach((item) => {
                if (item.id == response.data.parentId) {
                  this.treeName = item.name;
                  return;
                }
              });
            } else {
              this.treeName = "根目录";
            }
          });
        } else {
          this.reseatForm();
        }
      });
    },
    reseatForm() {
      this.form = {
        menuId: undefined,
        name: undefined,
        path: undefined,
        icon: undefined,
        permission: undefined,
        type: "0",
        keepAlive: "0",
        sort: 999,
      };
    },
    orgNodeClick(data) {
      this.form.parentId = data.id;
      this.treeName = data.name;
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          if (this.form.parentId === undefined) {
            this.form.parentId = -1;
          }

          if (this.form.menuId) {
            putObj(this.form).then((data) => {
              if (data.code == 0 && data.data) {
                this.$message.success("修改成功");
                this.visible = false;
                this.$emit("refreshDataList");
                this.updateStore();
              } else {
                this.$message.error(data.msg);
              }
            });
          } else {
            addObj(this.form).then((data) => {
              if (data.code == 0 && data.data) {
                this.$message.success("添加成功");
                this.visible = false;
                this.$emit("refreshDataList");
                this.updateStore();
              } else {
                this.$message.error(data.msg);
              }
            });
          }
        }
      });
    },
    updateStore() {
      this.$store.dispatch("GetMenu", { type: true, id: "" }).then((data2) => {
        if (data2.length !== 0) {
          this.$router.$avueRouter.formatRoutes(data2, true);
          this.$store
            .dispatch("GetLeftMenu", {
              type: true,
              id: sessionStorage.getItem("top-menu-id"),
            })
            .then((data) => {
              this.$router.go(0);
            });
        }
      });
    },
    /** 查询菜单下拉树结构 */
    async getTreeselect() {
      await fetchMenuTree().then((response) => {
        this.menuOptions = [];
        const menu = { id: -1, name: "根菜单", children: [] };
        menu.children = response.data;
        this.treeArr = response.data;
        this.menuOptions.push(menu);
      });
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children,
      };
    },
  },
};
</script>
