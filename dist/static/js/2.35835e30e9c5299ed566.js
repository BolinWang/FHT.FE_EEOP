webpackJsonp([2,41,43],{"+/t6":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"逾期原因",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.from}},[a("el-form-item",{attrs:{label:"逾期类别","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择逾期类别"},on:{change:e.changeType},model:{value:e.from.overdueType,callback:function(t){e.$set(e.from,"overdueType",t)},expression:"from.overdueType"}},e._l(e.overdueTypeList,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.filStatus(e.from.overdueType),expression:"filStatus(from.overdueType)"}],attrs:{label:"逾期原因","label-width":e.formLabelWidth}},[a("el-input",{attrs:{maxlength:100,type:"textarea",rows:2,placeholder:"请输入备注（0-100字）"},model:{value:e.from.overdueReason,callback:function(t){e.$set(e.from,"overdueReason",t)},expression:"from.overdueReason"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.closeDialog}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submit()}}},[e._v("确 定")])],1)],1)},staticRenderFns:[]}},"0Nih":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("aA9S"),o=a.n(l),s=a("Ao5+"),r=a("0xDb");t.default={data:function(){return{status:null,gridData:[],dialogTableVisible:!1,innerVisible:!1,innerWarn:!1,followId:{id:null,billNo:null},pageItems:{pageNo:1,pageSize:20},isOver:null,resultTypeList:[{value:1,label:"已退租"},{value:2,label:"未缴纳"},{value:3,label:"待确认真实性"},{value:4,label:"未接听"}],messageTypeList:[],messageTypes:[{value:1,label:"逾期账单催租提醒"},{value:2,label:"租客账单交租提醒"},{value:3,label:"租客已退房（账单已逾期）信息确认"},{value:4,label:"租客已退房信息确认"},{value:5,label:"线下交租确认信息"}],messageTypeIs:[{value:2,label:"租客账单交租提醒"},{value:4,label:"租客已退房信息确认"},{value:5,label:"线下交租确认信息"}],messageTypeOver:[{value:1,label:"逾期账单催租提醒"},{value:3,label:"租客已退房（账单已逾期）信息确认"},{value:5,label:"线下交租确认信息"}],form:{resultType:null,content:null},messageType:"",formLabelWidth:"120px"}},mounted:function(){},beforeDestroy:function(){document.querySelectorAll("body>.el-dialog__wrapper").forEach(function(e){e.style.display="none"})},filters:{filterCreat:function(e){return["运营","飞虎队"][e-1]}},methods:{closeInner:function(){this.innerVisible=!1,Object(r.e)(this.form)},filterType:function(e){if(3===e)return!0},textStatus:function(){return console.log(this.status),3!==this.status||(this.$message({message:"账单已撤销，无法继续跟进.",type:"error"}),!1)},rentMessage:function(){var e=this;Object(s.w)(this.followId).then(function(t){"000"===t.code&&(e.getfollowList(),e.$message({message:t.message,type:"success"}))})},getfollowList:function(){var e=this,t=o()(this.pageItems,this.followId);Object(s.b)(t).then(function(t){e.gridData=t.data.result})},addFllow:function(){this.textStatus()&&(this.innerVisible=!0)},addFollowSubmit:function(){if(!this.form.resultType)return this.$message({message:"请选择催租结果",type:"success"}),!1;3!==this.form.resultType&&null!=this.form.resultType&&""!==this.form.resultType?(this.form.content=this.resultTypeList[this.form.resultType-1].label,this.addfun()):""===this.form.content||null===this.form.content?this.$message({message:"请填写催租结果的备注",type:"error"}):this.addfun()},addfun:function(){var e=this,t=o()(this.followId,this.form);Object(s.a)(t).then(function(t){e.innerVisible=!1,e.getfollowList(),e.$emit("searchStart"),Object(r.e)(e.form)})},managerMessageSubmit:function(){this.messageType?this.messageSubmit():this.$message.error("请选择提醒模版")},messageSubmit:function(){var e=this,t={isOver:this.isOver,messageType:this.messageType},a=o()(t,this.followId);Object(s.c)(a).then(function(t){e.getfollowList(),e.$message({message:t.message,type:"success"}),e.innerWarn=!1})},managerMessage:function(){this.textStatus()&&(this.innerWarn=!0,!0===this.isOver?this.messageTypeList=this.messageTypeOver:!1===this.isOver?this.messageTypeList=this.messageTypeIs:this.messageTypeList=this.messageType)},open:function(e,t,a,l,o){this.dialogTableVisible=!0,this.followId.id=t,this.followId.billNo=a,this.isOver=l,this.status=o,this.getfollowList()}}}},"21MA":function(e,t,a){var l=a("Q6SI");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("8bSs")("d23f9f4e",l,!0)},"6WIv":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("Ao5+"),o=a("0xDb");t.default={data:function(){return{overdueTypeList:[{value:0,label:"已退租"},{value:1,label:"线下交租"},{value:2,label:"个人原因"},{value:3,label:"其他"}],dialogFormVisible:!1,from:{overdueType:null,overdueReason:null,id:null},orderType:"",orderReason:"",formLabelWidth:"120px"}},methods:{changeType:function(){this.from.overdueType===this.orderType?this.from.overdueReason=this.orderReason:this.from.overdueReason=""},closeDialog:function(){this.dialogFormVisible=!1,Object(o.e)(this.from)},submit:function(){var e=this,t=Object(o.a)(this.from);if(""===this.from.overdueType||null===this.from.overdueType||void 0===this.from.overdueType)return this.$message({message:"请选择逾期类别",type:"success"}),!1;if(1!==this.from.overdueType&&void 0===t.overdueReason)this.$message({message:"请填写逾期原因",type:"success"});else{var a=this;Object(l.m)(t).then(function(t){a.$emit("searchCallback"),e.dialogFormVisible=!1,Object(o.e)(e.from)}).catch()}},open:function(e,t,a,l){this.dialogFormVisible=!0,this.from.overdueType=a,this.orderType=a,this.from.overdueReason=t,this.orderReason=t,this.from.id=l},filStatus:function(e){return 1!==e}}}},KOi9:function(e,t,a){var l=a("hwDo");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("8bSs")("018bacec",l,!0)},LRjO:function(e,t,a){var l=a("Alxp")(a("6WIv"),a("+/t6"),function(e){a("21MA")},"data-v-4801a2b3",null);e.exports=l.exports},NYid:function(e,t,a){var l=a("i60s");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("8bSs")("a24df9c0",l,!0)},Q6SI:function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,"",""])},Zlyl:function(e,t,a){var l=a("Alxp")(a("0Nih"),a("b3Sh"),function(e){a("KOi9")},null,null);e.exports=l.exports},b3Sh:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"催租跟进",visible:e.dialogTableVisible},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-row",[a("el-button",{attrs:{type:"primary"},on:{click:e.addFllow}},[e._v("新增催租结果")]),e._v(" "),a("el-button",{attrs:{type:"primary",disabled:3===e.status},on:{click:e.rentMessage}},[e._v("短信催租")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.managerMessage}},[e._v("管家提醒")])],1),e._v(" "),a("el-dialog",{attrs:{width:"30%",title:"新增催租结果",visible:e.innerVisible,"append-to-body":""},on:{"update:visible":function(t){e.innerVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"催租结果","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择催租结果"},model:{value:e.form.resultType,callback:function(t){e.$set(e.form,"resultType",t)},expression:"form.resultType"}},e._l(e.resultTypeList,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.filterType(e.form.resultType),expression:"filterType(form.resultType)"}],attrs:{label:"备注","label-width":e.formLabelWidth}},[a("el-input",{attrs:{maxlength:100,type:"textarea",rows:2,placeholder:"请输入备注（0-100字）"},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.addFollowSubmit}},[e._v("确 定")]),e._v(" "),a("el-button",{on:{click:e.closeInner}},[e._v("关闭")])],1)],1),e._v(" "),a("el-dialog",{attrs:{width:"30%",title:"提醒模版",visible:e.innerWarn,"append-to-body":""},on:{"update:visible":function(t){e.innerWarn=t}}},[a("el-form",[a("el-form-item",{attrs:{label:"提醒模版","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择提醒模版"},model:{value:e.messageType,callback:function(t){e.messageType=t},expression:"messageType"}},e._l(e.messageTypeList,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.managerMessageSubmit}},[e._v("确 定")]),e._v(" "),a("el-button",{on:{click:function(t){e.innerWarn=!1}}},[e._v("关闭")])],1)],1),e._v(" "),a("div",{staticClass:"all-text"},[e.gridData.length?a("div",{staticClass:"table-container"},e._l(e.gridData,function(t){return a("div",{key:t.id,staticClass:"box"},[a("div",{staticClass:"name-box"},[e._v(e._s(t.gmtCreate)+" "+e._s(e._f("filterCreat")(t.createStatus))+"-"+e._s(t.createName))]),e._v(" "),a("div",{staticClass:"name-box"},[e._v(e._s(t.content))])])})):a("div",{staticClass:"table-container"},[a("div",{staticClass:"box"},[a("div",{staticClass:"text-empty"},[e._v("暂无数据")])])])]),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("关闭")])],1)],1)},staticRenderFns:[]}},gD05:function(e,t,a){var l=a("Alxp")(a("wg0N"),a("xOgN"),function(e){a("NYid")},"data-v-a87b1aaa",null);e.exports=l.exports},hwDo:function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,".table-container{width:100%;margin-top:20px}.box{min-height:68px;padding-top:10px;padding-bottom:10px;border-bottom:1px solid #e0e0e0}.text-empty{line-height:60px;text-align:center;border-top:1px solid #e0e0e0}",""])},i60s:function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,".overdueReason[data-v-a87b1aaa]{cursor:pointer}.demo-table-expand[data-v-a87b1aaa]{font-size:0}.demo-table-expand label[data-v-a87b1aaa]{width:90px;color:#99a9bf}.demo-table-expand .el-form-item[data-v-a87b1aaa]{margin-right:0;margin-bottom:0;width:50%}#pad-b[data-v-a87b1aaa]{margin-bottom:10px}.box-c[data-v-a87b1aaa]{text-align:center}.pad[data-v-a87b1aaa]{display:inline-block;width:50px}.container[data-v-a87b1aaa]{padding:20px}.model-search .filter-item[data-v-a87b1aaa]{margin-left:10px}.col-red[data-v-a87b1aaa]{color:#f56c6c}.choose[data-v-a87b1aaa]{text-decoration:underline}.cursor[data-v-a87b1aaa]{cursor:pointer}.stypeInfo[data-v-a87b1aaa]{color:#409eff}.stypeInfos[data-v-a87b1aaa]{color:#67c23a}",""])},wg0N:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("aA9S"),o=a.n(l),s=a("0xDb"),r=a("LRjO"),i=a.n(r),n=a("Zlyl"),c=a.n(n),u=a("Ao5+");t.default={components:{rentingABill:i.a,followUp:c.a},data:function(){return{fullscreenLoading:!1,pageItems:{pageNo:1,pageSize:20},pageSizeList:[10,20,30,50],listLoading:!0,dialogFormVisible:!1,total:null,cityList:[{value:"选项1",label:"房东"},{value:"选项2",label:"租客"}],formData:{cityId:310100,startTime:"",endTime:"",customerKeyword:"",overType:"",address:"",status:0,orgKeyword:"",managerKeyword:"",startDeadlineTime:"",endDeadlineTime:"",orderNo:""},select:"",tableHeight:300,tableData:[],cityData:[{value:330100,label:"杭州"},{value:310100,label:"上海"}],dateTime:[],dateLineTime:[],overTypeList:[{value:0,label:"已逾期"},{value:1,label:"尚未逾期"},{value:"",label:"全部"}],statusList:[{value:0,label:"未交租"},{value:1,label:"线上已交租"},{value:2,label:"线下已交租"},{value:3,label:"已撤销 "}]}},created:function(){var e=new Date,t=e.getFullYear(),a=e.getMonth()+1,l=e.getDate();this.formData.endTime=t+"-"+(a<10?"0"+a:a)+"-"+(l<10?"0"+l:l)+" 00:00:00";var o=new Date(e-2592e6),s=o.getFullYear(),r=o.getMonth()+1,i=o.getDate();this.formData.startTime=s+"-"+(r<10?"0"+r:r)+"-"+(i<10?"0"+i:i)+" 00:00:00",this.dateTime=[this.formData.startTime,this.formData.endTime]},filters:{filterBtn:function(e){var t=[{value:1,label:"已退租"},{value:2,label:"未缴纳"},{value:3,label:"待确认真实性"},{value:4,label:"未接听"},{value:5,label:"飞虎队跟进"}];return t[e-1]?t[e-1].label:""},filStatus:function(e){return["未交租","线上已交租","线下已交租","已撤销"][e]},filoverdueType:function(e){return["已退租","线下交租","个人原因","其他"][e]},filterText:function(e){return e>0?e+"次":"请跟进"}},mounted:function(){var e=this,t=Object(s.c)(function(){e.tableHeight=Math.max(document.body.clientHeight-252,300)},100);this.$nextTick(function(){t()}),window.addEventListener("resize",t),this.searchParam()},watch:{dateTime:function(e){e=e||[],this.formData.startTime=e[0]?Object(s.f)(e[0]):"",this.formData.endTime=e[1]?Object(s.f)(e[1]):""},dateLineTime:function(e){e=e||[],this.formData.startDeadlineTime=e[0]?Object(s.f)(e[0]):"",this.formData.endDeadlineTime=e[1]?Object(s.f)(e[1]):""}},methods:{filterOver:function(e){return 1!==e&&null!=e},exportExcel:function(){var e="https://test-flying-api.mdguanjia.com/back/bill/exportExcel?cityId="+this.formData.cityId+"&startTime="+this.formData.startTime+"&endTime="+this.formData.endTime+"&customerKeyword="+this.formData.customerKeyword+"&overType="+this.formData.overType+"&address="+this.formData.address+"\n      &status="+this.formData.status+"&orgKeyword="+this.formData.orgKeyword+"&managerKeyword="+this.formData.managerKeyword+"&startDeadlineTime=\n      "+this.formData.startDeadlineTime+"&endDeadlineTime="+this.formData.endDeadlineTime,t=document.createElement("a");t.style.display="none",t.href=encodeURI(e),document.body.appendChild(t),t.click()},handleSizeChange:function(e){this.pageItems.pageSize=e,this.searchParam()},handleCurrentChange:function(e){this.pageItems.pageNo=e,this.searchParam()},searchGo:function(){this.searchParam()},clearForm:function(){this.formData=Object(s.e)(this.formData),this.dateTime=[]},overDue:function(e,t,a,l){!0===l&&(this.dialogFormVisible=!0,this.$refs.rentingABill.open(this.dialogFormVisible,e,t,a))},goFollow:function(e,t,a,l){this.$refs.followUp.open(!0,e,t,a,l)},searchParam:function(){var e=this,t=o()(this.pageItems,this.formData);this.formData.cityId?Object(u.i)(Object(s.a)(t)).then(function(t){e.tableData=t.data.result,e.listLoading=!1,e.total=t.data.total}).catch():this.$message({message:"城市为必选字段,请选择你要查询的城市后，点击再次查询",type:"error"})}}}},xOgN:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"model-search clearfix"},[a("el-form",{attrs:{size:"small",inline:!0,model:e.formData}},[a("el-form-item",{attrs:{id:"pad-b"}},[a("el-select",{staticClass:"item-select",staticStyle:{width:"120px"},attrs:{size:"small",placeholder:"城市"},model:{value:e.formData.cityId,callback:function(t){e.$set(e.formData,"cityId",t)},expression:"formData.cityId"}},e._l(e.cityData,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"180px"},attrs:{placeholder:"请输入小区／公寓名称"},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchParam(t)}},model:{value:e.formData.address,callback:function(t){e.$set(e.formData,"address",t)},expression:"formData.address"}}),e._v(" "),a("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"360px"},attrs:{size:"small",type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.searchParam},model:{value:e.dateTime,callback:function(t){e.dateTime=t},expression:"dateTime"}}),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"180px"},attrs:{placeholder:"租客／租客手机号码"},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchParam(t)}},model:{value:e.formData.customerKeyword,callback:function(t){e.$set(e.formData,"customerKeyword",t)},expression:"formData.customerKeyword"}}),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"120px"},attrs:{size:"small",placeholder:"逾期状态",clearable:""},model:{value:e.formData.overType,callback:function(t){e.$set(e.formData,"overType",t)},expression:"formData.overType"}},e._l(e.overTypeList,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"120px"},attrs:{size:"small",placeholder:"请选择订单状态",clearable:""},model:{value:e.formData.status,callback:function(t){e.$set(e.formData,"status",t)},expression:"formData.status"}},e._l(e.statusList,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",[a("el-input",{staticStyle:{width:"160px"},attrs:{placeholder:"房东／房东手机号码"},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchParam(t)}},model:{value:e.formData.orgKeyword,callback:function(t){e.$set(e.formData,"orgKeyword",t)},expression:"formData.orgKeyword"}}),e._v(" "),a("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"360px"},attrs:{size:"small",type:"datetimerange","range-separator":"至","start-placeholder":"最迟支付开始日期","end-placeholder":"最迟支付结束日期"},on:{change:e.searchParam},model:{value:e.dateLineTime,callback:function(t){e.dateLineTime=t},expression:"dateLineTime"}}),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"220px"},attrs:{placeholder:"城市管家／城市管家手机号码"},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchParam(t)}},model:{value:e.formData.managerKeyword,callback:function(t){e.$set(e.formData,"managerKeyword",t)},expression:"formData.managerKeyword"}}),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"180px"},attrs:{placeholder:"订单号"},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchParam(t)}},model:{value:e.formData.orderNo,callback:function(t){e.$set(e.formData,"orderNo",t)},expression:"formData.orderNo"}}),e._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",size:"small",icon:"el-icon-search"},nativeOn:{click:function(t){e.searchParam(t)}}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{plain:"",size:"small",icon:"el-icon-remove-outline"},nativeOn:{click:function(t){e.clearForm(t)}}},[e._v("清空")]),e._v(" "),a("el-button",{staticClass:"right",attrs:{type:"primary",size:"small",icon:"el-icon-upload"},nativeOn:{click:function(t){e.exportExcel(t)}}},[e._v("导出")])],1)],1),e._v(" "),a("div",{staticClass:"table-box"},[a("div",{staticClass:"model-table",staticStyle:{"margin-top":"0"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],staticStyle:{width:"100%"},attrs:{data:e.tableData,height:e.tableHeight,size:"small",fit:"",stripe:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"index",width:"50",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"账单号"}},[a("span",[e._v(e._s(t.row.billNo))])]),e._v(" "),a("el-form-item",{attrs:{label:"房源位置"}},[a("span",[e._v(e._s(t.row.subdistrictAddress))])]),e._v(" "),a("el-form-item",{attrs:{label:"房东"}},[a("span",[e._v(e._s(t.row.orgName))])]),e._v(" "),a("el-form-item",{attrs:{label:"手机号码"}},[a("span",[e._v(e._s(t.row.orgMobile))])]),e._v(" "),a("el-form-item",{attrs:{label:"城市管家"}},[a("span",[e._v(e._s(t.row.managerName))])]),e._v(" "),a("el-form-item",{attrs:{label:"手机号码"}},[a("span",[e._v(e._s(t.row.managerMobile))])]),e._v(" "),a("el-form-item",{attrs:{label:"所在部门"}},[a("span",[e._v(e._s(t.row.department))])]),e._v(" "),a("el-form-item",{attrs:{label:"支付时间"}},[a("span",[e._v(e._s(t.row.finishDate))])])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"小区／公寓-房间",prop:"roomAddress"}}),e._v(" "),a("el-table-column",{attrs:{label:"生成时间",prop:"gmtCreate"}}),e._v(" "),a("el-table-column",{attrs:{label:"账单名称",prop:"billName"}}),e._v(" "),a("el-table-column",{attrs:{label:"订单号","min-width":"110px",prop:"orderNo"}}),e._v(" "),a("el-table-column",{attrs:{label:"账单金额",prop:"billFee"}}),e._v(" "),a("el-table-column",{attrs:{label:"最迟支付时间",prop:"deadlineDate"}}),e._v(" "),a("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{class:[1==t.row.status?"stypeInfo":"",2==t.row.status?"stypeInfos":""]},[e._v(e._s(e._f("filStatus")(t.row.status)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"100px",label:"是否逾期"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[!1===t.row.isOver?a("span",[e._v("尚未逾期")]):!0===t.row.isOver?a("span",[e._v("已逾期"),a("span",{staticClass:"col-red"},[e._v(e._s(t.row.overDays))]),e._v("天")]):a("span",[e._v("-")])])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"逾期原因"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"overdueReason",on:{click:function(a){e.overDue(t.row.overdueReason,t.row.overdueType,t.row.id,t.row.isOver)}}},[e.filterOver(t.row.overdueType)?a("span",[a("el-popover",{attrs:{placement:"top-start",title:"原因",width:"200",trigger:"hover",content:t.row.overdueReason}},[a("span",{attrs:{slot:"reference"},slot:"reference"},[e._v(e._s(e._f("filoverdueType")(t.row.overdueType)))])])],1):1==t.row.overdueType?a("span",[e._v(e._s(e._f("filoverdueType")(t.row.overdueType)))]):!0===t.row.isOver?a("span",{staticClass:"choose"},[e._v("请选择")]):!1===t.row.isOver?a("span",[e._v("-")]):e._e()])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"手机号码/租客"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                        "+e._s(t.row.customerName)+"/"+e._s(t.row.customerMobile)+"\n                      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"170",label:"催租跟进"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"col-red pad cursor",on:{click:function(a){e.goFollow(t.row.id,t.row.billNo,t.row.isOver,t.row.status)}}},[e._v(e._s(e._f("filterText")(t.row.followCount)))]),e._v(" "),3==t.row.followType||5==t.row.followType?a("el-popover",{attrs:{placement:"top-start",width:"200",trigger:"hover",content:t.row.content}},[a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.row.followType,expression:"scope.row.followType"}],attrs:{slot:"reference",size:"mini",type:"info",plain:""},slot:"reference"},[e._v(e._s(e._f("filterBtn")(t.row.followType)))])],1):a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.row.followType,expression:"scope.row.followType"}],attrs:{slot:"reference",size:"mini",type:"info",plain:""},slot:"reference"},[e._v(e._s(e._f("filterBtn")(t.row.followType)))])]}}])})],1)],1),e._v(" "),a("div",{staticClass:"model-pagination"},[a("el-pagination",{attrs:{background:"","current-page":e.pageItems.pageNo,"page-sizes":e.pageSizeList,"page-size":e.pageItems.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.pageItems,"pageNo",t)}}})],1)])],1),e._v(" "),a("renting-A-Bill",{ref:"rentingABill",on:{searchCallback:e.searchGo}}),e._v(" "),a("follow-Up",{ref:"followUp",on:{searchStart:e.searchParam}})],1)},staticRenderFns:[]}}});