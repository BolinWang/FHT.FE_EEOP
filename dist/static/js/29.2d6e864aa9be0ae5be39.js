webpackJsonp([29],{"4Emy":function(e,t,o){(e.exports=o("BkJT")(!1)).push([e.i,".upload-pics-model .previewItems[data-v-7ef046b2]{margin-bottom:10px}.upload-pics-model .previewItems .el-upload--picture-card.uploadImage[data-v-7ef046b2]{width:122px;height:92px;line-height:98px}.upload-pics-model .upload-pics-info[data-v-7ef046b2]{margin:0 0 5px}",""])},C5t1:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=o("lC5x"),a=o.n(l),r=o("hRKE"),i=o.n(r),s=o("rVsN"),n=o.n(s),m=o("J0Oq"),c=o.n(m),p=o("IHPB"),u=o.n(p),d=o("3cXf"),f=o.n(d),g=o("ZLEe"),b=o.n(g),v=o("0xDb"),D=o("H1GV"),h=o.n(D),M=o("fDDG"),y=o.n(M);t.default={name:"roomDetailModel",components:{Preview:h.a,ImageCropper:y.a},props:["type","modelVisible","estateInfo"],data:function(){return{roomDetailModel:{},tempFormData:{},roomDetailModelRules:{estateName:[{required:!0,message:"请输入公寓名称",trigger:"change"}],floorId:[{required:!0,message:"请选择楼层",trigger:"change"}],roomCode:[{required:!0,message:"请输入房号",trigger:"change"}],startNo:[{required:!0,message:"请输入起始房号(数字类型)",trigger:"change"}],roomTypeId:[{required:!0,message:"请选择房间类型",trigger:"change"}],chamberCount:[{required:!0,message:"请输入值",trigger:"change"}],toiletCount:[{required:!0,message:"请输入值",trigger:"change"}],boardCount:[{required:!0,message:"请输入值",trigger:"change"}],roomArea:[{required:!0,message:"请输入房间面积",trigger:"change"}],decorationDegree:[{required:!0,message:"请选择装修程度",trigger:"change"}],roomDirection:[{required:!0,message:"请选择房间朝向",trigger:"change"}],maxPerson:[{required:!0,message:"请输入房间最多入住人数",trigger:"change"}],bedCount:[{required:!0,message:"请输入房间床数",trigger:"change"}]},decorationDegreeList:[{label:"毛坯",value:1},{label:"简装",value:2},{label:"精装修",value:3},{label:"豪华装",value:4}],roomDirectionList:[{label:"朝南",value:1},{label:"朝北",value:2},{label:"朝东",value:3},{label:"朝西",value:4},{label:"东南",value:5},{label:"西南",value:6},{label:"东北",value:7},{label:"西北",value:8}],uploadPicsModelVisible:!1,cropperList:[],accept:"image/png, image/jpeg, image/jpg"}},methods:{openPicListModel:function(){this.uploadPicsModelVisible=!0},checkEditFlag:function(){var e=this,t=!1;return b()(this.tempFormData).forEach(function(o){if(f()(e.tempFormData[o])!=f()(e.roomDetailModel[o])){"pictureList"===o?(l=e.tempFormData[o],a=e.roomDetailModel[o],r=0,t=l.length!==a.length?++r:(l.forEach(function(e,t){e.imageName!==a[t].imageName&&r++}),r>0)):t=!0}var l,a,r}),t},emitDelete:function(e){this.roomDetailModel.pictureList=e},emitCropperList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];this.cropperList=e},emitCropperData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];e.forEach(function(e,t){e.type=1,e.imageName=e.title,e.image=e.src,e.key=e.key||Math.random().toFixed(5)});var t=[].concat(u()(this.roomDetailModel.pictureList),u()(e));this.$set(this.roomDetailModel,"pictureList",t)},uploadImg:function(e){var t=this;return c()(a.a.mark(function o(){var l,r,s,m,c;return a.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(e.target.value){o.next=3;break}return console.log("取消上传..."),o.abrupt("return",!1);case 3:if(l=[],r=function(e){return new n.a(function(t){var o=new FileReader;o.onerror=function(e){console.log("读取异常....")},o.onload=function(o){var l="object"===i()(o.target.result)?window.URL.createObjectURL(new Blob([o.target.result])):o.target.result,a="";a=e.name?e.name.split(".")[0].length<=30?e.name.split(".")[0]:e.name.split(".")[0].substr(0,30):"",t({img:l,imageName:a,type:1})},o.readAsArrayBuffer(e)})},s=e.target.files,!((m=t.roomDetailModel.pictureList).length+s.length>15)){o.next=11;break}return t.$message.error("您已上传"+m.length+"张图片，最多还能上传"+(15-m.length)+"张图片"),e.target.value=null,o.abrupt("return",!1);case 11:c=0;case 12:if(!(c<s.length)){o.next=25;break}if(t.accept.includes(s[c].type)){o.next=17;break}return t.$message.error("请上传"+t.accept.replace(/image\//gi,"")+"的图片"),e.target.value=null,o.abrupt("return",!1);case 17:return o.t0=l,o.next=20,r(s[c]);case 20:o.t1=o.sent,o.t0.push.call(o.t0,o.t1);case 22:c++,o.next=12;break;case 25:t.cropperList=l.map(function(e,t){return{img:e.img,imageName:e.imageName,type:e.type}}),e.target.value=null;case 27:case"end":return o.stop()}},o,t)}))()},saveRoomData:function(){var e=this,t=!1;return this.$refs.roomDetailModel.validate(function(o){o&&(t=Object(v.d)(e.roomDetailModel),2===e.type&&(t.uploadPictureList=t.pictureList.filter(function(e){return e.isBase64}),t.pictureList=t.pictureList.filter(function(e){return!e.isBase64})),t.skipNo=t.skipNo?t.skipNo.join(","):[],t.tag=t.tag?1:0)}),t}},watch:{modelVisible:{immediate:!0,handler:function(e){var t=this;if(e){1===this.type&&this.$set(this.roomDetailModel,"estateName",this.estateInfo.estateName);var o=Object(v.d)(this.$store.state.estateDetailData.estateRoomInfo);o.tag=1===o.tag,2===this.type&&o.pictureList.forEach(function(e){e.src=e.imageUrl,e.title=e.imageName,e.key=Math.random().toFixed(5)}),2===this.type&&this.$set(this,"roomDetailModel",o),this.$nextTick(function(){t.$refs.roomDetailModel.clearValidate(),t.$set(t,"tempFormData",Object(v.d)(t.roomDetailModel))})}else b()(this.roomDetailModel).forEach(function(e){t.roomDetailModel[e]="[object Array]"===Object.prototype.toString.call(t.roomDetailModel[e])?[]:""})}}}}},Ee8N:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"room-detail-container estate-room-detail"},[o("el-form",{ref:"roomDetailModel",attrs:{model:e.roomDetailModel,rules:e.roomDetailModelRules,"label-width":"110px",size:"small"}},[1===e.type?[o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"公寓",prop:"estateName"}},[o("el-input",{attrs:{disabled:""},model:{value:e.estateInfo.estateName,callback:function(t){e.$set(e.estateInfo,"estateName",t)},expression:"estateInfo.estateName"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"楼层",prop:"floorId"}},[o("el-select",{staticClass:"room-detail-select",attrs:{placeholder:"请选择"},model:{value:e.roomDetailModel.floorId,callback:function(t){e.$set(e.roomDetailModel,"floorId",t)},expression:"roomDetailModel.floorId"}},e._l(e.estateInfo.floors,function(e){return o("el-option",{key:e.floorId,attrs:{label:e.floorName,value:e.floorId}})}))],1)],1)],1),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"起始房号",prop:"startNo"}},[o("el-input",{attrs:{type:"number",min:"0",placeholder:"例: 101"},model:{value:e.roomDetailModel.startNo,callback:function(t){e.$set(e.roomDetailModel,"startNo",t)},expression:"roomDetailModel.startNo"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"末尾房号",prop:""}},[o("el-input",{attrs:{type:"number",min:"0",placeholder:"例: 120"},model:{value:e.roomDetailModel.endNo,callback:function(t){e.$set(e.roomDetailModel,"endNo",t)},expression:"roomDetailModel.endNo"}})],1)],1)],1),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"跳过尾号",prop:""}},[o("el-select",{staticClass:"room-detail-select",attrs:{multiple:"",placeholder:"请选择"},model:{value:e.roomDetailModel.skipNo,callback:function(t){e.$set(e.roomDetailModel,"skipNo",t)},expression:"roomDetailModel.skipNo"}},e._l(10,function(e,t){return o("el-option",{key:t,attrs:{label:t,value:t}})}))],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"房间类型",prop:"roomTypeId"}},[o("el-select",{staticClass:"room-detail-select",attrs:{placeholder:"请选择"},model:{value:e.roomDetailModel.roomTypeId,callback:function(t){e.$set(e.roomDetailModel,"roomTypeId",t)},expression:"roomDetailModel.roomTypeId"}},e._l(e.estateInfo.roomTypeList,function(e){return o("el-option",{key:e.id,attrs:{label:e.styleName,value:e.id}})}))],1)],1)],1)]:[o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"楼层",prop:"floorId"}},[o("el-select",{staticClass:"room-detail-select",attrs:{placeholder:"请选择"},model:{value:e.roomDetailModel.floorId,callback:function(t){e.$set(e.roomDetailModel,"floorId",t)},expression:"roomDetailModel.floorId"}},e._l(e.estateInfo.floors,function(e){return o("el-option",{key:e.floorId,attrs:{label:e.floorName,value:e.floorId}})}))],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"房号",prop:"roomNo"}},[o("el-input",{attrs:{type:"number"},model:{value:e.roomDetailModel.roomNo,callback:function(t){e.$set(e.roomDetailModel,"roomNo",t)},expression:"roomDetailModel.roomNo"}})],1)],1)],1),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"房间类型",prop:"roomTypeId"}},[o("el-select",{staticClass:"room-detail-select",attrs:{placeholder:"请选择"},model:{value:e.roomDetailModel.roomTypeId,callback:function(t){e.$set(e.roomDetailModel,"roomTypeId",t)},expression:"roomDetailModel.roomTypeId"}},e._l(e.estateInfo.roomTypeList,function(e){return o("el-option",{key:e.id,attrs:{label:e.styleName,value:e.id}})}))],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"房间照片",prop:""}},[o("el-badge",{attrs:{value:e.roomDetailModel.pictureList?e.roomDetailModel.pictureList.length:0}},[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.openPicListModel}},[e._v("上传照片")])],1)],1)],1)],1)],e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{staticClass:"room-count",attrs:{label:"室厅卫",prop:"chamberCount","show-message":!1}},[o("el-row",{attrs:{gutter:10}},[o("el-col",{attrs:{span:6}},[o("el-form-item",{staticClass:"room-item-count",attrs:{label:"",prop:"chamberCount"}},[o("el-input",{attrs:{type:"number"},model:{value:e.roomDetailModel.chamberCount,callback:function(t){e.$set(e.roomDetailModel,"chamberCount",t)},expression:"roomDetailModel.chamberCount"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:2}},[e._v("\n              室\n            ")]),e._v(" "),o("el-col",{attrs:{span:6}},[o("el-form-item",{staticClass:"room-item-count",attrs:{label:"",prop:"boardCount"}},[o("el-input",{attrs:{type:"number"},model:{value:e.roomDetailModel.boardCount,callback:function(t){e.$set(e.roomDetailModel,"boardCount",t)},expression:"roomDetailModel.boardCount"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:2}},[e._v("\n              厅\n            ")]),e._v(" "),o("el-col",{attrs:{span:6}},[o("el-form-item",{staticClass:"room-item-count",attrs:{label:"",prop:"toiletCount"}},[o("el-input",{attrs:{type:"number"},model:{value:e.roomDetailModel.toiletCount,callback:function(t){e.$set(e.roomDetailModel,"toiletCount",t)},expression:"roomDetailModel.toiletCount"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:2}},[e._v("\n              卫\n            ")])],1)],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"面积",prop:"roomArea"}},[o("el-input",{attrs:{type:"number",placeholder:"请输入内容"},model:{value:e.roomDetailModel.roomArea,callback:function(t){e.$set(e.roomDetailModel,"roomArea",t)},expression:"roomDetailModel.roomArea"}},[o("template",{attrs:{slot:"append"},slot:"append"},[e._v("m\n              "),o("sup",[e._v("2")])])],2)],1)],1)],1),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"装修程度",prop:"decorationDegree"}},[o("el-select",{staticClass:"room-detail-select",attrs:{placeholder:"请选择"},model:{value:e.roomDetailModel.decorationDegree,callback:function(t){e.$set(e.roomDetailModel,"decorationDegree",t)},expression:"roomDetailModel.decorationDegree"}},e._l(e.decorationDegreeList,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"朝向",prop:"roomDirection"}},[o("el-select",{staticClass:"room-detail-select",attrs:{placeholder:"请选择"},model:{value:e.roomDetailModel.roomDirection,callback:function(t){e.$set(e.roomDetailModel,"roomDirection",t)},expression:"roomDetailModel.roomDirection"}},e._l(e.roomDirectionList,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最多入住人数",prop:"maxPerson"}},[o("el-input",{attrs:{type:"number"},model:{value:e.roomDetailModel.maxPerson,callback:function(t){e.$set(e.roomDetailModel,"maxPerson",t)},expression:"roomDetailModel.maxPerson"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"床数",prop:"bedCount"}},[o("el-input",{attrs:{type:"number"},model:{value:e.roomDetailModel.bedCount,callback:function(t){e.$set(e.roomDetailModel,"bedCount",t)},expression:"roomDetailModel.bedCount"}})],1)],1)],1),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:24}},[o("el-form-item",{attrs:{label:"飞虎队"}},[o("el-checkbox",{model:{value:e.roomDetailModel.tag,callback:function(t){e.$set(e.roomDetailModel,"tag",t)},expression:"roomDetailModel.tag"}})],1)],1)],1)],2),e._v(" "),o("el-dialog",{attrs:{title:"上传照片",visible:e.uploadPicsModelVisible,width:"600px","append-to-body":!0,"custom-class":"upload-pics-model"},on:{"update:visible":function(t){e.uploadPicsModelVisible=t}}},[o("div",{staticClass:"previewItems"},[o("preview",{attrs:{"pic-list":e.roomDetailModel.pictureList,"delete-icon":"delete",disabled:""},on:{emitDelete:e.emitDelete}}),e._v(" "),o("label",{staticClass:"el-upload el-upload--picture-card uploadImage",attrs:{for:"uploadImages"}},[o("i",{staticClass:"el-icon-plus"}),e._v(" "),o("input",{attrs:{type:"file",id:"uploadImages",accept:e.accept,multiple:""},on:{change:function(t){e.uploadImg(t)}}})])],1),e._v(" "),o("p",{staticClass:"upload-pics-info"},[e._v("温馨提示： ")]),e._v(" "),o("p",{staticClass:"upload-pics-info"},[e._v("1.请勿上传虚假、模糊、与房源信息无关、含有其他公司水印的照片； ")]),e._v(" "),o("p",{staticClass:"upload-pics-info"},[e._v("2.房间照片最佳组合：卧室2~6张、公共区域1~4张、厨房1~3张、卫生间1-4张； ")]),e._v(" "),o("p",{staticClass:"upload-pics-info"},[e._v("3.目前最多支持15张，支持JPG/JPEG/PNG，可以拖动图片进行排序，支持批量上传。")]),e._v(" "),o("ImageCropper",{attrs:{cropperList:e.cropperList},on:{emitCropperList:e.emitCropperList,emitCropperData:e.emitCropperData}}),e._v(" "),o("span",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){e.uploadPicsModelVisible=!1}}},[e._v("关 闭")])],1)],1)],1)},staticRenderFns:[]}},g6eu:function(e,t,o){var l=o("Alxp")(o("C5t1"),o("Ee8N"),function(e){o("r71q")},"data-v-7ef046b2",null);e.exports=l.exports},r71q:function(e,t,o){var l=o("4Emy");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);o("8bSs")("59cc025c",l,!0)}});