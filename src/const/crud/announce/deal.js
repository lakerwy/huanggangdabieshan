// 成交公示的表格配置
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
  menuWidth: '200',
  column: [
    {
      label: '项目名称',
      prop: 'xmmc',
      width: '240px',
    },
    {
      label: '项目编号',
      prop: 'xmbh',
      width: '120px',
      rules: [
        { required: true, message: '请输入项目编号', trigger: 'blur'},
        { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur'}
      ]
    },
    {
      label: '产权类型',
      type: 'select',
      prop: 'cqlxbh',
      width: '120px',
      dicUrl: baseUrl + 'admin/dict/type/property_type',
      rules: [{
        required: true,
        message: '请输入产权类型',
        trigger: 'blur'
      }]
    },
    {
      label: '所在区域',
      type: 'select',
      prop: 'xzqbh',
      dicUrl: baseUrl + 'trade-website/cqjyService/getXzqhInfo',
      dicMethod: 'post',
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
      label: '东至',
      prop: 'dz',
      hide: true,
      rules: [{
        min: 0,
        max: 1000000,
        message: '大于0小于1000000',
        trigger: 'blur'
      }]
    },
    {
      label: '西至',
      prop: 'xz',
      hide: true,
      rules: [{
        min: 0,
        max: 1000000,
        message: '大于0小于1000000',
        trigger: 'blur'
      }]
    },
    {
      label: '南至',
      prop: 'nz',
      hide: true,
      rules: [{
        min: 0,
        max: 1000000,
        message: '大于0小于1000000',
        trigger: 'blur'
      }]
    },
    {
      label: '北至',
      prop: 'bz',
      hide: true,
      rules: [{
        min: 0,
        max: 1000000,
        message: '大于0小于1000000',
        trigger: 'blur'
      }]
    },
    {
      label: '面积（亩）',
      type: 'number',
      prop: 'zcmj',
      rules: [{
        required: true,
        message: '请输入面积（亩）',
        trigger: 'blur'
      }]
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
      label: '成交金额（元）',
      type: 'number',
      prop: 'gpjg',
      rules: [{
        required: true,
        message: '请输入成交金额（元）',
        trigger: 'blur'
      }]
    },
    {
      label: '流转年限',
      type: 'number',
      prop: 'lznx',
      hide: true,
      rules: [{
        required: true,
        message: '请输入流转年限',
        trigger: 'blur'
      }]
    },
    {
      label: '承包人',
      prop: 'xm',
      rules: [{
        required: true,
        message: '请输入承包人',
        trigger: 'blur'
      }]
    },
    {
      label: '转出方',
      prop: 'zcf',
      width: '130',
      rules: [{
        required: true,
        message: '请输入出让方',
        trigger: 'blur'
      }]
    },
    {
      label: '是否公示',
      prop: 'cjgs',
      type: 'select',
      dicData: [
        {label: '未公示', value: '0'},
        {label: '已公示', value: '1'},
      ]
    },
    {
      label: '公示标题',
      prop: 'cjgsbt',
      hide: true
    },
    {
      label: '公示开始时间',
      prop: 'cjgskssj',
      width: '140px',
      hide: true,
      type: 'datetime',
    },
    {
      label: '公示截止时间',
      prop: 'cjgsjzsj',
      width: '140px',
      hide: true,
      type: 'datetime',
    },
    // {
    //   label: '受让方',
    //   prop: 'srf',
    //   rules: [{
    //     required: true,
    //     message: '请输入受让方',
    //     trigger: 'blur'
    //   }]
    // },
    // {
    //   label: '登记人',
    //   prop: 'djr',
    //   rules: [{
    //     required: true,
    //     message: '请输入登记人',
    //     trigger: 'blur'
    //   }]
    // },
    {
      label: '登记时间',
      prop: 'cjsj',
      width: '140px',
      type: 'datetime',
      // editDisabled: true,
      format: 'yyyy-MM-dd hh:mm:ss',
      valueFormat: 'yyyy-MM-dd hh:mm:ss',
    },
  ]
}
