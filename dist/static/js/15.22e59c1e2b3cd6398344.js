webpackJsonp([15],{HIMv:function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,"",""])},K4Pe:function(e,t,a){var i=a("Alxp")(a("jH4x"),a("Z7cE"),function(e){a("yu/B")},null,null);e.exports=i.exports},Z7cE:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"clearfix"},[a("div",{staticClass:"model-search clearfix"},[a("el-form",{attrs:{size:"small",inline:!0,model:e.formData}},[1==e.customerType?a("el-select",{staticClass:"item-select",staticStyle:{width:"120px"},attrs:{size:"small",placeholder:"实名认证",clearable:"",filterable:""},on:{change:e.searchParam},model:{value:e.formData.realNameType,callback:function(t){e.$set(e.formData,"realNameType",t)},expression:"formData.realNameType"}},e._l(e.attestation,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})):e._e(),e._v(" "),1==e.customerType?a("el-select",{staticClass:"item-select filter-item",staticStyle:{width:"120px"},attrs:{size:"small",placeholder:"入住情况",clearable:"",filterable:""},on:{change:e.searchParam},model:{value:e.formData.liveType,callback:function(t){e.$set(e.formData,"liveType",t)},expression:"formData.liveType"}},e._l(e.checkIn,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})):e._e(),e._v(" "),2==e.customerType?a("el-select",{staticClass:"item-select",staticStyle:{width:"180px"},attrs:{size:"small",placeholder:"全部组织",clearable:"",filterable:""},on:{change:e.searchParam},model:{value:e.formData.type,callback:function(t){e.$set(e.formData,"type",t)},expression:"formData.type"}},e._l(e.organization,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})):e._e(),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"180px"},attrs:{size:"small",placeholder:"姓名/手机号码/证件号"},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchParam(t)}},model:{value:e.formData.keyWord,callback:function(t){e.$set(e.formData,"keyWord","string"==typeof t?t.trim():t)},expression:"formData.keyWord"}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",size:"small",icon:"el-icon-search"},nativeOn:{click:function(t){e.searchParam(t)}}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{plain:"",size:"small",icon:"el-icon-remove-outline"},nativeOn:{click:function(t){e.clearForm(t)}}},[e._v("清空")])],1)],1),e._v(" "),a("div",{staticClass:"model-table",style:e.tableStyle},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:e.tableData,"max-height":e.tableHeight,size:"small",fit:"",stripe:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"index",width:"60",align:"center"}}),e._v(" "),e._l(e.colModels,function(t,i){return a("el-table-column",{key:i,attrs:{label:t.label,width:t.width,fit:"","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(i){return["authentication"==t.filterType?a("el-tag",{attrs:{type:"2"==i.row[t.prop]?"success":"info"}},[e._v("\n            "+e._s(e._f("filterStr")(i.row[t.prop],t.filterType))+"\n          ")]):t.filterType?a("span",[e._v("\n            "+e._s(e._f("filterStr")(i.row[t.prop],t.filterType))+"\n          ")]):"mobile"==t.prop||"cardNo"==t.prop?a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:i.row[t.prop],placement:"top-start"}},[a("span",[e._v(e._s(e._f("xing")(i.row[t.prop])))])]):a("span",[e._v("\n            "+e._s(i.row[t.prop])+"\n          ")])]}}])})}),e._v(" "),1==e.customerType?a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-tickets",size:"small"},nativeOn:{click:function(a){e.showRecord(t.row)}}},[e._v("租房记录")]),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-tickets",size:"small",plain:""},nativeOn:{click:function(a){e.showDevice(t.row)}}},[e._v("智能设备")])]}}])}):e._e()],2)],1),e._v(" "),a("div",{staticClass:"model-pagination"},[a("el-pagination",{attrs:{background:"","current-page":e.pageItems.pageNo,"page-sizes":e.pageSizeList,"page-size":e.pageItems.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.pageItems,"pageNo",t)}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"租房记录",width:"1000px",visible:e.rentRecord},on:{"update:visible":function(t){e.rentRecord=t}}},[e.rentRecord?a("GridUnit",{ref:"refGridUnit",attrs:{columns:e.overlayCol,formOptions:e.rentParams,listField:"data.list",showPagination:!1,url:"/market/customer/",dataMethod:"queryRentRecord"}}):e._e()],1),e._v(" "),a("el-dialog",{attrs:{title:"智能设备",width:"1000px",visible:e.deviceInfo},on:{"update:visible":function(t){e.deviceInfo=t}}},[e.deviceInfo?a("GridUnit",{ref:"deviceTable",attrs:{columns:e.deviceCol,formOptions:e.deviceParams,listField:"data.list",showPagination:!1,url:"/market/customer/",dataMethod:"deviceList"},scopedSlots:e._u([{key:"manageLimit",fn:function(t){return["门禁"!==t.row.deviceType?a("span",[e._v("/")]):a("el-tag",{attrs:{type:1===t.row.landlordStatus?"success":"info"}},[e._v("\n            "+e._s(1===t.row.landlordStatus?"可用":"不可用")+"\n        ")])]}},{key:"rentLimit",fn:function(t){return["门禁"!==t.row.deviceType?a("span",[e._v("/")]):a("el-tag",{attrs:{type:1===t.row.lodgerStatus?"success":"info"}},[e._v("\n            "+e._s(1===t.row.lodgerStatus?"可用":"不可用")+"\n        ")])]}},{key:"checkPassword",fn:function(t){return[1==t.row.devicePwdStatus&&void 0===e.devicePWDList[t.$index]?a("el-button",{attrs:{type:"text"},on:{click:function(a){e.getDevivePWD(t.row,t.$index)}}},[e._v("查看")]):e.devicePWDList[t.$index]?a("span",[e._v(e._s(e.devicePWDList[t.$index]))]):a("span")]}}])}):e._e()],1)],1)},staticRenderFns:[]}},jH4x:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("aA9S"),r=a.n(i),l=a("cAgV"),n=a("U4Ig"),o=a.n(n),s=a("ms7A"),c=a("0xDb");t.default={name:"queryCenterComp",props:{customerType:{type:Number,default:1}},components:{GridUnit:o.a},directives:{waves:l.a},filters:{statusFilter:function(e){return{1:"info",2:"success"}[e]||"info"},filterStr:function(e,t){var a={gender:["","男","女"],cardType:["","身份证","护照","港澳通行证","台湾通行证"],authentication:["未认证","未认证","已认证"],authenticationSource:["","系统","人工","系统"],registerSource:["","PC","APP"],status:["未入住","在住","申请换房","申请退房","已搬离"],isContracter:["否","是","否"],housingType:["","集中式","分散式"],deviceStatus:["等待安装","正常","停用"],deviceLimit:["可用","不可用"]};return a[t]?a[t][e]||("authenticationSource"==t?"其他":""):""},xing:function(e){return e&&e.length>=7?Object(c.e)(e,3,4):e}},data:function(){return{attestation:[{value:0,label:"未提交资料"},{value:1,label:"审核中"},{value:2,label:"认证通过"},{value:3,label:"审核不通过"}],checkIn:[{value:1,label:"目前在住"},{value:2,label:"尚未入住"}],organization:[{value:1,label:"系统"},{value:2,label:"公司企业"},{value:3,label:"个人组织"}],formData:{type:"",realNameType:"",liveType:"",keyWord:""},overlayCol:[{prop:"subdistrictAddress",label:"位置"},{prop:"subdistrictName",label:"小区/公寓"},{prop:"status",label:"入住状态",filterType:"status",width:80,type:"status",unitFilters:{renderStatusType:function(e){return 1==e?"success":"info"},renderStatusValue:function(e){return["未入住","在住","申请换房","申请退房","已搬离"][e]||"待上线"}}},{prop:"isContracter",label:"签约人",filterType:"isContracter",width:80,type:"status",unitFilters:{renderStatusType:function(e){return 1==e?"success":"info"},renderStatusValue:function(e){return["否","是"][e]||"待上线"}}},{prop:"startDate",label:"入住时间"},{prop:"endDate",label:"离开时间"},{prop:"rentTypeName",label:"租赁方式"},{prop:"housingType",label:"房源类型",filterType:"housingType",width:80,render:function(e){return 1==e.housingType?"集中式":"分散式"}},{prop:"orgName",label:"归属组织"}],deviceCol:[{prop:"fangyuanName",label:"房源信息"},{prop:"roomCode",label:"房源编码"},{prop:"deviceType",label:"设备类型"},{prop:"productBrandName",label:"设备品牌"},{prop:"productType",label:"设备型号"},{prop:"deviceCurrentStatus",label:"设备状态",type:"status",unitFilters:{renderStatusType:function(e){return 1==e?"success":2==e?"danger":"info"},renderStatusValue:function(e){return["等待安装","正常","停用"][e]||"待上线"}}},{prop:"landlordStatus",label:"管家权限",slotName:"manageLimit"},{prop:"lodgerStatus",label:"租客权限",slotName:"rentLimit"},{prop:"devicePwdStatus",label:"查看离线密码",slotName:"checkPassword",align:"center"}],rentRecord:!1,deviceInfo:!1,tableHeight:300,tableData:[],customerTypeClone:this.customerType,searchParams:{},rentParams:{},deviceParams:{},detailData:{},total:null,pageItems:{pageNo:1,pageSize:20},pageSizeList:[10,20,30,50],listLoading:!1,devicePWDList:{}}},created:function(){1==this.customerType?this.colModels=[{prop:"customerId",label:"ID"},{prop:"customerName",label:"用户名"},{prop:"mobile",label:"手机号码",width:120},{prop:"realName",label:"真实姓名",width:120},{prop:"gender",label:"性别",width:80,filterType:"gender"},{prop:"cardType",label:"证件类型",width:100,filterType:"cardType"},{prop:"cardNo",label:"证件号码",width:180},{prop:"authentication",label:"实名状态",width:100,filterType:"authentication"},{prop:"authenticationSource",label:"实名类型",width:80,filterType:"authenticationSource"},{prop:"registerSource",label:"注册端",width:80,filterType:"registerSource"}]:this.colModels=[{prop:"mobile",label:"手机号码"},{prop:"name",label:"姓名"},{prop:"gender",label:"性别",filterType:"gender"},{prop:"cardType",label:"证件类型",width:120,filterType:"cardType"},{prop:"cardNo",label:"证件号码",width:180},{prop:"authentication",label:"实名状态",width:120,filterType:"authentication"},{prop:"gmtCreateName",label:"归属组织",width:180}],this.getGridData(this.pageItems)},mounted:function(){var e=this,t=document.body.clientHeight-267;this.tableHeight=t>300?t:300,window.onresize=function(){return t=document.body.clientHeight-267,void(e.tableHeight=e.tableHeight=t>300?t:300)}},computed:{tableStyle:function(){return{width:"100%",height:this.tableHeight+"px"}}},watch:{deviceInfo:function(e){e||(this.devicePWDList={})}},methods:{handleSizeChange:function(e){this.pageItems.pageSize=e,this.getGridData(this.pageItems)},handleCurrentChange:function(e){this.pageItems.pageNo=e,this.getGridData(this.pageItems)},searchParam:function(){var e=Object(c.c)(this.formData);this.pageItems={pageNo:1,pageSize:20},this.getGridData(r()(this.pageItems,e))},clearForm:function(){this.formData={type:"",realNameType:"",liveType:"",keyWord:""},this.pageItems={pageNo:1,pageSize:20},this.searchParam()},showRecord:function(e){this.rentRecord=!0,this.rentParams={pageNo:1,pageSize:9999,customerId:e.customerId}},showDevice:function(e){this.deviceInfo=!0,this.deviceParams={customerId:e.customerId}},showDetail:function(e){this.lookDetail=!0,this.detailData=e},getGridData:function(e){var t=this;this.listLoading=!0,this.searchParams=Object(c.c)(e),(1==this.customerType?s.e:s.c)(Object(c.a)(this.searchParams)).then(function(e){t.tableData=e.data.list,t.total=e.data.record,t.listLoading=!1})},getDevivePWD:function(e,t){var a=this;Object(s.f)({deviceId:e.deviceId}).then(function(e){a.$set(a.devicePWDList,t,e.data||"")})}}}},"yu/B":function(e,t,a){var i=a("HIMv");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("8bSs")("78e93d25",i,!0)}});