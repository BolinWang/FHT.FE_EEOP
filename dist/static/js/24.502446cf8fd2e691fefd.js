webpackJsonp([24],{"5jtN":function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,"",""])},RyFz:function(e,t,a){var i=a("Alxp")(a("by6q"),a("wniG"),function(e){a("jnuw")},"data-v-811f3214",null);e.exports=i.exports},by6q:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("aA9S"),r=a.n(i),s=a("cAgV"),o=a("0xDb"),l=a("ms7A"),n=a("E4LH");t.default={name:"applyRegister",directives:{waves:s.a},filters:{statusFilter:function(e){return{1:"info",2:"success"}[e]||"info"},statusStrFilter:function(e){return["未联系","已联系"][e-1]||"未联系"}},data:function(){return{selectOptions:[{label:"未联系",value:1},{label:"已联系",value:2}],colModels:[{prop:"mobile",label:"手机号码",width:150},{prop:"name",label:"姓名"},{prop:"housePosion",label:"地区"},{prop:"houseAmount",label:"房源数量",width:100},{prop:"gmtCreate",label:"申请时间",width:180},{prop:"requestStatus",label:"联系状态",width:100,type:"status"},{prop:"operatorName",label:"操作人"},{prop:"gmtModified",label:"操作时间",width:180}],tableHeight:300,tableData:[],total:null,pageItems:{pageNo:1,pageSize:20},pageSizeList:[10,20,30,50],layer_showInfo:!1,layer_sign:!1,layer_card:!1,formData:{requestStatus:"",mobile:""},ruleForm:{mobile:"",name:""},signForm:{},cardForm:{mobile:"",userName:"",userCardNo:""},rules:{mobile:[{required:!0,trigger:"blur",validator:function(e,t,a){Object(n.b)(t)?a():a(new Error("请输入正确的手机号"))}}],managerMobile:[{required:!0,trigger:"blur",message:"请输入城市管家姓名"}],name:[{required:!0,trigger:"blur",validator:function(e,t,a){t?a():a(new Error("请输入姓名"))}}],spiltRate:[{required:!0,trigger:"blur",validator:function(e,t,a){/^\d+(?:.\d{1,2})?$/.test(t)&&t<=100?a():a(new Error("费率为0到100,最多保留2位小数"))}}],userName:[{required:!0,trigger:"blur",message:"请输入开户人姓名"}],userCardNo:[{required:!0,trigger:"blur",message:"请输入银行卡号"}]}}},created:function(){this.getGridData(this.pageItems)},mounted:function(){var e=this,t=document.body.clientHeight-200;this.tableHeight=t>300?t:300,window.onresize=function(){return t=document.body.clientHeight-200,void(e.tableHeight=e.tableHeight=t>300?t:300)}},computed:{tableStyle:function(){return{width:"100%",height:this.tableHeight+"px"}}},methods:{handleApply:function(){this.layer_showInfo=!0,this.$refs.ruleForm&&this.$refs.ruleForm.clearValidate()},dialogClose:function(){this.$refs.ruleForm.resetFields()},handleSizeChange:function(e){this.pageItems.pageSize=e,this.getGridData(this.pageItems)},handleCurrentChange:function(e){this.pageItems.pageNo=e,this.getGridData(this.pageItems)},getGridData:function(e){var t=this;this.listLoading=!0,this.searchParams=r()(Object(o.d)(e),Object(o.d)(this.formData)),Object(l.o)(Object(o.a)(this.searchParams)).then(function(e){t.tableData=e.data.content,t.total=e.data.totalElements,t.listLoading=!1})},searchParam:function(){this.getGridData(this.pageItems)},clearForm:function(){this.pageItems={pageNo:1,pageSize:20},this.formData={requestStatus:"",mobile:""},this.getGridData(this.pageItems)},signSaveData:function(){var e=this;this.$refs.signForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;Object(l.i)({mobile:e.signForm.mobile,spiltRate:e.signForm.spiltRate}).then(function(t){Object(l.a)({orgId:t.data.orgId,orgName:t.data.orgName,orgMobile:e.signForm.mobile,managerMobile:e.signForm.managerMobile}).then(function(t){e.$message.success("标记成功"),e.layer_sign=!1})}).catch()})},dialogSign:function(){this.signForm={mobile:"",spiltRate:""},this.$refs.signForm.clearValidate()},cardSaveData:function(){var e=this;this.$refs.cardForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;Object(l.b)(Object(o.d)(e.cardForm)).then(function(t){e.$message.success("银行卡绑定成功"),e.layer_card=!1}).catch()})},dialogCard:function(){this.cardForm={mobile:"",userName:"",userCardNo:""},this.$refs.cardForm.clearValidate()},handleSaveData:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;Object(l.q)({mobile:e.ruleForm.mobile+"",name:e.ruleForm.name}).then(function(t){e.layer_showInfo=!1,e.getGridData(e.pageItems),e.$notify({title:"成功",message:"注册成功，初始密码为：123456",type:"success",duration:2e3})})})},signContactor:function(e,t){var a=this;t.requestStatus=2,Object(l.v)([t]).then(function(e){a.getGridData(a.pageItems),a.$notify({title:"成功",message:"标记成功",type:"success",duration:2e3})})}}}},jnuw:function(e,t,a){var i=a("5jtN");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("8bSs")("f1264564",i,!0)},wniG:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"model-search clearfix"},[a("el-select",{staticClass:"item-select",staticStyle:{width:"150px"},attrs:{size:"small",placeholder:"联系状态",clearable:""},model:{value:e.formData.requestStatus,callback:function(t){e.$set(e.formData,"requestStatus",t)},expression:"formData.requestStatus"}},e._l(e.selectOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"180px"},attrs:{size:"small",placeholder:"手机号码"},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchParam(t)}},model:{value:e.formData.mobile,callback:function(t){e.$set(e.formData,"mobile",t)},expression:"formData.mobile"}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",size:"small",icon:"el-icon-search"},nativeOn:{click:function(t){e.searchParam(t)}}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{plain:"",size:"small",icon:"el-icon-remove-outline"},nativeOn:{click:function(t){e.clearForm(t)}}},[e._v("清空")]),e._v(" "),a("el-button",{staticClass:"right",attrs:{type:"primary",size:"small",icon:"el-icon-circle-plus-outline"},nativeOn:{click:function(t){e.handleApply(t)}}},[e._v("注册账号")])],1),e._v(" "),a("div",{staticClass:"model-table",style:e.tableStyle},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:e.tableData,"max-height":e.tableHeight,size:"small",fit:"",stripe:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"index",width:"60",align:"center"}}),e._v(" "),e._l(e.colModels,function(t,i){return a("el-table-column",{key:i,attrs:{label:t.label,width:t.width,fit:"","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(i){return["status"===t.type?a("el-tag",{attrs:{type:e._f("statusFilter")(i.row[t.prop])}},[e._v("\n            "+e._s(e._f("statusStrFilter")(i.row[t.prop]))+"\n          ")]):a("span",[e._v("\n            "+e._s(i.row[t.prop])+"\n          ")])]}}])})}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.requestStatus?a("el-button",{attrs:{type:"primary",icon:"el-icon-star-off",size:"small"},nativeOn:{click:function(a){e.signContactor(t.$index,t.row)}}},[e._v("标为已联系")]):a("el-button",{attrs:{type:"success",disabled:"",icon:"el-icon-star-on",size:"small"},nativeOn:{click:function(a){e.signContactor(t.$index,t.row)}}},[e._v("已联系")])]}}])})],2)],1),e._v(" "),a("div",{staticClass:"model-pagination"},[a("el-pagination",{attrs:{background:"","current-page":e.pageItems.pageNo,"page-sizes":e.pageSizeList,"page-size":e.pageItems.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.pageItems,"pageNo",t)}}})],1),e._v(" "),a("div",{staticClass:"dialog-info"},[a("el-dialog",{attrs:{title:"注册账号",visible:e.layer_showInfo,width:"600px"},on:{"update:visible":function(t){e.layer_showInfo=t},close:e.dialogClose}},[a("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"手机号码",prop:"mobile"}},[a("el-input",{model:{value:e.ruleForm.mobile,callback:function(t){e.$set(e.ruleForm,"mobile",e._n(t))},expression:"ruleForm.mobile"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"姓名",prop:"name"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1)],1),e._v(" "),a("div",{staticClass:"tips"},[e._v("温馨提示：默认密码为123456，请提醒用户首次登录后立即更改密码")]),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.layer_showInfo=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.handleSaveData}},[e._v("确 定")])],1)],1)],1)])},staticRenderFns:[]}}});