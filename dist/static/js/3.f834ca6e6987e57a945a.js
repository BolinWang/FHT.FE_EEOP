webpackJsonp([3,42,43],{"+zLD":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"model-search clearfix"},[a("el-form",{attrs:{size:"small",inline:!0,model:t.formData}},[a("el-select",{staticClass:"item-select",staticStyle:{width:"120px"},attrs:{size:"small",placeholder:"审核状态",clearable:""},model:{value:t.formData.status,callback:function(e){t.$set(t.formData,"status",e)},expression:"formData.status"}},t._l(t.auditOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-select",{staticClass:"item-select filter-item",staticStyle:{width:"130px"},attrs:{size:"small",placeholder:"机构类型",clearable:""},model:{value:t.formData.type,callback:function(e){t.$set(t.formData,"type",e)},expression:"formData.type"}},t._l(t.typeOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"180px"},attrs:{size:"small",placeholder:"请输入机构名称"},nativeOn:{keydown:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.searchParam(e)}},model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}}),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"180px"},attrs:{size:"small",placeholder:"请输入城市管家"},nativeOn:{keydown:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.searchParam(e)}},model:{value:t.formData.createManagerName,callback:function(e){t.$set(t.formData,"createManagerName",e)},expression:"formData.createManagerName"}}),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",size:"small",icon:"el-icon-search"},nativeOn:{click:function(e){t.searchParam(e)}}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{plain:"",size:"small",icon:"el-icon-remove-outline"},nativeOn:{click:function(e){t.clearForm(e)}}},[t._v("清空")]),t._v(" "),a("el-button",{staticClass:"right",attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){t.markFlying()}}},[t._v("标记为飞虎队")]),t._v(" "),a("el-button",{staticClass:"right",attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){t.layer_card=!0}}},[t._v("银行卡绑定")])],1)],1),t._v(" "),a("GridUnit",{ref:"refGridUnit",attrs:{columns:t.colModels,url:t.url,formOptions:t.formData,dataMethod:t.method,height:t.tableHeight},scopedSlots:t._u([{key:"slot_status",fn:function(e){return[2==e.row.status?a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[a("p",[t._v("不通过原因: "+t._s(e.row.auditReason))]),t._v(" "),a("div",{attrs:{slot:"reference"},slot:"reference"},[a("el-tag",{attrs:{type:t._f("renderStatusType")(e.row.status)}},[t._v("\n            "+t._s(t._f("renderStatusValue")(e.row.status))+"\n          ")])],1)]):a("el-tag",{attrs:{type:t._f("renderStatusType")(e.row.status)}},[t._v("\n        "+t._s(t._f("renderStatusValue")(e.row.status))+"\n      ")])]}},{key:"handle",fn:function(e){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-view",size:"small"},on:{click:function(a){t.showDetail(e.$index,e.row)}}},[t._v("\n        查看\n      ")])]}}])}),t._v(" "),a("div",{staticClass:"dialog-info"},[a("el-dialog",{attrs:{model:t.data_detail,title:t._f("typeFilter")(t.data_detail.type),visible:t.layer_showInfo,width:"600px"},on:{"update:visible":function(e){t.layer_showInfo=e},close:t.dialogClose}},[1===t.data_detail.type?a("fhd-person",{attrs:{"temp-data":t.data_detail}}):a("fhd-business",{attrs:{"temp-data":t.data_detail}}),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[0===t.data_detail.status?a("el-button",{attrs:{size:"small"},on:{click:function(e){t.layer_showInfo=!1}}},[t._v("取 消")]):a("el-button",{attrs:{size:"small"},on:{click:function(e){t.layer_showInfo=!1}}},[t._v("关闭")]),t._v(" "),0===t.data_detail.status?a("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(e){t.saveAuditResult(e)}}},[t._v("确 定")]):t._e()],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-info"},[a("el-dialog",{attrs:{title:"标记为飞虎队",visible:t.layer_sign,width:"400px"},on:{"update:visible":function(e){t.layer_sign=e},close:t.dialogSign}},[a("el-form",{ref:"signForm",attrs:{model:t.signForm,size:"small","status-icon":"",rules:t.rules,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"组织的主账号",prop:"mobile"}},[a("el-input",{attrs:{placeholder:"请输入手机号"},model:{value:t.signForm.mobile,callback:function(e){t.$set(t.signForm,"mobile",e)},expression:"signForm.mobile"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"设置出房服务费率",prop:"splitFee"}},[a("el-input",{attrs:{placeholder:"0-100正整数"},model:{value:t.signForm.splitFee,callback:function(e){t.$set(t.signForm,"splitFee",e)},expression:"signForm.splitFee"}},[a("template",{attrs:{slot:"append"},slot:"append"},[t._v("%")])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"城市管家",prop:"id"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",remote:"",placeholder:"输入[姓名/手机号]快速筛选","remote-method":t.remoteMethod,loading:t.loading},model:{value:t.signForm.id,callback:function(e){t.$set(t.signForm,"id",e)},expression:"signForm.id"}},t._l(t.filterManagerList,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}},[a("span",{staticStyle:{float:"left"}},[t._v(t._s(e.name))]),t._v(" "),a("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px"}},[t._v(t._s(e.mobile))])])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"房源体量",prop:"volumn"}},[a("el-input",{attrs:{placeholder:"0 / 正整数，可不填"},model:{value:t.signForm.volumn,callback:function(e){t.$set(t.signForm,"volumn",e)},expression:"signForm.volumn"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.layer_sign=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.signSaveData}},[t._v("确 定")])],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-info"},[a("el-dialog",{attrs:{title:"银行卡绑定",visible:t.layer_card,width:"700px"},on:{"update:visible":function(e){t.layer_card=e},close:t.dialogCard}},[t.inputMobie?a("div",{staticClass:"text-center"},[a("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入主账号手机号",size:"small"},model:{value:t.cardForm.mobile,callback:function(e){t.$set(t.cardForm,"mobile",e)},expression:"cardForm.mobile"}},[a("template",{attrs:{slot:"prepend"},slot:"prepend"},[t._v("组织主账号")])],2)],1):a("el-form",{ref:"cardForm",attrs:{model:t.cardForm,size:"small","status-icon":"",rules:t.rules,"label-width":"100px"}},[a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{attrs:{value:t.cardForm.name,disabled:""}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"手机号码"}},[a("el-input",{attrs:{value:t.cardForm.mobile,disabled:""}})],1)],1)],1),t._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"身份证号"}},[a("el-input",{attrs:{value:t.cardForm.idNo,disabled:""}})],1)],1),t._v(" "),a("el-tag",{staticStyle:{"margin-left":"10px"},attrs:{type:t._f("statusFilter")(t.cardForm.isRealName)}},[t._v("\n            "+t._s(t._f("statusStrFilter")(t.cardForm.isRealName))+"\n          ")])],1),t._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"银行卡类型"}},[a("el-select",{staticClass:"item-select",staticStyle:{width:"100%"},attrs:{size:"small"},on:{change:t.changeType},model:{value:t.cardForm.cardType,callback:function(e){t.$set(t.cardForm,"cardType",e)},expression:"cardForm.cardType"}},[a("el-option",{attrs:{label:"个人账户",value:1}}),t._v(" "),a("el-option",{attrs:{label:"对公账户",value:3}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"开户人姓名"}},[a("el-input",{model:{value:t.cardForm.accountName,callback:function(e){t.$set(t.cardForm,"accountName",e)},expression:"cardForm.accountName"}})],1)],1)],1),t._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"银行卡号"}},[a("el-input",{model:{value:t.cardForm.cardNo,callback:function(e){t.$set(t.cardForm,"cardNo",e)},expression:"cardForm.cardNo"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[1===t.cardForm.cardType?a("el-form-item",{attrs:{label:"开户人身份证","label-width":"110px"}},[a("el-input",{model:{value:t.cardForm.accountIdNo,callback:function(e){t.$set(t.cardForm,"accountIdNo",e)},expression:"cardForm.accountIdNo"}})],1):a("el-form-item",{attrs:{label:"开户银行"}},[a("el-select",{staticClass:"item-select",staticStyle:{width:"100%"},attrs:{size:"small",placeholder:"请选择"},on:{change:t.changeBank},model:{value:t.cardForm.bankCode,callback:function(e){t.$set(t.cardForm,"bankCode",e)},expression:"cardForm.bankCode"}},t._l(t.bankList,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.value}})}))],1)],1)],1)]),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.inputMobie?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.nextStep}},[t._v("下一步")]):t._e(),t._v(" "),t.inputMobie?t._e():a("el-button",{attrs:{size:"small"},on:{click:function(e){t.layer_card=!1}}},[t._v("取 消")]),t._v(" "),t.inputMobie?t._e():a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.cardSaveData}},[t._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]}},"6Pxl":function(t,e,a){var l=a("Alxp")(a("xI9/"),a("+zLD"),function(t){a("OzdR")},null,null);t.exports=l.exports},"8hW5":function(t,e,a){var l=a("Alxp")(a("Qt7a"),a("YFVP"),function(t){a("YIgZ")},"data-v-7d559cc8",null);t.exports=l.exports},MY5O:function(t,e,a){(t.exports=a("BkJT")(!1)).push([t.i,".el-tag[data-v-bded889e]{margin:0 5px 5px 0}.textNumber[data-v-bded889e]{position:absolute;bottom:5px;right:10px;color:#666;font-size:12px;line-height:1.2}",""])},OzdR:function(t,e,a){var l=a("WA2I");"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);a("8bSs")("54bbb276",l,!0)},PWIg:function(t,e,a){var l=a("Alxp")(a("dlGm"),a("TtpU"),function(t){a("Wf8W")},"data-v-bded889e",null);t.exports=l.exports},Qt7a:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("H1GV"),s=a.n(l),r=a("0xDb"),i=a("DLxG"),n=(a.n(i),a("IcnI")),o=[{value:"01000000",name:"邮储银行"},{value:"01020000",name:"工商银行"},{value:"01030000",name:"农业银行"},{value:"01040000",name:"中国银行"},{value:"01050000",name:"建设银行"},{value:"03010000",name:"交通银行"},{value:"03020000",name:"中信银行"},{value:"03030000",name:"光大银行"},{value:"03040000",name:"华夏银行"},{value:"03050000",name:"民生银行"},{value:"03060000",name:"广发银行"},{value:"03070000",name:"平安银行"},{value:"03080000",name:"招商银行"},{value:"03090000",name:"兴业银行"},{value:"03100000",name:"浦发银行"},{value:"03160000",name:"浙商银行"},{value:"04012900",name:"上海银行"},{value:"04031000",name:"北京银行"},{value:"04083320",name:"宁波银行"},{value:"04233310",name:"杭州银行"},{value:"04256020",name:"东莞银行"},{value:"04375850",name:"珠海华润"},{value:"04791920",name:"包商银行"},{value:"05083000",name:"江苏银行"},{value:"64135810",name:"广州银行"},{value:"64895910",name:"广东南粤"}];e.default={name:"fhdBusiness",props:{tempData:{type:Object,default:function(){return{}}}},components:{Preview:s.a},computed:{textNumber:function(){return 30-this.fhdBusinessData.reason.length<0?0:30-this.fhdBusinessData.reason.length}},filters:{filterBankCode:function(t){if(!t)return"";var e=o.filter(function(e){return e.value===t});return e.length>0?e[0].name:""},picListFilter:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t?t.map(function(t){return{src:t}}):[]},filterNum:function(t){return t?t.replace(/\s/g,"").replace(/\D/g,"").replace(/(\d{4})(?=\d)/g,"$1 "):""},sexFilter:function(t){return["先生","女士"][t-1]||"不详"},statusFilter:function(t){return{0:"info",1:"success",2:"danger"}[t]||"info"},statusStrFilter:function(t){return["待审核","审核通过","审核不通过"][t]||"待审核"}},data:function(){return{temp:Object(r.d)(this.tempData),fhdBusinessData:{status:"",reason:""}}},created:function(){this.fhdBusinessData={status:"",reason:""}},watch:{tempData:{handler:function(t){this.temp=t,this.fhdBusinessData={status:"",reason:""}},deep:!0},fhdBusinessData:{handler:function(t){t.reason=1===t.status?"":t.reason,0===this.temp.status&&n.a.dispatch("UpdateFhdData",{data:t,rowData:this.temp})},deep:!0}}}},TtpU:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{attrs:{size:"small",model:t.temp,"label-position":"left","label-width":"70px"}},[a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:13}},[a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.temp.name,callback:function(e){t.$set(t.temp,"name",e)},expression:"temp.name"}},[a("template",{attrs:{slot:"append"},slot:"append"},[t._v(t._s(t._f("sexFilter")(t.temp.sex)))])],2)],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v("  ")]),t._v(" "),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"手机号码"}},[a("el-input",{attrs:{value:t._f("filterNum")(t.temp.mobile),disabled:!0}})],1)],1)],1),t._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:13}},[a("el-form-item",{attrs:{label:"身份证号"}},[a("el-input",{attrs:{value:t.temp.idNum,disabled:!0}})],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v("  ")]),t._v(" "),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"出房费率"}},[a("el-input",{attrs:{value:t.temp.splitFee+"%",disabled:!0}})],1)],1)],1),t._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:13}},[a("el-form-item",{attrs:{label:"房源体量"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.temp.volumn,callback:function(e){t.$set(t.temp,"volumn",e)},expression:"temp.volumn"}})],1)],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"银行开户名","label-width":"90px"}},[a("el-input",{attrs:{value:t.temp.accountName,disabled:!0}})],1),t._v(" "),1===t.temp.bankCardType?a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"开户人身份证","label-width":"100px"}},[a("el-input",{attrs:{value:t.temp.accountIdNum,disabled:!0}})],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v("  ")]),t._v(" "),a("el-col",{attrs:{span:11}},[a("el-form-item",{attrs:{label:"银行卡号"}},[a("el-input",{attrs:{value:t._f("filterNum")(t.temp.bankCardNum),disabled:!0}})],1)],1)],1):a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:13}},[a("el-form-item",{attrs:{label:"银行卡号"}},[a("el-input",{attrs:{value:t._f("filterNum")(t.temp.bankCardNum),disabled:!0}})],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v("  ")]),t._v(" "),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"开户银行","label-width":"70px"}},[a("el-input",{attrs:{value:t._f("filterBankCode")(t.temp.accountBank),disabled:!0}})],1)],1)],1),t._v(" "),a("div",{staticClass:"clearfix"},[a("el-form-item",{attrs:{label:"审核结果"}},[t.temp.status&&0!==t.temp.status?a("el-tag",{attrs:{type:t._f("statusFilter")(t.temp.status)}},[t._v("\n        "+t._s(t._f("statusStrFilter")(t.temp.status))+"\n      ")]):a("el-radio-group",{model:{value:t.fhdPersonData.status,callback:function(e){t.$set(t.fhdPersonData,"status",e)},expression:"fhdPersonData.status"}},[a("el-radio",{attrs:{label:1}},[t._v("通过")]),t._v(" "),a("el-radio",{attrs:{label:2}},[t._v("不通过")])],1),t._v(" "),2===t.temp.status?a("el-input",{attrs:{type:"textarea",rows:2,disabled:!0},model:{value:t.temp.reason,callback:function(e){t.$set(t.temp,"reason",e)},expression:"temp.reason"}}):t._e(),t._v(" "),0===t.temp.status&&2===t.fhdPersonData.status?a("div",{staticStyle:{position:"relative"}},[a("el-input",{staticStyle:{position:"relative"},attrs:{type:"textarea",rows:2,placeholder:"请输入审核不通过原因",maxlength:30},model:{value:t.fhdPersonData.reason,callback:function(e){t.$set(t.fhdPersonData,"reason",e)},expression:"fhdPersonData.reason"}}),t._v(" "),a("span",{staticClass:"textNumber"},[t._v("还可以输入"+t._s(t.textNumber)+"字符")])],1):t._e()],1)],1),t._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"平台代理收租服务"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":t._f("picListFilter")(t.temp.proxyImage),"delete-icon":"",disabled:""}})],1)]),t._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"房源发布和租客引流服务"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":t._f("picListFilter")(t.temp.attractionFlowImage),"delete-icon":"",disabled:""}})],1)]),t._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"身份证照片"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":t._f("picListFilter")(t.temp.idCardImage),"delete-icon":"",disabled:""}})],1)])],1)},staticRenderFns:[]}},WA2I:function(t,e,a){(t.exports=a("BkJT")(!1)).push([t.i,".model-search .filter-item{margin-left:10px}.item-select{width:150px}.el-popover{max-width:500px}",""])},Wf8W:function(t,e,a){var l=a("MY5O");"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);a("8bSs")("3b81e208",l,!0)},YFVP:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{attrs:{size:"small",model:t.temp,"label-position":"left","label-width":"70px"}},[a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:13}},[a("el-form-item",{attrs:{label:"企业名称"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.temp.companyName,callback:function(e){t.$set(t.temp,"companyName",e)},expression:"temp.companyName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v("  ")]),t._v(" "),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"企业法人"}},[a("el-input",{attrs:{value:t.temp.legalPerson,disabled:!0}})],1)],1)],1),t._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:13}},[a("el-form-item",{attrs:{label:"社会统一信用代码","label-width":"130px"}},[a("el-input",{attrs:{value:t.temp.unifiedSocialCreditCode,disabled:!0}})],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v("  ")]),t._v(" "),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"出房费率"}},[a("el-input",{attrs:{value:t.temp.splitFee+"%",disabled:!0}})],1)],1)],1),t._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:13}},[a("el-form-item",{attrs:{label:"企业联系人","label-width":"90px"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.temp.name,callback:function(e){t.$set(t.temp,"name",e)},expression:"temp.name"}},[a("template",{attrs:{slot:"append"},slot:"append"},[t._v(t._s(t._f("sexFilter")(t.temp.sex)))])],2)],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v("  ")]),t._v(" "),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"手机号码"}},[a("el-input",{attrs:{value:t._f("filterNum")(t.temp.mobile),disabled:!0}})],1)],1)],1),t._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:13}},[a("el-form-item",{attrs:{label:"联系人身份证","label-width":"100px"}},[a("el-input",{attrs:{value:t.temp.idNum,disabled:!0}})],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v("  ")]),t._v(" "),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"房源体量"}},[a("el-input",{attrs:{value:t.temp.volumn,disabled:!0}})],1)],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"银行开户名","label-width":"90px"}},[a("el-input",{attrs:{value:t.temp.accountName,disabled:!0}})],1),t._v(" "),1===t.temp.bankCardType?a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"开户人身份证","label-width":"100px"}},[a("el-input",{attrs:{value:t.temp.accountIdNum,disabled:!0}})],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v("  ")]),t._v(" "),a("el-col",{attrs:{span:11}},[a("el-form-item",{attrs:{label:"银行卡号"}},[a("el-input",{attrs:{value:t._f("filterNum")(t.temp.bankCardNum),disabled:!0}})],1)],1)],1):a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:13}},[a("el-form-item",{attrs:{label:"银行卡号"}},[a("el-input",{attrs:{value:t._f("filterNum")(t.temp.bankCardNum),disabled:!0}})],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v("  ")]),t._v(" "),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"开户银行","label-width":"70px"}},[a("el-input",{attrs:{value:t._f("filterBankCode")(t.temp.accountBank),disabled:!0}})],1)],1)],1),t._v(" "),a("div",{staticClass:"clearfix"},[a("el-form-item",{attrs:{label:"审核结果"}},[t.temp.status&&0!==t.temp.status?a("el-tag",{attrs:{type:t._f("statusFilter")(t.temp.status)}},[t._v("\n        "+t._s(t._f("statusStrFilter")(t.temp.status))+"\n      ")]):a("el-radio-group",{model:{value:t.fhdBusinessData.status,callback:function(e){t.$set(t.fhdBusinessData,"status",e)},expression:"fhdBusinessData.status"}},[a("el-radio",{attrs:{label:1}},[t._v("通过")]),t._v(" "),a("el-radio",{attrs:{label:2}},[t._v("不通过")])],1),t._v(" "),2===t.temp.status?a("el-input",{attrs:{type:"textarea",rows:2,disabled:!0},model:{value:t.temp.reason,callback:function(e){t.$set(t.temp,"reason",e)},expression:"temp.reason"}}):t._e(),t._v(" "),0===t.temp.status&&2===t.fhdBusinessData.status?a("div",{staticStyle:{position:"relative"}},[a("el-input",{staticStyle:{position:"relative"},attrs:{type:"textarea",rows:2,placeholder:"请输入审核不通过原因",maxlength:30},model:{value:t.fhdBusinessData.reason,callback:function(e){t.$set(t.fhdBusinessData,"reason",e)},expression:"fhdBusinessData.reason"}}),t._v(" "),a("span",{staticClass:"textNumber"},[t._v("还可以输入"+t._s(t.textNumber)+"字符")])],1):t._e()],1)],1),t._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"平台代理收租服务"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":t._f("picListFilter")(t.temp.proxyImage),"delete-icon":"",disabled:""}})],1)]),t._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"房源发布和租客引流服务"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":t._f("picListFilter")(t.temp.attractionFlowImage),"delete-icon":"",disabled:""}})],1)]),t._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"企业营业执照"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":t._f("picListFilter")(t.temp.businessLicenseImage),"delete-icon":"",disabled:""}})],1)]),t._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"身份证照片"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":t._f("picListFilter")(t.temp.idCardImage),"delete-icon":"",disabled:""}})],1)])],1)},staticRenderFns:[]}},YIgZ:function(t,e,a){var l=a("wARl");"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);a("8bSs")("41c214dc",l,!0)},dlGm:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("H1GV"),s=a.n(l),r=a("0xDb"),i=a("DLxG"),n=(a.n(i),a("IcnI"));e.default={name:"fhdPerson",props:{tempData:{type:Object,default:function(){return{}}}},components:{Preview:s.a},computed:{textNumber:function(){return 30-this.fhdPersonData.reason.length<0?0:30-this.fhdPersonData.reason.length}},filters:{picListFilter:function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).map(function(t){return{src:t}})},filterNum:function(t){return t?t.replace(/\s/g,"").replace(/\D/g,"").replace(/(\d{4})(?=\d)/g,"$1 "):""},sexFilter:function(t){return["先生","女士"][t-1]||"不详"},statusFilter:function(t){return{0:"info",1:"success",2:"danger"}[t]||"info"},statusStrFilter:function(t){return["待审核","审核通过","审核不通过"][t]||"待审核"}},data:function(){return{temp:Object(r.d)(this.tempData),fhdPersonData:{status:"",reason:""}}},created:function(){this.fhdPersonData={status:"",reason:""}},watch:{tempData:{handler:function(t){this.temp=t,this.fhdPersonData={status:"",reason:""}},deep:!0},fhdPersonData:{handler:function(t){t.reason=1===t.status?"":t.reason,0===this.temp.status&&n.a.dispatch("UpdateFhdData",{data:t,rowData:this.temp})},deep:!0}}}},wARl:function(t,e,a){(t.exports=a("BkJT")(!1)).push([t.i,".el-tag[data-v-7d559cc8]{margin:0 5px 5px 0}.textNumber[data-v-7d559cc8]{position:absolute;bottom:5px;right:10px;color:#666;font-size:12px;line-height:1.2}",""])},"xI9/":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("4YfN"),s=a.n(l),r=a("cAgV"),i=a("U4Ig"),n=a.n(i),o=a("0xDb"),c=a("pFO2"),u=a("E4LH"),m=a("PWIg"),d=a.n(m),p=a("8hW5"),f=a.n(p);e.default={name:"auditFhd",directives:{waves:r.a},components:{GridUnit:n.a,fhdPerson:d.a,fhdBusiness:f.a},filters:{typeFilter:function(t){return"飞虎队"+["个人","企业"][t-1]+"机构"||""},renderStatusType:function(t){return{0:"info",1:"success",2:"danger"}[t]||"info"},renderStatusValue:function(t){return["待审核","审核通过","审核不通过"][t]||"待审核"},statusFilter:function(t){return t?"success":"info"},statusStrFilter:function(t){return t?"已实名":"未实名"}},data:function(){return{inputMobie:!0,filterManagerList:[],managerList:[],loading:!1,typeOptions:[{value:1,label:"个人"},{value:2,label:"企业"}],auditOptions:[{value:0,label:"未审核"},{value:1,label:"审核通过"},{value:2,label:"审核不通过"}],bankList:[{value:"01000000",name:"邮储银行"},{value:"01020000",name:"工商银行"},{value:"01030000",name:"农业银行"},{value:"01040000",name:"中国银行"},{value:"01050000",name:"建设银行"},{value:"03010000",name:"交通银行"},{value:"03020000",name:"中信银行"},{value:"03030000",name:"光大银行"},{value:"03040000",name:"华夏银行"},{value:"03050000",name:"民生银行"},{value:"03060000",name:"广发银行"},{value:"03070000",name:"平安银行"},{value:"03080000",name:"招商银行"},{value:"03090000",name:"兴业银行"},{value:"03100000",name:"浦发银行"},{value:"03160000",name:"浙商银行"},{value:"04012900",name:"上海银行"},{value:"04031000",name:"北京银行"},{value:"04083320",name:"宁波银行"},{value:"04233310",name:"杭州银行"},{value:"04256020",name:"东莞银行"},{value:"04375850",name:"珠海华润"},{value:"04791920",name:"包商银行"},{value:"05083000",name:"江苏银行"},{value:"64135810",name:"广州银行"},{value:"64895910",name:"广东南粤"}],formData:{name:"",type:"",createManagerName:"",status:0},signForm:{splitFee:"35"},cardForm:{cardType:1},rules:{mobile:[{required:!0,trigger:"blur",validator:function(t,e,a){Object(u.b)(e)?a():a(new Error("请输入正确的手机号"))}}],name:[{required:!0,trigger:"blur",validator:function(t,e,a){e?a():a(new Error("请输入姓名"))}}],splitFee:[{required:!0,trigger:"blur",validator:function(t,e,a){!Object(u.a)(e)||e<=0||e>=100?a(new Error("费率为0到100的正整数")):a()}}],volumn:[{trigger:"blur",validator:function(t,e,a){Object(u.a)(e)?a():a(new Error("请输入0或正整数"))}}],userName:[{required:!0,trigger:"blur",message:"请输入开户人姓名"}],userCardNo:[{required:!0,trigger:"blur",message:"请输入银行卡号"}],id:[{required:!0,trigger:"blur",message:"请选择城市管家"}]},searchParams:{},saveAuditParam:{},dateTime:[],colModels:[{prop:"id",label:"审核号",width:80},{prop:"gmtCreate",label:"申请时间",width:180,filter:"parseTime"},{prop:"name",label:"机构名称"},{prop:"type",label:"机构类型",width:100,render:function(t){return["个人","企业"][t.type-1]||""}},{prop:"createManagerName",label:"城市管家"},{slotName:"slot_status",label:"审核状态",width:120},{prop:"gmtModified",label:"审核时间",width:140,showOverflowTooltip:!0,render:function(t){return Object(o.f)(t.gmtModified)+" "+(t.auditName||"")}},{label:"操作",slotName:"handle",fixed:"right",width:100,align:"center"}],tableHeight:300,data_detail:{},url:c.b.defaultOptions.requestUrl,method:c.b.defaultOptions.method,layer_showInfo:!1,layer_sign:!1,layer_card:!1}},mounted:function(){var t=this;this.$nextTick(function(){var e=t.$refs.refGridUnit.$el.offsetTop||140,a=document.body.clientHeight-e-64-20;t.tableHeight=a>300?a:300,window.onresize=function(){return a=document.body.clientHeight-e-64-20,void(t.tableHeight=t.tableHeight=a>300?a:300)}})},computed:{tableStyle:function(){return{width:"100%",height:this.tableHeight+"px"}}},methods:{searchParam:function(){this.$refs.refGridUnit.searchHandler()},clearForm:function(){this.formData={},this.$refs.refGridUnit.searchHandler({type:"clear",data:{}})},showDetail:function(t,e){var a=this;c.b.detail({id:e.id}).then(function(t){a.data_detail=t.data,a.layer_showInfo=!0}).catch()},dialogClose:function(){this.data_detail={}},saveAuditResult:function(){var t=this,e=["personal","business"][this.data_detail.type-1],a=c.b[e],l=this.$store.getters.fhdAuditData[e];return l.status?2!==l.status||l.reason?void a(l).then(function(e){"操作成功"!==e.message?(t.layer_showInfo=!1,t.$alert(e.message,"审核结果变更为【不通过】",{confirmButtonText:"确定",showClose:!1,callback:function(e){t.searchParam()}})):(t.$message.success(e.message||"操作成功"),t.searchParam(),t.layer_showInfo=!1)}).catch():(this.$message.error("请填写审核不通过原因，最多30个字符"),!1):(this.$message.error("请选择审核结果"),!1)},markFlying:function(){var t=this;c.b.queryCityManager(this.signForm).then(function(e){t.managerList=e.data,t.layer_sign=!0}).catch()},signSaveData:function(){var t=this;this.$refs.signForm.validate(function(e){if(!e)return console.log("error submit!!"),!1;c.b.markFhd(t.signForm).then(function(e){t.$message.success("标记成功"),t.layer_sign=!1}).catch()})},dialogSign:function(){this.signForm={splitFee:"35"},this.$refs.signForm.clearValidate()},changeType:function(t){1===t?(this.$set(this.cardForm,"bankName",""),this.$set(this.cardForm,"bankCode","")):this.$set(this.cardForm,"accountIdNo","")},changeBank:function(t){var e=this.bankList.filter(function(e){return e.value===t});this.$set(this.cardForm,"bankName",e[0].name)},nextStep:function(){var t=this;if(!Object(u.b)(this.cardForm.mobile))return this.$message.error("请输入正确的手机号"),!1;c.b.queryByMobile({mobile:this.cardForm.mobile}).then(function(e){t.cardForm=s()({},e.data,{cardType:1}),t.inputMobie=!1}).catch()},cardSaveData:function(){var t=this;this.$refs.cardForm.validate(function(e){if(!e)return console.log("error submit!!"),!1;c.b.updateBankCard(t.cardForm).then(function(e){t.$message.success("银行卡绑定成功"),t.layer_card=!1}).catch()})},dialogCard:function(){this.cardForm={cardType:1},this.inputMobie||this.$refs.cardForm.clearValidate(),this.inputMobie=!0},remoteMethod:function(t){var e=this;t?(this.loading=!0,setTimeout(function(){e.loading=!1,e.filterManagerList=e.managerList.filter(function(e){return e.name.toLowerCase().includes(t.toLowerCase())||e.mobile.includes(t)})},200)):this.filterManagerList=[]}}}}});