webpackJsonp([19],{"07lv":function(t,e,a){var o=a("VU/8")(a("W5le"),a("OKR5"),function(t){a("TkL6")},"data-v-35013ce2",null);t.exports=o.exports},ENX7:function(t,e,a){"use strict";e.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(o.a)({url:"/house/region",method:"post",data:{method:"query.region.area",params:t}})},e.d=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(o.a)({url:"/house/region",method:"post",data:{method:"query.region.zone",params:t}})},e.b=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(o.a)({url:"https://api.mdguanjia.com/myhome/api/search",method:"post",data:{method:"searchByPage",params:t}})},e.c=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(o.a)({url:"/flyingsquad",method:"post",data:{method:"query.server.people",params:t}})},e.f=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(o.a)({url:"/flyingsquad",method:"post",data:{method:"distribute.server",params:t}})},e.e=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(o.a)({url:"/flyingsquad/staff",method:"post",data:{method:"seeRecord",params:t}})};var o=a("Vo7i")},OKR5:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"model-table",style:t.tableStyle},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:t.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:t.tableData,"max-height":t.tableHeight,size:"small",fit:"",stripe:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"index",width:"60",align:"center"}}),t._v(" "),t._l(t.colModels,function(e,o){return a("el-table-column",{key:o,attrs:{label:e.label,width:e.width,fit:"","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(o){return["status"==e.type?a("el-tag",{attrs:{type:t._f("tagFilter")(o.row[e.prop])}},[t._v("\n            "+t._s(t._f("statusFilter")(o.row[e.prop],e.prop))+"\n          ")]):a("span",[t._v("\n            "+t._s(o.row[e.prop])+"\n          ")])]}}])})})],2)],1)])},staticRenderFns:[]}},TkL6:function(t,e,a){var o=a("h7NJ");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a("rjj0")("1a5e1be3",o,!0)},W5le:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("cAgV"),r=a("ENX7");e.default={name:"lookRecord",directives:{waves:o.a},filters:{tagFilter:function(t){return{0:"info",1:"success",2:"success"}[t]||"info"},statusFilter:function(t,e){return{lookHouseStatus:["未带看","带看中","已带看"],lookHouseResult:["未签约","已签约"]}[e][t]||"未知"}},data:function(){return{searchParams:{pageNo:1,pageSize:9999},listLoading:!1,colModels:[{prop:"userName",label:"租客姓名",width:100},{prop:"userMobile",label:"租客电话",width:100},{prop:"bookingTime",label:"看房时间",width:150},{prop:"roomAddr",label:"小区/公寓-房间"},{prop:"landlordName",label:"房东",width:80},{prop:"landlordMobile",label:"房东电话",width:100},{prop:"serverName",label:"城市管家",width:80},{prop:"serverMobile",label:"管家电话",width:100},{prop:"lookHouseStatus",label:"看房进度",width:80,type:"status"},{prop:"lookHouseResult",label:"签约状况",width:80,type:"status"}],tableHeight:300,tableData:[]}},mounted:function(){var t=this;this.$nextTick(function(){var e=document.body.clientHeight-95;t.tableHeight=e>300?e:300,window.onresize=function(){return e=document.body.clientHeight-95,void(t.tableHeight=t.tableHeight=e>300?e:300)},t.getGridData()})},computed:{tableStyle:function(){return{width:"100%",height:this.tableHeight+"px",margin:0}}},methods:{getGridData:function(){var t=this;this.listLoading=!0,Object(r.e)(this.searchParams).then(function(e){t.tableData=e.data&&e.data.list||[],t.listLoading=!1})}}}},h7NJ:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"",""])}});