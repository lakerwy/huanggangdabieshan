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
  menuAlign: 'left', // 菜单栏对齐方式
  column: [
    {
      label: '标题',
      prop: 'title',
      // width: '200px',
    },
    {
      label: '一级',
      type: 'select',
      prop: 'articleSid',
      dicUrl: baseUrl + 'trade-website/cqjyService/getXzqhInfo',
      dicMethod: 'post',
      props: {
        label: 'xzqmc',
        value: 'xzqbh',
        children: 'list'
      },
      rules: [{
        required: true,
        message: '分类',
        trigger: 'blur'
      }]
    },
    {
      label: '二级',
      type: 'select',
      prop: 'articleTid',
      dicUrl: baseUrl + 'trade-website/cqjyService/getXzqhInfo',
      dicMethod: 'post',
      props: {
        label: 'xzqmc',
        value: 'xzqbh',
        children: 'list'
      },
      rules: [{
        required: true,
        message: '分类',
        trigger: 'blur'
      }]
    },
    {
      label: '作者',
      prop: 'source',
    },
    {
      label: '创建时间',
      prop: 'createTime',
      // width: '140px',
      type: 'datetime',
    },
  ]
}
