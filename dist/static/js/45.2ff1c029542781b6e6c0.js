webpackJsonp([45],{NDLy:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("4YfN"),s=i.n(a),n=i("+BaM"),o=i.n(n),r=i("U4Ig"),l=i.n(r),c=i("0xDb"),p=i("tDxQ");document.body.ondrop=function(t){t.preventDefault(),t.stopPropagation()},e.default={name:"appIcon",components:{GridUnit:l.a,draggable:o.a},data:function(){return{searchParams:{cityId:""},cityList:[],configList:[],colModels:[{prop:"title",label:"标题",minWidth:300},{prop:"picUrl",label:"图片",width:200,type:"img"},{label:"操作",slotName:"handle",width:200}],tableHeight:300,url:p.a.defaultOptions.requestUrl,method:p.a.defaultOptions.method,rules:{title:[{required:!0,message:"请输入标题",trigger:"blur"}],picList:[{required:!0,message:"请上传图片",trigger:"change"}],configId:[{required:!0,message:"请选择跳转语义",trigger:"change"}]},temp:{},actionBaseUrl:"https://test1.mdguanjia.com/bop/",layer_showInfo:!1,layer_appsort:!1,isDragging:!1,delayedDragging:!1,sort_tableData:[]}},created:function(){var t=this;p.a.cityList().then(function(e){t.cityList=e.data})},mounted:function(){var t=this;this.$nextTick(function(){var e=t.$refs.refGridUnit.$el.offsetTop||140,i=document.body.clientHeight-e-5-20;t.tableHeight=i>300?i:300,window.onresize=function(){return i=document.body.clientHeight-e-5-20,void(t.tableHeight=t.tableHeight=i>300?i:300)}})},computed:{tableStyle:function(){return{width:"100%",height:this.tableHeight+"px"}},dragOptions:function(){return{animation:0,group:"description",ghostClass:"ghost"}}},methods:{searchParam:function(){this.$refs.refGridUnit.searchHandler()},handleDetail:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.temp=s()({},Object(c.d)(e),{cityId:e.cityId||this.searchParams.cityId,picList:e.picUrl?[{url:e.picUrl,name:"查看图片"}]:[]}),this.temp.picList=e.picUrl?[{url:e.picUrl,name:"查看图片"}]:[],p.a.configList().then(function(e){t.configList=e.data||[],t.layer_showInfo=!0})},handleDelete:function(t){var e=this;this.$confirm("是否删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){p.a.delete({iconId:t.iconId}).then(function(t){e.searchParam(),e.$notify({title:"成功",message:"操作成功",type:"success",duration:2e3})})}).catch(function(){})},saveData:function(){var t=this;this.$refs.dataForm.validate(function(e){if(e){var i=t.temp.iconId?p.a.edit:p.a.add,a=t.temp,s=a.configId,n=a.iconId,o=a.title,r=a.cityId;i(Object(c.a)({configId:s,iconId:n,title:o,cityId:r,picUrl:t.temp.picList.length>0?t.temp.picList[0].url:""})).then(function(e){t.searchParam(),t.layer_showInfo=!1,t.$notify({title:"成功",message:"操作成功",type:"success",duration:2e3})})}})},saveSort:function(){var t=this;this.sort_tableData.forEach(function(t,e){t.sortNum=1*e+1}),p.a.saveSort(Object(c.a)({cityId:this.searchParams.cityId,list:this.sort_tableData})).then(function(e){t.layer_appsort=!1,t.searchParam(),t.$notify({title:"成功",message:"操作成功",type:"success",duration:2e3})})},dialogClose:function(){this.temp={},this.$refs.dataForm.resetFields(),this.layer_showInfo=!1},pictureUpload:function(t){var e=t.size/1024/1024<=.5;return-1===["image/jpeg","image/jpg","image/png"].indexOf(t.type)?(this.$message.error("请上传jpg/png的图片"),!1):e?void 0:(this.$message.error("请上传500Kb大小以内的图片"),!1)},pictureRemove:function(t,e){console.log("remove"),this.temp.picList=[]},picturePreview:function(t){var e=this;if(!this.temp.picList||0===this.temp.picList.length)return this.$message.error("图片预览失败"),!1;var i={src:this.temp.picList[0].url},a=new Image;a.src=this.temp.picList[0].url,a.onload=function(){i.w=a.width||800,i.h=a.height||600,e.$preview.open(0,[i])}},pictureSuccess:function(t,e,i){console.log("success");var a=t.data.map(function(t){return{url:t,name:"查看图片"}});this.$set(this.temp,"picList",a),i.length>1&&i.splice(0,1)},pictureError:function(t,e){console.log(t)},resetFile:function(t){null},sortApp:function(){if(this.sort_tableData=this.$refs.refGridUnit.tableData.sort(function(t,e){return 1*t.sortNum-1*e.sortNum}),0===this.sort_tableData.length)return this.$message.error("没有可排序的数据"),!1;this.layer_appsort=!0}}}},TOQa:function(t,e,i){var a=i("Alxp")(i("NDLy"),i("zMmQ"),function(t){i("WoGG")},null,null);t.exports=a.exports},WoGG:function(t,e,i){var a=i("j1I5");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("8bSs")("64296432",a,!0)},j1I5:function(t,e,i){(t.exports=i("BkJT")(!1)).push([t.i,".pswp{z-index:9999999}.model-table{margin-bottom:0}",""])},zMmQ:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"model-search clearfix"},[i("el-select",{attrs:{size:"small",filterable:"",clearable:"",placeholder:"城市"},on:{change:function(e){t.searchParam()}},model:{value:t.searchParams.cityId,callback:function(e){t.$set(t.searchParams,"cityId",e)},expression:"searchParams.cityId"}},t._l(t.cityList,function(t){return i("el-option",{key:t.cityId,attrs:{label:t.cityName,value:t.cityId}})})),t._v(" "),i("el-button",{staticClass:"right",attrs:{type:"primary",icon:"el-icon-rank",size:"small"},nativeOn:{click:function(e){t.sortApp(e)}}},[t._v("APP展示排序")]),t._v(" "),i("el-button",{staticClass:"right",staticStyle:{"margin-right":"10px"},attrs:{type:"primary",icon:"el-icon-plus",size:"small"},nativeOn:{click:function(e){t.handleDetail()}}},[t._v("新增")])],1),t._v(" "),i("GridUnit",{ref:"refGridUnit",attrs:{columns:t.colModels,showPagination:!1,formOptions:t.searchParams,url:t.url,listField:"data",dataMethod:t.method,height:t.tableHeight},scopedSlots:t._u([{key:"handle",fn:function(e){return[i("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"small"},on:{click:function(i){t.handleDetail(e.row)}}},[t._v("\n        编辑\n      ")]),t._v(" "),i("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"small"},on:{click:function(i){t.handleDelete(e.row)}}},[t._v("\n        删除\n      ")])]}}])}),t._v(" "),i("div",{staticClass:"dialog-info"},[i("el-dialog",{attrs:{title:t.temp.iconId?"编辑icon":"新增icon",visible:t.layer_showInfo},on:{"update:visible":function(e){t.layer_showInfo=e},close:t.dialogClose}},[i("el-form",{ref:"dataForm",attrs:{size:"small","status-icon":"",rules:t.rules,model:t.temp,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"标题",prop:"title"}},[i("el-input",{attrs:{placeholder:"请输入标题",maxlength:20},model:{value:t.temp.title,callback:function(e){t.$set(t.temp,"title",e)},expression:"temp.title"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"图片",prop:"picList"}},[i("el-upload",{attrs:{action:t.actionBaseUrl+"/util/upload/uploadPicture","before-upload":t.pictureUpload,"on-preview":t.picturePreview,"on-remove":function(e,i){return t.pictureRemove(e,i)},"on-success":function(e,i,a){return t.pictureSuccess(e,i,a)},"on-change":t.resetFile,"on-error":t.pictureError,"file-list":t.temp.picList||[],accept:"image/jpg,image/jpeg,image/png","list-type":"picture"}},[i("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-upload"}},[t._v("上传图片")]),t._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("请上传480 * 240的jpg/png图片，且不超过500kb")])],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"跳转语义",prop:"configId"}},[i("el-select",{attrs:{size:"small",clearable:"",filterable:"",placeholder:"请选择"},model:{value:t.temp.configId,callback:function(e){t.$set(t.temp,"configId",e)},expression:"temp.configId"}},t._l(t.configList,function(e){return i("el-option",{key:e.configId,attrs:{label:e.description,value:e.configId}},[i("span",{staticStyle:{float:"left"}},[t._v(t._s(e.description))]),t._v(" "),i("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px"}},[t._v(t._s(e.code))])])}))],1),t._v(" "),i("el-form-item",{attrs:{label:"投放城市"}},[i("el-select",{attrs:{size:"small",clearable:"",filterable:"",placeholder:"全部城市"},model:{value:t.temp.cityId,callback:function(e){t.$set(t.temp,"cityId",e)},expression:"temp.cityId"}},t._l(t.cityList,function(t){return i("el-option",{key:t.cityId,attrs:{label:t.cityName,value:t.cityId}})}))],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(e){t.layer_showInfo=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.saveData}},[t._v("确 定")])],1)],1)],1),t._v(" "),i("div",{staticClass:"dialog-sort"},[i("el-dialog",{attrs:{title:"APP展示排序",visible:t.layer_appsort,width:"800px"},on:{"update:visible":function(e){t.layer_appsort=e}}},[i("draggable",{staticClass:"list-group",attrs:{element:"ul",options:t.dragOptions},on:{start:function(e){t.isDragging=!0},end:function(e){t.isDragging=!1}},model:{value:t.sort_tableData,callback:function(e){t.sort_tableData=e},expression:"sort_tableData"}},[i("transition-group",{attrs:{type:"transition",name:"flip-list"}},t._l(t.sort_tableData,function(e,a){return i("li",{key:a,staticClass:"list-group-item clearfix"},[i("span",{staticClass:"left sortContent"},[i("i",{staticClass:"el-icon-d-caret",attrs:{"aria-hidden":"true"}}),t._v("\n              "+t._s(e.title)+"\n            ")])])}))],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(e){t.layer_appsort=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){t.saveSort()}}},[t._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]}}});