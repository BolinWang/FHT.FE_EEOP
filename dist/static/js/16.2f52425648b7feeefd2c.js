webpackJsonp([16],{BGqk:function(t,e,a){var s=a("WcGj");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a("8bSs")("b51424d4",s,!0)},LfAO:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-form",{staticClass:"model-search clearfix",attrs:{inline:!0,size:"small"}},[a("el-select",{staticClass:"item-select",attrs:{size:"small",filterable:"",placeholder:"组织类型"},model:{value:t.searchParams.type,callback:function(e){t.$set(t.searchParams,"type",e)},expression:"searchParams.type"}},[a("el-option",{attrs:{label:"公司企业",value:2}}),t._v(" "),a("el-option",{attrs:{label:"个人",value:3}}),t._v(" "),a("el-option",{attrs:{label:"系统",value:1}})],1),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"180px"},attrs:{size:"small",clearable:"",placeholder:"组织名称"},model:{value:t.searchParams.organizationName,callback:function(e){t.$set(t.searchParams,"organizationName",e)},expression:"searchParams.organizationName"}}),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"180px"},attrs:{size:"small",clearable:"",placeholder:"手机号"},model:{value:t.searchParams.mobile,callback:function(e){t.$set(t.searchParams,"mobile",e)},expression:"searchParams.mobile"}}),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:t.searchParam}},[t._v("查询")]),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{size:"small",icon:"el-icon-remove-outline"},on:{click:function(e){t.searchParam("clear")}}},[t._v("清空")])],1),t._v(" "),a("GridUnit",{ref:"refGridUnit",attrs:{columns:t.colModels,formOptions:t.searchParams,url:t.url,dataMethod:t.method,height:t.tableHeight,showExpand:!0,expandColums:t.colModels},on:{"expand-change":t.getExpandData},scopedSlots:t._u([{key:"expandTable",fn:function(e){return[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.rowData.children||[],"max-height":300,size:"small","header-row-class-name":"expandHeader"}},t._l(t.expand_colModels,function(e,s){return a("el-table-column",{key:s,attrs:{label:e.label,prop:e.prop},scopedSlots:t._u([{key:"default",fn:function(s){return[e.slotName?a("span",["已开通"!==t.rowData.idlefishStatus?a("el-tag",{attrs:{type:"warning",size:"small"}},[t._v("请先开通主账号")]):a("div",["已开通"===s.row.idlefishStatus?a("div",[a("el-tag",{attrs:{type:"success",size:"small"}},[t._v("已开通")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){t.handleSetting(s.row,1,"change")}}},[t._v("账号换绑")])],1):"解绑中"===s.row.idlefishStatus?a("div",[a("el-tag",{attrs:{type:"info",size:"small"}},[t._v("解绑中")])],1):a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){t.handleSetting(s.row,1)}}},[t._v("开通账号")])],1)],1):a("span",[t._v("\n              "+t._s(e.render?e.render(s.row):s.row[e.prop])+"\n            ")])]}}])})}))]}},{key:"handle",fn:function(e){return["已开通"!==e.row.idlefishStatus?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.handleSetting(e.row,0)}}},[t._v("申请开通")]):t._e(),t._v(" "),"已开通"===e.row.idlefishStatus?a("el-tag",{attrs:{type:"success",size:"small"}},[t._v("已开通")]):t._e()]}}])}),t._v(" "),a("div",{staticClass:"dialog_apply"},[a("el-dialog",{attrs:{title:t.dialogTitle,visible:t.layer_showApply},on:{"update:visible":function(e){t.layer_showApply=e},close:t.dialogClose}},[a("el-steps",{staticStyle:{"margin-bottom":"30px"},attrs:{active:t.active_step,"align-center":"","finish-status":"success"}},[a("el-step",{attrs:{title:"填写闲鱼昵称",description:"打开闲鱼APP，点击【我的】，用户名即为闲鱼昵称，闲鱼昵称需要进行实名认证才可同步房源（闲鱼APP-我的-头像-实名认证）"}}),t._v(" "),a("el-step",{attrs:{title:"扫码授权",description:"打开闲鱼APP进行扫码授权"}})],1),t._v(" "),0===t.active_step?a("div",{staticClass:"text-center",staticStyle:{display:"flex","justify-content":"center"}},[a("el-form",{ref:"dataForm",staticStyle:{width:"400px"},attrs:{size:"small","status-icon":"",rules:t.rules,model:t.temp}},[a("el-form-item",{attrs:{prop:"account"}},[a("el-input",{attrs:{placeholder:"请输入闲鱼昵称",clearable:"",size:"small"},model:{value:t.temp.account,callback:function(e){t.$set(t.temp,"account",e)},expression:"temp.account"}},[a("template",{attrs:{slot:"prepend"},slot:"prepend"},[t._v("闲鱼昵称")])],2)],1)],1)],1):a("div",{staticClass:"text-center",staticStyle:{display:"flex","justify-content":"center"}},[a("el-card",{staticStyle:{"max-width":"500px"},attrs:{"body-style":{padding:"0px"}}},[a("img",{staticStyle:{display:"block",width:"100%"},attrs:{src:t.picUrl}}),t._v(" "),a("div",{staticStyle:{padding:"14px"}},[a("span",[t._v("请用闲鱼APP进行扫码授权")])])])],1),t._v(" "),a("div",{staticClass:"dialog-footer text-center",attrs:{slot:"footer"},slot:"footer"},[0===t.active_step?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.nextStep}},[t._v("下一步")]):t._e(),t._v(" "),1===t.active_step?a("el-button",{attrs:{size:"small"},on:{click:function(e){t.active_step=0}}},[t._v("上一步")]):t._e(),t._v(" "),1===t.active_step?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.saveApplyInfo}},[t._v("确认授权")]):t._e()],1)],1)],1)],1)},staticRenderFns:[]}},TKtU:function(t,e,a){var s=a("Alxp")(a("wFwo"),a("LfAO"),function(t){a("BGqk")},null,null);t.exports=s.exports},WcGj:function(t,e,a){(t.exports=a("BkJT")(!1)).push([t.i,".model-table{margin-bottom:0}.dialog_apply .el-step__description{color:#c0c4cc!important}",""])},hKcQ:function(t,e,a){t.exports=a.p+"static/img/banner.5db0395.jpg"},wFwo:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("4YfN"),l=a.n(s),i=a("U4Ig"),r=a.n(i),n=a("0xDb"),o=a("QHcW"),c=a("hKcQ"),p=a.n(c);e.default={name:"authorize",components:{GridUnit:r.a},data:function(){return{searchParams:{type:2,organizationName:"",mobile:""},picUrl:p.a,colModels:[{prop:"organizationName",label:"组织名称"},{prop:"status",label:"组织状态",type:"status",unitFilters:{renderStatusType:function(t){return{"启用":"success","停用":"danger"}[t]||"info"},renderStatusValue:function(t){return t||"未知"}}},{prop:"name",label:"姓名"},{prop:"mobile",label:"手机号"},{prop:"userType",label:"用户类型"},{prop:"idlefishStatus",label:"闲鱼账号",slotName:"handle",width:150,align:"center"},{prop:"idlefishAccount",label:"闲鱼昵称"}],expand_colModels:[{prop:"name",label:"姓名"},{prop:"mobile",label:"手机号"},{prop:"userType",label:"用户类型"},{prop:"idlefishStatus",label:"闲鱼账号",slotName:"handle",width:150,align:"center"},{prop:"idlefishAccount",label:"闲鱼昵称"}],tableHeight:300,url:o.a.defaultOptions.requestUrl,method:o.a.defaultOptions.method,rules:{account:[{required:!0,message:"请填写闲鱼昵称",trigger:"blur"}]},temp:{account:""},rowData:{},active_step:0,dialogTitle:"",layer_showApply:!1}},created:function(){},mounted:function(){var t=this;this.$nextTick(function(){var e=t.$refs.refGridUnit.$el.offsetTop||140,a=document.body.clientHeight-e-64-20;t.tableHeight=a>300?a:300,window.onresize=function(){return a=document.body.clientHeight-e-64-20,void(t.tableHeight=t.tableHeight=a>300?a:300)}})},computed:{tableStyle:function(){return{width:"100%",height:this.tableHeight+"px"}}},methods:{searchParam:function(t){var e=this;"clear"===t&&(this.searchParams={type:2}),this.$nextTick(function(){e.$refs.refGridUnit.searchHandler()})},getExpandData:function(t,e){this.rowData=Object(n.d)(t)},handleSetting:function(t,e,a){this.dialogTitle=a?"账号换绑":"申请开通",this.temp=l()({},t,{account:"",type:e,bindType:a}),this.layer_showApply=!0},nextStep:function(){var t=this;this.$refs.dataForm.validate(function(e){if(e){var a={platform:"idlefish",userid:t.temp.userId,account:t.temp.account,type:t.temp.type,mobile:t.temp.mobile,brand:t.temp.name};o.a.bind(Object(n.a)(a)).then(function(e){o.a.picture({platform:"idlefish",saasId:0}).then(function(e){t.picUrl=e.data.picUrl,t.active_step=1})})}})},saveApplyInfo:function(){var t=this;o.a.status(Object(n.a)({platform:"idlefish",userid:this.temp.userId})).then(function(e){t.layer_showApply=!1,t.searchParam(),t.$notify({title:"成功",message:"授权成功",type:"success",duration:2e3})})},dialogClose:function(){this.temp={account:""},this.active_step=0,this.$refs.dataForm&&this.$refs.dataForm.resetFields(),this.layer_showApply=!1}}}}});