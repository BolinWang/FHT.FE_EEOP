webpackJsonp([53],{B9er:function(t,e,a){var s=a("QrWK");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a("rjj0")("2a78347b",s,!0)},OhvF:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{attrs:{size:"small",model:t.temp,"label-position":"left","label-width":"70px"}},[a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:13}},[a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.temp.name,callback:function(e){t.$set(t.temp,"name",e)},expression:"temp.name"}},[a("template",{attrs:{slot:"append"},slot:"append"},[t._v(t._s(t._f("sexFilter")(t.temp.sex)))])],2)],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v("  ")]),t._v(" "),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"手机号码"}},[a("el-input",{attrs:{value:t._f("filterNum")(t.temp.mobile),disabled:!0}})],1)],1)],1),t._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:13}},[a("el-form-item",{attrs:{label:"身份证号"}},[a("el-input",{attrs:{value:t.temp.idNum,disabled:!0}})],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v("  ")]),t._v(" "),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"出房费率"}},[a("el-input",{attrs:{value:t.temp.splitFee+"%",disabled:!0}})],1)],1)],1),t._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:13}},[a("el-form-item",{attrs:{label:"房源体量"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.temp.volumn,callback:function(e){t.$set(t.temp,"volumn",e)},expression:"temp.volumn"}})],1)],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"银行开户名","label-width":"90px"}},[a("el-input",{attrs:{value:t.temp.accountName,disabled:!0}})],1),t._v(" "),1===t.temp.bankCardType?a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"开户人身份证","label-width":"100px"}},[a("el-input",{attrs:{value:t.temp.accountIdNum,disabled:!0}})],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v("  ")]),t._v(" "),a("el-col",{attrs:{span:11}},[a("el-form-item",{attrs:{label:"银行卡号"}},[a("el-input",{attrs:{value:t._f("filterNum")(t.temp.bankCardNum),disabled:!0}})],1)],1)],1):a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:13}},[a("el-form-item",{attrs:{label:"银行卡号"}},[a("el-input",{attrs:{value:t._f("filterNum")(t.temp.bankCardNum),disabled:!0}})],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v("  ")]),t._v(" "),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"开户银行","label-width":"70px"}},[a("el-input",{attrs:{value:t._f("filterBankCode")(t.temp.accountBank),disabled:!0}})],1)],1)],1),t._v(" "),a("div",{staticClass:"clearfix"},[a("el-form-item",{attrs:{label:"审核结果"}},[t.temp.status&&0!==t.temp.status?a("el-tag",{attrs:{type:t._f("statusFilter")(t.temp.status)}},[t._v("\n        "+t._s(t._f("statusStrFilter")(t.temp.status))+"\n      ")]):a("el-radio-group",{model:{value:t.fhdPersonData.status,callback:function(e){t.$set(t.fhdPersonData,"status",e)},expression:"fhdPersonData.status"}},[a("el-radio",{attrs:{label:1}},[t._v("通过")]),t._v(" "),a("el-radio",{attrs:{label:2}},[t._v("不通过")])],1),t._v(" "),2===t.temp.status?a("el-input",{attrs:{type:"textarea",rows:2,disabled:!0},model:{value:t.temp.reason,callback:function(e){t.$set(t.temp,"reason",e)},expression:"temp.reason"}}):t._e(),t._v(" "),0===t.temp.status&&2===t.fhdPersonData.status?a("div",{staticStyle:{position:"relative"}},[a("el-input",{staticStyle:{position:"relative"},attrs:{type:"textarea",rows:2,placeholder:"请输入审核不通过原因",maxlength:30},model:{value:t.fhdPersonData.reason,callback:function(e){t.$set(t.fhdPersonData,"reason",e)},expression:"fhdPersonData.reason"}}),t._v(" "),a("span",{staticClass:"textNumber"},[t._v("还可以输入"+t._s(t.textNumber)+"字符")])],1):t._e()],1)],1),t._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"平台代理收租服务"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":t._f("picListFilter")(t.temp.proxyImage),"delete-icon":"",disabled:""}})],1)]),t._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"房源发布和租客引流服务"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":t._f("picListFilter")(t.temp.attractionFlowImage),"delete-icon":"",disabled:""}})],1)]),t._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"身份证照片"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":t._f("picListFilter")(t.temp.idCardImage),"delete-icon":"",disabled:""}})],1)])],1)},staticRenderFns:[]}},PWIg:function(t,e,a){var s=a("VU/8")(a("pWpr"),a("OhvF"),function(t){a("B9er")},"data-v-3b5719ec",null);t.exports=s.exports},QrWK:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".el-tag[data-v-3b5719ec]{margin:0 5px 5px 0}.textNumber[data-v-3b5719ec]{position:absolute;bottom:5px;right:10px;color:#666;font-size:12px;line-height:1.2}",""])},pWpr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("H1GV"),l=a.n(s),r=a("0xDb"),i=a("IcnI");e.default={name:"fhdPerson",props:{tempData:{type:Object,default:function(){return{}}}},components:{Preview:l.a},computed:{textNumber:function(){return 30-this.fhdPersonData.reason.length<0?0:30-this.fhdPersonData.reason.length}},filters:{picListFilter:function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).map(function(t){return{src:t}})},filterNum:function(t){return t?t.replace(/\s/g,"").replace(/\D/g,"").replace(/(\d{4})(?=\d)/g,"$1 "):""},sexFilter:function(t){return["先生","女士"][t-1]||"不详"},statusFilter:function(t){return{0:"info",1:"success",2:"danger"}[t]||"info"},statusStrFilter:function(t){return["待审核","审核通过","审核不通过"][t]||"待审核"}},data:function(){return{temp:Object(r.d)(this.tempData),fhdPersonData:{status:"",reason:""}}},created:function(){this.fhdPersonData={status:"",reason:""}},watch:{tempData:{handler:function(t){this.temp=t,this.fhdPersonData={status:"",reason:""}},deep:!0},fhdPersonData:{handler:function(t,e){var a=this;t.reason=1===t.status?"":t.reason,0===this.temp.status&&this.$nextTick(function(){i.a.dispatch("UpdateFhdData",{data:t,rowData:a.temp})})},deep:!0}}}}});