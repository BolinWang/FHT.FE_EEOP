webpackJsonp([13],{Ih1y:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("Edqs"),o=a.n(l),i=a("cAgV"),s=a("0xDb"),n=a("ms7A");t.default={name:"lookRecord",directives:{waves:i.a},filters:{tagFilter:function(e){return{0:"info",1:"success",2:"success"}[e]||"info"},statusFilter:function(e,t){return{lookHouseStatus:["未带看","带看中","已带看"],lookHouseResult:["未签约","已签约"]}[t][e]||"未知"}},data:function(){return{formData:{code:"",mobile:"",type1:"",type2:"",type3:"",type4:"",startDate1:"",endDate1:"",startDate2:"",endDate2:""},date1:[],date2:[],typeOpt1:[{label:"已领取",value:1},{label:"已过期",value:2},{label:"已使用",value:3}],typeOpt2:[{label:"房租",value:1},{label:"押金",value:2},{label:"电费",value:3},{label:"水费",value:4}],typeOpt3:[{label:"麦邻生活APP",value:1},{label:"微信H5",value:2},{label:"系统赠送",value:3},{label:"扫码",value:4}],dialogForm:{name:""},listLoading:!1,layer_showInfo:!1,colModels:[{prop:"userName",label:"优惠券批次编码"},{prop:"userMobile",label:"优惠券类型"},{prop:"bookingTime",label:"费用类型"},{prop:"roomAddr",label:"优惠金额"},{prop:"serverName",label:"优惠券ID"},{prop:"serverMobile",label:"优惠券状态"},{prop:"lookHouseStatus",label:"领取手机号"},{prop:"lookHouseResult",label:"领取时间"},{prop:"lookHouseResult",label:"获取渠道"},{prop:"lookHouseResult",label:"消费账单号"},{prop:"lookHouseResult",label:"消费时间"}],tableHeight:300,tableData:[],pageSizeList:[10,20,30,50],total:null,pageItems:{pageNo:1,pageSize:20}}},mounted:function(){var e=this,t=document.body.clientHeight-220;this.tableHeight=t>300?t:300,window.onresize=function(){return t=document.body.clientHeight-220,void(e.tableHeight=e.tableHeight=t>300?t:300)},this.getGridData(this.pageItems),console.log(2885),console.log(2854.11)},computed:{tableStyle:function(){return{width:"100%",height:this.tableHeight+"px"}}},methods:{getGridData:function(e){var t=this;this.listLoading=!0,this.searchParams=o()(Object(s.b)(e),Object(s.b)(this.formData)),Object(n.h)(Object(s.a)(this.searchParams)).then(function(e){t.listLoading=!1,t.tableData=e.data.list,t.total=e.data.record})},searchParam:function(){this.pageItems={pageNo:1,pageSize:20},this.getGridData(this.pageItems)},clearForm:function(){this.pageItems={pageNo:1,pageSize:20},this.formData={code:"",mobile:"",type1:"",type2:"",type3:"",type4:"",startDate1:"",endDate1:"",startDate2:"",endDate2:""},this.date1=[],this.date2=[],this.getGridData(this.pageItems)},lookData:function(e){this.layer_showInfo=!0},dialogClose:function(){},handleSizeChange:function(e){this.pageItems.pageSize=e,this.getGridData(this.pageItems)},handleCurrentChange:function(e){this.pageItems.pageNo=e,this.getGridData(this.pageItems)}},watch:{date1:function(e){e=e||[],this.formData.startDate1=e[0]?Object(s.c)(e[0]):"",this.formData.endDate1=e[1]?Object(s.c)(e[1]):""},date2:function(e){e=e||[],this.formData.startDate2=e[0]?Object(s.c)(e[0]):"",this.formData.endDate2=e[1]?Object(s.c)(e[1]):""}}}},KvTZ:function(e,t,a){var l=a("cp0A");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("6imX")("778859d3",l,!0)},MNBv:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"model-search clearfix"},[a("el-form",{attrs:{size:"small",inline:!0,model:e.formData}},[a("div",{staticClass:"clearfix"},[a("el-input",{staticStyle:{width:"160px"},attrs:{size:"small",placeholder:"优惠批次编码"},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchParam(t)}},model:{value:e.formData.code,callback:function(t){e.$set(e.formData,"code",t)},expression:"formData.code"}}),e._v(" "),a("el-input",{staticStyle:{width:"130px"},attrs:{size:"small",placeholder:"租客手机号码"},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchParam(t)}},model:{value:e.formData.mobile,callback:function(t){e.$set(e.formData,"mobile",t)},expression:"formData.mobile"}}),e._v(" "),a("el-input",{staticStyle:{width:"150px"},attrs:{size:"small",placeholder:"消费账单号"},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchParam(t)}},model:{value:e.formData.type1,callback:function(t){e.$set(e.formData,"type1",t)},expression:"formData.type1"}}),e._v(" "),a("el-select",{staticClass:"item-select",staticStyle:{width:"120px"},attrs:{size:"small",placeholder:"优惠券状态",clearable:""},model:{value:e.formData.type2,callback:function(t){e.$set(e.formData,"type2",t)},expression:"formData.type2"}},e._l(e.typeOpt1,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("el-select",{staticClass:"item-select",staticStyle:{width:"100px"},attrs:{size:"small",placeholder:"费用类型",clearable:""},model:{value:e.formData.type3,callback:function(t){e.$set(e.formData,"type3",t)},expression:"formData.type3"}},e._l(e.typeOpt2,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("el-select",{staticClass:"item-select",staticStyle:{width:"130px"},attrs:{size:"small",placeholder:"获取渠道",clearable:""},model:{value:e.formData.type4,callback:function(t){e.$set(e.formData,"type4",t)},expression:"formData.type4"}},e._l(e.typeOpt3,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",size:"small",icon:"el-icon-search"},nativeOn:{click:function(t){e.searchParam(t)}}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{plain:"",size:"small",icon:"el-icon-remove-outline"},nativeOn:{click:function(t){e.clearForm(t)}}},[e._v("清空")])],1),e._v(" "),a("div",{staticClass:"clearfix",staticStyle:{"margin-top":"10px"}},[a("el-date-picker",{staticStyle:{width:"405px"},attrs:{type:"datetimerange","range-separator":"至",size:"small","start-placeholder":"领取开始日期","end-placeholder":"领取结束日期",align:"right"},model:{value:e.date1,callback:function(t){e.date1=t},expression:"date1"}}),e._v(" "),a("el-date-picker",{staticClass:"item-select",staticStyle:{width:"403px"},attrs:{type:"datetimerange","range-separator":"至",size:"small","start-placeholder":"消费开始日期","end-placeholder":"消费结束日期",align:"right"},model:{value:e.date2,callback:function(t){e.date2=t},expression:"date2"}})],1)])],1),e._v(" "),a("div",{staticClass:"model-table",style:e.tableStyle},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:e.tableData,"max-height":e.tableHeight,size:"small",fit:"",stripe:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"index",width:"60",align:"center"}}),e._v(" "),e._l(e.colModels,function(t,l){return a("el-table-column",{key:"index",attrs:{label:t.label,width:t.width,fit:"","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(l){return["status"==t.type?a("el-tag",{attrs:{type:e._f("tagFilter")(l.row[t.prop])}},[e._v("\n                        "+e._s(e._f("statusFilter")(l.row[t.prop],t.prop))+"\n                    ")]):a("span",[e._v("\n                        "+e._s(l.row[t.prop])+"\n                    ")])]}}])})}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"small"},nativeOn:{click:function(a){e.lookData(t.row)}}},[e._v("查看关联信息")])]}}])})],2)],1),e._v(" "),a("div",{staticClass:"model-pagination"},[a("el-pagination",{attrs:{background:"","current-page":e.pageItems.pageNo,"page-sizes":e.pageSizeList,"page-size":e.pageItems.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.pageItems,"pageNo",t)}}})],1),e._v(" "),a("div",{staticClass:"dialog-info"},[a("el-dialog",{attrs:{title:"关联信息",visible:e.layer_showInfo,width:"800px"},on:{"update:visible":function(t){e.layer_showInfo=t},close:e.dialogClose}},[a("el-form",{ref:"dialogForm",attrs:{size:"small","status-icon":"",model:e.dialogForm,"label-width":"110px"}},[a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"用户姓名"}},[a("el-input",{attrs:{disabled:""},model:{value:e.dialogForm.name,callback:function(t){e.$set(e.dialogForm,"name",t)},expression:"dialogForm.name"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"手机号码"}},[a("el-input",{attrs:{disabled:""},model:{value:e.dialogForm.name,callback:function(t){e.$set(e.dialogForm,"name",t)},expression:"dialogForm.name"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"房源位置"}},[a("el-input",{attrs:{disabled:""},model:{value:e.dialogForm.name,callback:function(t){e.$set(e.dialogForm,"name",t)},expression:"dialogForm.name"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"公寓运营商"}},[a("el-input",{attrs:{disabled:""},model:{value:e.dialogForm.name,callback:function(t){e.$set(e.dialogForm,"name",t)},expression:"dialogForm.name"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"小区公寓-房间"}},[a("el-input",{staticStyle:{width:"132.5px"},attrs:{disabled:""},model:{value:e.dialogForm.name,callback:function(t){e.$set(e.dialogForm,"name",t)},expression:"dialogForm.name"}}),e._v(" "),a("el-input",{staticStyle:{width:"132.5px"},attrs:{disabled:""},model:{value:e.dialogForm.name,callback:function(t){e.$set(e.dialogForm,"name",t)},expression:"dialogForm.name"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"","label-width":"10px"}},[a("el-input",{attrs:{disabled:""},model:{value:e.dialogForm.name,callback:function(t){e.$set(e.dialogForm,"name",t)},expression:"dialogForm.name"}})],1)],1)],1)])],1)],1)])},staticRenderFns:[]}},cp0A:function(e,t,a){(e.exports=a("bKW+")(!1)).push([e.i,"",""])},uFAY:function(e,t,a){var l=a("+g4/")(a("Ih1y"),a("MNBv"),function(e){a("KvTZ")},null,null);e.exports=l.exports}});