// 融资资格审查--抵押申请的表格配置
const baseUrl = window.globalUrl.HOME_API;

export const tableOption = {
    border: false,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    searchMenuSpan: 6,
    align: 'center',
    addBtn:false, // 不显示新增按钮
    delBtn:false, // 删除按钮
    editBtn:false, // 编辑按钮
    searchLabelWidth: '100', // 表单搜索框的label宽度
    labelWidth: '150', // 弹出表单的label宽度
    column: [
      {
        label: '项目名称',
        prop: 'name',
        width: '240px',
        // search: true,
      },
      {
        label: '产权类型',
        type: 'select',
        width: '160px',
        prop: 'type',
        // search: true,
        dicUrl: baseUrl + 'admin/dict/type/property_type',
        rules: [{
          required: true,
          message: '请选择产权类型',
          trigger: 'change'
        }]
      },
      {
        label: '所在区域',
        type: 'select',
        prop: 'address',
        width: '100px',
        // search: true,
        rules: [{
          required: true,
          message: '请输入所在区域',
          trigger: 'blur'
        }]
      },
      {
        label: '流转类型',
        type: 'select',
        width: '100px',
        prop: 'flowType',
        // search: true,
        dicUrl: baseUrl + 'admin/dict/type/flow_type',
        rules: [{
          required: true,
          message: '请输入流转类型',
          trigger: 'blur'
        }]
      },
      {
        label: '面积（亩）',
        type: 'number',
        prop: 'area',
        width: '100px',
        // search: true,
        rules: [{
          required: true,
          message: '请输入面积（亩）',
          trigger: 'blur'
        }]
      },
      {
        label: '出让方',
        prop: 'licensor',
        width: '100px',
        rules: [{
          required: true,
          message: '请输入出让方',
          trigger: 'blur'
        }]
      },
      {
        label: '承包人同意证明',
        prop: 'contractor',
        width: '120px',
      },
      {
        label: '土地产权凭证',
        prop: 'land',
        width: '120px',
      },
      {
        label: '图片附件',
        prop: 'pictures',
        width: '240px',
      },
    ]
  }
