webpackJsonp([23],{Dfa9:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("aA9S"),i=a.n(l),o=a("cAgV"),s=a("0xDb"),r=a("ms7A");t.default={name:"promotions",directives:{waves:o.a},filters:{tagFilter:function(e){return{0:"info",1:"success",2:"success"}[e]||"info"},statusFilter:function(e,t){return{lookHouseStatus:["未带看","带看中","已带看"],lookHouseResult:["未签约","已签约"]}[t][e]||"未知"}},data:function(){var e=function(e,t,a){!/^\d+$/.test(t)||t>1e8?a(new Error("请输入0 ~ 100,000,000的整数")):a()},t=function(e,t,a){/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(t)?a():a(new Error("请输入1 ~ 10,000的数字，最多两位小数"))};return{rules:{name:[{required:!0,message:"请输入优惠券名称",trigger:"blur"},{min:1,max:50,message:"最多输入50个字符",trigger:"blur"}],type:[{required:!0,message:"请选择优惠券类型",trigger:"change"}],count:[{required:!0,message:"请输入券总数",trigger:"blur"},{validator:e,trigger:"blur"}],addCount:[{required:!0,message:"请输入再增加数量",trigger:"blur"},{validator:e,trigger:"blur"}],count1:[{required:!0,message:"请输入每人限领数量",trigger:"blur"},{validator:function(e,t,a){!/^\+?[1-9][0-9]*$/.test(t)||t>100?a(new Error("请输入1 ~ 100的整数")):a()},trigger:"blur"}],count2:[{required:!0,message:"请输入券面值",trigger:"blur"},{validator:t,trigger:"blur"}],count3:[{required:!0,message:"请选择最低消费金额",trigger:"blur"},{validator:t,trigger:"blur"}],type1:[{required:!0,message:"请选择每人累计领取上限",trigger:"blur"}],type2:[{required:!0,message:"请选择券使用费用类型",trigger:"change"}],type3:[{required:!0,message:"请选择最低消费金额",trigger:"blur"}],type4:[{required:!0,message:"请选择券使用有效期",trigger:"blur"}],type5:[{required:!0,message:"请选择券不可用日期",trigger:"change"}],type6:[{required:!0,message:"请选择券使用时间段",trigger:"change"}],time:[{required:!0,message:"请选择券时间",trigger:"change"}]},typeOptions:[{label:"未激活",value:1},{label:"已激活",value:2},{label:"已停用",value:3}],feeTypeOpts:[{label:"房租",value:1},{label:"押金",value:2},{label:"电费",value:3},{label:"水费",value:4}],restrictionOpts:[{label:"限制",value:1},{label:"不限制",value:2}],priceOpts:[{label:"固定金额",value:1},{label:"不限制",value:2}],timeOpts:[{label:"固定时间",value:1},{label:"不限制",value:2}],formData:{keyword:"",type:"",feeType:"",organizationType:""},pageItems:{pageNo:1,pageSize:20},dialogForm:{name:"",type:"1",type1:1,type2:"",type3:1,type4:1,type5:"1",type6:"1",count:"",count1:"",count2:"",count3:"",time:[],startDate:"",endDate:""},layer_showInfo:!1,listLoading:!1,isDisabled:!1,isActive:!1,colModels:[{prop:"userName",label:"创建时间"},{prop:"userMobile",label:"优惠券名称"},{prop:"bookingTime",label:"状态",width:100},{prop:"roomAddr",label:"优惠批次编码"},{prop:"serverName",label:"优惠券类型",width:100},{prop:"serverMobile",label:"费用类型",width:100},{prop:"lookHouseStatus",label:"优惠金额",width:100},{prop:"lookHouseResult",label:"上限数量",width:100},{prop:"lookHouseResult",label:"领取数量",width:100},{prop:"lookHouseResult",label:"使用数量",width:100},{prop:"lookHouseResult",label:"实际补贴金额",width:100}],tableHeight:300,tableData:[],pageSizeList:[10,20,30,50],total:null}},mounted:function(){var e=this,t=document.body.clientHeight-200;this.tableHeight=t>300?t:300,window.onresize=function(){return t=document.body.clientHeight-200,void(e.tableHeight=e.tableHeight=t>300?t:300)},this.getGridData(this.pageItems)},computed:{tableStyle:function(){return{width:"100%",height:this.tableHeight+"px"}}},methods:{getGridData:function(e){var t=this;this.listLoading=!0,this.searchParams=i()(Object(s.c)(e),Object(s.c)(this.formData)),Object(r.j)(Object(s.a)(this.searchParams)).then(function(e){t.listLoading=!1,t.tableData=e.data.list,t.total=e.data.record})},saveData:function(){this.$refs.dialogForm.validate(function(e){})},searchParam:function(){this.pageItems={pageNo:1,pageSize:20},this.getGridData(this.pageItems)},clearForm:function(){this.pageItems={pageNo:1,pageSize:20},this.formData={searchField:"",organizationType:2},this.getGridData(this.pageItems)},addCoupon:function(){this.layer_showInfo=!0},clearDialog:function(){this.dialogForm={name:"",type:"1",type1:1,type2:"",type3:1,type4:1,type5:"1",type6:"1",count:"",count1:"",count2:"",count3:"",time:[],startDate:"",endDate:""}},editData:function(e,t){this.isActive=!0,this.layer_showInfo=!0,this.isDisabled=!!this.isActive,this.dialogForm={name:"新的优惠券",type:"1",type1:1,type2:1,type3:1,type4:1,type5:"1",type6:"1",count:"333",count1:"44",count2:"33",count3:"33",startDate:"2018-03-17 00:00:00",endDate:"2018-03-19 00:00:00"},this.dialogForm.time=[this.dialogForm.startDate,this.dialogForm.endDate]},changeState:function(e,t){this.$confirm(["确定要激活优惠券吗？激活后，部分信息将无法编辑，用户可以开始领取优惠券","确定要停用吗？停用后，用户将无法从此优惠券库中领取优惠券，已经领取的优惠券还可以正常使用"][t],"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){}).catch(function(){})},dialogClose:function(){this.$refs.dialogForm.clearValidate(),this.clearDialog()},handleSizeChange:function(e){this.pageItems.pageSize=e,this.getGridData(this.pageItems)},handleCurrentChange:function(e){this.pageItems.pageNo=e,this.getGridData(this.pageItems)}},watch:{"dialogForm.time":function(e){e=e||[],this.dialogForm.startDate=e[0]?Object(s.d)(e[0]):"",this.dialogForm.endDate=e[1]?Object(s.d)(e[1]):""}}}},lnDH:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"model-search clearfix"},[a("el-form",{attrs:{size:"small",inline:!0,model:e.formData}},[a("el-input",{staticStyle:{width:"260px"},attrs:{size:"small",placeholder:"优惠券名称"},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchParam(t)}},model:{value:e.formData.keyword,callback:function(t){e.$set(e.formData,"keyword",t)},expression:"formData.keyword"}}),e._v(" "),a("el-select",{staticClass:"item-select",staticStyle:{width:"120px"},attrs:{size:"small",placeholder:"状态",clearable:""},model:{value:e.formData.type,callback:function(t){e.$set(e.formData,"type",t)},expression:"formData.type"}},e._l(e.typeOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("el-select",{staticClass:"item-select",staticStyle:{width:"120px"},attrs:{size:"small",placeholder:"费用类型",clearable:""},model:{value:e.formData.feeType,callback:function(t){e.$set(e.formData,"feeType",t)},expression:"formData.feeType"}},e._l(e.feeTypeOpts,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",size:"small",icon:"el-icon-search"},nativeOn:{click:function(t){e.searchParam(t)}}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{plain:"",size:"small",icon:"el-icon-remove-outline"},nativeOn:{click:function(t){e.clearForm(t)}}},[e._v("清空")]),e._v(" "),a("el-button",{staticClass:"right",attrs:{type:"primary",size:"small",icon:"el-icon-circle-plus-outline"},nativeOn:{click:function(t){e.addCoupon(t)}}},[e._v("创建优惠券")])],1)],1),e._v(" "),a("div",{staticClass:"model-table",style:e.tableStyle},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:e.tableData,"max-height":e.tableHeight,size:"small",fit:"",stripe:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"index",width:"60",align:"center"}}),e._v(" "),e._l(e.colModels,function(t,l){return a("el-table-column",{key:"index",attrs:{label:t.label,width:t.width,fit:"","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(l){return["status"==t.type?a("el-tag",{attrs:{type:e._f("tagFilter")(l.row[t.prop])}},[e._v("\n                        "+e._s(e._f("statusFilter")(l.row[t.prop],t.prop))+"\n                    ")]):a("span",[e._v("\n                        "+e._s(l.row[t.prop])+"\n                    ")])]}}])})}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"small"},nativeOn:{click:function(a){e.editData(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{type:"success",icon:"el-icon-success",size:"small"},nativeOn:{click:function(a){e.changeState(t.row,0)}}},[e._v("激活")]),e._v(" "),e._e()]}}])})],2)],1),e._v(" "),a("div",{staticClass:"model-pagination"},[a("el-pagination",{attrs:{background:"","current-page":e.pageItems.pageNo,"page-sizes":e.pageSizeList,"page-size":e.pageItems.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.pageItems,"pageNo",t)}}})],1),e._v(" "),a("div",{staticClass:"dialog-info"},[a("el-dialog",{attrs:{title:"创建优惠券",visible:e.layer_showInfo,width:"800px"},on:{"update:visible":function(t){e.layer_showInfo=t},close:e.dialogClose}},[a("el-form",{ref:"dialogForm",attrs:{size:"small","status-icon":"",model:e.dialogForm,rules:e.rules,"label-width":"140px"}},[a("el-form-item",{attrs:{label:"优惠券名称",prop:"name"}},[a("el-input",{model:{value:e.dialogForm.name,callback:function(t){e.$set(e.dialogForm,"name","string"==typeof t?t.trim():t)},expression:"dialogForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"优惠券类型",prop:"type"}},[a("el-radio",{attrs:{label:"1",disabled:e.isDisabled},model:{value:e.dialogForm.type,callback:function(t){e.$set(e.dialogForm,"type",t)},expression:"dialogForm.type"}},[e._v("代金券")])],1),e._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"券总数",prop:"count"}},[a("el-input",{attrs:{disabled:e.isDisabled},model:{value:e.dialogForm.count,callback:function(t){e.$set(e.dialogForm,"count","string"==typeof t?t.trim():t)},expression:"dialogForm.count"}},[a("template",{attrs:{slot:"append"},slot:"append"},[e._v("张")])],2)],1)],1),e._v(" "),e.isActive?a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"再增加",prop:"addCount","label-width":"100px"}},[a("el-input",{model:{value:e.dialogForm.addCount,callback:function(t){e.$set(e.dialogForm,"addCount","string"==typeof t?t.trim():t)},expression:"dialogForm.addCount"}},[a("template",{attrs:{slot:"append"},slot:"append"},[e._v("张")])],2)],1)],1):e._e()],1),e._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"每人累计领取上限",prop:"type1"}},[a("el-select",{staticClass:"item-select",attrs:{size:"small",placeholder:"状态",disabled:e.isDisabled},model:{value:e.dialogForm.type1,callback:function(t){e.$set(e.dialogForm,"type1",t)},expression:"dialogForm.type1"}},e._l(e.restrictionOpts,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),1==e.dialogForm.type1?a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"每人",prop:"count1","label-width":"100px"}},[a("el-input",{attrs:{disabled:e.isDisabled},model:{value:e.dialogForm.count1,callback:function(t){e.$set(e.dialogForm,"count1","string"==typeof t?t.trim():t)},expression:"dialogForm.count1"}},[a("template",{attrs:{slot:"append"},slot:"append"},[e._v("张")])],2)],1)],1):e._e()],1),e._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"券使用费用类型",prop:"type2"}},[a("el-select",{staticClass:"item-select",attrs:{size:"small",placeholder:"请选择",disabled:e.isDisabled},model:{value:e.dialogForm.type2,callback:function(t){e.$set(e.dialogForm,"type2",t)},expression:"dialogForm.type2"}},e._l(e.feeTypeOpts,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"券面值",prop:"count2"}},[a("el-input",{attrs:{disabled:e.isDisabled},model:{value:e.dialogForm.count2,callback:function(t){e.$set(e.dialogForm,"count2","string"==typeof t?t.trim():t)},expression:"dialogForm.count2"}},[a("template",{attrs:{slot:"append"},slot:"append"},[e._v("元")])],2)],1)],1)],1),e._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"最低消费金额",prop:"type3"}},[a("el-select",{staticClass:"item-select",attrs:{size:"small",placeholder:"请选择",disabled:e.isDisabled},model:{value:e.dialogForm.type3,callback:function(t){e.$set(e.dialogForm,"type3",t)},expression:"dialogForm.type3"}},e._l(e.priceOpts,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),1==e.dialogForm.type3?a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"",prop:"count3","label-width":"10px"}},[a("el-input",{attrs:{disabled:e.isDisabled},model:{value:e.dialogForm.count3,callback:function(t){e.$set(e.dialogForm,"count3","string"==typeof t?t.trim():t)},expression:"dialogForm.count3"}},[a("template",{attrs:{slot:"append"},slot:"append"},[e._v("元")])],2)],1)],1):e._e()],1),e._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"券使用有效期",prop:"type4"}},[a("el-select",{staticClass:"item-select",attrs:{size:"small",placeholder:"请选择",disabled:e.isDisabled},model:{value:e.dialogForm.type4,callback:function(t){e.$set(e.dialogForm,"type4",t)},expression:"dialogForm.type4"}},e._l(e.timeOpts,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),1==e.dialogForm.type4?a("el-col",{attrs:{span:14}},[a("el-form-item",{attrs:{label:"",prop:"time","label-width":"10px"}},[a("el-date-picker",{attrs:{type:"datetimerange",disabled:e.isDisabled,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:e.dialogForm.time,callback:function(t){e.$set(e.dialogForm,"time",t)},expression:"dialogForm.time"}})],1)],1):e._e()],1),e._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"券不可用日期",prop:"type5"}},[a("el-select",{staticClass:"item-select",attrs:{size:"small",placeholder:"请选择",disabled:e.isDisabled},model:{value:e.dialogForm.type5,callback:function(t){e.$set(e.dialogForm,"type5",t)},expression:"dialogForm.type5"}},[a("el-option",{attrs:{label:"不限制",value:"1"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"券使用时间段",prop:"type6"}},[a("el-select",{staticClass:"item-select",attrs:{size:"small",placeholder:"请选择",disabled:e.isDisabled},model:{value:e.dialogForm.type6,callback:function(t){e.$set(e.dialogForm,"type6",t)},expression:"dialogForm.type6"}},[a("el-option",{attrs:{label:"不限制",value:"1"}})],1)],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"券使用说明"}},[a("el-input",{attrs:{type:"textarea",rows:2,maxlength:150,placeholder:"请输入内容最多150个字符"},model:{value:e.dialogForm.desc,callback:function(t){e.$set(e.dialogForm,"desc","string"==typeof t?t.trim():t)},expression:"dialogForm.desc"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogClose,e.layer_showInfo=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.saveData}},[e._v("确定")])],1)],1)],1)])},staticRenderFns:[]}},rnBX:function(e,t,a){var l=a("Alxp")(a("Dfa9"),a("lnDH"),function(e){a("xQti")},null,null);e.exports=l.exports},xQti:function(e,t,a){var l=a("yKOV");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("8bSs")("1061d710",l,!0)},yKOV:function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,".textRight{text-align:right;padding-right:10px}",""])}});