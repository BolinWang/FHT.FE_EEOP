webpackJsonp([20],{"/psB":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("a3Yh"),s=a.n(i),o=a("U4Ig"),n=a.n(o),l=a("+BaM"),r=a.n(l),c=a("H1GV"),p=a.n(c),d=a("0xDb"),u=a("QHcW"),m=a("DLxG"),f=a.n(m);document.body.ondrop=function(t){t.preventDefault(),t.stopPropagation()},e.default={name:"promotionDisplay",components:{draggable:r.a,Preview:p.a,GridUnit:n.a},data:function(){var t;return t={formData:{cityId:""},cityOptions:[],colModels:[{prop:"showStatus",label:"状态",width:80,type:"status",slotName:"slot_status",unitFilters:{renderStatusType:function(t){return{1:"info",2:"success",3:""}[t]||"info"},renderStatusValue:function(t){return["未申请","已展示","申请中"][t-1]||"未发布"}}},{prop:"addressName",label:"房源位置"},{prop:"estateName",label:"公寓"},{prop:"tags",label:"标签",type:"tags",width:200},{prop:"gmtModified",label:"操作时间",width:180},{label:"操作",slotName:"handle",fixed:"right",width:230,align:"center"}],isShowSortApp:!0,tableHeight:300,tableData:[],total:null,pageItems:{pageNo:1,pageSize:20},searchParams:{},temp:{},pageSizeList:[10,20,30,50],sort_tableData:[],listLoading:!0,layer_showBMap:!1,layer_showInfo:!1,layer_appsort:!1,isDragging:!1,delayedDragging:!1},s()(t,"tableHeight",300),s()(t,"method","queryEstateListByPage"),s()(t,"url","/market/estate/"),t},created:function(){this.getCityList()},mounted:function(){var t=this,e=document.body.clientHeight-200;this.tableHeight=e>300?e:300,window.onresize=function(){return e=document.body.clientHeight-200,void(t.tableHeight=t.tableHeight=e>300?e:300)}},computed:{tableStyle:function(){return{width:"100%",height:this.tableHeight+"px"}},dragOptions:function(){return{animation:0,group:"description",ghostClass:"ghost"}}},methods:{setSortFirst:function(t){var e=this.sort_tableData.splice(t,1);this.sort_tableData.unshift(e[0])},getCityList:function(){var t=this;Object(u.n)({housingType:1}).then(function(e){t.cityOptions=e.data.list.map(function(t){return{label:t.areaName,value:t.areaId}}),t.formData.cityId=t.cityOptions[0].value,t.getGridData(t.pageItems)})},downImmediate:function(t,e){if(2!=e.showStatus)return this.$message.error("请选择【已展示】的房源进行下架"),!1;e.showStatus=1,e.publishStatus=1,this.tableData.splice(t,1,e),this.saveData(this.tableData)},showEstateInfo:function(t){var e=Object(d.d)(t);this.temp.estateName=(1==e.type?"【集中式】":"【分散式】")+e.estateName,this.temp.contactNameInfo=e.contactName?e.contactName+(1==e.contactGender?" 先生 ":" 女士 ")+e.contactMobile:"",this.temp.longitude=e.longitude,this.temp.latitude=e.latitude,this.temp.bmapData=this.temp.longitude+","+this.temp.latitude,this.temp.addressName=e.addressName,this.temp.zoneName=e.zoneName,this.temp.introduction=e.introduction,this.temp.picList=e.estatePictureList.length>0?e.estatePictureList.map(function(t){return{src:t.smallImage,w:800,h:600}}):[{src:f.a,w:800,h:600,isnoPic:!0}],this.layer_showInfo=!0},layerClose:function(){this.temp={}},change:function(t){this.$refs.refGridUnit.searchHandler()},getGridData:function(t){var e=this;this.listLoading=!0,this.searchParams=Object(d.d)(t),this.searchParams.cityId=this.formData.cityId,Object(u.o)(Object(d.a)(this.searchParams)).then(function(t){e.tableData=t.data.content,e.total=t.data.totalElements,e.listLoading=!1})},sortApp:function(){var t=this;Object(u.o)({pageNo:1,pageSize:20,cityId:this.formData.cityId,status:2}).then(function(e){if(t.sort_tableData=e.data.content.sort(function(t,e){return 1*t.sortNum-1*e.sortNum}),0==t.sort_tableData.length)return t.$message.error("没有【已展示】的房源"),!1;t.layer_appsort=!0})},saveData:function(t,e){var a=this,i=Object(d.d)(t);"sort"==e&&i.forEach(function(t,e){return t.sortNum=1*e+1}),Object(u.t)(i).then(function(t){a.layer_appsort=!1,a.getGridData(a.pageItems),a.$notify({title:"成功",message:"操作成功",type:"success",duration:2e3})})},openBMap:function(){var t=this;this.$nextTick(function(){var e=new BMap.Map("addressMap");if(t.temp.bmapData){var a=new BMap.Point(1*t.temp.longitude||0,1*t.temp.latitude||0);e.centerAndZoom(a,14),e.addOverlay(new BMap.Marker(a))}else e.centerAndZoom("杭州市",12);e.addControl(new BMap.MapTypeControl),e.enableScrollWheelZoom(!0),e.addEventListener("click",function(t){e.clearOverlays(),e.addOverlay(new BMap.Marker(new BMap.Point(t.point.lng,t.point.lat)))})})}},watch:{isDragging:function(t){var e=this;t?this.delayedDragging=!0:this.$nextTick(function(){e.delayedDragging=!1})}}}},"3TwA":function(t,e,a){var i=a("z96c");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("8bSs")("eadafeae",i,!0)},"9cEZ":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"model-search clearfix"},[a("el-form",{attrs:{size:"small",inline:!0,model:t.formData}},[a("el-select",{staticClass:"item-select",staticStyle:{width:"150px"},attrs:{size:"small",placeholder:"城市加载中..."},on:{change:t.change},model:{value:t.formData.cityId,callback:function(e){t.$set(t.formData,"cityId",e)},expression:"formData.cityId"}},t._l(t.cityOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-button",{staticClass:"filter-item right",attrs:{size:"small",type:"primary",icon:"el-icon-rank"},nativeOn:{click:function(e){t.sortApp(e)}}},[t._v("APP展示排序")])],1)],1),t._v(" "),a("div",{staticClass:"model-table",style:t.tableStyle},[a("GridUnit",{ref:"refGridUnit",attrs:{columns:t.colModels,url:t.url,formOptions:t.formData,dataMethod:t.method,height:t.tableHeight},scopedSlots:t._u([{key:"slot_status",fn:function(e){return[a("el-tag",{attrs:{type:e.row.prop},model:{value:t.formData.status,callback:function(e){t.$set(t.formData,"status",e)},expression:"formData.status"}},[t._v("\n          "+t._s(e.row.prop)+"\n        ")])]}},{key:"handle",fn:function(e){return[a("el-row",[a("el-button",{attrs:{type:"danger",icon:"el-icon-sold-out",size:"small"},nativeOn:{click:function(a){t.downImmediate(e.$index,e.row)}}},[t._v("立即下架")]),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-info",size:"small"},nativeOn:{click:function(a){t.showEstateInfo(e.row)}}},[t._v("公寓详情")])],1)]}}])})],1),t._v(" "),a("div",{staticClass:"dialog-info"},[a("el-dialog",{attrs:{title:"查看公寓信息",visible:t.layer_showInfo,width:"700px"},on:{close:t.layerClose,"update:visible":function(e){t.layer_showInfo=e}}},[a("el-form",{staticStyle:{width:"620px","margin-left":"20px"},attrs:{size:"small",model:t.temp,"label-position":"left","label-width":"80px"}},[a("el-form-item",{attrs:{label:"公寓名称"}},[a("el-input",{attrs:{value:t.temp.estateName,disabled:!0}})],1),t._v(" "),a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:13}},[a("el-form-item",{attrs:{label:"所在地区"}},[a("el-input",{attrs:{value:t.temp.addressName,disabled:!0}})],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v("  ")]),t._v(" "),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"所属板块"}},[a("el-input",{attrs:{value:t.temp.zoneName,disabled:!0}})],1)],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"看房电话"}},[a("el-input",{attrs:{value:t.temp.contactNameInfo,disabled:!0}})],1),t._v(" "),a("el-form-item",{attrs:{label:"地图坐标"}},[a("el-input",{attrs:{value:t.temp.bmapData,disabled:!0}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},nativeOn:{click:function(e){t.layer_showBMap=!0}},slot:"append"})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"简介"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},disabled:!0},model:{value:t.temp.introduction,callback:function(e){t.$set(t.temp,"introduction",e)},expression:"temp.introduction"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"公寓照片"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":t.temp.picList}})],1)])],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.layer_showInfo=!1}}},[t._v("关闭")])],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-bmap"},[a("el-dialog",{attrs:{title:"公寓坐标",visible:t.layer_showBMap,width:"600px"},on:{"update:visible":function(e){t.layer_showBMap=e},open:t.openBMap}},[a("div",{staticStyle:{width:"560px",height:"400px"},attrs:{id:"addressMap"}}),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.layer_showBMap=!1}}},[t._v("关闭")])],1)])],1),t._v(" "),a("div",{staticClass:"dialog-sort"},[a("el-dialog",{attrs:{title:"APP展示排序",visible:t.layer_appsort,width:"800px"},on:{"update:visible":function(e){t.layer_appsort=e}}},[a("draggable",{staticClass:"list-group",attrs:{element:"ul",options:t.dragOptions},on:{start:function(e){t.isDragging=!0},end:function(e){t.isDragging=!1}},model:{value:t.sort_tableData,callback:function(e){t.sort_tableData=e},expression:"sort_tableData"}},[a("transition-group",{attrs:{type:"transition",name:"flip-list"}},t._l(t.sort_tableData,function(e,i){return a("li",{key:e.sortNum,staticClass:"list-group-item clearfix"},[0!=i?a("el-button",{staticClass:"right",attrs:{size:"mini",type:"primary",icon:"el-icon-setting"},on:{click:function(e){t.setSortFirst(i)}}},[t._v("\n              设置首位\n            ")]):t._e(),t._v(" "),a("span",{staticClass:"left sortContent"},[a("i",{staticClass:"el-icon-d-caret",attrs:{"aria-hidden":"true"}}),t._v("\n              "+t._s(e.estateName)+"\n            ")])],1)}))],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.layer_appsort=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){t.saveData(t.sort_tableData,"sort")}}},[t._v("确 定")])],1)],1)],1)])},staticRenderFns:[]}},U8Zu:function(t,e,a){var i=a("Alxp")(a("/psB"),a("9cEZ"),function(t){a("3TwA")},null,null);t.exports=i.exports},z96c:function(t,e,a){(t.exports=a("BkJT")(!1)).push([t.i,".dialog-image .el-dialog{background:inherit;-webkit-box-shadow:none;box-shadow:none}.model-search .filter-item{margin-left:10px}.sortContent{max-width:600px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",""])}});