webpackJsonp([5,24],{"+T7Q":function(e,t,o){var a=o("o/o5");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);o("8bSs")("6ec7b512",a,!0)},"8Y6n":function(e,t,o){var a=o("Alxp")(o("hYRi"),o("95c3"),function(e){o("j/ji")},"data-v-18fb04d4",null);e.exports=a.exports},"95c3":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"app-container"},[o("el-row",{staticClass:"room-options-row"},[o("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-arrow-left"},on:{click:function(t){e.$router.push({name:"集中式房源"})}}},[e._v("返回")]),e._v(" "),o("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.openRoomDetailModel(1)}}},[e._v("新建房号")]),e._v(" "),o("el-button",{attrs:{type:"danger",size:"small"}},[e._v("删除房号")]),e._v(" "),o("span",{staticClass:"estate-title"},[e._v(e._s(e.estateInfo.estateName))]),e._v(" "),o("span",{staticClass:"estate-address"},[e._v(e._s(e.estateInfo.subdistrictName+" - "+e.estateInfo.subdistrictAddress))])],1),e._v(" "),o("el-form",{ref:"form",staticClass:"room-search-form",attrs:{inline:!0,model:e.roomSearchForm,size:"small"}},[o("el-form-item",{staticClass:"room-search-form-group"},[o("el-select",{attrs:{placeholder:"楼层"},model:{value:e.roomSearchForm.floor,callback:function(t){e.$set(e.roomSearchForm,"floor",t)},expression:"roomSearchForm.floor"}},e._l(e.estateInfo.floors,function(e){return o("el-option",{key:e.floorId,attrs:{label:e.floorName,value:e.floorId}})}))],1),e._v(" "),o("el-form-item",{staticClass:"room-search-form-group"},[o("el-select",{attrs:{placeholder:"房间状态"},model:{value:e.roomSearchForm.roomStatus,callback:function(t){e.$set(e.roomSearchForm,"roomStatus",t)},expression:"roomSearchForm.roomStatus"}},[o("el-option",{attrs:{label:"已出租",value:"1"}}),e._v(" "),o("el-option",{attrs:{label:"未出租",value:"2"}})],1)],1),e._v(" "),o("el-form-item",{staticClass:"room-search-form-group"},[o("el-input",{attrs:{placeholder:"房源编码"},model:{value:e.roomSearchForm.roomCode,callback:function(t){e.$set(e.roomSearchForm,"roomCode",t)},expression:"roomSearchForm.roomCode"}})],1),e._v(" "),o("el-form-item",{staticClass:"room-search-form-group"},[o("el-input",{attrs:{placeholder:"房号"},model:{value:e.roomSearchForm.roomNo,callback:function(t){e.$set(e.roomSearchForm,"roomNo",t)},expression:"roomSearchForm.roomNo"}})],1),e._v(" "),o("el-form-item",{staticClass:"room-search-form-group"},[o("el-button",{attrs:{type:"primary"},on:{click:function(t){e.searchEstateRoomList("search")}}},[e._v("查询")]),e._v(" "),o("el-button",{on:{click:function(t){e.searchEstateRoomList("clear")}}},[e._v("清空")])],1)],1),e._v(" "),o("grid-unit",{ref:"estateRoomList",attrs:{url:e.estateRoomListUrl,listField:"data.result",totalField:"data.records",dataMethod:e.reqMethod,formOptions:e.roomSearchForm,showSelection:!0,columns:e.colModels,height:e.tableHeight},scopedSlots:e._u([{key:"setTag",fn:function(t){return[1===t.row.tag?o("el-tag",[e._v("飞虎队")]):e._e()]}},{key:"settingRoom",fn:function(t){return[o("el-button",{attrs:{size:"mini"},on:{click:function(o){e.openRentPayModel(t.row)}}},[e._v("交租方式")]),e._v(" "),o("el-button",{attrs:{size:"mini"},on:{click:function(o){e.openCopyItemToModel(t.row)}}},[e._v("复制到")])]}},{key:"operateRoom",fn:function(t){return[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(o){e.openRoomDetailModel(2,t.row)}}},[e._v("编辑房间")])]}}])}),e._v(" "),o("el-dialog",{staticClass:"copy-item-to-model",attrs:{title:"复制到",visible:e.copyItemToModelVisible,width:"700px"},on:{"update:visible":function(t){e.copyItemToModelVisible=t}}},[o("room-list-selecter",{ref:"copyItemTo",attrs:{roomList:e.copyItemRoomList,visible:e.copyItemToModelVisible}},[o("el-card",{staticClass:"head-card"},[o("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top-start"}},[o("div",{attrs:{slot:"content"},slot:"content"},[e._v("选择复制您要的内容，再选择您要编辑的房间，"),o("br"),e._v("这样可以方便您快速批量编辑同类房源")]),e._v(" "),o("span",{staticClass:"head-card-title"},[e._v("复制项目\n              "),o("i",{staticClass:"el-icon-warning"})])]),e._v(" "),o("div",{staticClass:"check-all"},[o("el-form",{attrs:{inline:!0,size:"mini"}},[o("el-form-item",{attrs:{label:e.checkAllCopyItem?"取消全选":"全选"}},[o("el-switch",{on:{change:e.handleCheckAllChange},model:{value:e.checkAllCopyItem,callback:function(t){e.checkAllCopyItem=t},expression:"checkAllCopyItem"}})],1)],1)],1)],1),e._v(" "),o("el-checkbox-group",{model:{value:e.checkedCopyList,callback:function(t){e.checkedCopyList=t},expression:"checkedCopyList"}},e._l(e.copyOptions,function(t){return o("el-checkbox",{key:t.val,staticClass:"head-check-options",attrs:{label:t.val},on:{change:e.handleOptionsChange}},[e._v("\n            "+e._s(t.label)+"\n          ")])}))],1),e._v(" "),o("span",{attrs:{slot:"card-title"},slot:"card-title"},[e._v("请选择要复制到的房间号")])],1),e._v(" "),o("span",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.saveCopyItemTo}},[e._v("确 定")]),e._v(" "),o("el-button",{attrs:{size:"small"},on:{click:function(t){e.copyItemToModelVisible=!1}}},[e._v("取 消")])],1)],1),e._v(" "),o("el-dialog",{staticClass:"rent-pay-model",attrs:{title:"交租方式",visible:e.rentPayModelVisible,width:"1000px"},on:{"update:visible":function(t){e.rentPayModelVisible=t}}},[o("el-table",{staticClass:"finance-rent-pay-way",staticStyle:{width:"100%"},attrs:{data:e.financeRentPayList}},[o("el-table-column",{attrs:{label:"金融·交租方式",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.name)+"\n        ")]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"房价/月"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-input",{staticClass:"rent-price-input",attrs:{size:"mini"},model:{value:t.row.rentPrice,callback:function(o){e.$set(t.row,"rentPrice",o)},expression:"scope.row.rentPrice"}},[o("template",{attrs:{slot:"append"},slot:"append"},[e._v("元")])],2)]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"押金"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-input",{staticClass:"rent-price-input",attrs:{size:"mini"},model:{value:t.row.depositPrice,callback:function(o){e.$set(t.row,"depositPrice",o)},expression:"scope.row.depositPrice"}},[o("template",{attrs:{slot:"append"},slot:"append"},[e._v("元")])],2)]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"最短租期",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{size:"mini",disabled:""},model:{value:t.row.minMonthNum,callback:function(o){e.$set(t.row,"minMonthNum",o)},expression:"scope.row.minMonthNum"}},e._l(24,function(e){return o("el-option",{key:e,attrs:{label:e+"个月",value:e}})}))]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"最长租期",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{size:"mini",disabled:""},model:{value:t.row.maxMonthNum,callback:function(o){e.$set(t.row,"maxMonthNum",o)},expression:"scope.row.maxMonthNum"}},e._l(24,function(e){return o("el-option",{key:e,attrs:{label:e+"个月",value:e}})}))]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"服务费·元/月",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{size:"mini",disabled:""},on:{change:function(o){e.switchServiceChargeType(t.row)}},model:{value:t.row.serviceChargeType,callback:function(o){e.$set(t.row,"serviceChargeType",o)},expression:"scope.row.serviceChargeType"}},e._l(e.serviceChargeTypeList,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-row",[2===t.row.serviceChargeType?o("el-col",{attrs:{span:24}},[o("el-input",{attrs:{size:"mini",disabled:""},model:{value:t.row.serviceChargePrice,callback:function(o){e.$set(t.row,"serviceChargePrice",o)},expression:"scope.row.serviceChargePrice"}})],1):3===t.row.serviceChargeType?[o("el-col",{attrs:{span:10}},[o("el-input",{attrs:{size:"mini",disabled:""},model:{value:t.row.serviceChargeRatio,callback:function(o){e.$set(t.row,"serviceChargeRatio",o)},expression:"scope.row.serviceChargeRatio"}})],1),e._v(" "),o("el-col",{staticClass:"service-charge-price-percent",attrs:{span:4}},[e._v("\n                %\n              ")]),e._v(" "),o("el-col",{attrs:{span:10}},[o("el-input",{attrs:{size:"mini",disabled:""},model:{value:t.row.serviceChargePrice,callback:function(o){e.$set(t.row,"serviceChargePrice",o)},expression:"scope.row.serviceChargePrice"}})],1)]:e._e()],2)]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"服务费支付方式",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{size:"mini",disabled:""},model:{value:t.row.serviceFeeType,callback:function(o){e.$set(t.row,"serviceFeeType",o)},expression:"scope.row.serviceFeeType"}},[1===t.row.serviceChargeType?o("el-option",{attrs:{label:"无",value:1}}):e._l(e.serviceFeeTypeList,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})],2)]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"delete-btn",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(o){e.deleteCurRentPay(t.row)}}})]}}])})],1),e._v(" "),o("el-table",{staticClass:"default-rent-pay-way",staticStyle:{width:"100%"},attrs:{data:e.defaultRentPayList}},[o("el-table-column",{attrs:{label:"常规·交租方式",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.roomRentTypeId?o("span",[e._v("\n            "+e._s(t.row.name)+"\n          ")]):o("el-select",{attrs:{size:"mini"},on:{change:function(o){e.switchRentType(t.row)}},model:{value:t.row.rentQty,callback:function(o){e.$set(t.row,"rentQty",o)},expression:"scope.row.rentQty"}},e._l(e.baseRentTypeList,function(e){return o("el-option",{key:e.rentQty,attrs:{label:e.name,value:e.rentQty}})}))]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"房价/月"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-input",{staticClass:"rent-price-input",attrs:{size:"mini"},on:{change:function(o){e.computeServiceChargePrice(t.row)}},model:{value:t.row.rentPrice,callback:function(o){e.$set(t.row,"rentPrice",o)},expression:"scope.row.rentPrice"}},[o("template",{attrs:{slot:"append"},slot:"append"},[e._v("元")])],2)]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"押金"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-input",{staticClass:"rent-price-input",attrs:{size:"mini"},model:{value:t.row.depositPrice,callback:function(o){e.$set(t.row,"depositPrice",o)},expression:"scope.row.depositPrice"}},[o("template",{attrs:{slot:"append"},slot:"append"},[e._v("元")])],2)]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"最短租期",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{size:"mini"},model:{value:t.row.minMonthNum,callback:function(o){e.$set(t.row,"minMonthNum",o)},expression:"scope.row.minMonthNum"}},e._l(24,function(e){return o("el-option",{key:e,attrs:{label:e+"个月",value:e}})}))]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"最长租期",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{size:"mini"},model:{value:t.row.maxMonthNum,callback:function(o){e.$set(t.row,"maxMonthNum",o)},expression:"scope.row.maxMonthNum"}},e._l(24,function(e){return o("el-option",{key:e,attrs:{label:e+"个月",value:e}})}))]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"服务费·元/月",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{size:"mini"},on:{change:function(o){e.switchServiceChargeType(t.row)}},model:{value:t.row.serviceChargeType,callback:function(o){e.$set(t.row,"serviceChargeType",o)},expression:"scope.row.serviceChargeType"}},e._l(e.serviceChargeTypeList,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-row",[2===t.row.serviceChargeType?o("el-col",{attrs:{span:24}},[o("el-input",{attrs:{size:"mini"},model:{value:t.row.serviceChargePrice,callback:function(o){e.$set(t.row,"serviceChargePrice",o)},expression:"scope.row.serviceChargePrice"}})],1):3===t.row.serviceChargeType?[o("el-col",{attrs:{span:10}},[o("el-input",{attrs:{size:"mini"},on:{change:function(o){e.computeServiceChargePrice(t.row)}},model:{value:t.row.serviceChargeRatio,callback:function(o){e.$set(t.row,"serviceChargeRatio",o)},expression:"scope.row.serviceChargeRatio"}})],1),e._v(" "),o("el-col",{staticClass:"service-charge-price-percent",attrs:{span:4}},[e._v("\n                %\n              ")]),e._v(" "),o("el-col",{attrs:{span:10}},[o("el-input",{attrs:{size:"mini",disabled:""},model:{value:t.row.serviceChargePrice,callback:function(o){e.$set(t.row,"serviceChargePrice",o)},expression:"scope.row.serviceChargePrice"}})],1)]:e._e()],2)]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"服务费支付方式",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{size:"mini"},model:{value:t.row.serviceFeeType,callback:function(o){e.$set(t.row,"serviceFeeType",o)},expression:"scope.row.serviceFeeType"}},[1===t.row.serviceChargeType?o("el-option",{attrs:{label:"无",value:1}}):e._l(e.serviceFeeTypeList,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})],2)]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{staticClass:"delete-btn",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(o){e.deleteCurRentPay(t.row)}}})]}}])})],1),e._v(" "),o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.addRentPay}},[e._v("添加交租方式")]),e._v(" "),o("span",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.saveRentPay}},[e._v("保 存")]),e._v(" "),o("el-button",{attrs:{size:"small"},on:{click:function(t){e.rentPayModelVisible=!1}}},[e._v("取 消")])],1)],1),e._v(" "),o("el-dialog",{staticClass:"room-detail-model",attrs:{title:1===e.curType?"新建房号":"编辑房号",visible:e.roomDetailModelVisible,width:"800px"},on:{"update:visible":function(t){e.roomDetailModelVisible=t}}},[o("room-detail",{ref:"roomDetailModel",attrs:{type:e.curType,modelVisible:e.roomDetailModelVisible,estateInfo:e.estateInfo}}),e._v(" "),o("span",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.saveRoomData}},[e._v(e._s(1===e.curType?"确 定":"保 存"))]),e._v(" "),o("el-button",{attrs:{size:"small"},on:{click:function(t){e.roomDetailModelVisible=!1}}},[e._v("取 消")])],1)],1)],1)},staticRenderFns:[]}},C5t1:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o("ZLEe"),l=o.n(a),r=o("lC5x"),i=o.n(r),s=o("hRKE"),n=o.n(s),c=o("rVsN"),p=o.n(c),m=o("J0Oq"),u=o.n(m),d=o("IHPB"),f=o.n(d),v=o("0xDb"),h=o("H1GV"),b=o.n(h),g=o("fDDG"),y=o.n(g);t.default={name:"roomDetailModel",components:{Preview:b.a,ImageCropper:y.a},props:["type","modelVisible","estateInfo"],data:function(){return{roomDetailModel:{},roomDetailModelRules:{estateName:[{required:!0,message:"请输入公寓名称",trigger:"change"}],floorId:[{required:!0,message:"请选择楼层",trigger:"change"}],roomCode:[{required:!0,message:"请输入房号",trigger:"change"}],startNo:[{required:!0,message:"请输入起始房号",trigger:"change"}],roomTypeId:[{required:!0,message:"请选择房间类型",trigger:"change"}],chamberCount:[{required:!0,message:"请输入值",trigger:"change"}],toiletCount:[{required:!0,message:"请输入值",trigger:"change"}],boardCount:[{required:!0,message:"请输入值",trigger:"change"}],roomArea:[{required:!0,message:"请输入房间面积",trigger:"change"}],decorationDegree:[{required:!0,message:"请选择装修程度",trigger:"change"}],roomDirection:[{required:!0,message:"请选择房间朝向",trigger:"change"}],maxPerson:[{required:!0,message:"请输入房间最多入住人数",trigger:"change"}],bedCount:[{required:!0,message:"请输入房间床数",trigger:"change"}]},decorationDegreeList:[{label:"毛坯",value:1},{label:"简装",value:2},{label:"精装修",value:3},{label:"豪华装",value:4}],roomDirectionList:[{label:"朝南",value:1},{label:"朝北",value:2},{label:"朝东",value:3},{label:"朝西",value:4},{label:"东南",value:5},{label:"西南",value:6},{label:"东北",value:7},{label:"西北",value:8}],uploadPicsModelVisible:!1,cropperList:[],accept:"image/png, image/jpeg, image/jpg"}},methods:{openPicListModel:function(){this.uploadPicsModelVisible=!0},emitDelete:function(e){this.roomDetailModel.pictureList=e},emitCropperList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];this.cropperList=e},emitCropperData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];e.forEach(function(e,t){e.type=1});var t=[].concat(f()(this.roomDetailModel.pictureList),f()(e));this.$set(this.roomDetailModel,"pictureList",t)},uploadImg:function(e){var t=this;return u()(i.a.mark(function o(){var a,l,r,s;return i.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(e.target.value){o.next=3;break}return console.log("取消上传..."),o.abrupt("return",!1);case 3:a=[],l=function(e){return new p.a(function(t){var o=new FileReader;o.onerror=function(e){console.log("读取异常....")},o.onload=function(o){var a="object"===n()(o.target.result)?window.URL.createObjectURL(new Blob([o.target.result])):o.target.result,l="";l=e.name?e.name.split(".")[0].length<=30?e.name.split(".")[0]:e.name.split(".")[0].substr(0,30):"",t({img:a,imageName:l,type:1})},o.readAsArrayBuffer(e)})},r=e.target.files,s=0;case 7:if(!(s<r.length)){o.next=20;break}if(t.accept.includes(r[s].type)){o.next=12;break}return t.$message.error("请上传"+t.accept.replace(/image\//gi,"")+"的图片"),e.target.value=null,o.abrupt("return",!1);case 12:return o.t0=a,o.next=15,l(r[s]);case 15:o.t1=o.sent,o.t0.push.call(o.t0,o.t1);case 17:s++,o.next=7;break;case 20:t.cropperList=a.map(function(e,t){return{img:e.img,imageName:e.imageName,type:e.type}}),e.target.value=null;case 22:case"end":return o.stop()}},o,t)}))()},saveRoomData:function(){var e=this,t=!1;return this.$refs.roomDetailModel.validate(function(o){o&&((t=Object(v.d)(e.roomDetailModel)).uploadPictureList=t.pictureList.filter(function(e){return e.isBase64}),t.pictureList=t.pictureList.filter(function(e){return!e.isBase64}))}),t}},watch:{modelVisible:{immediate:!0,handler:function(e){var t=this;e?(1===this.type&&this.$set(this.roomDetailModel,"estateName",this.estateInfo.estateName),2===this.type&&this.$set(this,"roomDetailModel",Object(v.d)(this.$store.state.estateDetailData.estateRoomInfo)),this.$nextTick(function(){t.$refs.roomDetailModel.clearValidate()})):l()(this.roomDetailModel).forEach(function(e){t.roomDetailModel[e]="[object Array]"===Object.prototype.toString.call(t.roomDetailModel[e])?[]:""})}}}}},CaX9:function(e,t,o){(e.exports=o("BkJT")(!1)).push([e.i,".room-options-row[data-v-18fb04d4]{margin-bottom:20px}.room-options-row .estate-title[data-v-18fb04d4]{display:inline-block;vertical-align:middle;margin-left:50px;font-size:24px;line-height:1}.room-options-row .estate-address[data-v-18fb04d4]{display:inline-block;vertical-align:middle;max-width:500px;overflow:hidden;font-size:14px;line-height:1;margin-left:20px}.room-search-form .room-search-form-group[data-v-18fb04d4]{margin-bottom:10px}.room-search-form .room-search-form-group.right[data-v-18fb04d4]{margin-right:0}.copy-item-to-model .head-card[data-v-18fb04d4]{-webkit-box-shadow:0 0;box-shadow:0 0;margin-bottom:20px}.copy-item-to-model .head-card .head-card-title i[data-v-18fb04d4]{margin-left:5px;color:#409eff}.copy-item-to-model .head-card .check-all[data-v-18fb04d4]{float:right;position:relative}.copy-item-to-model .head-card .check-all .el-form-item[data-v-18fb04d4]{margin-bottom:0}.copy-item-to-model .head-card .head-check-options[data-v-18fb04d4]{width:20%;margin-left:0}.finance-rent-pay-way[data-v-18fb04d4]{margin-bottom:15px}.finance-rent-pay-way .service-charge-price-percent[data-v-18fb04d4]{line-height:28px;text-align:center}.rent-pay-model-row[data-v-18fb04d4]{margin-bottom:15px}.rent-pay-model-row .el-col:last-child .delete-btn[data-v-18fb04d4]{padding:3px 0;font-size:18px;color:red}.rent-pay-model-row .lease-term[data-v-18fb04d4]{width:100px}.default-rent-pay-way[data-v-18fb04d4]{margin-bottom:15px}.default-rent-pay-way .delete-btn[data-v-18fb04d4]{padding:3px 0;font-size:18px;color:red}.default-rent-pay-way .service-charge-price-percent[data-v-18fb04d4]{line-height:28px;text-align:center}",""])},Ee8N:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("el-form",{ref:"roomDetailModel",attrs:{model:e.roomDetailModel,rules:e.roomDetailModelRules,"label-width":"110px",size:"small"}},[1===e.type?[o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"公寓",prop:"estateName"}},[o("el-input",{attrs:{disabled:""},model:{value:e.estateInfo.estateName,callback:function(t){e.$set(e.estateInfo,"estateName",t)},expression:"estateInfo.estateName"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"楼层",prop:"floorId"}},[o("el-select",{staticClass:"room-detail-select",attrs:{placeholder:"请选择"},model:{value:e.roomDetailModel.floorId,callback:function(t){e.$set(e.roomDetailModel,"floorId",t)},expression:"roomDetailModel.floorId"}},e._l(e.estateInfo.floors,function(e){return o("el-option",{key:e.floorId,attrs:{label:e.floorName,value:e.floorId}})}))],1)],1)],1),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"起始房号",prop:"startNo"}},[o("el-input",{attrs:{placeholder:"例: 101"},model:{value:e.roomDetailModel.startNo,callback:function(t){e.$set(e.roomDetailModel,"startNo",t)},expression:"roomDetailModel.startNo"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"末尾房号",prop:""}},[o("el-input",{attrs:{placeholder:"例: 120"},model:{value:e.roomDetailModel.endNo,callback:function(t){e.$set(e.roomDetailModel,"endNo",t)},expression:"roomDetailModel.endNo"}})],1)],1)],1),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"跳过尾号",prop:""}},[o("el-select",{staticClass:"room-detail-select",attrs:{multiple:"",placeholder:"请选择"},model:{value:e.roomDetailModel.skipNo,callback:function(t){e.$set(e.roomDetailModel,"skipNo",t)},expression:"roomDetailModel.skipNo"}},e._l(10,function(e,t){return o("el-option",{key:t,attrs:{label:t,value:t}})}))],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"房间类型",prop:"roomTypeId"}},[o("el-select",{staticClass:"room-detail-select",attrs:{placeholder:"请选择"},model:{value:e.roomDetailModel.roomTypeId,callback:function(t){e.$set(e.roomDetailModel,"roomTypeId",t)},expression:"roomDetailModel.roomTypeId"}},e._l(e.estateInfo.roomTypeList,function(e){return o("el-option",{key:e.id,attrs:{label:e.styleName,value:e.id}})}))],1)],1)],1)]:[o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"楼层",prop:"floorId"}},[o("el-select",{staticClass:"room-detail-select",attrs:{placeholder:"请选择"},model:{value:e.roomDetailModel.floorId,callback:function(t){e.$set(e.roomDetailModel,"floorId",t)},expression:"roomDetailModel.floorId"}},e._l(e.estateInfo.floors,function(e){return o("el-option",{key:e.floorId,attrs:{label:e.floorName,value:e.floorId}})}))],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"房号",prop:"roomCode"}},[o("el-input",{model:{value:e.roomDetailModel.roomCode,callback:function(t){e.$set(e.roomDetailModel,"roomCode",t)},expression:"roomDetailModel.roomCode"}})],1)],1)],1),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"房间类型",prop:"roomTypeId"}},[o("el-select",{staticClass:"room-detail-select",attrs:{placeholder:"请选择"},model:{value:e.roomDetailModel.roomTypeId,callback:function(t){e.$set(e.roomDetailModel,"roomTypeId",t)},expression:"roomDetailModel.roomTypeId"}},e._l(e.estateInfo.roomTypeList,function(e){return o("el-option",{key:e.id,attrs:{label:e.styleName,value:e.id}})}))],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"房间照片",prop:""}},[o("el-badge",{attrs:{value:e.roomDetailModel.pictureList.length}},[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.openPicListModel}},[e._v("上传照片")])],1)],1)],1)],1)],e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{staticClass:"room-count",attrs:{label:"室卫厅",prop:"chamberCount"}},[o("el-row",{attrs:{gutter:10}},[o("el-col",{attrs:{span:6}},[o("el-form-item",{staticClass:"room-item-count",attrs:{label:"",prop:"chamberCount"}},[o("el-input",{model:{value:e.roomDetailModel.chamberCount,callback:function(t){e.$set(e.roomDetailModel,"chamberCount",t)},expression:"roomDetailModel.chamberCount"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:2}},[e._v("\n              室\n            ")]),e._v(" "),o("el-col",{attrs:{span:6}},[o("el-form-item",{staticClass:"room-item-count",attrs:{label:"",prop:"toiletCount"}},[o("el-input",{model:{value:e.roomDetailModel.toiletCount,callback:function(t){e.$set(e.roomDetailModel,"toiletCount",t)},expression:"roomDetailModel.toiletCount"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:2}},[e._v("\n              卫\n            ")]),e._v(" "),o("el-col",{attrs:{span:6}},[o("el-form-item",{staticClass:"room-item-count",attrs:{label:"",prop:"boardCount"}},[o("el-input",{model:{value:e.roomDetailModel.boardCount,callback:function(t){e.$set(e.roomDetailModel,"boardCount",t)},expression:"roomDetailModel.boardCount"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:2}},[e._v("\n              厅\n            ")])],1)],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"面积",prop:"roomArea"}},[o("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.roomDetailModel.roomArea,callback:function(t){e.$set(e.roomDetailModel,"roomArea",t)},expression:"roomDetailModel.roomArea"}},[o("template",{attrs:{slot:"append"},slot:"append"},[e._v("m"),o("sup",[e._v("2")])])],2)],1)],1)],1),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"装修程度",prop:"decorationDegree"}},[o("el-select",{staticClass:"room-detail-select",attrs:{placeholder:"请选择"},model:{value:e.roomDetailModel.decorationDegree,callback:function(t){e.$set(e.roomDetailModel,"decorationDegree",t)},expression:"roomDetailModel.decorationDegree"}},e._l(e.decorationDegreeList,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"朝向",prop:"roomDirection"}},[o("el-select",{staticClass:"room-detail-select",attrs:{placeholder:"请选择"},model:{value:e.roomDetailModel.roomDirection,callback:function(t){e.$set(e.roomDetailModel,"roomDirection",t)},expression:"roomDetailModel.roomDirection"}},e._l(e.roomDirectionList,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最多入住人数",prop:"maxPerson"}},[o("el-input",{model:{value:e.roomDetailModel.maxPerson,callback:function(t){e.$set(e.roomDetailModel,"maxPerson",t)},expression:"roomDetailModel.maxPerson"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"床数",prop:"bedCount"}},[o("el-input",{model:{value:e.roomDetailModel.bedCount,callback:function(t){e.$set(e.roomDetailModel,"bedCount",t)},expression:"roomDetailModel.bedCount"}})],1)],1)],1),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:24}},[o("el-form-item",{attrs:{label:"飞虎队"}},[o("el-checkbox",{model:{value:e.roomDetailModel.tag,callback:function(t){e.$set(e.roomDetailModel,"tag",t)},expression:"roomDetailModel.tag"}})],1)],1)],1)],2),e._v(" "),o("el-dialog",{attrs:{title:"上传照片",visible:e.uploadPicsModelVisible,width:"600px","append-to-body":!0,"custom-class":"upload-pics-model"},on:{"update:visible":function(t){e.uploadPicsModelVisible=t}}},[o("div",{staticClass:"previewItems"},[o("preview",{attrs:{"pic-list":e.roomDetailModel.pictureList,"delete-icon":"delete"},on:{emitDelete:e.emitDelete}}),e._v(" "),o("label",{staticClass:"el-upload el-upload--picture-card uploadImage",attrs:{for:"uploadImages"}},[o("i",{staticClass:"el-icon-plus"}),e._v(" "),o("input",{attrs:{type:"file",id:"uploadImages",accept:e.accept,multiple:""},on:{change:function(t){e.uploadImg(t)}}})])],1),e._v(" "),o("p",{staticClass:"upload-pics-info"},[e._v("温馨提示： ")]),e._v(" "),o("p",{staticClass:"upload-pics-info"},[e._v("1.请勿上传虚假、模糊、与房源信息无关、含有其他公司水印的照片； ")]),e._v(" "),o("p",{staticClass:"upload-pics-info"},[e._v("2.房间照片最佳组合：卧室2~6张、公共区域1~4张、厨房1~3张、卫生间1-4张； ")]),e._v(" "),o("p",{staticClass:"upload-pics-info"},[e._v("3.目前最多支持15张，支持JPG/JPEG/PNG，可以拖动图片进行排序，支持批量上传。")]),e._v(" "),o("ImageCropper",{attrs:{cropperList:e.cropperList},on:{emitCropperList:e.emitCropperList,emitCropperData:e.emitCropperData}}),e._v(" "),o("span",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){e.uploadPicsModelVisible=!1}}},[e._v("关 闭")])],1)],1)],1)},staticRenderFns:[]}},g6eu:function(e,t,o){var a=o("Alxp")(o("C5t1"),o("Ee8N"),function(e){o("+T7Q")},null,null);e.exports=a.exports},hYRi:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o("ZLEe"),l=o.n(a),r=o("U4Ig"),i=o.n(r),s=o("QHcW"),n=o("c5or"),c=o.n(n),p=o("g6eu"),m=o.n(p);t.default={name:"singleEstateRoom",components:{GridUnit:i.a,RoomListSelecter:c.a,RoomDetail:m.a},data:function(){return{fangyuanCode:"",curRoomCode:"",estateInfo:{},roomSearchForm:{fangyuanCode:"",roomStatus:"",floor:"",roomCode:"",roomNo:""},estateRoomListUrl:"/market/fangyuan",tableHeight:500,reqMethod:"queryEstateRoomList",colModels:[{prop:"orgName",label:"房间类型",align:"center"},{prop:"floorName",label:"楼层",align:"center"},{prop:"roomNo",label:"房号",align:"center"},{prop:"roomDirection",label:"朝向",align:"center",render:function(e){return["","朝南","朝北","朝东","朝西","东南","西南","东北","西北"][e.roomDirection]}},{prop:"roomStatus",label:"房间状态",align:"center",type:"status",unitFilters:{renderStatusType:function(e){return{1:"success",2:"info"}[e]||"info"},renderStatusValue:function(e){return["已出租","未出租"][e-1]||"待上线"}}},{prop:"roomCode",label:"平台房源编码",align:"center"},{prop:"roomLayout",label:"室卫厅",align:"center",render:function(e){return e.chamberCount+e.boardCount+e.toiletCount}},{prop:"roomArea",label:"面积",align:"center"},{prop:"decorationDegree",label:"装修程度",align:"center",render:function(e){return["","毛坯","简装","精装修","豪华装"][e.decorationDegree]}},{prop:"bedCount",label:"床数",align:"center"},{prop:"maxPerson",label:"最大入住人数",align:"center"},{prop:"tag",label:"标签",align:"center",slotName:"setTag"},{prop:"settings",label:"设置",width:"182px",align:"center",fixed:"right",slotName:"settingRoom"},{prop:"operate",label:"操作",align:"center",fixed:"right",slotName:"operateRoom"},{prop:"operateRecord",label:"操作记录",align:"center",render:function(e){return e.lastoperator+" "+e.lastOperateTime}}],copyItemToModelVisible:!1,copyItemRoomList:{},checkAllCopyItem:!1,copyOptions:[{label:"交租方式",val:1},{label:"房间类型",val:2},{label:"室卫厅",val:3},{label:"面积",val:4},{label:"装修程度",val:5},{label:"朝向",val:6},{label:"床数",val:7},{label:"最大入住人数",val:8},{label:"飞虎队",val:10}],checkedCopyList:[],rentPayModelVisible:!1,rentPayList:[],serviceChargeTypeList:[{label:"无",value:1},{label:"固定金额",value:2},{label:"租金百分比",value:3}],serviceFeeTypeList:[{label:"随租金付",value:2},{label:"一次性付清",value:3}],baseRentTypeList:[],roomDetailModelVisible:!1,curType:""}},computed:{allCheckedOptionsList:function(){return this.copyOptions.map(function(e){return e.val})},financeRentPayList:function(){return this.rentPayList.filter(function(e){return 2===e.type})},defaultRentPayList:function(){return this.rentPayList.filter(function(e){return 1===e.type})}},methods:{searchParam:function(){this.$refs.estateRoomList.searchHandler()},searchEstateRoomList:function(e){var t=this;"clear"===e&&l()(this.roomSearchForm).forEach(function(e){t.roomSearchForm[e]="fangyuanCode"===e?t.roomSearchForm[e]:""}),this.searchParam()},fetchEstateDetailData:function(){var e=this;Object(s.j)({fangyuanCode:this.fangyuanCode}).then(function(t){"0"===t.code&&e.$set(e,"estateInfo",t.data)})},openCopyItemToModel:function(e){var t=this;this.curRoomCode=e.roomCode,Object(s.d)({fangyuanCode:this.fangyuanCode,roomCode:e.roomCode}).then(function(e){"0"===e.code&&(t.copyItemRoomList=e.data,t.copyItemToModelVisible=!0)})},openRentPayModel:function(e){var t=this;this.curRoomCode=e.roomCode,Object(s.k)({roomCode:e.roomCode}).then(function(e){"0"===e.code&&(t.$set(t,"rentPayList",e.data.roomRentTypeList),t.$set(t,"baseRentTypeList",e.data.baseRentTypeList)),t.rentPayModelVisible=!0})},handleCheckAllChange:function(e){this.checkedCopyList=e?this.allCheckedOptionsList:[]},handleOptionsChange:function(){this.checkAllCopyItem=this.checkedCopyList.length===this.allCheckedOptionsList.length},saveCopyItemTo:function(){var e=this,t=this.$refs.copyItemTo.returnCheckedList();Object(s.b)({fromRoomCode:this.curRoomCode,toRoomCodes:t,items:this.checkedCopyList}).then(function(t){"0"===t.code&&(e.$message({message:t.data.message,type:"success"}),e.checkedCopyList=[],e.checkAllCopyItem=!1,e.copyItemToModelVisible=!1,e.searchParam())})},addRentPay:function(){this.rentPayList.push({depositPrice:"",depositQty:"",maxMonthNum:24,minMonthNum:1,name:"月付",rentPrice:"",rentQty:1,rentTypeId:1,roomId:"",roomRentTypeId:void 0,serviceChargePrice:null,serviceChargeRatio:null,serviceChargeType:1,serviceFeeType:1,type:1})},saveRentPay:function(){var e=this;Object(s.w)({roomCode:this.curRoomCode,roomRentTypeList:this.rentPayList}).then(function(t){"0"===t.code&&(e.rentPayModelVisible=!1)})},switchRentType:function(e){var t=this.baseRentTypeList.filter(function(t){return t.rentQty===e.rentQty});l()(t[0]).forEach(function(o){"baseRentTypeId"===o?e.rentTypeId=t[0][o]:e[o]=t[0][o]})},deleteCurRentPay:function(e){this.$set(this,"rentPayList",this.rentPayList.filter(function(t){return t!=e}))},computeServiceChargePrice:function(e){e.serviceChargePrice=e.serviceChargeRatio*e.rentPrice/100},switchServiceChargeType:function(e){e.serviceFeeType=1===e.serviceChargeType?1:2},openRoomDetailModel:function(e,t){var o=this;this.curType=e,2===e?Object(s.s)({roomCode:t.roomCode}).then(function(e){"0"===e.code&&(o.$store.commit("SET_ESTATEROOMDATA",e.data),o.roomDetailModelVisible=!0)}):this.roomDetailModelVisible=!0},saveRoomData:function(){var e=this,t=this.$refs.roomDetailModel.saveRoomData();t&&Object(s.v)({roomInfo:t},this.curType).then(function(t){"0"===t.code&&(e.$message({message:t.message||"操作成功",type:"success"}),e.roomDetailModelVisible=!1)})}},watch:{roomDetailModelVisible:function(e){e&&this.$nextTick(function(){})}},mounted:function(){this.fetchEstateDetailData()},created:function(){this.fangyuanCode=this.$route.query.fangyuanCode||"",this.roomSearchForm.fangyuanCode=this.fangyuanCode}}},"j/ji":function(e,t,o){var a=o("CaX9");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);o("8bSs")("34da0739",a,!0)},"o/o5":function(e,t,o){(e.exports=o("BkJT")(!1)).push([e.i,".room-detail-select{width:100%}.room-count .room-item-count{margin-bottom:0}.room-count label{width:90px!important;padding-right:0}.upload-pics-model .previewItems{margin-bottom:10px}.upload-pics-model .previewItems .el-upload--picture-card.uploadImage{width:122px;height:92px;line-height:98px}.upload-pics-model .upload-pics-info{margin:0 0 5px}",""])}});