webpackJsonp([13],{"/mf3":function(e,t,i){var a=i("zgzc");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);i("rjj0")("e6a19d90",a,!0)},ENX7:function(e,t,i){"use strict";t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(a.a)({url:"/house/region",method:"post",data:{method:"query.region.area",params:e}})},t.d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(a.a)({url:"/house/region",method:"post",data:{method:"query.region.zone",params:e}})},t.b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(a.a)({url:"https://api.mdguanjia.com/myhome/api/search",method:"post",data:{method:"searchByPage",params:e}})},t.c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(a.a)({url:"/flyingsquad",method:"post",data:{method:"query.server.people",params:e}})},t.f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(a.a)({url:"/flyingsquad",method:"post",data:{method:"distribute.server",params:e}})},t.e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(a.a)({url:"/flyingsquad/staff",method:"post",data:{method:"seeRecord",params:e}})};var a=i("Vo7i")},Tcpb:function(e,t,i){var a=i("VU/8")(i("th3C"),i("xmfQ"),function(e){i("/mf3")},"data-v-45a78c1e",null);e.exports=a.exports},th3C:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("Dd8w"),r=i.n(a),n=i("woOf"),s=i.n(n),l=i("cAgV"),o=i("0xDb"),c=i("E4LH"),m=i("ENX7");t.default={name:"searchHouseSource",directives:{waves:l.a},filters:{statusFilter:function(e){return{1:"success",2:"info"}[e]||"info"},formatStatus:function(e){return{1:"集中式",2:"分散式"}[e]||"分散式"},zoneFilter:function(e,t){return""+t.region+(t.zone||"")},serviceFilter:function(e){return{0:"空闲中",1:"带看中"}[e]||"空闲中"}},data:function(){return{formData:{cityId:310100,keyword:"",tags:["fhd"],allPics:!0},renterInfo:{userMobile:"",userName:"",detailRequireMent:"",selectedServicer:[]},cityList:[{cityId:330100,cityName:"杭州市"},{cityId:310100,cityName:"上海市"}],areaList:[],zoneList:[],searchParams:{},listLoading:!1,colModels:[{prop:"areaZone",label:"区域板块",type:"areaZone"},{prop:"name",label:"小区/公寓-房间"},{prop:"type",label:"房源类型",width:100,type:"type"},{prop:"imageUrl",label:"图片",type:"img",width:80,targetProp:"imageUrls"},{prop:"houseType",label:"室卫厅",width:100},{prop:"roomArea",label:"面积",width:100},{prop:"minRentPrice",label:"月租金",width:100}],tableHeight:300,tableData:[],multipleSelection:[],itemFilters:[{label:"月租",value:"rentPrice",filters:[{label:"500元以下",maxPrice:500,minPrice:null},{label:"500-1000元",maxPrice:1e3,minPrice:500},{label:"1000-1500元",maxPrice:1500,minPrice:1e3},{label:"1500-2000元",maxPrice:2e3,minPrice:1500},{label:"2000-3000元",maxPrice:3e3,minPrice:2e3},{label:"3000-5000元",maxPrice:5e3,minPrice:3e3},{label:"5000-8000元",maxPrice:8e3,minPrice:5e3},{label:"8000元以上",maxPrice:null,minPrice:8e3}]},{label:"面积",value:"roomArea",filters:[{label:"50平以下",max:50,min:null},{label:"50-70平",max:70,min:50},{label:"70-90平",max:90,min:70},{label:"90-110平",max:110,min:90},{label:"110-130平",max:130,min:110},{label:"130-150平",max:150,min:130},{label:"150-200平",max:200,min:150},{label:"200平以上",max:null,min:200}]},{label:"户型",value:"chamberCounts",filters:[{label:"一室",max:1,min:1},{label:"两室",max:2,min:2},{label:"三室",max:3,min:3},{label:"四室",max:4,min:4},{label:"五室",max:5,min:5},{label:"五室以上",max:null,min:5}]},{label:"方式",value:"houseRentType",filters:[{label:"整租",value:1},{label:"合租",value:2}]}],isActive:[-1,-1,-1,-1,-1],isAreaActive:[{id:"",index:-1,value:""},{id:"",index:-1,value:""}],rules:{userMobile:[{required:!0,validator:function(e,t,i){t&&Object(c.b)(t.trim())?i():i(new Error("请输入正确的手机号"))},trigger:"blur"}],selectedServicer:[{required:!0,validator:function(e,t,i){t&&t.serverId?i():i(new Error("请选择城市管家"))},trigger:"change"}]},serviceList:[],rentPrice:{minPrice:null,maxPrice:null},roomArea:{minRoomArea:null,maxRoomArea:null}}},mounted:function(){var e=this,t=document.body.clientHeight-425;this.tableHeight=t>300?t:300,window.onresize=function(){return t=document.body.clientHeight-425,void(e.tableHeight=e.tableHeight=t>300?t:300)},this.getAreaList()},computed:{tableStyle:function(){return{width:"100%",height:this.tableHeight+"px",margin:0}}},methods:{getAreaList:function(){var e=this;Object(m.a)({cityId:this.formData.cityId}).then(function(t){e.areaList=t.data||[],e.getGridData()})},getGridData:function(){var e=this;this.listLoading=!0,this.searchParams=s()({pageNo:1,pageSize:100},Object(o.d)(this.formData)),Object(m.b)(Object(o.a)(this.searchParams)).then(function(t){e.tableData=t.data&&t.data.resultList||[],e.listLoading=!1})},searchParam:function(){this.formData=Object(o.a)(r()({},this.formData,{regionId:this.isAreaActive[0].id,zoneId:this.isAreaActive[1].id},this.rentPrice,this.roomArea,{chamberCounts:[{min:-1==this.isActive[2]?"":this.itemFilters[2].filters[this.isActive[2]].min,max:-1==this.isActive[2]?"":this.itemFilters[2].filters[this.isActive[2]].max}],houseRentType:-1==this.isActive[3]?"":this.itemFilters[3].filters[this.isActive[3]].value})),this.getGridData()},selectMethod:function(e,t){this.$set(this.isActive,e,t),0==e&&-1!=this.isActive[0]&&(this.rentPrice.minPrice=this.itemFilters[0].filters[this.isActive[0]].minPrice,this.rentPrice.maxPrice=this.itemFilters[0].filters[this.isActive[0]].maxPrice),1==e&&-1!=this.isActive[0]&&(this.roomArea.minRoomArea=this.itemFilters[1].filters[this.isActive[1]].min,this.roomArea.maxRoomArea=this.itemFilters[1].filters[this.isActive[1]].max)},selectAreaMethod:function(e,t,i,a){var r=this;return this.$set(this.isAreaActive,e,{id:i,index:t,value:a}),0==e&&(this.$set(this.isAreaActive,1,{id:"",index:-1,value:""}),-1==t?(this.zoneList=[],!1):void Object(m.d)({regionId:this.areaList[t].areaId}).then(function(e){r.zoneList=e.data}))},handleSelectionChange:function(e){this.multipleSelection=e},handlePreview:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(!e||0==e.length)return this.$message.error("暂无房源图片"),!1;this.$preview.open(0,e.map(function(e,t){return{id:t,src:e,w:800,h:600}}))},getServicers:function(){var e=this;Object(m.c)({}).then(function(t){e.serviceList=t.data})},changeServicer:function(e){var t=this.serviceList.filter(function(t){return t.userId==e})[0];this.renterInfo.selectedServicer={serverId:e,serverName:t.name,serverMobile:t.mobile}},saveSendData:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;if(0==e.multipleSelection.length)return e.$message.error("请选择房源，最多5个"),!1;if(e.multipleSelection.length>5)return e.$message.error("最多可选择5个房源！请重新选择"),!1;var i=r()({userMobile:e.renterInfo.userMobile,userName:e.renterInfo.userName,detailRequireMent:e.renterInfo.detailRequireMent},e.renterInfo.selectedServicer,{rooms:e.multipleSelection});Object(m.f)(i).then(function(t){e.$notify({title:"成功",message:"短信发送成功",type:"success",duration:2e3})})})}}}},xmfQ:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"model-search clearfix"},[i("el-select",{staticClass:"item-select",staticStyle:{width:"150px"},attrs:{size:"small",clearable:""},on:{change:e.getAreaList},model:{value:e.formData.cityId,callback:function(t){e.$set(e.formData,"cityId",t)},expression:"formData.cityId"}},e._l(e.cityList,function(e,t){return i("el-option",{key:t,attrs:{label:e.cityName,value:e.cityId}})})),e._v(" "),i("el-input",{staticClass:"filter-item",staticStyle:{width:"300px"},attrs:{size:"small",placeholder:"请输入小区名或地址","prefix-icon":"el-icon-search",clearable:""},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.searchParam(t)}},model:{value:e.formData.keyword,callback:function(t){e.$set(e.formData,"keyword",t)},expression:"formData.keyword"}}),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",size:"small",icon:"el-icon-search"},nativeOn:{click:function(t){e.searchParam(t)}}},[e._v("查询")])],1),e._v(" "),i("div",{staticClass:"model-itemFilters"},[i("div",{staticClass:"position clearfix"},[i("dl",{staticClass:"clearfix"},[e._m(0),e._v(" "),i("dd",[i("span",{class:{active:-1==e.isAreaActive[0].index},on:{click:function(t){e.selectAreaMethod(0,-1)}}},[e._v("\n            不限\n          ")]),e._v(" "),e._l(e.areaList,function(t,a){return i("span",{key:a,class:{active:a==e.isAreaActive[0].index},on:{click:function(i){e.selectAreaMethod(0,a,t.areaId)}}},[e._v("\n            "+e._s(t.areaName)+"\n          ")])})],2)]),e._v(" "),i("div",{staticClass:"zoneItems"},e._l(e.zoneList,function(t,a,r){return i("p",{key:r,staticStyle:{display:"inline-block",margin:"0"}},[e._v("\n          "+e._s(a)+"\n          "),e._l(t,function(t,r){return i("span",{key:r,class:{active:a==e.isAreaActive[1].value&&r==e.isAreaActive[1].index},on:{click:function(i){e.selectAreaMethod(1,r,t.zoneId,a)}}},[e._v("\n            "+e._s(t.zoneName)+"\n          ")])})],2)}))]),e._v(" "),i("div",{staticClass:"list-more"},e._l(e.itemFilters,function(t,a){return i("div",{key:a,staticClass:"list-more-item clearfix",attrs:{label:t.label,value:t.value}},[i("dl",[i("dt",[e._v(e._s(t.label)),i("span",[e._v("|")])]),e._v(" "),i("dd",[i("span",{class:{active:-1==e.isActive[a]},on:{click:function(t){e.selectMethod(a,-1)}}},[e._v("\n              不限\n            ")]),e._v(" "),e._l(t.filters,function(t,r){return i("span",{key:r,class:{active:r==e.isActive[a]},on:{click:function(t){e.selectMethod(a,r)}}},[e._v("\n              "+e._s(t.label)+"\n            ")])}),e._v(" "),"rentPrice"==t.value?i("span",[i("el-input",{staticStyle:{width:"70px"},attrs:{size:"mini"},model:{value:e.rentPrice.minPrice,callback:function(t){e.$set(e.rentPrice,"minPrice",t)},expression:"rentPrice.minPrice"}}),e._v("\n               -\n              "),i("el-input",{staticStyle:{width:"70px"},attrs:{size:"mini"},model:{value:e.rentPrice.maxPrice,callback:function(t){e.$set(e.rentPrice,"maxPrice",t)},expression:"rentPrice.maxPrice"}})],1):e._e(),e._v(" "),"roomArea"==t.value?i("span",[i("el-input",{staticStyle:{width:"70px"},attrs:{size:"mini"},model:{value:e.roomArea.minRoomArea,callback:function(t){e.$set(e.roomArea,"minRoomArea",t)},expression:"roomArea.minRoomArea"}}),e._v("\n               -\n              "),i("el-input",{staticStyle:{width:"70px"},attrs:{size:"mini"},model:{value:e.roomArea.maxRoomArea,callback:function(t){e.$set(e.roomArea,"maxRoomArea",t)},expression:"roomArea.maxRoomArea"}})],1):e._e()],2)])])}))]),e._v(" "),i("div",{staticClass:"renterInfo",staticStyle:{"padding-top":"5px"}},[i("el-form",{ref:"ruleForm",attrs:{inline:!0,model:e.renterInfo,rules:e.rules,size:"small"}},[i("el-form-item",[i("el-input",{attrs:{placeholder:"可输入租客姓名"},model:{value:e.renterInfo.userName,callback:function(t){e.$set(e.renterInfo,"userName",t)},expression:"renterInfo.userName"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"userMobile"}},[i("el-input",{attrs:{placeholder:"请输入租客电话"},model:{value:e.renterInfo.userMobile,callback:function(t){e.$set(e.renterInfo,"userMobile",t)},expression:"renterInfo.userMobile"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"selectedServicer"}},[i("el-select",{attrs:{placeholder:"请选择城市管家"},on:{focus:e.getServicers,change:e.changeServicer},model:{value:e.renterInfo.selectedServicer.serverId,callback:function(t){e.$set(e.renterInfo.selectedServicer,"serverId",t)},expression:"renterInfo.selectedServicer.serverId"}},e._l(e.serviceList,function(t,a){return i("el-option",{key:a,attrs:{label:t.name+" "+t.mobile,value:t.userId}},[i("span",{staticClass:"left dropItem"},[e._v("【区域】"+e._s(t.areaName))]),e._v(" "),i("span",{staticClass:"left dropItem"},[e._v("【管家】"+e._s(t.name))]),e._v(" "),i("span",{staticClass:"left dropItem"},[e._v(e._s(t.mobile))]),e._v(" "),i("span",{staticClass:"left dropItem"},[e._v("【待带看数】"+e._s(t.unLookCount))]),e._v(" "),i("el-tag",{staticClass:"left dropItem dropTag",attrs:{size:"mini",type:e._f("statusFilter")(t.serverStatus)}},[e._v("\n              "+e._s(e._f("serviceFilter")(t.serverStatus))+"\n            ")])],1)}))],1),e._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary",icon:"el-icon-message"},on:{click:function(t){e.saveSendData()}}},[e._v("发送短信")])],1),e._v(" "),i("el-input",{staticStyle:{"margin-bottom":"15px",display:"block",width:"688px"},attrs:{type:"textarea",placeholder:"请输入租客详细需求"},model:{value:e.renterInfo.detailRequireMent,callback:function(t){e.$set(e.renterInfo,"detailRequireMent",t)},expression:"renterInfo.detailRequireMent"}})],1)],1),e._v(" "),i("div",{staticClass:"model-table",style:e.tableStyle},[i("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:e.tableData,"max-height":e.tableHeight,size:"small",fit:"",stripe:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"index",width:"60",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{type:"selection",width:"40"}}),e._v(" "),e._l(e.colModels,function(t,a){return i("el-table-column",{key:a,attrs:{label:t.label,width:t.width,fit:"","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(a){return["img"===t.type?i("span",[a.row[t.prop]?i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a.row[t.prop],expression:"scope.row[item.prop]"}],staticClass:"preview-img image image-center",attrs:{width:"40",height:"40"},on:{click:function(i){e.handlePreview(a.row[t.targetProp])}}}):i("span")]):"areaZone"==t.type?i("span",[e._v("\n            "+e._s(e._f("zoneFilter")(a.row[t.prop],a.row))+"\n          ")]):"type"===t.type?i("el-tag",{attrs:{type:e._f("statusFilter")(a.row[t.prop])}},[e._v("\n            "+e._s(e._f("formatStatus")(a.row[t.prop]))+"\n          ")]):"minRentPrice"==t.prop?i("span",[e._v("\n            "+e._s(a.row[t.prop])+"元起\n          ")]):i("span",[e._v("\n            "+e._s(a.row[t.prop])+"\n          ")])]}}])})})],2)],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("dt",[this._v("区域"),t("span",[this._v("|")])])}]}},zgzc:function(e,t,i){(e.exports=i("FZ+f")(!1)).push([e.i,"dd[data-v-45a78c1e],dl[data-v-45a78c1e],dt[data-v-45a78c1e]{margin:0;padding:0}.model-itemFilters[data-v-45a78c1e]{border-bottom:1px solid #f0f0f0;border-top:1px solid #f0f0f0;margin:10px 0;padding:5px 0}.model-itemFilters dt[data-v-45a78c1e]{float:left;font-weight:700;color:#909399;font-size:12px;line-height:28px}.model-itemFilters dt span[data-v-45a78c1e]{margin-left:10px;color:#dfdfdf;font-size:13px}.model-itemFilters dd[data-v-45a78c1e]{float:left;color:#909399;font-size:12px;margin-left:10px}.zoneItems[data-v-45a78c1e]{margin-left:2em;font-size:14px;padding-left:20px}.model-itemFilters .zoneItems span[data-v-45a78c1e],.model-itemFilters dd span[data-v-45a78c1e]{display:inline-block;margin-right:20px;line-height:28px;cursor:pointer;color:#909399;font-size:12px}.active[data-v-45a78c1e]{color:#ff8448!important}.dropItem[data-v-45a78c1e]{margin-right:10px}.el-select-dropdown__item span.dropTag[data-v-45a78c1e]{line-height:20px!important;margin-top:7px}",""])}});