webpackJsonp([5,21],{"3mil":function(e,t,a){var l=a("63Ur");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("6imX")("31263a49",l,!0)},"63Ur":function(e,t,a){(e.exports=a("bKW+")(!1)).push([e.i,".model-search .filter-item{margin-left:10px}",""])},CzzP:function(e,t,a){(e.exports=a("bKW+")(!1)).push([e.i,"",""])},Ff8T:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("Edqs"),r=a.n(l),i=a("cAgV"),o=a("ms7A"),n=a("0xDb");t.default={name:"queryCenterComp",props:{customerType:{type:Number,default:1}},directives:{waves:i.a},filters:{statusFilter:function(e){return{1:"info",2:"success"}[e]||"info"},filterStr:function(e,t){var a={gender:["","男","女"],cardType:["","身份证","护照","港澳通行证","台湾通行证"],authentication:["未认证","未认证","已认证"],authenticationSource:["","系统","人工","系统"],registerSource:["","PC","APP"],status:["未入住","在住","申请换房","申请退房","已搬离"],isContracter:["否","是","否"],housingType:["","集中式","分散式"]};return a[t]?a[t][e]||("authenticationSource"==t?"其他":""):""},xing:function(e){return e&&e.length>=7?Object(n.d)(e,3,4):e}},data:function(){return{attestation:[{value:0,label:"未提交资料"},{value:1,label:"审核中"},{value:2,label:"认证通过"},{value:3,label:"审核不通过"}],checkIn:[{value:1,label:"目前在住"},{value:2,label:"尚未入住"}],organization:[{value:1,label:"系统"},{value:2,label:"公司企业"},{value:3,label:"个人组织"}],formData:{type:"",realNameType:"",liveType:"",keyWord:""},overlayCol:[{prop:"subdistrictAddress",label:"位置"},{prop:"subdistrictName",label:"小区/公寓"},{prop:"status",label:"入住状态",filterType:"status",width:80},{prop:"isContracter",label:"签约人",filterType:"isContracter",width:80},{prop:"startDate",label:"入住时间"},{prop:"endDate",label:"离开时间"},{prop:"housingType",label:"房源类型",filterType:"housingType",width:80},{prop:"orgName",label:"归属组织"}],rentRecord:!1,tableHeight:300,tableData:[],overlayData:[],customerTypeClone:this.customerType,searchParams:{},detailData:{},total:null,pageItems:{pageNo:1,pageSize:20},pageSizeList:[10,20,30,50],listLoading:!1}},created:function(){1==this.customerType?this.colModels=[{prop:"customerId",label:"ID"},{prop:"customerName",label:"用户名"},{prop:"mobile",label:"手机号码",width:120},{prop:"realName",label:"真实姓名",width:120},{prop:"gender",label:"性别",width:80,filterType:"gender"},{prop:"cardType",label:"证件类型",width:100,filterType:"cardType"},{prop:"cardNo",label:"证件号码",width:180},{prop:"authentication",label:"实名状态",width:100,filterType:"authentication"},{prop:"authenticationSource",label:"实名类型",width:80,filterType:"authenticationSource"},{prop:"registerSource",label:"注册端",width:80,filterType:"registerSource"}]:this.colModels=[{prop:"mobile",label:"手机号码"},{prop:"name",label:"姓名"},{prop:"gender",label:"性别",filterType:"gender"},{prop:"cardType",label:"证件类型",width:120,filterType:"cardType"},{prop:"cardNo",label:"证件号码",width:180},{prop:"authentication",label:"实名状态",width:120,filterType:"authentication"},{prop:"gmtCreateName",label:"归属组织",width:180}],this.getGridData(this.pageItems)},mounted:function(){var e=this,t=document.body.clientHeight-267;this.tableHeight=t>300?t:300,window.onresize=function(){return t=document.body.clientHeight-267,void(e.tableHeight=e.tableHeight=t>300?t:300)}},computed:{tableStyle:function(){return{width:"100%",height:this.tableHeight+"px"}}},methods:{handleSizeChange:function(e){this.pageItems.pageSize=e,this.getGridData(this.pageItems)},handleCurrentChange:function(e){this.pageItems.pageNo=e,this.getGridData(this.pageItems)},searchParam:function(){var e=Object(n.b)(this.formData);this.pageItems={pageNo:1,pageSize:20},this.getGridData(r()(this.pageItems,e))},clearForm:function(){this.formData={type:"",realNameType:"",liveType:"",keyWord:""},this.pageItems={pageNo:1,pageSize:20},this.searchParam()},showRecord:function(e){var t=this;this.rentRecord=!0;var a={pageNo:1,pageSize:9999,customerId:e.customerId};Object(o.k)(Object(n.a)(a)).then(function(e){t.overlayData=e.data.list,t.overlayTotal=e.data.record})},showDetail:function(e){this.lookDetail=!0,this.detailData=e},getGridData:function(e){var t=this;this.listLoading=!0,this.searchParams=Object(n.b)(e),(1==this.customerType?o.d:o.b)(Object(n.a)(this.searchParams)).then(function(e){t.tableData=e.data.list,t.total=e.data.record,t.listLoading=!1})}}}},K4Pe:function(e,t,a){var l=a("+g4/")(a("Ff8T"),a("aX4g"),function(e){a("jCbB")},null,null);e.exports=l.exports},QpF8:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-tabs",{attrs:{type:"border-card"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},e._l(e.tabMapOptions,function(t,l){return a("el-tab-pane",{key:l,attrs:{label:t,name:t}},[e.activeName==t?a("customer-table",{ref:"querycenter",refInFor:!0,attrs:{"customer-type":1*l+1}}):e._e()],1)}))],1)},staticRenderFns:[]}},"Zz+X":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("cAgV"),r=a("K4Pe"),i=a.n(r);a("0xDb");t.default={name:"initCustomerList",directives:{waves:l.a},components:{customerTable:i.a},data:function(){return{tabMapOptions:["C端租客","B端租客"],activeName:"C端租客"}}}},aX4g:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"clearfix"},[a("div",{staticClass:"model-search clearfix"},[a("el-form",{attrs:{size:"small",inline:!0,model:e.formData}},[1==e.customerType?a("el-select",{staticClass:"item-select",staticStyle:{width:"120px"},attrs:{size:"small",placeholder:"实名认证",clearable:"",filterable:""},on:{change:e.searchParam},model:{value:e.formData.realNameType,callback:function(t){e.$set(e.formData,"realNameType",t)},expression:"formData.realNameType"}},e._l(e.attestation,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})):e._e(),e._v(" "),1==e.customerType?a("el-select",{staticClass:"item-select filter-item",staticStyle:{width:"120px"},attrs:{size:"small",placeholder:"入住情况",clearable:"",filterable:""},on:{change:e.searchParam},model:{value:e.formData.liveType,callback:function(t){e.$set(e.formData,"liveType",t)},expression:"formData.liveType"}},e._l(e.checkIn,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})):e._e(),e._v(" "),2==e.customerType?a("el-select",{staticClass:"item-select",staticStyle:{width:"180px"},attrs:{size:"small",placeholder:"全部组织",clearable:"",filterable:""},on:{change:e.searchParam},model:{value:e.formData.type,callback:function(t){e.$set(e.formData,"type",t)},expression:"formData.type"}},e._l(e.organization,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})):e._e(),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"180px"},attrs:{size:"small",placeholder:"姓名/手机号码/证件号"},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchParam(t)}},model:{value:e.formData.keyWord,callback:function(t){e.$set(e.formData,"keyWord","string"==typeof t?t.trim():t)},expression:"formData.keyWord"}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",size:"small",icon:"el-icon-search"},nativeOn:{click:function(t){e.searchParam(t)}}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{plain:"",size:"small",icon:"el-icon-remove-outline"},nativeOn:{click:function(t){e.clearForm(t)}}},[e._v("清空")])],1)],1),e._v(" "),a("div",{staticClass:"model-table",style:e.tableStyle},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:e.tableData,"max-height":e.tableHeight,size:"small",fit:"",stripe:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"index",width:"60",align:"center"}}),e._v(" "),e._l(e.colModels,function(t,l){return a("el-table-column",{key:l,attrs:{label:t.label,width:t.width,fit:"","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(l){return["authentication"==t.filterType?a("el-tag",{attrs:{type:"2"==l.row[t.prop]?"success":"info"}},[e._v("\n            "+e._s(e._f("filterStr")(l.row[t.prop],t.filterType))+"\n          ")]):t.filterType?a("span",[e._v("\n            "+e._s(e._f("filterStr")(l.row[t.prop],t.filterType))+"\n          ")]):"mobile"==t.prop||"cardNo"==t.prop?a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:l.row[t.prop],placement:"top-start"}},[a("span",[e._v(e._s(e._f("xing")(l.row[t.prop])))])]):a("span",[e._v("\n            "+e._s(l.row[t.prop])+"\n          ")])]}}])})}),e._v(" "),1==e.customerType?a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-tickets",size:"small"},nativeOn:{click:function(a){e.showRecord(t.row)}}},[e._v("租房记录")])]}}])}):e._e()],2)],1),e._v(" "),a("div",{staticClass:"model-pagination"},[a("el-pagination",{attrs:{background:"","current-page":e.pageItems.pageNo,"page-sizes":e.pageSizeList,"page-size":e.pageItems.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.pageItems,"pageNo",t)}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"租房记录",width:"1000px",visible:e.rentRecord},on:{close:function(t){e.overlayData=[]},"update:visible":function(t){e.rentRecord=t}}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:e.overlayData,size:"small","max-height":"500",fit:"",stripe:""}},[a("el-table-column",{attrs:{type:"index",width:"60",align:"center"}}),e._v(" "),e._l(e.overlayCol,function(t,l){return a("el-table-column",{key:l,attrs:{label:t.label,width:t.width,fit:"","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(l){return["isContracter"==t.filterType||"status"==t.prop?a("el-tag",{attrs:{type:"1"==l.row[t.prop]?"success":"info"}},[e._v("\n            "+e._s(e._f("filterStr")(l.row[t.prop],t.filterType))+"\n          ")]):t.filterType?a("span",[e._v("\n            "+e._s(e._f("filterStr")(l.row[t.prop],t.filterType))+"\n          ")]):a("span",[e._v("\n            "+e._s(l.row[t.prop])+"\n          ")])]}}])})})],2)],1)],1)},staticRenderFns:[]}},faXV:function(e,t,a){var l=a("+g4/")(a("Zz+X"),a("QpF8"),function(e){a("3mil")},null,null);e.exports=l.exports},jCbB:function(e,t,a){var l=a("CzzP");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("6imX")("153d6b5c",l,!0)}});