import { param2Obj } from '@/utils'

export default {
  list: config => {
    return {
      "reqId": null,
      "code": "0",
      "message": "操作成功",
      "data": {
        "orgId": "1",
        "organizationName": "测试组织",
        "status": "启用",
        "name": "姓名" ,
        "mobile": "12345678901",
        "userType": "管理员",
        "idlefishStatus": "已开通",
        "idlefishAccount": "闲鱼昵称",
        "children": [{
          "name": "子账号" ,
          "mobile": "12345678902",
          "userType": "普通用户",
          "idlefishStatus": "已开通",
          "idlefishAccount": "aaaa",
        }]
      }
    }
  },
  bind: config => {

  },
  status: config => {

  },
  picture: config => {

  }
}
