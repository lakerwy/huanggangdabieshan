// 需求信息的表格配置
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
  menuWidth: '200', // 操作菜单栏的宽度
  column: [
    {
      label: '关键字',
      prop: 'keyword',
      hide: true, // 隐藏
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      // search: true,
      showColumn: false, // 是否加入动态现隐列
      // prepend: '请输入关键字', // 前面的辅助文字
    },
    {
      label: '标题',
      prop: 'bt',
      width: '240px',
    },
    {
      label: '需求编号',
      prop: 'xqbh',
      width: '240px',
      editDisabled: true,
      rules: [
        { required: true, message: '请输入项目编号', trigger: 'blur'},
        { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur'}
      ]
    },
    {
      label: '产权类型',
      type: 'select',
      prop: 'cqlxbh',
      width: '130px',
      dicUrl: baseUrl + 'admin/dict/type/property_type',
      rules: [{
        required: true,
        message: '请输入产权类型',
        trigger: 'blur'
      }]
    },
    {
      label: '所在区域',
      type: 'cascader',
      prop: 'xzqbh',
      dicUrl: baseUrl + 'trade-website/cqjyService/getXzqhInfo',
      dicMethod: 'post',
      width: '210px',
      emitPath: false, // 只返回该节点的值
      checkStrictly: true, // 是否严格遵守父子不关联
      showAllLevels: false, // 是否显示完整路径
      props: {
        label: 'xzqmc',
        value: 'xzqbh',
        children: 'list'
      },
      rules: [{
        required: true,
        message: '请输入所在区域',
        trigger: 'blur'
      }]
    },
    {
      label: '最小面积（亩）',
      type: 'number',
      prop: 'zxmj',
      rules: [{
        required: true,
        message: '请输入面积（亩）',
        trigger: 'blur'
      }]
    },
    {
      label: '最大面积（亩）',
      type: 'number',
      prop: 'zdmj',
      rules: [{
        required: true,
        message: '请输入面积（亩）',
        trigger: 'blur'
      }]
    },
    {
      label: '是否公示',
      prop: 'sfgs',
      type: 'select',
      dicData: [
        {label: '已公示', value: '1'},
        {label: '未公示', value: '0'},
      ]
    },
    {
      label: '公示开始时间',
      prop: 'xqgskssj',
      width: '140px',
      hide: true,
      type: 'datetime',
    },
    {
      label: '公示截止时间',
      prop: 'xqgsjzsj',
      width: '140px',
      hide: true,
      type: 'datetime',
    },
    {
      label: '流转方式',
      type: 'select',
      prop: 'lzlx',
      dicUrl: baseUrl + 'admin/dict/type/flow_type',
      rules: [{
        required: true,
        message: '请输入流转方式',
        trigger: 'blur'
      }]
    },
    {
      label: '预期金额（元）',
      type: 'number',
      prop: 'zdqwjg',
      rules: [{
        required: true,
        message: '请输入预期金额（元）',
        trigger: 'blur'
      }]
    },
    {
      label: '流转年限',
      prop: 'lznx',
      type: 'number',
      rules: [{
        required: true,
        message: '请输入流转年限',
        trigger: 'blur'
      }]
    },
    {
      label: '联系方式',
      prop: 'lxdh',
      width: '120px',
      rules: [{
        required: true,
        message: '请输入联系方式',
        trigger: 'blur'
      }]
    },
    {
      label: '登记人',
      prop: 'lxr',
      rules: [{
        required: true,
        message: '请输入登记人',
        trigger: 'blur'
      }]
    },
    {
      label: '登记时间',
      prop: 'cjsj',
      width: '140px',
      type: 'datetime',
      editDisplay: false,
      format: 'yyyy-MM-dd hh:mm:ss',
      valueFormat: 'yyyy-MM-dd hh:mm:ss',
    },
  ]
}
