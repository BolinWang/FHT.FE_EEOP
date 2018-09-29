/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-09-26 18:01:14
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-29 10:25:47
 */

// 客源管理-客户来源
export const customerData = {
  sourceList: [
    '闲鱼', '麦邻租房APP', '个人安居客', '58个人', '老客推荐',
    '58企业', '公司贝壳找房', '个人贝壳找房', '公司赶集', '蹲点截客',
    '个人微信', '个人蘑菇租房', '个人豆瓣', '个人嗨住', '个人赶集', '公司嗨住',
    '企业客户', '小广告', '线下走访'
  ].map((item) => {
    return {
      label: item,
      value: item
    }
  }),
  housingTypeList: [{
    label: '集中式',
    value: 1
  }, {
    label: '分散式',
    value: 2
  }],
  statusList: [{
    label: '已处理',
    value: 1
  }, {
    label: '未处理',
    value: 0
  }],
  resultList: ['已沟通并转接信息', '电话未接听', '电话确认无效'].map((item) => {
    return {
      label: item,
      value: item
    }
  })
}
