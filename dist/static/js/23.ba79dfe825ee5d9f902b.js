webpackJsonp([23],{CX7i:function(t,e,a){var r=a("k9Zr");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("6imX")("c5005734",r,!0)},NPQi:function(t,e,a){var r=a("+g4/")(a("nXk7"),a("pHM/"),function(t){a("CX7i")},null,null);t.exports=r.exports},k9Zr:function(t,e,a){(t.exports=a("bKW+")(!1)).push([t.i,".el-tag{margin:0 5px 5px 0}.textNumber{position:absolute;bottom:5px;right:10px;color:#666;font-size:12px;line-height:1.2}",""])},nXk7:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("6XH3"),i=a.n(r);e.default={name:"personSign",props:{dataSign:{type:Object,default:function(){return{}}}},filters:{statusFilter:function(t){return{1:"info",2:"success",3:"danger"}[t]||"info"},statusStrFilter:function(t){return["待审核","审核通过","审核不通过"][t-1]||"待审核"}},components:{Preview:i.a},computed:{textNumber:function(){return 50-this.reject_remark.length<0?0:50-this.reject_remark.length}},data:function(){return{data_detail:this.dataSign,status:"",reject_remark:""}},watch:{dataSign:{handler:function(t){this.data_detail=t,this.status="",this.reject_remark=""},deep:!0}}}},"pHM/":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{attrs:{size:"small","label-position":"right","label-width":"80px"}},[a("div",{staticClass:"clearfix"},[a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.data_detail.principal,callback:function(e){t.$set(t.data_detail,"principal",e)},expression:"data_detail.principal"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:1}},[t._v(" ")]),t._v(" "),a("el-col",{attrs:{span:13}},[a("el-form-item",{attrs:{label:"身份证"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.data_detail.principalIdCard,callback:function(e){t.$set(t.data_detail,"principalIdCard",e)},expression:"data_detail.principalIdCard"}})],1)],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"电子签名"}},[a("Preview",{attrs:{"pic-list":t.data_detail.picList}})],1),t._v(" "),a("el-form-item",{attrs:{label:"审核结果"}},[1==t.data_detail.status?a("el-radio-group",{model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[a("el-radio",{attrs:{label:2}},[t._v("通过")]),t._v(" "),a("el-radio",{attrs:{label:3}},[t._v("不通过")])],1):a("el-tag",{attrs:{type:t._f("statusFilter")(t.data_detail.status)}},[t._v("\n      "+t._s(t._f("statusStrFilter")(t.data_detail.status))+"\n    ")]),t._v(" "),3==t.data_detail.status?a("el-input",{attrs:{type:"textarea",rows:2,disabled:!0},model:{value:t.data_detail.rejectRemark,callback:function(e){t.$set(t.data_detail,"rejectRemark",e)},expression:"data_detail.rejectRemark"}}):t._e(),t._v(" "),3==t.status?a("el-input",{staticStyle:{position:"relative"},attrs:{type:"textarea",rows:2,placeholder:"请输入审核不通过原因",maxlength:50},model:{value:t.reject_remark,callback:function(e){t.reject_remark=e},expression:"reject_remark"}}):t._e(),t._v(" "),3==t.status?a("span",{staticClass:"textNumber"},[t._v("还可以输入"+t._s(t.textNumber)+"字符")]):t._e()],1)],1)},staticRenderFns:[]}}});