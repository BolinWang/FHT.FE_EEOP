webpackJsonp([22],{"8Y6n":function(e,o,t){var a=t("Alxp")(t("hYRi"),t("95c3"),function(e){t("j/ji")},"data-v-18fb04d4",null);e.exports=a.exports},"95c3":function(e,o){e.exports={render:function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"app-container"},[t("el-row",{staticClass:"room-options-row"},[t("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-arrow-left"},on:{click:function(o){e.$router.push({name:"集中式房源"})}}},[e._v("返回")]),e._v(" "),t("el-button",{attrs:{type:"primary",size:"small"}},[e._v("新建房号")]),e._v(" "),t("el-button",{attrs:{type:"danger",size:"small"}},[e._v("删除房号")]),e._v(" "),t("span",{staticClass:"estate-title"},[e._v(e._s(e.estateInfo.estateName))]),e._v(" "),t("span",{staticClass:"estate-address"},[e._v(e._s(e.estateInfo.subdistrictName+" - "+e.estateInfo.subdistrictAddress))])],1),e._v(" "),t("el-form",{ref:"form",staticClass:"room-search-form",attrs:{inline:!0,model:e.roomSearchForm,size:"small"}},[t("el-form-item",{staticClass:"room-search-form-group"},[t("el-select",{attrs:{placeholder:"楼层"},model:{value:e.roomSearchForm.floor,callback:function(o){e.$set(e.roomSearchForm,"floor",o)},expression:"roomSearchForm.floor"}},e._l(e.floorList,function(e){return t("el-option",{key:e.floorId,attrs:{label:e.floorName,value:e.floorId}})}))],1),e._v(" "),t("el-form-item",{staticClass:"room-search-form-group"},[t("el-select",{attrs:{placeholder:"房间状态"},model:{value:e.roomSearchForm.roomStatus,callback:function(o){e.$set(e.roomSearchForm,"roomStatus",o)},expression:"roomSearchForm.roomStatus"}},[t("el-option",{attrs:{label:"已出租",value:"1"}}),e._v(" "),t("el-option",{attrs:{label:"未出租",value:"2"}})],1)],1),e._v(" "),t("el-form-item",{staticClass:"room-search-form-group"},[t("el-input",{attrs:{placeholder:"房源编码"},model:{value:e.roomSearchForm.roomCode,callback:function(o){e.$set(e.roomSearchForm,"roomCode",o)},expression:"roomSearchForm.roomCode"}})],1),e._v(" "),t("el-form-item",{staticClass:"room-search-form-group"},[t("el-input",{attrs:{placeholder:"房号"},model:{value:e.roomSearchForm.roomNo,callback:function(o){e.$set(e.roomSearchForm,"roomNo",o)},expression:"roomSearchForm.roomNo"}})],1),e._v(" "),t("el-form-item",{staticClass:"room-search-form-group"},[t("el-button",{attrs:{type:"primary"}},[e._v("查询")]),e._v(" "),t("el-button",[e._v("清空")])],1)],1),e._v(" "),t("grid-unit",{ref:"estateRoomList",attrs:{url:e.estateRoomListUrl,listField:"data.list",totalField:"data.record",dataMethod:e.reqMethod,formOptions:e.roomSearchForm,showSelection:!0,columns:e.colModels,height:e.tableHeight},scopedSlots:e._u([{key:"settingRoom",fn:function(o){return[t("el-button",{attrs:{size:"mini"},on:{click:function(t){e.openRentPayModel(o.row)}}},[e._v("交租方式")]),e._v(" "),t("el-button",{attrs:{size:"mini"},on:{click:function(t){e.openCopyItemToModel(o.row)}}},[e._v("复制到")])]}},{key:"operateRoom",fn:function(o){return[t("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("编辑房间")])]}}])}),e._v(" "),t("el-dialog",{staticClass:"copy-item-to-model",attrs:{title:"复制到",visible:e.copyItemToModelVisible,width:"700px"},on:{"update:visible":function(o){e.copyItemToModelVisible=o}}},[t("room-list-selecter",{ref:"copyItemTo",attrs:{roomList:e.copyItemRoomList,visible:e.copyItemToModelVisible}},[t("el-card",{staticClass:"head-card"},[t("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top-start"}},[t("div",{attrs:{slot:"content"},slot:"content"},[e._v("选择复制您要的内容，再选择您要编辑的房间，"),t("br"),e._v("这样可以方便您快速批量编辑同类房源")]),e._v(" "),t("span",{staticClass:"head-card-title"},[e._v("复制项目"),t("i",{staticClass:"el-icon-warning"})])]),e._v(" "),t("div",{staticClass:"check-all"},[t("el-form",{attrs:{inline:!0,size:"mini"}},[t("el-form-item",{attrs:{label:e.checkAllCopyItem?"取消全选":"全选"}},[t("el-switch",{on:{change:e.handleCheckAllChange},model:{value:e.checkAllCopyItem,callback:function(o){e.checkAllCopyItem=o},expression:"checkAllCopyItem"}})],1)],1)],1)],1),e._v(" "),t("el-checkbox-group",{model:{value:e.checkedCopyList,callback:function(o){e.checkedCopyList=o},expression:"checkedCopyList"}},e._l(e.copyOptions,function(o){return t("el-checkbox",{key:o.val,staticClass:"head-check-options",attrs:{label:o.val},on:{change:e.handleOptionsChange}},[e._v("\n            "+e._s(o.label)+"\n          ")])}))],1),e._v(" "),t("span",{attrs:{slot:"card-title"},slot:"card-title"},[e._v("请选择要复制到的房间号")])],1),e._v(" "),t("span",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.saveCopyItemTo}},[e._v("确 定")]),e._v(" "),t("el-button",{attrs:{size:"small"},on:{click:function(o){e.copyItemToModelVisible=!1}}},[e._v("取 消")])],1)],1),e._v(" "),t("el-dialog",{staticClass:"rent-pay-model",attrs:{title:"交租方式",visible:e.rentPayModelVisible,width:"700px"},on:{"update:visible":function(o){e.rentPayModelVisible=o}}})],1)},staticRenderFns:[]}},CaX9:function(e,o,t){(e.exports=t("BkJT")(!1)).push([e.i,".room-options-row[data-v-18fb04d4]{margin-bottom:20px}.room-options-row .estate-title[data-v-18fb04d4]{display:inline-block;vertical-align:middle;margin-left:50px;font-size:24px;line-height:1}.room-options-row .estate-address[data-v-18fb04d4]{display:inline-block;vertical-align:middle;max-width:500px;overflow:hidden;font-size:14px;line-height:1;margin-left:20px}.room-search-form .room-search-form-group[data-v-18fb04d4]{margin-bottom:10px}.room-search-form .room-search-form-group.right[data-v-18fb04d4]{margin-right:0}.copy-item-to-model .head-card[data-v-18fb04d4]{-webkit-box-shadow:0 0;box-shadow:0 0;margin-bottom:20px}.copy-item-to-model .head-card .head-card-title i[data-v-18fb04d4]{margin-left:5px;color:#409eff}.copy-item-to-model .head-card .check-all[data-v-18fb04d4]{float:right;position:relative}.copy-item-to-model .head-card .check-all .el-form-item[data-v-18fb04d4]{margin-bottom:0}.copy-item-to-model .head-card .head-check-options[data-v-18fb04d4]{width:20%;margin-left:0}",""])},hYRi:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var a=t("U4Ig"),r=t.n(a),l=t("QHcW"),i=t("c5or"),s=t.n(i);o.default={name:"singleEstateRoom",components:{GridUnit:r.a,RoomListSelecter:s.a},data:function(){return{fangyuanCode:"",curRoomCode:"",estateInfo:{},floorList:[],roomSearchForm:{roomStatus:"",floor:"",roomCode:"",roomNo:""},estateRoomListUrl:"http://localhost:9528/api/market/fangyuan",tableHeight:500,reqMethod:"queryEstateRoomList",colModels:[{prop:"orgName",label:"房间类型",align:"center"},{prop:"floorName",label:"楼层",align:"center"},{prop:"roomNo",label:"房号",align:"center"},{prop:"roomDirection",label:"朝向",align:"center",render:function(e){return["","朝南","朝北","朝东","朝西","东南","西南","东北","西北"][e.roomDirection]}},{prop:"roomStatus",label:"房间状态",align:"center",type:"status",unitFilters:{renderStatusType:function(e){return{1:"success",2:"info"}[e]||"info"},renderStatusValue:function(e){return["已出租","未出租"][e-1]||"待上线"}}},{prop:"roomCode",label:"平台房源编码",align:"center"},{prop:"roomLayout",label:"室卫厅",align:"center",render:function(e){return e.chamberCount+e.boardCount+e.toiletCount}},{prop:"roomArea",label:"面积",align:"center"},{prop:"decorationDegree",label:"装修程度",align:"center",render:function(e){return["","毛坯","简装","精装修","豪华装"][e.decorationDegree]}},{prop:"bedCount",label:"床数",align:"center"},{prop:"maxPerson",label:"最大入住人数",align:"center"},{prop:"tag",label:"标签",align:"center"},{prop:"settings",label:"设置",width:"182px",align:"center",fixed:"right",slotName:"settingRoom"},{prop:"operate",label:"操作",align:"center",fixed:"right",slotName:"operateRoom"},{prop:"operateRecord",label:"操作记录",align:"center",render:function(e){return e.lastoperator+" "+e.lastOperateTime}}],copyItemToModelVisible:!1,copyItemRoomList:{},checkAllCopyItem:!1,copyOptions:[{label:"交租方式",val:1},{label:"房间类型",val:2},{label:"室卫厅",val:3},{label:"面积",val:4},{label:"装修程度",val:5},{label:"朝向",val:6},{label:"床数",val:7},{label:"最大入住人数",val:8},{label:"飞虎队",val:10}],checkedCopyList:[],rentPayModelVisible:!1}},computed:{allCheckedOptionsList:function(){return this.copyOptions.map(function(e){return e.val})}},methods:{searchParam:function(){this.$refs.estateRoomList.searchHandler()},setFloorList:function(){var e=this;Object(l.k)({fangyuanCode:this.fangyuanCode}).then(function(o){"0"===o.code&&(e.floorList=o.data.list)})},fetchEstateDetailData:function(){var e=this;Object(l.j)({fangyuanCode:this.fangyuanCode}).then(function(o){"0"===o.code&&e.$set(e,"estateInfo",o.data.dataObject)})},openCopyItemToModel:function(e){var o=this;this.curRoomCode=e.roomCode,Object(l.d)({fangyuanCode:this.fangyuanCode,roomCode:e.roomCode}).then(function(e){o.copyItemRoomList=e.data.dataObject,o.copyItemToModelVisible=!0})},openRentPayModel:function(e){var o=this;Object(l.l)({roomCode:e.roomCode}).then(function(e){o.rentPayModelVisible=!0})},handleCheckAllChange:function(e){this.checkedCopyList=e?this.allCheckedOptionsList:[]},handleOptionsChange:function(){this.checkAllCopyItem=this.checkedCopyList.length===this.allCheckedOptionsList.length},saveCopyItemTo:function(){var e=this,o=this.$refs.copyItemTo.returnCheckedList();Object(l.b)({fromRoomCode:this.curRoomCode,toRoomCodes:o,items:this.checkedCopyList}).then(function(o){"0"===o.code&&(e.$message({message:o.data.message,type:"success"}),e.checkedCopyList=[],e.checkAllCopyItem=!1,e.copyItemToModelVisible=!1,e.searchParam())})}},mounted:function(){this.fangyuanCode=this.$route.query.fangyuanCode||"",this.setFloorList(),this.fetchEstateDetailData()}}},"j/ji":function(e,o,t){var a=t("CaX9");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("8bSs")("34da0739",a,!0)}});