webpackJsonp([6,29],{"+2Wy":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"clearfix"},[a("div",{staticClass:"model-search clearfix"},[a("el-form",{attrs:{size:"small",inline:!0,model:e.formData}},[a("el-select",{staticClass:"item-select",staticStyle:{width:"150px"},attrs:{size:"small",placeholder:"城市",clearable:""},model:{value:e.formData.cityId,callback:function(t){e.$set(e.formData,"cityId",t)},expression:"formData.cityId"}},e._l(e.cityOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("el-select",{staticClass:"item-select filter-item",staticStyle:{width:"150px"},attrs:{size:"small",placeholder:"审核状态",clearable:""},model:{value:e.formData.reviewStatus,callback:function(t){e.$set(e.formData,"reviewStatus",t)},expression:"formData.reviewStatus"}},e._l(e.auditOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"180px"},attrs:{size:"small",placeholder:e.placeholder[2-e.type]},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchParam(t)}},model:{value:e.formData.keyword,callback:function(t){e.$set(e.formData,"keyword",t)},expression:"formData.keyword"}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",size:"small",icon:"el-icon-search"},nativeOn:{click:function(t){e.searchParam(t)}}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{plain:"",size:"small",icon:"el-icon-remove-outline"},nativeOn:{click:function(t){e.clearForm(t)}}},[e._v("清空")])],1)],1),e._v(" "),a("div",{staticClass:"model-table",style:e.tableStyle},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:e.tableData,"max-height":e.tableHeight,size:"small",fit:"",stripe:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"index",width:"60",align:"center"}}),e._v(" "),e._l(e.colModels[e.type],function(t,i){return a("el-table-column",{key:i,attrs:{label:t.label,width:t.width,"min-width":t.minWidth||60,fit:"","show-overflow-tooltip":!t.toolTip},scopedSlots:e._u([{key:"default",fn:function(i){return["formatHouseResource"===t.type?a("span",[e._v("\n            "+e._s(e._f("formatHouseResource")(i.row[t.prop],i.row))+"\n          ")]):"formatTime"===t.type?a("span",[e._v("\n            "+e._s(e._f("formatTime")(i.row[t.prop],t.prop,i.row))+"\n          ")]):"formatType"===t.type?a("span",[e._v("\n            "+e._s(e._f("formatTypeFilter")(i.row[t.prop]))+"\n          ")]):"formatRoomName"===t.type?a("span",[e._v("\n            "+e._s(e._f("formatRoomName")(i.row[t.prop],i.row))+"\n          ")]):"formatEstateName"===t.type?a("span",[e._v("\n            "+e._s(e._f("formatEstateName")(i.row[t.prop],i.row))+"\n          ")]):"remark"===t.type?a("span",[e._v("\n            "+e._s(e._f("formatRemark")(i.row[t.prop],i.row))+"\n          ")]):"status"===t.type?a("el-tag",{attrs:{type:e._f("statusFilter")(i.row[t.prop])}},[e._v("\n            "+e._s(e._f("formatStatus")(i.row[t.prop]))+"\n          ")]):"tags"===t.type?a("span",e._l(i.row.tags,function(t,i){return a("el-tag",{key:i,staticStyle:{margin:"0 5px 5px 0"},attrs:{type:e._f("filterTags")(t)}},[e._v("\n              "+e._s(t)+"\n            ")])})):a("span",[e._v("\n            "+e._s(i.row[t.prop])+"\n          ")])]}}])})}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"100",fixed:"right",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-view",size:"small"},on:{click:function(a){e.handleView(t.$index,t.row)}}},[e._v("查看")])]}}])})],2)],1),e._v(" "),a("div",{staticClass:"model-pagination"},[a("el-pagination",{attrs:{background:"","current-page":e.pageItems.pageNo,"page-sizes":e.pageSizeList,"page-size":e.pageItems.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.pageItems,"pageNo",t)}}})],1),e._v(" "),a("div",{staticClass:"dialog-image"},[a("el-dialog",{staticStyle:{"text-align":"center"},attrs:{title:"",width:"100%","show-close":!1,visible:e.layer_showImage},on:{"update:visible":function(t){e.layer_showImage=t}},nativeOn:{click:function(t){e.layer_showImage=!1}}},[a("img",{staticClass:"image",attrs:{src:e.showPicUrl}})])],1),e._v(" "),a("div",{staticClass:"dialog-info"},[a("el-dialog",{attrs:{title:"房源详情",visible:e.layer_showInfo,width:"800px"},on:{close:e.dialogClose,"update:visible":function(t){e.layer_showInfo=t}}},[2==e.housingType?a("house-info",{attrs:{type:"audit","temp-data":e.temp}}):e._e(),e._v(" "),1==e.housingType?a("estate-info",{attrs:{type:"audit","temp-data":e.temp},on:{saveReviewData:e.saveReviewData}}):e._e(),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[1!=e.temp.reviewStatus?a("el-button",{attrs:{size:"small"},on:{click:function(t){e.layer_showInfo=!1}}},[e._v("关 闭")]):a("el-button",{attrs:{size:"small"},on:{click:function(t){e.layer_showInfo=!1}}},[e._v("取 消")]),e._v(" "),1==e.temp.reviewStatus?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.saveData}},[e._v("确 定")]):e._e()],1)],1)],1)])},staticRenderFns:[]}},"/n+6":function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,".dialog-image .el-dialog{background:inherit;-webkit-box-shadow:none;box-shadow:none}",""])},"5E5D":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("3cXf"),s=a.n(i),o=a("4YfN"),r=a.n(o),n=a("aA9S"),l=a.n(n),p=a("0xDb"),c=a("pFO2"),u=a("QHcW"),d=a("ms7A"),m=a("cAgV"),h=a("BA/X"),f=a.n(h),v=a("331I"),g=a.n(v);t.default={name:"auditPublish",props:{type:{type:Number,default:2}},components:{houseInfo:f.a,estateInfo:g.a},directives:{waves:m.a},filters:{formatTypeFilter:function(e){return{1:"普通",2:"金融",3:"金融申请中"}[e]||"普通"},filterTags:function(e){return{"整租":"","合租":"info","金融":"warning","飞虎队":"success","图招":"danger"}[e]||""},statusFilter:function(e){return{1:"info",2:"success",3:"danger"}[e]||"info"},formatStatus:function(e){return{1:"未审核",2:"审核通过",3:"审核不通过"}[e]||"未审核"},formatHouseResource:function(e,t){return t.province+"/"+t.city+"/"+t.region},formatTime:function(e,t,a){var i="publishTime"==t?a.publisher:a.reviewer;return Object(p.c)(e)+" "+i},formatRoomName:function(e,t){var a=t.unitCode?t.unitCode+"单元 ":"",i=t.buildingName?t.buildingName+"幢 ":"";return"【"+t.subdistrictName+"】"+i+a+t.floorName+"楼 "+t.roomNo+"号 - "+(t.roomName||"整套房间")},formatEstateName:function(e,t){return"【"+e+"】"+t.subdistrictAddress},formatRemark:function(e,t){return 2===t.reviewStatus?t.discrepancyReason||"":e||""}},data:function(){return{formData:{cityId:"",reviewStatus:1,publishStatus:"",keyword:""},placeholder:["房源编号/小区名称","精品公寓名称"],cityOptions:[],auditOptions:[{label:"未审核",value:1},{label:"审核通过",value:2},{label:"审核不通过",value:3}],houseFinanceOptions:[{label:"普通",value:1},{label:"金融",value:2},{label:"金融申请中",value:3}],temp:{},reviewData:{},listLoading:!0,colModels:{2:[{prop:"reviewCheckId",label:"审核号",width:60},{prop:"houseResource",label:"房源位置",width:150,type:"formatHouseResource",toolTip:!0},{prop:"roomName",label:"小区-房间",width:200,type:"formatRoomName",toolTip:!0},{prop:"roomCode",label:"房源编号",width:90},{prop:"tags",label:"标签",type:"tags",width:200},{prop:"reviewStatus",label:"审核状态",width:110,type:"status"},{prop:"reviewRemark",label:"不符合原因",minWidth:150,type:"remark"},{prop:"publishTime",label:"提交时间",width:140,type:"formatTime",toolTip:!0},{prop:"reviewTime",label:"操作时间",width:140,type:"formatTime",toolTip:!0}],1:[{prop:"province",label:"房源位置",width:150,type:"formatHouseResource",toolTip:!0},{prop:"estateName",label:"精品公寓",type:"formatEstateName",toolTip:!0,width:200},{prop:"styleName",label:"房间类型",width:100},{prop:"roomCount",label:"数量(间)",width:80},{prop:"tags",label:"标签",type:"tags",width:200},{prop:"reviewStatus",label:"审核状态",width:110,type:"status"},{prop:"reviewRemark",label:"不符合原因",minWidth:150,type:"remark"},{prop:"publishTime",label:"提交时间",width:140,type:"formatTime",toolTip:!0},{prop:"reviewTime",label:"操作时间",width:140,type:"formatTime",toolTip:!0}]},tableHeight:300,tableData:[],total:null,pageItems:{pageNo:1,pageSize:20},searchParams:{},pageSizeList:[10,20,30,50],showPicUrl:"",layer_showInfo:!1,layer_showImage:!1}},created:function(){this.housingType=this.type,this.getCityList(),this.getGridData(this.pageItems)},mounted:function(){var e=this,t=document.body.clientHeight-267;this.tableHeight=t>300?t:300,window.onresize=function(){return t=document.body.clientHeight-267,void(e.tableHeight=e.tableHeight=t>300?t:300)}},computed:{tableStyle:function(){return{width:"100%",height:this.tableHeight+"px"}}},methods:{getCityList:function(){var e=this;Object(u.a)({housingType:this.housingType}).then(function(t){e.cityOptions=t.data.list.map(function(e){return{label:e.areaName,value:e.areaId}})})},showImage:function(e){if(!e)return!1;this.showPicUrl=e,this.layer_showImage=!0},handleSizeChange:function(e){this.pageItems.pageSize=e,this.getGridData(this.pageItems)},handleCurrentChange:function(e){this.pageItems.pageNo=e,this.getGridData(this.pageItems)},getGridData:function(e){var t=this;this.listLoading=!0,this.searchParams=l()(Object(p.b)(e),this.formData),this.searchParams.housingType=this.housingType,Object(c.d)(Object(p.a)(this.searchParams)).then(function(e){t.tableData=e.data.list,t.total=e.data.record,t.listLoading=!1})},clearForm:function(){this.formData={cityId:"",reviewStatus:"",publishStatus:"",keyword:""},this.pageItems={pageNo:1,pageSize:20},this.getGridData(this.pageItems)},searchParam:function(){this.getGridData(this.pageItems)},dialogClose:function(){this.temp={},this.reviewData={}},handleView:function(e,t){var a=this;this.reviewData=2===this.housingType?{reviewCheckId:t.reviewCheckId}:{estateId:t.estateId,estateTypeId:t.estateTypeId,groupCode:t.groupCode};var i=1==this.housingType?{estateId:t.estateId,estateTypeId:t.estateTypeId,groupCode:t.groupCode,publisherId:t.publisherId,publishTime:Object(p.c)(t.publishTime)}:{reviewCheckId:t.reviewCheckId};i.housingType=this.housingType,Object(c.e)(i).then(function(e){a.temp=e.data.result,a.temp.reviewStatus=t.reviewStatus,a.layer_showInfo=!0})},saveReviewData:function(e){void 0!=e.checked&&(this.reviewData.checked=e.checked)},saveData:function(){var e=this,t=this.$store.getters.houseInfoData,a=2===this.housingType?t.houseInfo:t.estateInfo;return a.discrepancyReason=a.discrepancyReason||[],this.reviewData=2===this.housingType?r()({},this.reviewData,a,{reviewRemark:a.remark,remark:void 0,picList:void 0,discrepancyReason:a.discrepancyReason.join("、"),imageFiles:a.picList.map(function(e){return{id:e.id,imageCode:e.src,imageName:e.title||"",picTag:e.picTag||"",picType:e.type}})}):r()({},this.reviewData,a,{reviewRemark:a.remark,remark:void 0,picList:void 0,desc:void 0,discrepancyReason:a.discrepancyReason.join("、")}),this.reviewData.reviewStatus?2!==this.reviewData.reviewStatus||this.reviewData.accordPic?3!==this.reviewData.reviewStatus||this.reviewData.reviewRemark?2!==this.reviewData.reviewStatus||2===this.reviewData.accordPic||this.reviewData.discrepancyReason?void(2===this.housingType?c.h:c.f)(Object(p.a)(this.reviewData)).then(function(t){e.layer_showInfo=!1,e.getGridData(e.pageItems),e.getMessageQuantity(),e.$notify({title:"成功",message:"操作成功",type:"success",duration:2e3})}):(this.$message.error("请选择不符合图招原因"),!1):(this.$message.error("请选择审核不通过原因"),!1):(this.$message.error("请选择是否符合图招"),!1):(this.$message.error("请选择审核结果"),!1)},getMessageQuantity:function(){var e=this;Object(d.l)().then(function(t){var a=t.data,i=e.$store.state.app.messageData;s()(i)!=s()(a)&&e.$store.dispatch("UpdateMessageData",t.data||{})})}}}},LyT2:function(e,t,a){var i=a("Alxp")(a("snAn"),a("jLfS"),function(e){a("PH+k")},null,null);e.exports=i.exports},PGD2:function(e,t,a){var i=a("/n+6");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("8bSs")("2cf80539",i,!0)},"PH+k":function(e,t,a){var i=a("vu8U");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("8bSs")("d7cab428",i,!0)},XKHL:function(e,t,a){var i=a("Alxp")(a("5E5D"),a("+2Wy"),function(e){a("PGD2")},null,null);e.exports=i.exports},jLfS:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-tabs",{attrs:{type:"border-card"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},e._l(e.tabMapOptions,function(t,i){return a("el-tab-pane",{key:i,attrs:{label:t,name:t}},[e.activeName==t?a("audit-publish",{ref:"auditPublish",refInFor:!0,attrs:{type:2-i}}):e._e()],1)}))],1)},staticRenderFns:[]}},snAn:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("XKHL"),s=a.n(i);t.default={name:"auditPublishList",components:{auditPublish:s.a},data:function(){var e=["分散式","集中式"];return{tabMapOptions:e,activeName:e[this.$route.query.type||0]}},methods:{}}},vu8U:function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,".model-search .filter-item{margin-left:10px}.item-select{width:150px}",""])}});