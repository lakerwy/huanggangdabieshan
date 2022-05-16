// 发包审核的表格配置
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
  labelWidth: '160', // 弹出表单的label宽度
  menuAlign: 'left', // 菜单栏对齐方式
  menuWidth: '250',
  column: [
    {
      label: '项目名称',
      prop: 'bt',
      width: '240px',
      // search: true,
    },
    {
      label: '产权类型',
      type: 'select',
      prop: 'cqlxbh',
      // search: true,
      dicUrl: baseUrl + 'admin/dict/type/property_type',
      rules: [{
        required: true,
        message: '请输入产权类型',
        trigger: 'blur'
      }]
    },
    {
      label: '所在区域',
      prop: 'xzqbh',
      type: 'cascader',
      dataType: 'string',
      checkStrictly: true, // 是否严格遵守父子不关联
      showAllLevels: false, // 是否显示完整路径
      emitPath: false, // 只返回该节点的值
      dicUrl: baseUrl + 'trade-website/cqjyService/getXzqhInfo',
      dicMethod: 'post',
      props: {
        label: 'xzqmc',
        value: 'xzqbh',
        children: 'list'
      },
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
      prop: 'lzlx',
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
      prop: 'mj',
      rules: [{
        required: true,
        message: '请输入面积（亩）',
        trigger: 'blur'
      }]
    },
    {
      label: '最小面积',
      type: 'select',
      prop: 'minArea',
      showColumn: false, // 是否加入动态现隐列
      // search: true,
      addDisplay: false,
      editDisplay: false,
      dicData: [
        { label: '0亩', value: 0 },
        { label: '100亩', value: 100 },
        { label: '300亩', value: 300 },
        { label: '500亩', value: 500 },
        { label: '1000亩', value: 1000 },
      ]
    },
    {
      label: '最大面积',
      type: 'select',
      prop: 'maxArea',
      showColumn: false, // 是否加入动态现隐列
      // search: true,
      addDisplay: false,
      editDisplay: false,
      dicData: [
        { label: '100亩', value: 100 },
        { label: '300亩', value: 300 },
        { label: '500亩', value: 500 },
        { label: '1000亩', value: 1000 },
      ]
    },
    {
      label: '发布者姓名',
      prop: 'lxr',
      rules: [{
        required: true,
        message: '请输入发布者',
        trigger: 'blur'
      }]
    },
    {
      label: '村级审核状态',
      prop: 'cjsh',
      addDisplay: false,
      editDisplay: false,
      slot: true,
    },
    {
      label: '乡镇审核状态',
      prop: 'xzsh',
      addDisplay: false,
      editDisplay: false,
      slot: true,
    },
    {
      label: '主管局审核状态',
      prop: 'zgjsh',
      addDisplay: false,
      editDisplay: false,
      slot: true,
    },
  ]
}


export const targetOption = {
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
  labelWidth: '160', // 弹出表单的label宽度
  menuAlign: 'left', // 菜单栏对齐方式
  menuWidth: '250',
  column: [
    {
      label: '项目名称',
      prop: 'bt',
      width: '240px',
      // search: true,
    },
    {
      label: '指标类型',
      type: 'select',
      prop: 'cqlxbh',
      // search: true,
      dicUrl: baseUrl + 'admin/dict/type/property_type',
      rules: [{
        required: true,
        message: '请输入产权类型',
        trigger: 'blur'
      }]
    },
    {
      label: '所在区域',
      prop: 'xzqbh',
      type: 'cascader',
      dataType: 'string',
      checkStrictly: true, // 是否严格遵守父子不关联
      showAllLevels: false, // 是否显示完整路径
      emitPath: false, // 只返回该节点的值
      dicUrl: baseUrl + 'trade-website/cqjyService/getXzqhInfo',
      dicMethod: 'post',
      props: {
        label: 'xzqmc',
        value: 'xzqbh',
        children: 'list'
      },
      // search: true,
      rules: [{
        required: true,
        message: '请输入所在区域',
        trigger: 'blur'
      }]
    },
    {
      label: '面积（亩）',
      type: 'number',
      prop: 'mj',
      rules: [{
        required: true,
        message: '请输入面积（亩）',
        trigger: 'blur'
      }]
    },
    {
      label: '复垦耕地类型',
      prop: 'zctdyt',
      rules: [{
        required: true,
        message: '请输入复垦耕地类型',
        trigger: 'blur'
      }]
    },
    {
      label: '复垦耕地等级',
      prop: 'tdxz',
      addDisplay: false,
      editDisplay: false,
    },
    {
      label: '复垦耕地产能（公斤）',
      prop: 'dsfzw',
      addDisplay: false,
      editDisplay: false,
    },
  ]
}
