webpackJsonp([7,27],{"0C41":function(e,t,a){var r=a("NpHY");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("8bSs")("5e926374",r,!0)},HIMv:function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,'.customer-table-expand{font-size:0}.customer-table-expand label{width:80px;color:#99a9bf}.customer-table-expand .el-form-item{margin-right:0;margin-bottom:0;width:30%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.el-table__expand-icon:after{content:" "}.el-table__expand-icon .el-icon{display:none!important}',""])},K4Pe:function(e,t,a){var r=a("Alxp")(a("jH4x"),a("Z7cE"),function(e){a("yu/B")},null,null);e.exports=r.exports},Mk74:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},e._l(e.tabMapOptions,function(t,r){return a("el-tab-pane",{key:r,attrs:{label:t,name:t}},[e.activeName==t?a("customer-table",{ref:"querycenter",refInFor:!0,attrs:{"customer-type":1*r+1}}):e._e()],1)}))],1)},staticRenderFns:[]}},NpHY:function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,".model-search .filter-item{margin-left:10px}",""])},Z7cE:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"clearfix"},[a("div",{staticClass:"model-search clearfix"},[a("el-form",{attrs:{size:"small",inline:!0,model:e.formData}},[1==e.customerType?a("el-select",{staticClass:"item-select",staticStyle:{width:"120px"},attrs:{size:"small",placeholder:"实名认证",clearable:"",filterable:""},on:{change:e.searchParam},model:{value:e.formData.realNameType,callback:function(t){e.$set(e.formData,"realNameType",t)},expression:"formData.realNameType"}},e._l(e.attestation,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})):e._e(),e._v(" "),1==e.customerType?a("el-select",{staticClass:"item-select filter-item",staticStyle:{width:"120px"},attrs:{size:"small",placeholder:"入住情况",clearable:"",filterable:""},on:{change:e.searchParam},model:{value:e.formData.liveType,callback:function(t){e.$set(e.formData,"liveType",t)},expression:"formData.liveType"}},e._l(e.checkIn,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})):e._e(),e._v(" "),2==e.customerType?a("el-select",{staticClass:"item-select",staticStyle:{width:"180px"},attrs:{size:"small",placeholder:"全部组织",clearable:"",filterable:""},on:{change:e.searchParam},model:{value:e.formData.type,callback:function(t){e.$set(e.formData,"type",t)},expression:"formData.type"}},e._l(e.organization,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})):e._e(),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"180px"},attrs:{size:"small",placeholder:"姓名/手机号码/证件号"},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchParam(t)}},model:{value:e.formData.keyWord,callback:function(t){e.$set(e.formData,"keyWord","string"==typeof t?t.trim():t)},expression:"formData.keyWord"}}),e._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",size:"small",icon:"el-icon-search"},nativeOn:{click:function(t){e.searchParam(t)}}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{plain:"",size:"small",icon:"el-icon-remove-outline"},nativeOn:{click:function(t){e.clearForm(t)}}},[e._v("清空")])],1)],1),e._v(" "),a("div",{staticClass:"model-table",style:e.tableStyle},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:e.tableData,"max-height":e.tableHeight,size:"small",fit:"",stripe:"","highlight-current-row":"","row-key":"customerId","expand-row-keys":e.expandKeys}},[a("el-table-column",{attrs:{type:"index",width:"60",align:"center"}}),e._v(" "),1*e.customerType==1?a("el-table-column",{attrs:{width:"0",type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.rentRecordList.length>0?a("el-collapse",{attrs:{accordion:""},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},e._l(e.rentRecordList,function(t,r){return a("el-collapse-item",{key:r,attrs:{name:r}},[a("template",{attrs:{slot:"title"},slot:"title"},[a("el-button",{attrs:{type:"primary",round:"",size:"mini"},on:{click:function(a){a.stopPropagation(),e.showBillDetail(t)}}},[e._v("账单详情")]),e._v("\n                "+e._s(t.startDate)+"\n                "+e._s(t.subdistrictName)+"\n              ")],1),e._v(" "),a("el-form",{staticClass:"customer-table-expand",attrs:{"label-position":"left",inline:""}},e._l(e.overlayCol,function(r,i){return a("el-form-item",{key:i,attrs:{label:r.label}},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:r.render?r.render(t):t[r.prop],placement:"top-start"}},[a("span",[e._v(e._s(r.render?r.render(t):t[r.prop]))])])],1)}))],2)})):a("p",[e._v("暂无数据")])]}}])}):e._e(),e._v(" "),e._l(e.colModels,function(t,r){return a("el-table-column",{key:r,attrs:{label:t.label,width:t.width,fit:"","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(r){return["authentication"==t.filterType?a("el-tag",{attrs:{type:"2"==r.row[t.prop]?"success":"info"}},[e._v("\n            "+e._s(e._f("filterStr")(r.row[t.prop],t.filterType))+"\n          ")]):t.filterType?a("span",[e._v("\n            "+e._s(e._f("filterStr")(r.row[t.prop],t.filterType))+"\n          ")]):"mobile"==t.prop||"cardNo"==t.prop?a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:r.row[t.prop],placement:"top-start"}},[a("span",[e._v(e._s(e._f("xing")(r.row[t.prop])))])]):a("span",[e._v("\n            "+e._s(r.row[t.prop])+"\n          ")])]}}])})}),e._v(" "),1==e.customerType?a("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(a){e.showRecord(t.row)}}},[e._v("租房记录")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(a){e.showDevice(t.row)}}},[e._v("智能设备")])]}}])}):e._e()],2)],1),e._v(" "),a("div",{staticClass:"model-pagination"},[a("el-pagination",{attrs:{background:"","current-page":e.pageItems.pageNo,"page-sizes":e.pageSizeList,"page-size":e.pageItems.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.pageItems,"pageNo",t)}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"智能设备",width:"1100px",visible:e.deviceInfo},on:{"update:visible":function(t){e.deviceInfo=t}}},[e.deviceInfo?a("GridUnit",{ref:"deviceTable",attrs:{columns:e.deviceCol,formOptions:e.deviceParams,listField:"data.list",showPagination:!1,url:"/market/customer/",dataMethod:"deviceList"},scopedSlots:e._u([{key:"deviceStatus",fn:function(t){return["电表"===t.row.deviceType?a("el-tag",{attrs:{type:1===t.row.deviceCurrentStatus?"success":"info"}},[e._v("\n            "+e._s(0===t.row.deviceCurrentStatus?"等待安装":1===t.row.deviceCurrentStatus?"启用":"停用")+"\n        ")]):a("span",[e._v("/")])]}},{key:"deviceCurrentStatus",fn:function(t){return["电表"===t.row.deviceType?a("el-tag",{attrs:{type:1===t.row.deviceCurrentStatus?"success":"info"}},[e._v("\n            "+e._s(1===t.row.deviceCurrentStatus?"通电":"断电")+"\n        ")]):a("el-tag",{attrs:{type:1===t.row.deviceCurrentStatus?"success":"info"}},[e._v("\n            "+e._s(1===t.row.deviceCurrentStatus?"启用":"停用")+"\n        ")])]}},{key:"manageLimit",fn:function(t){return["门锁"!==t.row.deviceType?a("span",[e._v("/")]):a("el-tag",{attrs:{type:1===t.row.landlordStatus?"success":"info"}},[e._v("\n            "+e._s(1===t.row.landlordStatus?"启用":"停用")+"\n        ")])]}},{key:"rentLimit",fn:function(t){return["门锁"!==t.row.deviceType?a("span",[e._v("/")]):a("el-tag",{attrs:{type:1===t.row.lodgerStatus?"success":"info"}},[e._v("\n            "+e._s(1===t.row.lodgerStatus?"启用":"停用")+"\n        ")])]}},{key:"checkPassword",fn:function(t){return[1==t.row.devicePwdStatus&&void 0===e.devicePWDList[t.$index]?a("el-button",{attrs:{type:"text"},on:{click:function(a){e.getDevivePWD(t.row,t.$index)}}},[e._v("查看")]):e.devicePWDList[t.$index]?a("span",[e._v(e._s(e.devicePWDList[t.$index]))]):a("span")]}}])}):e._e()],1),e._v(" "),a("el-dialog",{attrs:{title:e.billInfos.name+"的账单详情",width:"1100px",visible:e.billInfos.isShow},on:{"update:visible":function(t){e.$set(e.billInfos,"isShow",t)}}},[e.billInfos.isShow?a("GridUnit",{ref:"billGrid",attrs:{columns:e.billInfos.colModel,formOptions:{orderId:e.billInfos.orderId},listField:"data.result",totalField:"data.records",url:"/market/customer/",dataMethod:"queryLeaseBillInfo"}}):e._e()],1)],1)},staticRenderFns:[]}},faXV:function(e,t,a){var r=a("Alxp")(a("gexG"),a("Mk74"),function(e){a("0C41")},null,null);e.exports=r.exports},gexG:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("cAgV"),i=a("K4Pe"),l=a.n(i);t.default={name:"initCustomerList",directives:{waves:r.a},components:{customerTable:l.a},data:function(){return{tabMapOptions:["C端租客","B端租客"],activeName:"C端租客"}}}},jH4x:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("aA9S"),i=a.n(r),l=a("U4Ig"),n=a.n(l),o=a("ms7A"),s=a("0xDb");t.default={name:"queryCenterComp",props:{customerType:{type:Number,default:1}},components:{GridUnit:n.a},filters:{statusFilter:function(e){return{1:"info",2:"success"}[e]||"info"},filterStr:function(e,t){var a={gender:["","男","女"],cardType:["","身份证","护照","港澳通行证","台湾通行证"],authentication:["未认证","未认证","已认证"],authenticationSource:["","系统","人工","系统"],registerSource:["","PC","APP"],status:["未入住","在住","申请换房","申请退房","已搬离"],isContracter:["否","是","否"],housingType:["","集中式","分散式"],deviceStatus:["等待安装","正常","停用"],deviceLimit:["可用","不可用"]};return a[t]?a[t][e]||("authenticationSource"===t?"其他":""):""},xing:function(e){return e&&e.length>=7?Object(s.g)(e,3,4):e}},data:function(){return{activeName:0,expandKeys:[],rentRecordList:[],attestation:[{value:0,label:"未提交资料"},{value:1,label:"审核中"},{value:2,label:"认证通过"},{value:3,label:"审核不通过"}],checkIn:[{value:1,label:"目前在住"},{value:2,label:"尚未入住"}],organization:[{value:1,label:"系统"},{value:2,label:"公司企业"},{value:3,label:"个人组织"}],formData:{type:"",realNameType:"",liveType:"",keyWord:""},overlayCol:[{prop:"subdistrictAddress",label:"位置"},{prop:"subdistrictName",label:"小区/公寓"},{prop:"status",label:"入住状态",filterType:"status",width:80,render:function(e){return["未入住","在住","申请换房","申请退房","已搬离"][e.status]||"未知"}},{prop:"isContracter",label:"签约人",filterType:"isContracter",width:80,render:function(e){return["否","是"][e.isContracter]||"未知"}},{prop:"startDate",label:"入住时间"},{prop:"endDate",label:"离开时间"},{prop:"rentTypeName",label:"租赁方式"},{prop:"housingType",label:"房源类型",filterType:"housingType",width:80,render:function(e){return 1*e.housingType==1?"集中式":"分散式"}},{prop:"orgName",label:"归属组织"}],deviceCol:[{prop:"fangyuanName",label:"房源信息"},{prop:"roomCode",label:"房源编码"},{prop:"deviceType",label:"设备类型"},{prop:"productBrandName",label:"设备品牌"},{prop:"productType",label:"设备型号"},{prop:"deviceStatus",label:"管理状态",align:"center",slotName:"deviceStatus"},{prop:"deviceCurrentStatus",label:"设备状态",slotName:"deviceCurrentStatus",align:"center"},{prop:"landlordStatus",label:"管家权限",slotName:"manageLimit",align:"center"},{prop:"lodgerStatus",label:"租客权限",slotName:"rentLimit",align:"center"},{prop:"devicePwdStatus",label:"查看离线密码",slotName:"checkPassword",align:"center"}],billInfos:{isShow:!1,orderId:null,name:"",colModel:[{prop:"billName",label:"账单名称"},{prop:"billType",label:"费用类型"},{prop:"startDate",label:"开始时间"},{prop:"endDate",label:"结束时间"},{prop:"billFee",label:"账单金额"},{prop:"billStatus",label:"账单状态"},{prop:"actualPayFee",label:"实收金额"},{prop:"finishDate",label:"支付时间"},{prop:"payType",label:"支付方式"}]},rentRecord:!1,deviceInfo:!1,tableHeight:300,tableData:[],customerTypeClone:this.customerType,searchParams:{},deviceParams:{},total:null,pageItems:{pageNo:1,pageSize:20},pageSizeList:[20,30,50],listLoading:!1,devicePWDList:{}}},created:function(){1*this.customerType==1?this.colModels=[{prop:"customerId",label:"ID"},{prop:"customerName",label:"用户名"},{prop:"mobile",label:"手机号码",width:120},{prop:"realName",label:"真实姓名",width:120},{prop:"gender",label:"性别",width:80,filterType:"gender"},{prop:"cardType",label:"证件类型",width:100,filterType:"cardType"},{prop:"cardNo",label:"证件号码",width:180},{prop:"authentication",label:"实名状态",width:100,filterType:"authentication"},{prop:"authenticationSource",label:"实名类型",width:80,filterType:"authenticationSource"},{prop:"registerSource",label:"注册端",width:80,filterType:"registerSource"}]:this.colModels=[{prop:"mobile",label:"手机号码"},{prop:"name",label:"姓名"},{prop:"gender",label:"性别",filterType:"gender"},{prop:"cardType",label:"证件类型",width:120,filterType:"cardType"},{prop:"cardNo",label:"证件号码",width:180},{prop:"authentication",label:"实名状态",width:120,filterType:"authentication"},{prop:"gmtCreateName",label:"归属组织",width:180}],this.getGridData(this.pageItems)},mounted:function(){var e=this;this.$nextTick(function(){var t=document.body.clientHeight-250;e.tableHeight=t>300?t:300,window.onresize=function(){return t=document.body.clientHeight-250,void(e.tableHeight=e.tableHeight=t>300?t:300)}})},computed:{tableStyle:function(){return{width:"100%",height:this.tableHeight+"px"}}},watch:{deviceInfo:function(e){e||(this.devicePWDList={})}},methods:{handleSizeChange:function(e){this.pageItems.pageSize=e,this.getGridData(this.pageItems)},handleCurrentChange:function(e){this.pageItems.pageNo=e,this.getGridData(this.pageItems)},searchParam:function(){var e=Object(s.d)(this.formData);this.pageItems={pageNo:1,pageSize:20},this.getGridData(i()(this.pageItems,e))},clearForm:function(){this.formData={type:"",realNameType:"",liveType:"",keyWord:""},this.pageItems={pageNo:1,pageSize:20},this.searchParam()},showRecord:function(e){var t=this;this.expandKeys.indexOf(e.customerId)<0?(this.rentRecord=!0,this.rentParams={pageNo:1,pageSize:9999,customerId:e.customerId},this.activeName=0,Object(o.n)(Object(s.a)(this.rentParams)).then(function(a){t.rentRecordList=a.data.list,t.rentRecordList.map(function(t){t.realName=e.realName||"租客"}),t.rentRecord=!1,t.expandKeys=[e.customerId]}).catch(function(){t.rentRecord=!1})):this.expandKeys=[]},showDevice:function(e){this.deviceInfo=!0,this.deviceParams={customerId:e.customerId}},getGridData:function(e){var t=this;this.listLoading=!0,this.searchParams=Object(s.d)(e),(1*this.customerType==1?o.e:o.c)(Object(s.a)(this.searchParams)).then(function(e){t.tableData=e.data.list,t.total=e.data.record,t.listLoading=!1,t.expandKeys=[]})},getDevivePWD:function(e,t){var a=this;Object(o.f)({deviceId:e.deviceId}).then(function(e){a.$set(a.devicePWDList,t,e.data||"")})},showBillDetail:function(e){this.billInfos.name=e.realName,this.billInfos.orderId=e.orderId,this.billInfos.isShow=!0}}}},"yu/B":function(e,t,a){var r=a("HIMv");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("8bSs")("78e93d25",r,!0)}});