// 规划条件审核的表格配置
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
  menuWidth: '220',
  column: [
    {
      label: '地块编号',
      prop: 'dkbh',
      width: '240px',
      // search: true,
    },
    {
      label: '土地用途',
      prop: 'tdyt',
    },
    {
      label: '总用地面积（亩）',
      type: 'number',
      prop: 'zydmj',
    },
    {
      label: '净用地面积',
      prop: 'jydmj',
    },
    {
      label: '建筑容积率',
      prop: 'jzrjl',
    },
    {
      label: '建筑限高',
      prop: 'jzxg',
    },
    {
      label: '建筑层数',
      prop: 'jzcs',
      slot: true
    },
    {
      label: '建筑密度',
      prop: 'jzmd',
    },
  ]
}
